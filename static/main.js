
    document.addEventListener("DOMContentLoaded", () => {
        const chatBox = document.getElementById("chat-box");
        const userInput = document.getElementById("user-input");
        const sendButton = document.getElementById("send-button");

        sendButton.addEventListener("click",() => {
            const userMessage = userInput.value;
            displayUserMessage(userMessage);

            // Send user message to the server for processing (updated URL to match Flask route)
            fetch('/', {
                url:'/get',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_message: userMessage })
            })
            .then(response => response.json())
            .then(data => {
                const botResponse = data.bot_response;
                displayBotMessage(botResponse);
            });

            userInput.value = "";
        });

        function displayUserMessage(message) {
            const userBubble = document.createElement("div");
            userBubble.className = "user-bubble";
            userBubble.textContent = message;
            chatBox.appendChild(userBubble);
        }

        function displayBotMessage(message) {
            const botBubble = document.createElement("div");
            botBubble.className = "bot-bubble";
            botBubble.textContent = message;
            chatBox.appendChild(botBubble);
        }
    });