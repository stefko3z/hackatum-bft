import json
import csv
import time
from datetime import datetime, timedelta, date
import requests

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy.signal import argrelextrema

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
                curent_week = {}
                
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
    #for product in weeks[1]:
        #print('Product: ' + str(product) + ' Demand:' + str(weeks[1][product]))
    return weeks

if __name__ == "__main__":
    week = get_data_byWeekly_sales_perProduct()
    print('asd ' + str(type(week)))
    productX_data = {}
    
    string_Products = ''
    for products in week[1]: 
        string_Products = string_Products + products + '; '

    print('Products list: ' + string_Products)
    
    for product in string_Products.split('; '):   
        print("------------ Product "+ str(product) + " ----------- ")
        for counter in week:    
            print( '>>>>>> Week <<<<<<<: ' + str(counter) ) 
            try:
                print(week[counter][product])
                if product in productX_data:
                    productX_data[product] = str(
                        productX_data[product]) + '; ' + str(week[counter][product])
                else:
                    productX_data[product] = str(week[counter][product])
            except KeyError as e:
                if product in productX_data:
                    productX_data[product] = str(
                        productX_data[product]) + '; ' + str(0)
                else:
                    productX_data[product] = 0

            
            #productX_data.update( week[counter]['P0438']) 
    count = 0
    for prod in productX_data:
        print('---> ' + prod + '---> ' + productX_data[prod])
        print(" ")
        integer_map = map(int, productX_data[prod].split('; '))
        integer_list = list(integer_map)

        x_axis = len(productX_data[prod])
        df = pd.DataFrame({'X': x_axis, 'Y': integer_list})
        ax = df.plot.bar(x='X', y='Y', rot=0)
        plt.ylabel('Sold quantity')
        #plt.legend(loc = 3)
        #plt.show()

        numpy_array = np.array(integer_list)
        # for local maxima
        Maximas = argrelextrema(numpy_array, np.greater)
        
        # for local minima
        Minimas = argrelextrema(numpy_array, np.less)


        """Future work: Analize the positions of the Min/Max values."""

        print('Local Minimas: ' + str(Minimas) + ' . Local Maximas: ' + str(Maximas))
        if(count == 2):
            break
        count +=1