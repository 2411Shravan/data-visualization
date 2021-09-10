from flask import Flask
from flask import Blueprint
from flask import redirect
from flask import render_template
from flask_login import login_required
from flask_login import current_user
from pprint import pprint
from flask import request
import requests
from pprint import pprint

share_market = Blueprint('share_market', __name__)

@share_market.route('/share/unitedstates-stockexchange/intraday-data/',methods=['GET','POST'])
@login_required
def shares():
    return render_template('/share-market/share/us/share-intraday.html',user=current_user)

indiaDayKeys=[];
indiaDayValues=[];
indiaFinal=[];


@share_market.route('/share/unitedstates-stockexchange/',methods=['GET','POST'])
@login_required
def USshares():
   
    return render_template('/share-market/intros/usIntro.html',user=current_user)


@share_market.route('/share/unitedstates-stockexchange/daily-data/',methods=['GET','POST'])
@login_required
def USdailydata():
    
    return render_template('/share-market/share/us/share-dialy.html',user=current_user)


@share_market.route('/share/unitedstates-stockexchange/weekly-data/',methods=['GET','POST'])
@login_required
def USweeklydata():
    
    return render_template('/share-market/share/us/share-weekly.html',user=current_user)


@share_market.route('/share/unitedstates-stockexchange/monthly-data/',methods=['GET','POST'])
@login_required
def USmonthlydata():

    return render_template('/share-market/share/us/share-monthly.html',user=current_user)


@share_market.route('/share/india-stockexchange/',methods=['GET','POST'])
@login_required
def IndiaShares():
    
    return render_template('/share-market/intros/IndiaIntro.html',user=current_user)



@share_market.route('/share/india-stockexchange/daily-data/',methods=['GET','POST'])
@login_required
def IndiaIntradayShares():
    if request.method == 'POST':
        code= request.form['IndiantickerI']
        up=code.upper()
        print(up)
        api='https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='+up+'.BSE&outputsize=full&apikey=WH75LQJ4BD7S15TO'
        raw=requests.get(api)
        raw_data=raw.json()
        first_filter=raw_data['Time Series (Daily)']
        first_keys=first_filter.keys()
        print(len(first_keys))
        for data in first_keys:
            indiaDayKeys.append(data)

        first_values=first_filter.values()
        print(len(first_values))

        for singledata in first_values:
            values=[];
            values.append(singledata['1. open'])
            values.append(singledata['2. high'])
            values.append(singledata['3. low'])
            values.append(singledata['4. close'])
            req={}
            req['y']=values
            indiaFinal.append(req)


        for data in indiaDayKeys:
            res={}
            res['x']=data
            indiaFinal.append(res)





        pprint(indiaFinal)
    return render_template('/share-market/share/india/indiaDay.html',user=current_user)
    