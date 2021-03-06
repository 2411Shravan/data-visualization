from flask import Flask
from flask import Blueprint
from flask import redirect
from flask import render_template
from flask import url_for
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


canadaVentureDayKeys=[]
canadaVentureDayValues=[]
canadaVentureFinal=[]




UKDayKeys=[]
UKDayValues=[]
UKFinal=[]



germanDayKeys=[]
germanDayValues=[]
germanFinal=[]

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

@share_market.route('/share/endpoints/',methods=['GET','POST'])
@login_required
def USshares():
    if request.method == 'POST':
        codei= request.form['endpointdata']
        upi=codei.upper()
        print(upi)
        
        api='https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='+upi+'&apikey=WH75LQJ4BD7S15TO'
        raw=requests.get(api)
        raw_data=raw.json()
        # pprint(raw_data['bestMatches'])
        report=raw_data['bestMatches']
        pprint(report)
        return render_template('/share-market/share/endpoint.html',user=current_user,report=report)
    return render_template('/share-market/share/endpoint.html',user=current_user)


@share_market.route('/shares/endpoint/',methods=['GET','POST'])
@login_required
def ShareEndpoint():
   
    return render_template('/share-market/intros/usIntro.html',user=current_user)

@share_market.route('/share/unitedstates-stockexchange/',methods=['GET','POST'])
@login_required
def ShareUSIntro():
    return render_template('/share-market/intros/usIntro.html',user=current_user)


@share_market.route('/share/shenzen-stockexchange/',methods=['GET','POST'])
@login_required
def Shenzenshares():
   
    return render_template('/share-market/intros/shenzenintro.html',user=current_user)


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

@share_market.route('/share/german-stockexchange/',methods=['GET','POST'])
@login_required
def GermanShares():
    
    return render_template('/share-market/intros/germanintro.html',user=current_user)

@share_market.route('/share/india-stockexchange/monthly-data/',methods=['GET','POST'])
@login_required
def IndiaMonthlyShares():
    
    return render_template('/share-market/share/india/indiaMonthly.html',user=current_user)


@share_market.route('/share/shanghai-stockexchange/',methods=['GET','POST'])
@login_required
def ShanghaiShares():
    
    return render_template('/share-market/intros/shanghaiintro.html',user=current_user)



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



@share_market.route('/share/shanghai-stockexchange/weekly-data/',methods=['GET','POST'])
@login_required
def ShanghaiWeeklyShares():
    
    return render_template('/share-market/share/shanghai/weekly.html',user=current_user)

@share_market.route('/share/canada-stockexchange/weekly-data/',methods=['GET','POST'])
@login_required
def CanadaWeeklyShares():
    
    return render_template('/share-market/share/canada/canadaweek.html',user=current_user)

@share_market.route('/share/canadaVenture-stockexchange/weekly-data/',methods=['GET','POST'])
@login_required
def CanadaVentureWeeklyShares():
    
    return render_template('/share-market/share/canadaVenture/canadaVentureWeekly.html',user=current_user)

@share_market.route('/share/german-stockexchange/weekly-data/',methods=['GET','POST'])
@login_required
def GermanWeeklyShares():
    
    return render_template('/share-market/share/german/germanWeekly.html',user=current_user)


@share_market.route('/share/german-stockexchange/monthly-data/',methods=['GET','POST'])
@login_required
def GermanMonthlyShares():
    if request.method == 'POST':
        codei= request.form['GermantickerM']
        upi=codei.upper()
        print(upi)
        api='https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol='+upi+'.DEX&apikey=WH75LQJ4BD7S15TO'
        raw=requests.get(api)
        raw_data=raw.json()
        first_filter=raw_data['Monthly Adjusted Time Series']
        first_keys=first_filter.keys()
        print(len(first_keys))
        for data in first_keys:
            germanDayKeys.append(data)

        first_values=first_filter.values()
        print(len(first_values))
        open=[]
        high=[]
        low=[]
        close=[]
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



        pprint(germanFinal)
        return render_template('/share-market/share/german/germanMonthly.html',user=current_user,final_data=germanFinal)


    num=random.randint(0,9)
    fact=facts[num]['fact']

    return render_template('/share-market/share/german/germanMonthly.html',user=current_user,fact=fact)

