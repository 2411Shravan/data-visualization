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

mutual_funds = Blueprint('mutual_funds', __name__)



@mutual_funds.route('/mutual-funds/latest-listed/',methods=['GET','POST'])
@login_required
def Latestmutual():
    return render_template('/mutualfunds/latest.html',user=current_user)