
let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Text-to-Speech
function speak(text) {
    window.speechSynthesis.cancel();
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = "en-GB";
    window.speechSynthesis.speak(utterance);
}

// Speech Recognition
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    let transcript = event.results[event.resultIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript);
};

// Start recognition
btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

// Random Jokes & Quotes
const jokes = [
    "Why don’t scientists trust atoms? Because they make up everything!",
    "Why did the math book look sad? Because it had too many problems.",
    "I told my computer I needed a break, and it said 'No problem!'"
];

const quotes = [
    "The best way to get started is to quit talking and begin doing. - Walt Disney",
    "Don’t let yesterday take up too much of today. - Will Rogers",
    "The harder you work for something, the greater you’ll feel when you achieve it."
];

// Command Handling
function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    message = message.toLowerCase();

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello Sir, What can I help you with?");
    } 
    else if (message.includes("who are you")) {
        speak("I am Virtual Assistant, Created by Hasanujjaman Sir.");
    } 
    else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com/", "_blank");
    } 
    else if (message.includes("open facebook")) {
        speak("Opening Facebook");
        window.open("https://www.facebook.com/", "_blank");
    } 
    else if (message.includes("open instagram")) {
        speak("Opening Instagram");
        window.open("https://www.instagram.com/", "_blank");
    } 
    else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://www.google.com/", "_blank");
    } 
    else if (message.includes("open calculator")) {
        speak("Opening Calculator");
        window.open("https://www.google.com/search?q=calculator", "_blank");
    } 
    else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp Web");
        window.open("https://web.whatsapp.com/", "_blank");
    } 
    else if (message.includes("open gmail")) {
        speak("Opening Gmail");
        window.open("https://mail.google.com/", "_blank");
    } 
    else if (message.includes("open chatgpt")) {
        speak("Opening ChatGPT");
        window.open("https://chat.openai.com/", "_blank");
    } 
    else if (message.includes("play music")) {
        speak("Playing music");
        window.open("https://www.youtube.com/results?search_query=music", "_blank");
    } 
    else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric", hour12: true });
        speak("The time is " + time);
    } 
    else if (message.includes("date")) {
        let date = new Date().toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
        speak("Today's date is " + date);
    } 
    else if (message.includes("weather")) {
        speak("Opening weather information");
        window.open("https://www.google.com/search?q=weather", "_blank");
    } 
    else if (message.includes("news")) {
        speak("Here are the latest news headlines");
        window.open("https://news.google.com/", "_blank");
    } 
    else if (message.includes("joke")) {
        let joke = jokes[Math.floor(Math.random() * jokes.length)];
        speak(joke);
    } 
    else if (message.includes("quote")) {
        let quote = quotes[Math.floor(Math.random() * quotes.length)];
        speak(quote);
    } 
    else if (/what is|calculate|solve/.test(message)) {
        
        // Simple Math Evaluator
        try {
            let expr = message.replace(/[^0-9\+\-\*\/\.\(\)]/g, '');
            let result = eval(expr);
            if (!isNaN(result)) {
                speak("The answer is " + result);
            } else {
                speak("Sorry, I could not calculate that.");
            }
        } catch {
            speak("Sorry, I could not calculate that.");
        }
    } 
    else {
        let cleaned = message.replace(/shifra|shipra/gi, "").trim();
        if (!cleaned) cleaned = message;
        speak("This is what I found on the internet regarding " + cleaned);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(cleaned)}`, "_blank");
    }
}
