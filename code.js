// Function to import new leads data from CSV files
function importAllCSVNewLeads() {
  // Get the folder containing the CSV files by its ID
  var folder = DriveApp.getFolderById('[Google Drive Folder ID]');
  // Get all CSV files in the folder
  var files = folder.getFilesByType(MimeType.CSV);
  // Get all sheets in the active spreadsheet
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  // Select the 8th sheet (index 7) to import the data
  var sheet = sheets[7];
  // Clear the contents of the sheet before importing new data
  sheet.clearContents();
  
  // Iterate through each CSV file
  while (files.hasNext()) {
    var file = files.next();
    // Get the CSV data as a string
    var csvData = file.getBlob().getDataAsString();
    // Convert the CSV string to a 2D array
    var csvArray = CSVToArray(csvData);
    // Get the starting row for importing data (next empty row)
    var startRow = sheet.getLastRow() + 1;
    // Set the values of the range in the sheet to the CSV array data
    sheet.getRange(startRow, 1, csvArray.length, csvArray[0].length).setValues(csvArray);
  }
}
// Function to import prior leads data from CSV files
function importAllPriorLeads() {
  // Get the folder containing the CSV files by its ID
  var folder = DriveApp.getFolderById('1Bip3rkpQP_hockfdquHhv70SC_PKTscN');
  // Get all CSV files in the folder
  var files = folder.getFilesByType(MimeType.CSV);
  // Get all sheets in the active spreadsheet
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  // Select the 12th sheet (index 11) to import the data
  var sheet = sheets[11];
  // Clear the contents of the sheet before importing new data
  sheet.clearContents();
  
  // Iterate through each CSV file
  while (files.hasNext()) {
    var file = files.next();
    // Get the CSV data as a string
    var csvData = file.getBlob().getDataAsString();
    // Convert the CSV string to a 2D array
    var csvArray = CSVToArray(csvData);
    // Get the starting row for importing data (next empty row)
    var startRow = sheet.getLastRow() + 1;
    // Set the values of the range in the sheet to the CSV array data
    sheet.getRange(startRow, 1, csvArray.length, csvArray[0].length).setValues(csvArray);
  }
}

// Function to import page views data from CSV files
function importAllCSVPageViews() {
  // Get the folder containing the CSV files by its ID
  var folder = DriveApp.getFolderById('1HsVl3PLAXl91X626j8P3TYDU5f-fisVo');
  // Get all CSV files in the folder
  var files = folder.getFilesByType(MimeType.CSV);
  // Get all sheets in the active spreadsheet
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  // Select the 9th sheet (index 8) to import the data
  var sheet = sheets[8];
  // Clear the contents of the sheet before importing new data
  sheet.clearContents();
  
  // Iterate through each CSV file
  while (files.hasNext()) {
    var file = files.next();
    // Get the CSV data as a string
    var csvData = file.getBlob().getDataAsString();
    // Convert the CSV string to a 2D array
    var csvArray = CSVToArray(csvData);
    // Get the starting row for importing data (next empty row + 3)
    var startRow = sheet.getLastRow() + 3;
    // Set the values of the range in the sheet to the CSV array data
    sheet.getRange(startRow, 1, csvArray.length, csvArray[0].length).setValues(csvArray);
  }
}


// Function to import converted leads data from CSV files
function importAllCSVConvertedLeads() {
  // Get the folder containing the CSV files by its ID
  var folder = DriveApp.getFolderById('1B8beCkNpwYehiIR7luS2ObIOh_47iCGu');
  // Get all CSV files in the folder
  var files = folder.getFilesByType(MimeType.CSV);
  // Get all sheets in the active spreadsheet
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  // Select the 14th sheet (index 13) to import the data
  var sheet = sheets[13];
  // Clear the contents of the sheet before importing new data
  sheet.clearContents();
  
  // Iterate through each CSV file
  while (files.hasNext()) {
    var file = files.next();
    // Get the CSV data as a string
    var csvData = file.getBlob().getDataAsString();
    // Convert the CSV string to a 2D array
    var csvArray = CSVToArray(csvData);
    // Get the starting row for importing data (next empty row)
    var startRow = sheet.getLastRow() + 1;
    // Set the values of the range in the sheet to the CSV array data
    sheet.getRange(startRow, 1, csvArray.length, csvArray[0].length).setValues(csvArray);
  }
}



