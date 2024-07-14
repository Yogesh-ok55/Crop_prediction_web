from flask import Flask,request,render_template
import numpy as np
import pandas
import sklearn
import pickle
from flask_cors import CORS

# importing model
model = pickle.load(open('model.pkl','rb'))
sc = pickle.load(open('standscaler.pkl','rb'))
ms = pickle.load(open('minmaxscaler.pkl','rb'))

# creating flask app
app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Welcome to crop prediction server"

@app.route("/predict",methods=['GET'])
def predict():
    N = request.args.get('nitrogen', default=None, type=float)
    P = request.args.get('phosphate', default=None, type=float)
    K = request.args.get('potassium', default=None, type=float)
    temp = request.args.get('temp', default=None, type=float)
    humidity = request.args.get('humidity', default=None, type=float)
    ph = request.args.get('ph', default=None, type=float)
    rainfall = request.args.get('rainfall', default=None, type=float)

    feature_list = [N, P, K, temp, humidity, ph, rainfall]
    single_pred = np.array(feature_list).reshape(1, -1)

    scaled_features = ms.transform(single_pred)
    final_features = sc.transform(scaled_features)
    prediction = model.predict(final_features)

    crop_dict = {1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut", 6: "Papaya", 7: "Orange",
                 8: "Apple", 9: "Muskmelon", 10: "Watermelon", 11: "Grapes", 12: "Mango", 13: "Banana",
                 14: "Pomegranate", 15: "Lentil", 16: "Blackgram", 17: "Mungbean", 18: "Mothbeans",
                 19: "Pigeonpeas", 20: "Kidneybeans", 21: "Chickpea", 22: "Coffee"}

    if prediction[0] in crop_dict:
        crop = crop_dict[prediction[0]]
        result = "{} is the best crop to be cultivated right there".format(crop)

    else:
        result = "Sorry, we could not determine the best crop to be cultivated with the provided data."
    return crop;




# python main
if __name__ == "__main__":
    app.run(debug=True)