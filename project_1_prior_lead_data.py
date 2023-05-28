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

# initiate the prior lead's url
prior_lead_url=[]

# initiate the prior lead's name
prior_lead_name=[]

# initiate the prior lead's email
prior_lead_email=[]

# initiate the prior lead's created date
prior_lead_created_date=[]

# initiate the prior lead's company
prior_lead_company=[]

# initiate the prior lead's segment
prior_lead_customer_segment=[]

# initiate the prior lead's assignment date
prior_lead_date_assigned=[]

# initiate the prior lead's product interest
prior_lead_product=[]

# initiate the prior lead's profit center
prior_lead_pc=[]

# initiate the prior lead's prospect id
prior_lead_pardot_id=[]

# initiate the prior lead's list to store dataframes
prior_leads_dataframes=[]

# initiate the contacts list
contacts=[]

# initiate the converted leads list
converted_leads=[]

# initiate a list to store contact dataframes
contact_dataframe=[]

# initiate a list to store converted leads
converted_leads_dataframe=[]

# initiate a list for when prior lead was created
pl_created=[]

# iterate through the profit center for prior leads
for pc in PC_list:
    
    # SOQL query for obtaining prior lead data
    prior_leads = sf.query_all("SELECT Name, Email, pi__created_date__c, Company, Customer_Segment__c, Date_Assigned_to_Team__c, Product__c, Assigned_PC__c, pi__url__c FROM Lead WHERE Property_Owner_Lead__c = FALSE AND Assigned_PC__c='" + str(pc) +"'")
    # iterate through all the prior lead records
    for i in prior_leads["records"]:
        # push data to respective lists
        prior_lead_url.append(i["attributes"]["url"])
        prior_lead_name.append(i["Name"])
        prior_lead_email.append(i["Email"])
        prior_lead_created_date.append(i["pi__created_date__c"])
        prior_lead_company.append(i["Company"])
        prior_lead_customer_segment.append(i["Customer_Segment__c"])
        prior_lead_date_assigned.append(i["Date_Assigned_to_Team__c"])
        prior_lead_product.append(i["Product__c"])
        prior_lead_pc.append(i["Assigned_PC__c"])
        prior_lead_pardot_id_full_url = i["pi__url__c"].split('http://pi.pardot.com/prospect/read?id=')
        prior_lead_pardot_id.append(prior_lead_pardot_id_full_url[1])
    
    # iterate through the prior lead created date
    for i in prior_lead_created_date:
        # pull out the date/time information and store it in datei
        datei=i[0:10]
        # append the datei to the prior lead created list
        pl_created.append(datei)
    
    # create a data frame for the prior leads    
    plead=pd.DataFrame({
            "Name" : prior_lead_name,
            "Email" : prior_lead_email,
            "Created At" : pl_created,
            "Company" : prior_lead_company,
            "Customer Segment" : prior_lead_customer_segment,
            "Assigned Date" : prior_lead_date_assigned,
            "Product" : prior_lead_product
            
                        })
    # append the dataframe to the prior leads dataframe list
    prior_leads_dataframes.append(plead)
    
    
    # SOQL query for grabbing contacts ( a contact is a prior lead who became a customer)    
    contact_query = sf.query_all("SELECT Email FROM Contact WHERE Assigned_PC__c='" + str(pc) +"'")
    # iterate through the query to retrieve contact emails
    for i in contact_query["records"]:
        # append the email to the contacts list
        contacts.append(i["Email"])
    # iterate through the prior leads email list
    for i in prior_lead_email:
        # if an email in prior leads is also an email in contacts then assume a conversion
        if i in contacts: 
            # append the converted lead to a the converted_leads list
            converted_leads.append(i)
    # create a data frame to store the converted leads        
    converted_contacts = pd.DataFrame({
        "Contact Email" : converted_leads
    })
    converted_leads_dataframe.append(converted_contacts)            
    
# for each dataframe stored in the plead list
for plead in prior_leads_dataframes:
    # display the dataframe
    pd.options.display.max_columns = 10

# build a path to store the prior lead data .csv file    
prior_lead_file_path_string ="./lead_page_view/" +str(pc) +"/" + "prior_lead_data.csv"

# convert the dataframe to a .csv file and store it at the path
plead.to_csv(prior_lead_file_path_string, encoding="utf-8", index=False)  

# build a path to store the converted leads data .csv file
converted_contact_file_path_string ="./lead_page_view/" +str(pc) +"/" + "converted_lead_data.csv"

# convert the dataframe to a .csv file and store it at the path
converted_contacts.to_csv(converted_contact_file_path_string, encoding="utf-8", index=False)  


