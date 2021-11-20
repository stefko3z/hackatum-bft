from flask import Blueprint, Flask, request, jsonify, json, abort, Response
from flask_cors import CORS, cross_origin
import json
import csv
import time
from datetime import datetime, timedelta
import requests

revenue_blueprint = Blueprint('revenue', __name__, url_prefix='/api/revenue')

# Flask setup
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
methods = ('GET', 'POST')


@app.route('/start', methods=methods)
@cross_origin()
def get_revenue_breakdown():
    """product_id | store_id | date | sales | revenue | stock | price | promo_type_1 | promo_bin_1 | 
    promo_type_2 | promo_bin_2 | promo_discount_2 | promo_discount_type_2 """

    # -- Request-Arguments
    requestType = request.args.get("type")
    timestamp = datetime.fromtimestamp(int(request.args.get("timestamp")))

    #"""For testing"""
    #requestType = 'Monthly'
    #timestamp = datetime.date(2017,5,10)

    numberOfDays = 0
    if(requestType == 'daily'):
        numberOfDays = 1
    if(requestType == 'weekly'):
        numberOfDays = 7
    if(requestType == 'monthly'):
        numberOfDays = 31

    # ---- Get results
    result = look_back(timestamp, numberOfDays)
    #Revenue
    revenue_per_product = result['revenue_per_product']
    revenue_per_product_previous_period = result['revenue_per_product_previous_period']
    #PerShop
    revenue_per_shop = result['revenue_per_shop']
    revenue_per_shop_previous_period = result['revenue_per_shop_previous_period']

    # ---- totals
    revenue_total = 0  # -- 1
    for product in revenue_per_product:
        revenue_total = revenue_total + revenue_per_product[product]
    revenue_total_previous_period = 0  # -- 2
    for product in revenue_per_product_previous_period:
        revenue_total_previous_period = revenue_total_previous_period + \
            revenue_per_product_previous_period[product]

    #persentages
    percent_total_now_vs_previous = get_percent(
        revenue_total, revenue_total_previous_period)
    positive = False
    if(percent_total_now_vs_previous >= 0):
        positive = True

    #print("Total Revenue: " + str(revenue_total) + ' and Total Revenue (Previous Period): ' + str(revenue_total_previous_period))
    #print("Total Revenues per shop: " + str(revenue_per_shop) + ' and Revenue per shop (Previous Period): ' + str(revenue_per_shop_previous_period))
    #print("Revenue Persentage: " + str(percent_total_now_vs_previous) + ' positive: ' + str(positive))

    # --- Json
    r = requests.post('localhost:3000/insights', data={
        'type': 'IncomeInsight',
        'time': requestType,
        'positive': positive,
        'percent': percent_total_now_vs_previous,
        'chartPoints_old_current': {revenue_total_previous_period, revenue_total}
    })
    if(r.status_code == 200):
        return jsonify(r.json), 200
    else:
        return jsonify('Bad responce! No Visual Element!'), 500


def look_back(now, time):
    """ Returns relevant data for a curent flexible time period and also for the previous period with same size.
    product_id | store_id | date | sales | revenue | stock | price | promo_type_1 | promo_bin_1 | promo_type_2 | promo_bin_2 | promo_discount_2 | promo_discount_type_2 """

    with open('sales.csv') as csv_sales_data:
        #Time Frame
        subtract = timedelta(time)
        yesterday = now - timedelta(1)
        curent_period_end = yesterday - subtract
        previous_period_yesterday = curent_period_end - timedelta(1)
        previous_period_end = previous_period_yesterday - subtract

        print('Time period: Today is: ' + str(now) + ' Yesterday is: ' + str(yesterday) + ' , and End (Curent P) = ' + str(curent_period_end) +
              '. Previous period starts: ' + str(previous_period_yesterday) + ' and End (Previous P): ' + str(previous_period_end))

        #Stats
        line_count = 0
        revenue_per_product = {}
        revenue_per_shop = {}

        revenue_per_product_previous_period = {}
        revenue_per_shop_previous_period = {}

        csv_reader = csv.reader(csv_sales_data, delimiter=',')
        for row in csv_reader:
            #Determine Curent Date on Row
            row_date = row[2].split('-')
            print(row_date)
            curentDate = datetime.date(
                int(row_date[0]), int(row_date[1]), int(row_date[2]))

            # -- Curent Period
            if(curent_period_end <= curentDate <= yesterday):
                #revenues per product
                if row[0] in revenue_per_product:  # update Rev per Product
                    revenue_per_product[row[0]] = round(
                        float(revenue_per_product[row[0]]) + float(row[4]), 2)
                else:  # New product encoutered
                    revenue_per_product[row[0]] = round(float(row[4]), 2)

                #revenues per shop

                # update Revenue Per Shop (all products)
                if row[1] in revenue_per_shop:
                    revenue_per_shop[row[1]] = round(
                        float(revenue_per_shop[row[1]]) + float(row[4]), 2)
                else:  # New Shop encoutered
                    revenue_per_shop[row[1]] = round(float(row[4]), 2)

            # -- Mirror of previous period
            if(previous_period_end <= curentDate <= previous_period_yesterday):

                if row[0] in revenue_per_product_previous_period:
                    revenue_per_product_previous_period[row[0]] = round(
                        float(revenue_per_product_previous_period[row[0]]) + float(row[4]), 2)
                else:
                    revenue_per_product_previous_period[row[0]] = round(
                        float(row[4]), 2)

                if row[1] in revenue_per_shop_previous_period:
                    revenue_per_shop_previous_period[row[1]] = round(
                        float(revenue_per_shop_previous_period[row[1]]) + float(row[4]), 2)
                else:
                    revenue_per_shop_previous_period[row[1]] = round(
                        float(row[4]), 2)

            #save time
            if(curentDate > now):
                break
            line_count += 1

        # ---- Monitor
        #print("Revenues per product: " + str(revenues_per_product))
        #print("Revenues per Shop: " + str(revenue_per_shop))
        #print('---' + str(revenue_per_product_previous_period))
        #print('Processed ' + str(line_count) + ' lines!')

    out = {'revenue_per_product': revenue_per_product, 'revenue_per_product_previous_period': revenue_per_product_previous_period,
           'revenue_per_shop': revenue_per_shop, 'revenue_per_shop_previous_period': revenue_per_shop_previous_period}
    return out


def get_rows_for_time_interval(now, time):
    return None


def get_percent(current, previous):
    """Used for creating persentage values"""
    if current == previous:
        return 100.0
    try:
        return ((current - previous) / previous) * 100.0
    except ZeroDivisionError:
        return 0


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8100, debug=True)

