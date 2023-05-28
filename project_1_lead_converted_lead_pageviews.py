from simple_salesforce import Salesforce
import requests
import pandas as pd
from io import StringIO
import ast
import numpy as np
import os
import json
import collections
from datetime import datetime
import jwt, time, requests
import xml.etree.ElementTree as ET
from xml.etree.cElementTree import parse, dump
from dash import Dash, dcc, html
import plotly.express as px
# for building bar chart graphs
import matplotlib as mpl
import matplotlib.pyplot as plt
import numpy as np
import matplotlib.ticker as mticker
from urllib.request import urlopen
import dataframe_image as dfi
import mpld3
# for wrapping text
import textwrap
from textwrap import wrap
###################################### PDF CREATOR
import pdfkit

############### SALESFORCE LOGIN INFO ##################
sf = Salesforce(username='',password='', security_token='')

################ PARDOT API #####################

# *** Update these values to match your configuration ***
IS_SANDBOX = False
#use openssl to generate a security certificate place filename in KEY_FILE= '[FILENAME]'
KEY_FILE = ''
# connected app user details - grab from connected app inside of salesforce
ISSUER = ''
# connected app username in SUBJECT = '[USERNAME]'
SUBJECT = ''
# salesforce business unit ID
BUSINESS_UNIT_ID = ''
# pardot request url
pardotUrl = 'https://pi.pardot.com/api/account/version/4/do/read?format=json'

# check if using sandbox or production
DOMAIN = 'test' if IS_SANDBOX else 'login'
print('Loading private key…')

# read security certificate
with open(KEY_FILE) as fd:
    private_key = fd.read()
print('Generating signed JWT assertion…')

# build access 
claim = {
    'iss': ISSUER,
    'exp': int(time.time()) + 604800,
    'aud': 'https://{}.salesforce.com'.format(DOMAIN),
    'sub': SUBJECT,
}
assertion = jwt.encode(claim, private_key, algorithm='RS256', headers={'alg':'RS256'}).encode('utf8')
print('assertion=%s' % assertion)
print('Making OAuth request…')
loginResponse = requests.post('https://{}.salesforce.com/services/oauth2/token'.format(DOMAIN), data = {
    'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    'assertion': assertion,
})
# was login successful?
print('Status:', loginResponse.status_code)
print(loginResponse.json())
# store access token from login
accessToken = loginResponse.json().get('access_token')

# make a request to pardot
pReqHeaders = {
    'Authorization': 'Bearer '+ accessToken,
    'Pardot-Business-Unit-Id': BUSINESS_UNIT_ID
     
}
print('Making Pardot Account API request…')

####################### GET PROSPECT DATA ######################

# variable to iterate by
PC_list=['7953']

# create a list to hold pardot prospect ID's without any pageviews.
leads_with_no_pageviews=[]

# initiate a data frame to store new leads
nleads=pd.DataFrame({"No data":["No data"]})

# loop through the pc list to check for new leads
for pc in PC_list:
    # initiate the lead's url
    lead_url=[]
    
    # initiate the lead's name
    lead_name=[]
    
    # initiate the lead's email
    lead_email=[]
    
    # initiate the lead's phone number
    lead_phone=[]
    
    # initiate the lead's company
    lead_company=[]
    
    # initiate the lead's segment
    lead_customer_segment=[]
    
    # initiate the lead's assignment date
    lead_date_assigned=[]
    
    # initiate the lead's product data
    lead_product=[]
    
    # initiate the lead's assigned profit center
    lead_pc=[]
    
    # initiate the leads's pardot ID 
    lead_pardot_id=[]
    
    # initiate the lead's page view list of dataframes
    lead_page_view_dataframes=[]
    
    # initate the new leads list of dataframes
    new_leads_dataframes=[]
    
    # initate the new leads list of pageview dataframes
    page_view_dataframes=[]
    
    # initate the leads last activity
    last_activity=[]
    
    # SOQL query to address the data needed. The variables above represent initiations for the iterations
    leads = sf.query_all("SELECT Name, Email, Phone, Company, Customer_Segment__c, Date_Assigned_to_Team__c, Product__c, Assigned_PC__c, pi__url__c FROM Lead WHERE pi__created_date__c = LAST_N_MONTHS:1 AND Assigned_PC__c='" + str(pc) +"' AND Property_Owner_Lead__c = False")
    
    # can be removed from script
    print(leads["records"])
           
    # iterate through all new lead records
    for i in leads["records"]:
        lead_url.append(i["attributes"]["url"])
        lead_name.append(i["Name"])
        lead_email.append(i["Email"])
        lead_phone.append(i["Phone"])
        lead_company.append(i["Company"])
        lead_customer_segment.append(i["Customer_Segment__c"])
        lead_date_assigned.append(i["Date_Assigned_to_Team__c"])
        lead_product.append(i["Product__c"])
        lead_pc.append(i["Assigned_PC__c"])
        
        # split off the portion of the pardot url that does not contain the prospect id
        lead_pardot_id_full_url = i["pi__url__c"].split('http://pi.pardot.com/prospect/read?id=')
        
        # append the prospect id for use in the script
        lead_pardot_id.append(lead_pardot_id_full_url[1])
        
        # sleep for 1 second
        time.sleep(1)
        
        # print the prospect id
        print(lead_pardot_id)
        
