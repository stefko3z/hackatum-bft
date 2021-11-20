import matplotlib
import statsmodels.api as sm
import pandas as pd
from flask import Blueprint, Flask, request, jsonify, json, abort, Response
from flask_cors import CORS, cross_origin
import json
import csv
import time
from datetime import datetime, timedelta, date
import requests

#----------
import warnings
import itertools
import numpy as np
import matplotlib.pyplot as plt
warnings.filterwarnings("ignore")
plt.style.use('fivethirtyeight')
matplotlib.rcParams['axes.labelsize'] = 14
matplotlib.rcParams['xtick.labelsize'] = 12
matplotlib.rcParams['ytick.labelsize'] = 12
matplotlib.rcParams['text.color'] = 'G'
#----------


revenue_blueprint = Blueprint('forcast', __name__, url_prefix='/api/forcast')
# Flask setup
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
methods = ('GET', 'POST')


@app.route('/start', methods=methods)
@cross_origin()
def get_time_series_forcast():
    df = pd.read_csv()
    
    return None