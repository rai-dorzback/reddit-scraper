## Reddit Scraper
This scrapes reddit comments and imports them into a Google Sheet. I am building this so I can analyze the comments I received about my app as data/proof of concept.

## Development Stage
### July 3, 2025
- First, I had to set up a [Reddit Script key](https://www.reddit.com/prefs/apps) in order to access the comments.
- Then, I had to get a [Google Sheets API Key](https://developers.google.com/workspace/sheets/api/quickstart/nodejs). I had to create a Google Cloud project and then enable the Google Sheets API.
- I had to play around a lot with the snoowrap package in order to get ALL of the comments and replies, not just the top-level ones.
