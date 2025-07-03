## Reddit Scraper
This scrapes reddit comments and imports them into a Google Sheet. I am building this so I can analyze the comments I received about my app as data/proof of concept.

## Table of Contents
- [Features](#features)
- [Development Stage](#development-stage)
- [Technologies Used](#technologies-used)
- [Lessons Learned](#lessons-learned)
- [Contact](#contact)

## Features
- Scrapes reddit comments, collects all comments and replies
- Extracts data into Author, Text Body, Comment Score, Permalink, Created UTC, Parent ID
- Writes comments to Google Sheet

## Development Stage
### July 3, 2025
- First, I had to set up a [Reddit Script key](https://www.reddit.com/prefs/apps) in order to access the comments.
- Then, I had to get a [Google Sheets API Key](https://developers.google.com/workspace/sheets/api/quickstart/nodejs). I had to create a Google Cloud project and then enable the Google Sheets API.
- I had to play around a lot with the snoowrap package in order to get ALL of the comments and replies, not just the top-level ones.

## Technologies Used
- JavaScript
- Node.js
- Reddit API
- Google Sheets API
- Npm packages: snoowrap, googleapis, dotenv

## Lessons Learned
- This was my first time building a web scraper and using the reddit and google sheets API. I used ChatGPT to walk me through the steps to set it up
- Make sure to test your data every step of the way, especially when using a new API as the littlest things can cause errors

## Contact 
<p> 
  <a href="https://rai-dorzback.netlify.app/" target="blank">
    <img src="https://img.shields.io/badge/Website-563d7c?&style=for-the-badge" alt="Website">
  </a>
  <a href="https://www.linkedin.com/in/rai-d/">
    <img src="https://img.shields.io/badge/LinkedIn-046E6D?logo=linkedin&style=for-the-badge">
  </a>
  <a href="https://bsky.app/profile/rai-bread.bsky.social" target="blank">
    <img src="https://img.shields.io/badge/Bluesky-563d7c?&style=for-the-badge&logoColor=white" alt="rai__bread" />
  </a> 
</p>