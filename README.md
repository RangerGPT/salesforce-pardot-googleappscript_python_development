# Pardot and Salesforce API access using Python
 These scripts are for those who have user accounts (admin level access) in Salesforce and Pardot. There are certain necessary steps to activate a connected app in order to allow the Pardot API requests to function correctly. I have not included a write up on setting up the connected apps in Salesforce in this readme. 

 The overall scope of this project was to combine Salesforce, Pardot, and JavaScript to create a User Interface in Google Sheets in order to allow for scalable reporting and more accurate marketing based on individual locations for business purposes. The Pardot API was used to get data that could not be accessed from SOQL queries while Google App Script was used to read and write files to a Google Sheets and format the google sheet based on the change in data size. The file named sheetFormat.js was the core of the UI in Google Sheets. 

 The Google Sheet is used as both a database and a UI with the data being hidden from the end user and the data accessed by Sheet QUERY() formulas.

# Languages Used For This Project
-Python
-Flask
-Dash
-JavaScript
-Google Apps Script
-SOQL
-HTML
-CSS
 
# Project Was Completed 
