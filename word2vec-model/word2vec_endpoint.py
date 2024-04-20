import gdown
import gzip
import shutil
from flask import Flask, request, jsonify
from gensim.models import KeyedVectors
import numpy as np

# Download the Word2Vec model
url = 'https://drive.google.com/uc?id=0B7XkCwpI5KDYNlNUTTlSS21pQmM'
output = 'GoogleNews-vectors-negative300.bin.gz'
gdown.download(url, output, quiet=False)

# Decompress the .gz file to .bin
with gzip.open('GoogleNews-vectors-negative300.bin.gz', 'rb') as f_in:
    with open('GoogleNews-vectors-negative300.bin', 'wb') as f_out:
        shutil.copyfileobj(f_in, f_out)

app = Flask(__name__)

# Load the decompressed Word2Vec model
model = KeyedVectors.load_word2vec_format('GoogleNews-vectors-negative300.bin', binary=True)

@app.route('/vectorize', methods=['POST'])
def vectorize_text():
    data = request.json
    text = data['text']
    
    # Split the text into words and filter out words not in the model
    words = text.split()
    words_in_model = [word for word in words if word in model.key_to_index]
    
    if not words_in_model:
        # If no words in the sentence are in the model, return an error
        return jsonify({'error': 'No words in vocabulary'}), 404
    
    try:
        # Calculate the mean vector for the words in the sentence
        vector = np.mean([model[word] for word in words_in_model], axis=0).tolist()
        return jsonify({'vector': vector})
    except KeyError as e:
        # Return an error if a word is not in the model's vocabulary
        return jsonify({'error': str(e)}), 404

if __name__ == '__main__':
    app.run(debug=True)
