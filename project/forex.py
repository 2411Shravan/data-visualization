from flask import Flask
from flask import Blueprint
from flask import redirect
from flask import render_template
from flask_login import login_required
from flask_login import current_user
from pprint import pprint
from flask import request
from flask import url_for
import requests
from pprint import pprint
import random

forex_data = Blueprint('forex_data', __name__)



@forex_data.route('/forex/exchanges/',methods=['GET','POST'])
@login_required
def Latestmutual():
    if request.method == 'POST':
        send='name is string'
        data=[]
        from_curr=request.form['fromCurrName']
        to_curr=request.form['toCurrName']
        api='https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency='+from_curr.upper()+'&to_currency='+to_curr.upper()+'&apikey=WH75LQJ4BD7S15TO'
        raw=requests.get(api)
        raw_data=raw.json()
        print(raw_data)
        rawdata=raw_data['Realtime Currency Exchange Rate']
        data.append(rawdata['5. Exchange Rate'])
        data.append(rawdata['9. Ask Price'])
        data.append(rawdata['8. Bid Price'])
        bid=rawdata['8. Bid Price']
        ask=rawdata['9. Ask Price']
        currName=rawdata['2. From_Currency Name']
        currname1=rawdata['4. To_Currency Name']
        exrate=rawdata['5. Exchange Rate']

        return render_template('/forex/exchange.html',user=current_user,bid=bid,ask=ask,exrate=exrate,currName=currName,currname1=currname1,data=data,send=send)
    return render_template('/forex/exchange.html',user=current_user)


germanDayKeys=[]
germanFinal=[]

@forex_data.route('/forex/intraday-rates/',methods=['GET','POST'])
@login_required
def IntradayExchange():
    if request.method == 'POST':
        send='name is string'
        data=[]
        from_curr=request.form['fromCurrName']
        to_curr=request.form['toCurrName']
        api='https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol='+from_curr.upper()+'&to_symbol='+to_curr.upper()+'&interval=5min&apikey=WH75LQJ4BD7S15TO'
        raw=requests.get(api)
        raw_data=raw.json()
        pprint(raw_data)
        first_filter=raw_data['Time Series FX (5min)']
        first_keys=first_filter.keys()
        print(len(first_keys))
        for data in first_keys:
            germanDayKeys.append(data)

        first_values=first_filter.values()
        print(len(first_values))
        for singledata in first_values:
            values=[];
            values.append(float(singledata['1. open']))
            values.append(float(singledata['2. high']))
            values.append(float(singledata['3. low']))
            values.append(float(singledata['4. close']))
            req={}
            req['y']=values
            germanFinal.append(req)

        i=0
        for data in germanFinal:   
            data['x']=germanDayKeys[i]
            i=i+1
        return render_template('/forex/intraday.html',user=current_user,dataCandle=germanFinal)
    return render_template('/forex/intraday.html',user=current_user)