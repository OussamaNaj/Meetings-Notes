import sys

from transformers import T5ForConditionalGeneration, T5Tokenizer

# initialize the model architecture and weights
model = T5ForConditionalGeneration.from_pretrained('server/Ml_Model/model')

# initialize the model tokenizer
tokenizer = T5Tokenizer.from_pretrained('server/Ml_Model/tokenizer')

article = """

"""


inputs = tokenizer.encode("summarize: " + article, return_tensors="pt", max_length=512, truncation=True)

# generate the summarization output
outputs = model.generate(
    inputs, 
    max_length=int(len(article)*0.25), 
    min_length=int(len(article)*0.05), 
    length_penalty=2.0, 
    num_beams=4, 
    early_stopping=True)

# just for debugging

print(tokenizer.decode(outputs[0]))

print(article)
sys.stdout.flush()
