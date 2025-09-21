// chatbot-config.js - Configuration file for the chatbot
// Replace YOUR_ACTUAL_GEMINI_API_KEY with your real API key from Google AI Studio

const CHATBOT_CONFIG = {
    // Get your free API key from: https://aistudio.google.com/app/apikey
    GEMINI_API_KEY: "AIzaSyCiaQh7YaOfYD16gMo2-bx24pi2KFCIB-o",

    // API Configuration
    API_URL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",

    // Chatbot Settings
    MAX_TOKENS: 1024,
    TEMPERATURE: 0.7,
    TOP_K: 40,
    TOP_P: 0.95,

    // System prompt for BtechBabai
    SYSTEM_PROMPT: `You are BtechBabai Assistant, a helpful AI chatbot for engineering students. Your main purpose is to:

1. Help students with their engineering studies and academic questions
2. Provide information about engineering subjects, concepts, and topics
3. Assist with doubts related to CSE, ECE, EEE, MECH and other engineering branches  
4. Help with study materials, exam preparation, and academic resources
5. Be friendly, supportive and encouraging to students
6. Provide practical study tips and learning strategies

Keep your responses concise but informative. Focus on being helpful for engineering students specifically. If asked about non-academic topics, gently redirect the conversation back to studies and learning.

Always be encouraging and supportive of students' learning journey.`
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CHATBOT_CONFIG;
}