############################## LIST ALL NEW LEADS WITH REQUIRED INFO ############

        # initiate the last page view of the lead 
        last_page_view=[]
        
        # initiate the list to store prospect IDs that have been iterated through
        looped_ids=[]
        

        # iterate through pardot lead id's
        for lid in lead_pardot_id:
            # if the prospect id is not in the alread iterated through ids
            if lid not in looped_ids:
                # add the prospect id to the looped id list
                looped_ids.append(lid)
                # make a request to pardot using the prospect ID
                visit_query = "https://pi.pardot.com/api/visit/version/4/do/query?prospect_ids="+str(lid)+"&visitor_page_view"
                # retrieve the data from the prospect ID as .xml
                prospect_visit_dataResponse = requests.get(url=visit_query, headers=pReqHeaders).text  
                # create an .xml file to store the prospect data in
                file = open(".\\lead_page_view\\"+str(pc)+"\\"+lid+".xml", "w", encoding="utf-8")
                # write the data
                file.write(prospect_visit_dataResponse)
                # close the file
                file.close
                
                # get current lead name
                current_lead_name=str(i["Name"])
                
                # get current lead company
                current_lead_company=str(i["Company"])
                
                # get current lead email
                current_lead_email=str(i["Email"])
                
                # print the results of the above three variables
                print(current_lead_name + " , " + current_lead_company + " , " + current_lead_email)    
                
                # enter a sleep period to give the api time to process.
                time.sleep(2)
            
            
                # parse the xml file that is generated from requests.get().text        
                root = ET.fromstring(prospect_visit_dataResponse)
                
                # initiate the urls list
                urls=[]
                
                # initiate the counter list
                urls_count=[]
                
                # print the root of the xml file
                print(root)
                
                # extract last activity date
                # initiate the last page view variable to none
                last_visitor_page_view_at = None
                # iterate through the xml file
                for element in root.iter():
                    # find the last page view element
                    if element.tag == 'last_visitor_page_view_at':
                        # store the data in the last visitor page view variable
                        last_visitor_page_view_at = element.text
                # if there is no last page view activity set last visitor page view variable to "none".        
                if last_visitor_page_view_at is None:
                    # set the variable if none
                    last_visitor_page_view_at = "none"  


      
                # append the last visitor page view to last_activity list    
                last_activity.append(last_visitor_page_view_at)
                
                # extract page view urls iterate through the xml file for 'url'
                for k in root.iter('url'):
                    # when a url is found store it in the urls list
                    urls.append(k.text)
        
                # get a count of equal page views
                # initiate the dictionary for page views
                page_view_count ={}
                # loop through urls in url list
                for j in set(urls):
                    # when a url is the same it will count the url (1, 2, 3, 6, etc.)
                    page_view_count[j]=urls.count(j)
                
                # create a data frame to store the lead page view data
                pv=pd.DataFrame({
                    # store the lead's name
                    "Lead Name" : current_lead_name,
                    # store the url path
                    "URLs" :page_view_count.keys(),
                    # store the count of urls page views
                    "Visits" : page_view_count.values()})
            
                # sort values in dataframe by ascending value
                pv_sort = pv.sort_values(by='Visits', ascending=True)
                # drop the index
                pv_sort_reindexed = pv_sort.reset_index(drop=True)
                # append the dataframe to a list
                lead_page_view_dataframes.append(pv) 

#############################TURN PAGE VIEW INTO CSV FOR USE IN DATA STUDIO    
        
                #wait 1 second  
                time.sleep(1)
                
                #print the length of urls for visual check
                print(len(urls))
                
                # if there are no page views then remove the lead id from the loop
                if len(urls) != 0:
                    # set the file path to save page visit files to.
                    file_path_string ="./lead_page_view/" +str(pc) +"/" + str(lid) +".csv"
                    # save sorted page visit data to .csv for use in report
                    pv_sort_reindexed.to_csv(file_path_string, encoding="utf-8", index=False)
                
                # create a new lead dataframe for storing data    
                nleads=pd.DataFrame({
                        "Name" : lead_name,
                        "Email": lead_email,
                        "Phone": lead_phone,
                        "Company" : lead_company,
                        "Customer Segment" : lead_customer_segment,
                        "Assigned Date" : lead_date_assigned,
                        "Product" : lead_product,
                        "Last Activity" : last_activity
                            })
                
                
                # remove the prospect id from the list of id's to iterate through
                lead_pardot_id.remove(lid)
        # print the data frame(s)  
        print(nleads)  

# Generate a list of all new leads .csv file for use in google sheets                   
nlead_file_path_string ="./lead_page_view/" +str(pc) +"/" + "lead_data.csv"
# Save the data as a .csv file
nleads.to_csv(nlead_file_path_string, encoding="utf-8", index=False)    