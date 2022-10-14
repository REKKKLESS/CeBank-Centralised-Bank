import numpy as np
from flask import Flask, render_template,request,jsonify,url_for,json
import dill as pickle
import json
import nltk
import tensorflow
import random
from keras.models import load_model
from nltk.stem import WordNetLemmatizer

lm = WordNetLemmatizer()

data = pickle.load(open('data.pkl','rb'))
getRes = pickle.load(open('getRes.pkl','rb'))
newWords = pickle.load(open('newWords.pkl','rb'))
ourClasses = pickle.load(open('ourClasses.pkl','rb'))
PClass = pickle.load(open('PClass.pkl','rb'))
wordBag= pickle.load(open('wordBag.pkl','rb'))
ourText= pickle.load(open('ourText.pkl','rb'))
ourNewModel = load_model('ourNewModel.h5')

app = Flask(__name__, static_folder="static")
@app.route('/',methods=['POST','GET'])
def chatBot():
    if(request.method=="POST"):
        jsonData = request.json
        print(jsonData)
        jsonData_ = json.loads(json.dumps(jsonData))
        message=jsonData_['message'].lower()
        intents=PClass(message,newWords,ourClasses)
        reply=getRes(intents,data)
        print("Message")
        print(reply)
        return reply
    
    return "Hello from chatbot server!"

if __name__=='__main__':
    app.run(port=3000,host='0.0.0.0')