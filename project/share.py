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




@share_market.route('/share/unitedstates-stockexchange/',methods=['GET','POST'])
@login_required
def USshares():
   
    return render_template('/share-market/intros/usIntro.html',user=current_user)

@share_market.route('/share/india-stockexchange/',methods=['GET','POST'])
@login_required
def IndiaShares():
    
    return render_template('/share-market/intros/IndiaIntro.html',user=current_user)



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
