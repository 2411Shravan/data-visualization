from flask import Flask
from flask import redirect
from flask import render_template
from flask import Blueprint
from flask_login import login_required
from flask_login import current_user
from . import db
from flask import request
from flask import flash
from .models import User,Note
from flask import url_for

view=Blueprint('view',__name__)


@view.route('/')
def home():
    return render_template('home.html',user=current_user)

@view.route('/about')
def about():
    return 'about us'

@view.route('/contact')
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

@view.route('/user-profile/<string:name>')
@login_required
def userprofile(name):
    return render_template('userprofile.html',user=current_user)


