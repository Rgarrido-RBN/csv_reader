#!/bin/python3

#  main.py
#  Date: Jun 17 05:19:31
#  Author: Rubén Garrido 
#  Mail: rgarrido.rbn@gmail.com

from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process_csv():
    file_path = request.json.get('filePath')
    if not file_path:
        return jsonify({'error': 'No file path provided'}), 400

    df = pd.read_csv(file_path)
    
    # Example operation: Add a new column with arithmetic operation
    df['new_column'] = df[df.columns[0]] * 2  # Modify as per your requirement

    result = df.to_dict(orient='records')
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5000)