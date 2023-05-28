/**
 * This function adds a new row to the current Google Sheet.
 *
 * @OnlyCurrentDoc
 */

function sheetFormatter() {
  
  // get the page view data from the sheet called script_page_view_data 
  var pageViewDataSheet = SpreadsheetApp.getActive().getSheetByName("script_page_view_data");
  
  // get the new lead data from the sheet called new lead data
  var allNewLeadsDataSheet = SpreadsheetApp.getActive().getSheetByName("new lead data");
  
  // get the range of data in the new lead data sheet and set the format to plain text
  allNewLeadsDataSheet.getRange(1,1).setNumberFormat('@STRING@');
  
  // set a variable to work with the data in the reporting sheet called New Leads
  var newLeadReportSheet = SpreadsheetApp.getActive().getSheetByName("New Leads");

  // set a variable to a sheet that we will format the all new leads data in
  var formNewLeadData = SpreadsheetApp.getActive().getSheetByName("all_new_leads_block");
  var clearFormNewLeadData= formNewLeadData.getRange(3,1,1000,10)
  clearFormNewLeadData.clear()
  

  // get the range of the page view data set
  var pageViewDataRange = pageViewDataSheet.getDataRange();
  
  // clear the range starting at row 10, column 1, to row 100, to column 10
  var clearPageViewRange = newLeadReportSheet.getRange(11,1,1000,10);
  clearPageViewRange.clear();
  
  

  // copy the data from the sheet called scripts_page_view_data to the block under page view data in New Leads
  var copyPageViewData = pageViewDataSheet.getRange(1,2,pageViewDataRange.getNumRows(), pageViewDataRange.getNumColumns());

  // set variable to copy over the data from the page view data sheet script_page_view_data
  var pageViewRange = newLeadReportSheet.getRange(10,4, pageViewDataRange.getNumRows(), 6);
  pageViewRange.setNumberFormat('##')
  //var pageViewReport = copyPageViewData.copyTo(pageViewRange);
  
  // build thick border around new data in the report view
  pageViewRange.setBorder(true, true, true, true, false, false, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
  // set the background of the cells with data
  pageViewRange.setBackground("#bfe6f2");

  // find the end of the previous data range to build the next view and add 5 rows
  var endPageViews = pageViewRange.getLastRow()+5;

  // get the data range of the all new leads sheet called new leads data
  var allLeadSourceRange = allNewLeadsDataSheet.getDataRange();
  
  // get the range of data to import with getNumRows able to change the shape of the range based on rows of data
  var newLeadRange = allNewLeadsDataSheet.getRange(2,1,allLeadSourceRange.getNumRows(),8);
  
  // get the range of the format lead data sheet called all_new_leads_block
  var formNewLeadRange = formNewLeadData.getRange(3,1,allLeadSourceRange.getNumRows(),9);

  // copy the new lead data to the sheet called all_new_leads_block with formatting
  var formNewLeadCopy = newLeadRange.copyTo(formNewLeadRange)

  // get the data range of the newly formatted lead data
  var formattedNewLeadBlock = formNewLeadData.getDataRange();
  var formattedNewLeadBlockSection=formNewLeadData.getRange(3,1, formattedNewLeadBlock.getNumRows()-2, formattedNewLeadBlock.getNumColumns());


  // create the section of the report view to import the new leads data
  var newLeadChart = newLeadReportSheet.getRange(endPageViews, 1, formattedNewLeadBlock.getNumRows(), formattedNewLeadBlock.getNumColumns());
  
  
  // set a border around the all leads data range
  formattedNewLeadBlockSection.setBorder(true, true, true, true, false, false, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
  // set background of the all leads data range
  formattedNewLeadBlockSection.setBackground("#bfe6f2");

  // recapture the whole formatted data
  var recapNewLeadBlock = formNewLeadData.getDataRange();
  
  // copy the newly formatted leads data to the report view under page views
  var allLeadsView = recapNewLeadBlock.copyTo(newLeadChart);

  // code converted leads to prior leads sheet
  // get a variable for the converted leads sheet
  var convertedLeadsSheet = SpreadsheetApp.getActive().getSheetByName("lead_converted_all_data");
  // variable for the prior leads sheet
  var priorLeadSheet = SpreadsheetApp.getActive().getSheetByName("prior leads");
  // get full data range of the lead_converted_all_data sheet
  var convertedLeadRange = convertedLeadsSheet.getDataRange();
  // create a range of the data for prior leads in the prior leads sheet
  var convertedLeadReportBlock = priorLeadSheet.getRange(10,1,convertedLeadRange.getNumRows(),4);
  // create a range to clear the formatting on the prior leads sheet
  var clearRangePriorLeads = priorLeadSheet.getRange(10,1,300,15);
  // clears all formatting
  clearRangePriorLeads.clearFormat();
  
  // set some variables to copy the formatting to the prior lead sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // this sheet is called format_key
  var source = ss.getSheets()[15];
  // this sheet is called prior leads
  var destination = ss.getSheets()[1];

  // formatKeySheet variable for the format_key sheet this is redundant
  var formatKeySheet = SpreadsheetApp.getActive().getSheetByName("format_key");
  // range that contains the formatting in format_key sheet
  var formatCopy = formatKeySheet.getRange(8,1,300,15);
  // restores formatting to the prior leads sheet from A8:K100
  formatCopy.copyFormatToRange(destination,1,11,10,300)
  var setDateFormatPriorLeadData = priorLeadSheet.getRange("I:J");
  setDateFormatPriorLeadData.setNumberFormat("MM/dd/yyyy");
  // build a border around the prior leads converted lead sheet stored in convertedLeadRange
  convertedLeadReportBlock.setBorder(true, true, true, true, false, false, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
  // set background for the converted lead block
  convertedLeadReportBlock.setBackground("#bfe6f2");

  //get the data sitting in the prior leads block
  var priorLeadBlock = ss.getSheets()[16];
  //get the data range of prior lead block
  var priorLeadRange = priorLeadBlock.getDataRange();
  //set the variable block in prior leads sheet
  var priorLeadBorderRange = priorLeadSheet.getRange(10,5, priorLeadRange.getNumRows(), priorLeadRange.getNumColumns());
  // build border around the prior lead block
  priorLeadBorderRange.setBorder(true, true, true, true, false, false, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
  // set background for the converted lead block
  priorLeadBorderRange.setBackground("#bfe6f2");
  //priorLeadBlock.getPageSetup().setHiddenGridlines(true);
  // ######################
   // set some variables to copy the formatting to the prior lead sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // this sheet is called format_key
  var source = ss.getSheets()[23];
  // this sheet is called prior leads
  var destination = ss.getSheets()[2];
  var clearDestination = destination.getRange(34,1,199,9);
  clearDestination.clearFormat();
  // formatKeySheet variable for the format_key sheet this is redundant
  var formatKeySheet = SpreadsheetApp.getActive().getSheetByName("format_key");
  // range that contains the formatting in format_key sheet
  var formatCopy = formatKeySheet.getRange(8,1,100,15);
  // restores formatting to the prior leads sheet from A8:K100
  formatCopy.copyFormatToRange(destination,1,9,34,199)
  // get size of data query for contacts in campaign
  var campaignContactRange = source.getDataRange();
  // set variable to range of data from contacts in campaign sheet
  var natCampRangeContacts=destination.getRange(34,1,campaignContactRange.getNumRows(), campaignContactRange.getNumColumns())
  
  // build a border around the prior leads converted lead sheet stored in convertedLeadRange
  natCampRangeContacts.setBorder(true, true, true, true, false, false, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
  // set background for the converted lead block
  natCampRangeContacts.setBackground("#bfe6f2");

  //var endContactRange=natCampRangeContacts.getLastRow()+5

    // set the lead source sheet for local campaign leads
  var leadSource = ss.getSheets()[28];
  var leadRange = leadSource.getDataRange();
  var locCampRangeLeads=destination.getRange(34,7,leadRange.getNumRows()-2,leadRange.getNumColumns());
  locCampRangeLeads.setBorder(true, true, true, true, false, false, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
  locCampRangeLeads.setBackground("#bfe6f2");
  // ##############################

   // set some variables to copy the formatting to the prior lead sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // this sheet is called format_key
  var source = ss.getSheets()[25];
  // this sheet is called prior leads
  var destination = ss.getSheets()[3];
  var clearDestination = destination.getRange(34,1,500,9);
  clearDestination.clearFormat();
  // formatKeySheet variable for the format_key sheet this is redundant
  var formatKeySheet = SpreadsheetApp.getActive().getSheetByName("format_key");
  // range that contains the formatting in format_key sheet
  var formatCopy = formatKeySheet.getRange(8,1,100,15);
  // restores formatting to the prior leads sheet from A8:K100
  formatCopy.copyFormatToRange(destination,1,20,34,500)
  // get size of data query for contacts in campaign
  var campaignLocalContactRange = source.getDataRange();
  // set variable to range of data from contacts in campaign sheet
  var locCampRangeContacts=destination.getRange(34,1,campaignLocalContactRange.getNumRows(), campaignLocalContactRange.getNumColumns())
  
  // build a border around the prior leads converted lead sheet stored in convertedLeadRange
  locCampRangeContacts.setBorder(true, true, true, true, false, false, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
  // set background for the converted lead block
  locCampRangeContacts.setBackground("#bfe6f2");

  //var endContactRange=locCampRangeContacts.getLastRow()+5

  // set the lead source sheet for local campaign leads
  var leadSource = ss.getSheets()[27];
  var leadRange = leadSource.getDataRange();
  var locCampRangeLeads=destination.getRange(34,7,leadRange.getNumRows()-2,leadRange.getNumColumns());
  locCampRangeLeads.setBorder(true, true, true, true, false, false, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
  locCampRangeLeads.setBackground("#bfe6f2");


}