// Function to import master campaigns data from CSV files
function importAllCSVMasterCampaigns() {
  // Get the folder containing the CSV files by its ID
  var folder = DriveApp.getFolderById('1i-Z-1b2nd_k-hw_j-WsS6ppa5--CAj-r');
  // Get all CSV files in the folder
  var files = folder.getFilesByType(MimeType.CSV);
  // Get all sheets in the active spreadsheet
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  // Select the 25th sheet (index 24) to import the data
  var sheet = sheets[24];
  // Clear the contents of the sheet before importing new data
  sheet.clearContents();
  
  // Iterate through each CSV file
  while (files.hasNext()) {
    var file = files.next();
    // Get the CSV data as a string
    var csvData = file.getBlob().getDataAsString();
    // Convert the CSV string to a 2D array
    var csvArray = CSVToArray(csvData);
    // Get the starting row for importing data (next empty row)
    var startRow = sheet.getLastRow() + 1;
    // Set the values of the range in the sheet to the CSV array data
    sheet.getRange(startRow, 1, csvArray.length, csvArray[0].length).setValues(csvArray);
  }
}


// Function to import contacts in campaigns data from CSV files
function importAllCSVContactsInCampaigns() {
  // Get the folder containing the CSV files by its ID
  var folder = DriveApp.getFolderById('1sXhhnAqIjhwq-pFWgRJP6X1Oi7Am5IST');
  // Get all CSV files in the folder
  var files = folder.getFilesByType(MimeType.CSV);
  // Get all sheets in the active spreadsheet
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  // Select the 22nd sheet (index 21) to import the data
  var sheet = sheets[21];
  // Clear the contents of the sheet before importing new data
  sheet.clearContents();
  
  // Iterate through each CSV file
  while (files.hasNext()) {
    var file = files.next();
    // Get the CSV data as a string
    var csvData = file.getBlob().getDataAsString();
    // Convert the CSV string to a 2D array
    var csvArray = CSVToArray(csvData);
    // Get the starting row for importing data (next empty row)
    var startRow = sheet.getLastRow() + 1;
    // Set the values of the range in the sheet to the CSV array data
    sheet.getRange(startRow, 1, csvArray.length, csvArray[0].length).setValues(csvArray);
  }
}


// Function to import leads in campaigns data from CSV files
function importAllCSVLeadsCampaigns() {
  // Get the folder containing the CSV files by its ID
  var folder = DriveApp.getFolderById('1Xy0Dfrx3XCUihSg-TVEiz5q2r2d4XMkH');
  // Get all CSV files in the folder
  var files = folder.getFilesByType(MimeType.CSV);
  // Get all sheets in the active spreadsheet
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  // Select the 27th sheet (index 26) to import the data
  var sheet = sheets[26];
  // Clear the contents of the sheet before importing new data
  sheet.clearContents();
  
  // Iterate through each CSV file
  while (files.hasNext()) {
    var file = files.next();
    // Get the CSV data as a string
    var csvData = file.getBlob().getDataAsString();
    // Convert the CSV string to a 2D array
    var csvArray = CSVToArray(csvData);
    // Get the starting row for importing data (next empty row)
    var startRow = sheet.getLastRow() + 1;
    // Set the values of the range in the sheet to the CSV array data
    sheet.getRange(startRow, 1, csvArray.length, csvArray[0].length).setValues(csvArray);
  }
}



// Helper function to convert CSV string to array
function CSVToArray(strData) {
  return Utilities.parseCsv(strData);
}