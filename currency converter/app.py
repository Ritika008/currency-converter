from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert():
    data = request.get_json()
    base = data['base']
    target = data['target']
    amount = float(data['amount'])

    url = f"https://open.er-api.com/v6/latest/{base}"
    res = requests.get(url).json()

    if 'rates' not in res or target not in res['rates']:
        return jsonify({'error': 'Invalid currency'}), 400

    rate = res['rates'][target]
    result = amount * rate
    return jsonify({'result': round(result, 2)})

if __name__ == '__main__':
    app.run(debug=True)
