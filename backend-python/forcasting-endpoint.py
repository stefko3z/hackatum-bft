import json
import csv
import time
from datetime import datetime, timedelta, date
import requests


def get_data_byWeekly_sales_perProduct():
    line_count = 0
    with open('sales.csv') as csv_sales_data:
        #Time Frame
        start = datetime(year= 2017,month = 1, day =2)
        addSeven = timedelta(7)
        end_period = start + addSeven - timedelta(1)

        

        # a list of weeks
            #every week had a dictionary of Products
                # each product had a # sold 
        weeks = {}
        curent_week = {}
        counter = 1

        csv_reader = csv.reader(csv_sales_data, delimiter=',')
        for row in csv_reader:
            if line_count == 0:          
                line_count += 1
                continue
            
            row_date = row[2].split('-')
            curentDate = datetime(int(row_date[0]), int(row_date[1]), int(row_date[2]))

            if(curentDate >= end_period):
                weeks[counter] = curent_week
                counter +=1
                end_period = end_period + addSeven
                
            else:
                if row[0] in curent_week:  # update Rev per Product
                    if(row[3]==''):
                        continue
                    curent_week[row[0]] = curent_week[row[0]] + int(round(float(row[3])))
                    
                else:  # New product encoutered
                    #print('-----' + str(row[3]))
                    if(row[3]==''):
                        continue
                    if(int(round(float(row[3]))) == 0):
                        continue
                    curent_week[row[0]] = int(round(float(row[3])))
 
                
            line_count+=1

    #print('Weeks: ' + str(weeks))
    print('Start of Period: ' + str(start) +
          ' End of Period: ' + str(end_period))
    for product in weeks[1]:
        print('Product: ' + str(product) + ' Demand:' + str(weeks[1][product]))
    return None

if __name__ == "__main__":
   get_data_byWeekly_sales_perProduct()