from flask import Flask, render_template, jsonify, request
from openai import OpenAI

app = Flask(__name__)

# Initialize the OpenAI client
client = OpenAI(api_key="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")


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/', methods=['GET', 'POST'])
def chatbot():
    data = request.get_json()
    user_message = data.get('user_message')

    # Create a message for the chatbot
    messages = [{"role": "user", "content": user_message}]

    # Get a response from the chatbot
    completion = client.chat.completions.create(model="gpt-3.5-turbo", messages=messages)
    bot_response = completion.choices[0].message.content

    return jsonify({"bot_response": bot_response})


if __name__ == '__main__':
    app.run()
