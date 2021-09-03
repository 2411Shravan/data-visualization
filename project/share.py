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
    # print("Hello world")
    # if request.method == 'POST':
    #     # opendata=[]
    #     # close=[]
    #     # high=[]
    #     # low=[]
    #     fulldata=[]
    #     data_keys=[]
    #     code=request.form['ticker']
    #     # print(code)
    #     # url='https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+code+'&interval=5min&apikey=WH75LQJ4BD7S15TO'
    #     # r=requests.get(url)
    #     # s=r.json()
    #     # datas=s["Time Series (5min)"]
        
    #     # menus=[]
    #     # for data in datas.values():
    #     #     # print(data['1. open'])
    #     #     temp=[]
    #     #     a_dict={}
    #     #     temp.append(float(data['1. open']))
    #     #     temp.append(float(data['2. high']))
    #     #     temp.append(float(data['3. low']))
    #     #     temp.append(float(data['4. close']))
    #     #     a_dict['y']=temp
    #     #     fulldata.append(a_dict)
    #     #     # print(i)
    #     # for i in datas.keys():
    #     #     data_keys.append(i)

    #     # i=0
    #     # for fd in fulldata:
    #     #     fd['x']=data_keys[i]
    #     #     i=i+1

    #     # for fd in fulldata:
    #     #     print(fd)    
    #     return render_template('/share-market/share/us/share-intraday.html',user=current_user)
        # pprint(s)
    return render_template('/share-market/share/us/share-intraday.html',user=current_user)




@share_market.route('/share/unitedstates-stockexchange/',methods=['GET','POST'])
@login_required
def USshares():
   
    return render_template('/share-market/intros/usIntro.html',user=current_user)




@share_market.route('/share/unitedstates-stockexchange/daily-data/',methods=['GET','POST'])
@login_required
def USdailydata():
    return "hello world"
    # return render_template('/share-market/intros/usIntro.html',user=current_user)


@share_market.route('/share/unitedstates-stockexchange/weekly-data/',methods=['GET','POST'])
@login_required
def USweeklydata():
    return "hello world"
    # return render_template('/share-market/intros/usIntro.html',user=current_user)


@share_market.route('/share/unitedstates-stockexchange/monthly-data/',methods=['GET','POST'])
@login_required
def USmonthlydata():
    return "hello world"
    # return render_template('/share-market/intros/usIntro.html',user=current_user)
