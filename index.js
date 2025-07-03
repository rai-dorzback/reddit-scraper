const snoowrap = require('snoowrap');

// require dotenv
require('dotenv').config({path: './.env'})

// Set up Reddit client
const reddit = new snoowrap({
  userAgent: process.env.USER_AGENT,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD,
});

console.log('✅ Reddit API authenticated.');

// test that it works to log into reddit
reddit.getMe().then(user => {
  console.log('Logged in as:', user.name);
}).catch(err => {
  console.error('Reddit login failed:', err);
});

// fetch comments from reddit post
async function fetchComments(postID) {
    try {
        // Get the submission object and fetch full data
        const submission = await reddit.getSubmission(postID).fetch();

        // Fetch more comments if needed (e.g. up to 150)
        const comments = await submission.comments.fetchMore({ amount: 200, skipReplies: false });

        // Count how many comments
        console.log(`Fetched ${comments.length} comments from post ${postID}`);

        // Optional: log first comment body to confirm
        if (comments.length > 0) {
            console.log('Sample comment:', comments[1].body);
        };

        return comments;
    } catch(err) {
        console.error(`Error fetching comments for post ${postID}:`, err);
        return [];
    };
};

(async () => {
  const comments1 = await fetchComments(process.env.POST_ID1);
  const comments2 = await fetchComments(process.env.POST_ID2);

  console.log(`Comments 1: ${comments1.length}`);
  console.log(`Comments 2: ${comments2.length}`);
})();