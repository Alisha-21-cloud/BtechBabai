document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const closeBtn = document.querySelector(".close-btn");
    const chatbox = document.querySelector(".chatbox");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector("#send-btn");

    let userMessage = null;
    const inputInitHeight = chatInput.scrollHeight;

    // Replace with your actual Gemini API key
    const GEMINI_API_KEY = "AIzaSyCiaQh7YaOfYD16gMo2-bx24pi2KFCIB-o";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

    // Custom system prompt for BtechBabai
    const SYSTEM_PROMPT = `You are BtechBabai Assistant, a helpful AI chatbot for engineering students. Your main purpose is to:

1. Help students with their engineering studies and academic questions
2. Provide information about engineering subjects, concepts, and topics
3. Assist with doubts related to CSE, ECE, EEE, MECH and other engineering branches  
4. Help with study materials, exam preparation, and academic resources
5. Be friendly, supportive and encouraging to students
6. Provide practical study tips and learning strategies

Keep your responses concise but informative. Focus on being helpful for engineering students specifically. If asked about non-academic topics, gently redirect the conversation back to studies and learning.

Always be encouraging and supportive of students' learning journey.`;

    const createChatLi = (message, className) => {
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", className);

        let chatContent = className === "outgoing"
            ? `<p></p>`
            : `<img src="../assets/chatbot.png" alt="Bot" class="chat-avatar"><p></p>`;

        chatLi.innerHTML = chatContent;
        chatLi.querySelector("p").textContent = message;
        return chatLi;
    };

    const generateResponse = async (chatElement) => {
        const messageElement = chatElement.querySelector("p");

        try {
            // Show thinking animation
            messageElement.textContent = "Thinking...";
            messageElement.classList.add("thinking");

            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: SYSTEM_PROMPT },
                            { text: userMessage }
                        ]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    }
                }),
            };

            const response = await fetch(API_URL, requestOptions);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error?.message || "Something went wrong!");
            }

            // Remove thinking animation
            messageElement.classList.remove("thinking");

            // Get the response text and clean it up
            const responseText = data.candidates[0].content.parts[0].text;
            messageElement.textContent = responseText.replace(/\\*\\*(.*?)\\*\\*/g, '$1');

        } catch (error) {
            messageElement.classList.remove("thinking");
            messageElement.classList.add("error");
            messageElement.textContent = "Sorry, I'm having trouble connecting right now. Please try again!";
            console.error('Chat error:', error);
        } finally {
            chatbox.scrollTo(0, chatbox.scrollHeight);
        }
    };

    const handleChat = () => {
        userMessage = chatInput.value.trim();
        if (!userMessage) return;

        // Clear the input textarea and set its height to default
        chatInput.value = "";
        chatInput.style.height = `${inputInitHeight}px`;

        // Append the user's message to the chatbox
        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);

        setTimeout(() => {
            // Display "Thinking..." message while waiting for the response
            const incomingChatLi = createChatLi("Thinking...", "incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatLi);
        }, 600);
    };

    chatInput.addEventListener("input", () => {
        // Adjust the height of the input textarea based on its content
        chatInput.style.height = `${inputInitHeight}px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    });

    chatInput.addEventListener("keydown", (e) => {
        // If Enter key is pressed without Shift key and the window 
        // width is greater than 800px, handle the chat
        if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            handleChat();
        }
    });

    sendChatBtn.addEventListener("click", handleChat);
    closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
    chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
});