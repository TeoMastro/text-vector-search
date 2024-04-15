import gdown
import gzip
import shutil
from flask import Flask, request, jsonify
from gensim.models import KeyedVectors

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
    try:
        # Attempt to get the vector for the input text
        vector = model[text].tolist()  # Convert numpy array to list for JSON serialization
        return jsonify({'vector': vector})
    except KeyError:
        # Return an error if the word is not in the model's vocabulary
        return jsonify({'error': 'Word not in vocabulary'}), 404

if __name__ == '__main__':
    app.run(debug=True)
