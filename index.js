const snoowrap = require('snoowrap');

// require dotenv
require('dotenv').config({path: './.env'})

/* ====== GOOGLE SHEETS ====== */
const { google } = require('googleapis');
const sheets = google.sheets('v4');
const auth = new google.auth.GoogleAuth({
  keyFile: './credentials.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

async function writeCommentsToSheet(commentsArray, spreadsheetId, sheetName) {
    const authClient = await auth.getClient();

    // Prepare rows (first row = headers)
    const rows = [
        ['Author', 'Body', 'Score', 'Permalink', 'Created UTC', 'Parent ID'],
        ...commentsArray.map(comment => [
        comment.author,
        comment.body,
        comment.score,
        comment.permalink,
        comment.created_utc,
        comment.parent_id
        ])
    ];

    // Clear existing data
    sheets.spreadsheets.values.clear({
        auth: authClient,
        spreadsheetId,
        range: sheetName
    });

    // Write new data
    sheets.spreadsheets.values.update({
        auth: authClient,
        spreadsheetId,
        range: sheetName,
        valueInputOption: 'RAW',
        requestBody: {
            values: rows
        }
    });

    console.log(`Wrote ${commentsArray.length} comments to Google Sheet.`);
};

/* ====== REDDIT ====== */
// Set up Reddit client
const reddit = new snoowrap({
  userAgent: process.env.USER_AGENT,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD,
});

console.log('Reddit API authenticated.');

// test that it works to log into reddit
// reddit.getMe().then(user => {
//   console.log('Logged in as:', user.name);
// }).catch(err => {
//   console.error('Reddit login failed:', err);
// });

// fetch comments from reddit post
async function fetchComments(postID) {
    try {
        // Get the submission object and fetch full data
        const submission = await reddit.getSubmission(postID).fetch();

        // Fetch all comments
        let comments = await submission.comments.fetchMore({ amount: Infinity, skipReplies: false });

        // Fetch all replies to the comments
        let allReplies = [];
        for (const c of comments) {
            const replies = await collectAllReplies(c);
            allReplies.push(...replies);
        };

        // Count how many comments
//         console.log(`Fetched ${comments.length} top-level comments from post ${postID}`);
//         console.log(`Fetched ${allReplies.length} nested replies`);
// console.log(`Total: ${comments.length + allReplies.length}`);

        const allComments = [...comments, ...allReplies];

        // extract fields
        const extractedData = extractFields(allComments);
        return extractedData
    } catch(err) {
        console.error(`Error fetching comments for post ${postID}:`, err);
        return [];
    };
};

async function collectAllReplies(comment) {
  let results = []  ;
  if(comment.replies && comment.replies.length > 0) {
    for(const reply of comment.replies) {
        if(reply instanceof snoowrap.objects.More) {
            const moreReplies = await reply.fetchMore();
            for (const mr of moreReplies) {
            results.push(...await collectAllReplies(mr));
            };
        } else {
            results.push(reply);
            results.push(...await collectAllReplies(reply));
        };
    };
  };
  return results;
};

function extractFields(allComments) {
    const extractedData = allComments.map(c => ({
        author: c.author ? c.author.name : '[deleted]',
        body: c.body,
        score: c.score,
        permalink: `https://reddit.com${c.permalink}`,
        created_utc: c.created_utc,
        parent_id: c.parent_id
    }));
    return extractedData;
};

async function main() {
    const comments1 = await fetchComments(process.env.POST_ID1);
    const comments2 = await fetchComments(process.env.POST_ID2);

    const allComments = [...comments1, ...comments2];

    await writeCommentsToSheet(
    allComments,
        process.env.SHEET_ID,
        'Sheet1' // or your actual tab name
    );
};

main();