@share_market.route('/share/canadaVenture-stockexchange/monthly-data/',methods=['GET','POST'])
@login_required
def CanadaVentureMonthlyShares():
    
    return render_template('/share-market/share/canadaVenture/canadaVentureMonthly.html',user=current_user)




@share_market.route('/share/shanghai-stockexchange/monthly-data/',methods=['GET','POST'])
@login_required
def shanghaiMonthlyShares():
    
    return render_template('/share-market/share/shanghai/monthly.html',user=current_user)




@share_market.route('/share/shenzen-stockexchange/weekly-data/',methods=['GET','POST'])
@login_required
def ShenzenWeeklyShares():
    
    return render_template('/share-market/share/shenzen/weekly.html',user=current_user)


@share_market.route('/share/shenzen-stockexchange/monthly-data/',methods=['GET','POST'])
@login_required
def ShenzenMonthlyShares():
    
    return render_template('/share-market/share/shenzen/monthly.html',user=current_user)






@share_market.route('/share/canada-stockexchange/monthly-data/',methods=['GET','POST'])
@login_required
def CanadaMonthlyShares():
    
    return render_template('/share-market/share/canada/canadamonthly.html',user=current_user)


@share_market.route('/share/uk-stockexchange/',methods=['GET','POST'])
@login_required
def UKShares():
    
    return render_template('/share-market/intros/uk-Intro.html',user=current_user)

@share_market.route('/share/canadaVenture-stockexchange/',methods=['GET','POST'])
@login_required
def CanadaVentureShares():
    
    return render_template('/share-market/intros/canadaventure.html',user=current_user)


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



        pprint(canadaFinal)
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



        pprint(UKFinal)
        return render_template('/share-market/share/uk/ukdaily.html',user=current_user,final_data=UKFinal)


    num=random.randint(0,9)
    fact=facts[num]['fact']

    return render_template('/share-market/share/uk/ukdaily.html',user=current_user,fact=fact)
    


@share_market.route('/share/canadaVenture-stockexchange/daily-data/',methods=['GET','POST'])
@login_required
def CanadaVentureDailyShares():
    if request.method == 'POST':
        codei= request.form['CanadaVentureticker']
        upi=codei.upper()
        print(upi)
        api='https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='+upi+'.TRV&outputsize=full&apikey=WH75LQJ4BD7S15TO'
        raw=requests.get(api)
        raw_data=raw.json()
        first_filter=raw_data['Time Series (Daily)']
        first_keys=first_filter.keys()
        print(len(first_keys))
        for data in first_keys:
            canadaVentureDayKeys.append(data)

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
            canadaVentureFinal.append(req)

        i=0
        for data in canadaVentureFinal:   
            data['x']=canadaVentureDayKeys[i]
            i=i+1



        pprint(canadaVentureFinal)
        return render_template('/share-market/share/canadaVenture/canadaVentureDaily.html',user=current_user,final_data=canadaVentureFinal)


    num=random.randint(0,9)
    fact=facts[num]['fact']

    return render_template('/share-market/share/canadaVenture/canadaVentureDaily.html',user=current_user,fact=fact)




@share_market.route('/share/german-stockexchange/daily-data/',methods=['GET','POST'])
@login_required
def GermanDailyShares():
    if request.method == 'POST':
        codei= request.form['Germanticker']
        upi=codei.upper()
        print(upi)
        api='https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='+upi+'.DEX&outputsize=full&apikey=WH75LQJ4BD7S15TO'
        raw=requests.get(api)
        raw_data=raw.json()
        first_filter=raw_data['Time Series (Daily)']
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



        pprint(germanFinal)
        return render_template('/share-market/share/german/germanDaily.html',user=current_user,final_data=germanFinal)


    num=random.randint(0,9)
    fact=facts[num]['fact']

    return render_template('/share-market/share/german/germanDaily.html',user=current_user,fact=fact)


