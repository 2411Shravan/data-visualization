from flask import Flask
from flask import redirect
from flask import render_template
from flask import Blueprint
from flask_login import login_required
from flask_login import current_user
from . import db
from flask import request
import requests
from flask import flash
from .models import User
from flask import url_for
from pprint import pprint
view=Blueprint('view',__name__)


@view.route('/')
def home():
    return render_template('home.html',user=current_user)

@view.route('/about')
def about():
    return 'about us'

@view.route('/contact',methods=['GET','POST'])
@login_required
def contact():
    
    return render_template('contact.html',user=current_user)



@view.route('/share-market')
@login_required
def ShareMarket():
    return render_template('/share-market/shares.html',user=current_user)


@view.route('/crypto')
@login_required
def Crypto():
    return render_template('crypto/crypto.html',user=current_user)



@view.route('/forex')
@login_required
def mutualfunds():
    return render_template('forex.html',user=current_user)

@view.route('/fundamentals')
@login_required
def fundamentals():
    return render_template('fundamentals.html',user=current_user)


@view.route('/currencies')
@login_required
def currencies():
    return render_template('currency.html',user=current_user)

@view.route('/realtime-gdp')
@login_required
def RealGDP():
    api='https://www.alphavantage.co/query?function=REAL_GDP&interval=annual&apikey=WH75LQJ4BD7S15TO'
    raw=requests.get(api)
    raw_data=raw.json()
    pprint(raw_data)
    date=[]
    value=[]
    dat_val=raw_data['data']
    for i in dat_val:
        date.append(int(i['date'][0:4]))
        value.append(float(i['value']))
    return render_template('realgdp.html',user=current_user,date=date,value=value)


@view.route('/gdp-percapita')
@login_required
def GDPPercapita():
    api='https://www.alphavantage.co/query?function=REAL_GDP_PER_CAPITA&apikey=WH75LQJ4BD7S15TO'
    raw=requests.get(api)
    raw_data=raw.json()
    pprint(raw_data)
    date=[]
    value=[]
    dat_val=raw_data['data']
    for i in dat_val:
        date.append(int(i['date'][0:4]))
        value.append(float(i['value']))
    return render_template('gdppercapita.html',user=current_user,date=date,value=value)




@view.route('/user-profile/<string:name>',methods=['GET','POST'])
@login_required
def userprofile(name):
    if request.method == 'POST':
        user = User.query.get(current_user.id)
        db.session.delete(user)
        db.session.commit()
        flash('User deleted successfully', category='warning')
        return redirect(url_for('auth.signup'))
    return render_template('userprofile.html',user=current_user)


