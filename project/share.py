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
import random

share_market = Blueprint('share_market', __name__)

@share_market.route('/share/unitedstates-stockexchange/intraday-data/',methods=['GET','POST'])
@login_required
def shares():
    return render_template('/share-market/share/us/share-intraday.html',user=current_user)

indiaDayKeys=[]
indiaDayValues=[]
indiaFinal=[]


canadaDayKeys=[]
canadaDayValues=[]
canadaFinal=[]


UKDayKeys=[]
UKDayValues=[]
UKFinal=[]

facts=[
    {'fact':'McDonald’s once made bubblegum-flavored broccoli'},
    {'fact':'Some fungi create zombies, then control their minds'},
    {'fact':'The first oranges weren’t orange'},
    {'fact':'There’s only one letter that doesn’t appear in any U.S. state name'},
    {'fact':'Johnny Appleseed’s fruits weren’t for eating'},
    {'fact':'Scotland has 421 words for “snow”'},
    {'fact':'Samsung tests phone durability with a butt-shaped robot'},
    {'fact':'The “Windy City” name has nothing to do with Chicago weather'},
    {'fact':'Armadillo shells are bulletproof'},
    {'fact':'The longest English word is 189,819 letters long'}
]

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

@share_market.route('/share/india-stockexchange/monthly-data/',methods=['GET','POST'])
@login_required
def IndiaMonthlyShares():
    
    return render_template('/share-market/share/india/indiaMonthly.html',user=current_user)

@share_market.route('/share/uk-stockexchange/weekly-data/',methods=['GET','POST'])
@login_required
def UKWeeklyShares():
    
    return render_template('/share-market/share/uk/ukweekly.html',user=current_user)


@share_market.route('/share/uk-stockexchange/monthly-data/',methods=['GET','POST'])
@login_required
def UKMonthlyShares():
    
    return render_template('/share-market/share/uk/ukmonthly.html',user=current_user)





@share_market.route('/share/india-stockexchange/weekly-data/',methods=['GET','POST'])
@login_required
def IndiaWeeklyShares():
    
    return render_template('/share-market/share/india/indiaWeekly.html',user=current_user)


@share_market.route('/share/uk-stockexchange/',methods=['GET','POST'])
@login_required
def UKShares():
    
    return render_template('/share-market/intros/uk-Intro.html',user=current_user)


@share_market.route('/share/canada-stockexchange/',methods=['GET','POST'])
@login_required
def CanadaShares():
    
    return render_template('/share-market/intros/canadaIntro.html',user=current_user)

@share_market.route('/share/india-stockexchange/daily-data/',methods=['GET','POST'])
@login_required
def IndiaDailyShares():
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
            values.append(float(singledata['1. open']))
            values.append(float(singledata['2. high']))
            values.append(float(singledata['3. low']))
            values.append(float(singledata['4. close']))
            req={}
            req['y']=values
            indiaFinal.append(req)

        i=0
        for data in indiaFinal:   
            data['x']=indiaDayKeys[i]
            i=i+1



        pprint(indiaFinal)
        return render_template('/share-market/share/india/indiaDay.html',user=current_user,final_data=indiaFinal)


    num=random.randint(0,9)
    fact=facts[num]['fact']

    return render_template('/share-market/share/india/indiaDay.html',user=current_user,fact=fact)



@share_market.route('/share/canada-stockexchange/daily-data/',methods=['GET','POST'])
@login_required
def CanadaDailyShares():
    if request.method == 'POST':
        code= request.form['Canadaticker']
        up=code.upper()
        print(up)
        api='https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='+up+'.TRT&outputsize=full&apikey=WH75LQJ4BD7S15TO'
        raw=requests.get(api)
        raw_data=raw.json()
        first_filter=raw_data['Time Series (Daily)']
        first_keys=first_filter.keys()
        print(len(first_keys))
        for data in first_keys:
            canadaDayKeys.append(data)

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
            canadaFinal.append(req)

        i=0
        for data in canadaFinal:   
            data['x']=canadaDayKeys[i]
            i=i+1



        pprint(indiaFinal)
        return render_template('/share-market/share/canada/canadadaily.html',user=current_user,final_data=canadaFinal)


    num=random.randint(0,9)
    fact=facts[num]['fact']

    return render_template('/share-market/share/canada/canadadaily.html',user=current_user,fact=fact)

@share_market.route('/share/uk-stockexchange/daily-data/',methods=['GET','POST'])
@login_required
def UKDailyShares():
    if request.method == 'POST':
        codei= request.form['UKticker']
        upi=codei.upper()
        print(upi)
        api='https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='+upi+'.LON&outputsize=full&apikey=WH75LQJ4BD7S15TO'
        raw=requests.get(api)
        raw_data=raw.json()
        first_filter=raw_data['Time Series (Daily)']
        first_keys=first_filter.keys()
        print(len(first_keys))
        for data in first_keys:
            UKDayKeys.append(data)

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
            UKFinal.append(req)

        i=0
        for data in UKFinal:   
            data['x']=UKDayKeys[i]
            i=i+1



        pprint(indiaFinal)
        return render_template('/share-market/share/uk/ukdaily.html',user=current_user,final_data=UKFinal)


    num=random.randint(0,9)
    fact=facts[num]['fact']

    return render_template('/share-market/share/uk/ukdaily.html',user=current_user,fact=fact)
    