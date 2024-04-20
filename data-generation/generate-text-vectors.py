import json
import gdown
import gzip
import shutil
from gensim.models import KeyedVectors

sentences = [
    "Cinema has the power to transport us to worlds beyond our imagination.",
    "Every movie is a window into the soul of its creator.",
    "The art of filmmaking combines storytelling with visual spectacle.",
    "Great movies stand the test of time, captivating generations.",
    "Science fiction films often challenge our perception of reality.",
    "The soundtrack of a film can be just as iconic as its visuals.",
    "Horror movies tap into our primal fears with chilling effectiveness.",
    "Romantic comedies have a way of warming the coldest of hearts.",
    "Documentaries provide a lens through which we see the real world.",
    "The editing room is where raw footage is sculpted into cinematic art.",
    "A movie's climax can leave audiences on the edge of their seats.",
    "The golden age of cinema is a testament to the timeless allure of movies.",
    "International films offer a gateway to diverse cultures and stories.",
    "Animated movies have the unique ability to enchant both young and old.",
    "The role of the director is to bring a script to life on the screen.",
    "Method acting allows performers to fully embody their characters.",
    "Film festivals are the birthplace of indie cinema's most striking works.",
    "The Oscars celebrate outstanding achievements in the world of cinema.",
    "Cinematography is the art of painting with light.",
    "A well-written script is the foundation of any great movie.",
    "The best villains are those we can't help but sympathize with.",
    "Movie trailers tease the excitement and drama awaiting in theaters.",
    "The evolution of special effects has expanded the horizons of storytelling.",
    "A film's set design is crucial in creating its immersive world.",
    "Cult classics gain their status through passionate fan followings.",
    "The chemistry between lead actors can make or break a romance film.",
    "Silent films remind us that emotions transcend spoken language.",
    "A movie marathon is the perfect escape from the mundane.",
    "Behind every great movie is a team of dedicated crew members.",
    "Blockbusters often set new benchmarks for cinematic excellence.",
    "Independent films challenge mainstream narratives with bold creativity.",
    "A film's opening scene is crucial in capturing the audience's attention.",
    "The closing credits roll, but the movie's impact lingers on.",
    "Iconic movie quotes become part of our everyday language.",
    "The best film critics can guide us to hidden cinematic gems.",
    "Digital streaming has revolutionized how we access and watch movies.",
    "The magic of cinema lies in its ability to evoke empathy.",
    "War movies can provide poignant commentary on the human condition.",
    "Comedy films have the power to bring laughter in the darkest times.",
    "The journey of making a movie is as compelling as the film itself."
]

url = 'https://drive.google.com/uc?id=0B7XkCwpI5KDYNlNUTTlSS21pQmM'
output = 'GoogleNews-vectors-negative300.bin.gz'
gdown.download(url, output, quiet=False)

# Decompress the .gz file to .bin
with gzip.open('GoogleNews-vectors-negative300.bin.gz', 'rb') as f_in:
    with open('GoogleNews-vectors-negative300.bin', 'wb') as f_out:
        shutil.copyfileobj(f_in, f_out)

# Tokenizing sentences for the Word2Vec model training.
tokenized_sentences = [sentence.lower().split() for sentence in sentences]

# Training a simple Word2Vec model on the tokenized sentences.
model_simple = KeyedVectors.load_word2vec_format('GoogleNews-vectors-negative300.bin', binary=True)

# Function to convert sentences to vectors using the trained Word2Vec model.
def simple_sentence_to_vector(sentence, model):
    words = sentence.lower().split()
    word_vectors = [model.wv[word] for word in words if word in model.wv]
    if len(word_vectors) == 0:
        return None  # If no words in the sentence are in the model's vocabulary, return None.
    else:
        return sum(word_vectors) / len(word_vectors)  # Average of word vectors.

# Convert each sentence to its corresponding vector.
simple_sentence_vectors = []
for sentence in sentences:
    vector = simple_sentence_to_vector(sentence, model_simple)
    if vector is not None:
        simple_sentence_vectors.append({'text': sentence, 'vector': vector.tolist()})
    else:
        simple_sentence_vectors.append({'text': sentence, 'vector': None})

# Save the sentence vectors to a JSON file.
simple_output_path_cwd = 'simple_sentence_vectors.json'
with open(simple_output_path_cwd, 'w') as outfile:
    json.dump(simple_sentence_vectors, outfile)

simple_output_path_cwd