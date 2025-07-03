## Reddit Comments Web Scraper
This is a web scraper for reddit comments. I am building this so I can analyze the comments I received about my app as data.

## Development Stage
<p>July 3, 2025</p>
- First, I had to [set up a Reddit Script key](https://www.reddit.com/prefs/apps) in order to access the comments.
- Then, I had to [get a Google Sheets API Key](https://developers.google.com/workspace/sheets/api/quickstart/nodejs). I had to create a Google Cloud project and then enable the Google Sheets API.
- I had to play around a lot with the snoowrap package in order to get ALL of the comments and replies, not just the top-level ones.