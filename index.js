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

