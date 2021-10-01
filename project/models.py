from flask import Flask
from datetime import datetime
from . import db
from flask_login import UserMixin


class Note(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    data= db.Column(db.String(20000))
    date = db.Column(db.DateTime, default=datetime.utcnow)
    user_id=db.Column(db.Integer, db.ForeignKey('user.id')) 




class MarketValue(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    market_name= db.Column(db.String(20000))
    market_open_value= db.Column(db.Integer())
    market_close_value= db.Column(db.Integer())
    market_high_value= db.Column(db.Integer())
    market_low_value= db.Column(db.Integer())
    date = db.Column(db.DateTime, default=datetime.utcnow)
    user_id=db.Column(db.Integer, db.ForeignKey('user.id'))


class User(db.Model,UserMixin):
    id= db.Column(db.Integer,primary_key=True)
    email= db.Column(db.String(150), unique=True)
    password= db.Column(db.String(150))
    name= db.Column(db.String(150))
    username=db.Column(db.String(150),unique=True)
    notes= db.relationship('Note')
    market_values= db.relationship('MarketValue')