@share_market.route('/share/shanghai-stockexchange/daily-data/',methods=['GET','POST'])
@login_required
def ShanghaiDailyShares():
    if request.method == 'POST':
        code= request.form['Shanghaiticker']
        up=code.upper()
        print(up)
        api='https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='+up+'.SHH&outputsize=full&apikey=WH75LQJ4BD7S15TO'
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
        return render_template('/share-market/share/shanghai/daily.html',user=current_user,final_data=indiaFinal)


    num=random.randint(0,9)
    fact=facts[num]['fact']

    return render_template('/share-market/share/shanghai/daily.html',user=current_user,fact=fact)




@share_market.route('/share/shenzen-stockexchange/daily-data/',methods=['GET','POST'])
@login_required
def ShenzenDailyShares():
    if request.method == 'POST':
        code= request.form['Shenzenticker']
        up=code.upper()
        print(up)
        api='https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='+up+'.SHZ&outputsize=full&apikey=WH75LQJ4BD7S15TO'
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
        return render_template('/share-market/share/shenzen/daily.html',user=current_user,final_data=indiaFinal)


    num=random.randint(0,9)
    fact=facts[num]['fact']

    return render_template('/share-market/share/shenzen/daily.html',user=current_user,fact=fact)



@share_market.route('/shares/endpoint-check/<name>',methods=['GET','POST'])
@login_required
def EndpointData(name):
    endpointdaykeys=[]
    endpointdayfinal=[]
    endpointweeklykeys=[]
    endpointweeklyfinal=[]
    endpointmonthlykeys=[]
    endpointmonthlyfinal=[]

    firstapi='https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='+name+'&outputsize=full&apikey=WH75LQJ4BD7S15TO'
    raw1=requests.get(firstapi)
    raw_data1=raw1.json()
    pprint(raw_data1)
    first_filter=raw_data1['Time Series (Daily)']
    first_keys=first_filter.keys()
    print(len(first_keys))
    for data in first_keys:
        endpointdaykeys.append(data)

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
        endpointdayfinal.append(req)

    i=0
    for data in endpointdayfinal:   
        data['x']=endpointdaykeys[i]
        i=i+1
    
    api='https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol='+name+'&apikey=WH75LQJ4BD7S15TO'
    raw1=requests.get(api)
    raw_data1=raw1.json()
    pprint(raw_data1)
    first_filters=raw_data1['Weekly Time Series']
    first_keyss=first_filters.keys()
    print(len(first_keyss))
    for data in first_keyss:
        endpointweeklykeys.append(data)

    first_valuess=first_filters.values()
    print(len(first_valuess))

    for singledata in first_valuess:
        values=[];
        values.append(float(singledata['1. open']))
        values.append(float(singledata['2. high']))
        values.append(float(singledata['3. low']))
        values.append(float(singledata['4. close']))
        req={}
        req['y']=values
        endpointweeklyfinal.append(req)

    i=0
    for data in endpointweeklyfinal:   
        data['x']=endpointweeklykeys[i]
        i=i+1


    thirdapi='https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol='+name+'&apikey=WH75LQJ4BD7S15TO'
    raw2=requests.get(thirdapi)
    raw_data2=raw2.json()
    pprint(raw_data2)
    first_filters2=raw_data2['Monthly Time Series']
    first_keyss2=first_filters2.keys()
    print(len(first_keyss2))
    for data in first_keyss2:
        endpointmonthlykeys.append(data)

    first_valuess2=first_filters2.values()
    print(len(first_valuess2))

    for singledata in first_valuess2:
        values=[];
        values.append(float(singledata['1. open']))
        values.append(float(singledata['2. high']))
        values.append(float(singledata['3. low']))
        values.append(float(singledata['4. close']))
        req={}
        req['y']=values
        endpointmonthlyfinal.append(req)

    i=0
    for data in endpointmonthlyfinal:   
        data['x']=endpointmonthlykeys[i]
        i=i+1
    return render_template('/share-market/share/endpointdata.html',datae=endpointdayfinal,user=current_user,dat=endpointweeklyfinal,datt=endpointmonthlyfinal)