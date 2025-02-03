// List of all challenges, with additional categories
const challenges = {
    Social: [
        "Strike up a conversation with a stranger using only movie quotes.",
        "Compliment someone you don't know today.",
        "Give someone a high five just because.",
        "Ask someone about their favorite childhood memory.",
        "Do something kind for a stranger without expecting anything in return.",
        "Tell someone you appreciate them for something specific."
    ],
    Creative: [
        "Create a piece of art using only items found in your kitchen.",
        "Write a short poem using only 5 words.",
        "Make a sculpture out of recycled materials.",
        "Draw something blindfolded.",
        "Create a short video that tells a story using only your phone.",
        "Take a photo of something ordinary but make it look extraordinary."
    ],
    Physical: [
        "Try a new form of exercise you've never done before.",
        "Go for a 20-minute jog in a park.",
        "Do 30 push-ups without stopping.",
        "Try a yoga session for beginners.",
        "Learn and perform 5 new dance moves.",
        "Take a walk for at least 30 minutes and clear your mind."
    ],
    Intellectual: [
        "Learn to say 'hello' in five new languages.",
        "Read a chapter of a book you’ve never read.",
        "Try solving a Sudoku puzzle.",
        "Watch a TED talk on a topic you know nothing about.",
        "Do a crossword puzzle and complete at least half of it.",
        "Listen to a podcast on a subject you’re curious about."
    ],
    Culinary: [
        "Cook a meal using an ingredient you've never tried before.",
        "Make a homemade pizza from scratch.",
        "Bake cookies and share them with a friend.",
        "Make your own pasta from scratch.",
        "Try a new recipe from a different cuisine.",
        "Prepare a dish using only 5 ingredients."
    ],
    Adventure: [
        "Go on a spontaneous road trip to a nearby town.",
        "Try rock climbing or a high ropes course.",
        "Take a hike through a new trail you've never explored.",
        "Go for a bike ride in a new park.",
        "Try paddleboarding or kayaking on a nearby lake.",
        "Plan a weekend getaway to an unfamiliar place."
    ],
    Mindfulness: [
        "Meditate for 10 minutes in a quiet place.",
        "Write down 5 things you are grateful for today.",
        "Take 5 minutes to close your eyes and focus on your breathing.",
        "Do a digital detox for an hour—no phone, no screens.",
        "Go for a nature walk and pay attention to the surroundings.",
        "Try a mindfulness activity such as deep breathing or progressive muscle relaxation."
    ],
    Environment: [
        "Pick up trash at a local park or beach.",
        "Plant a tree or start a small garden.",
        "Unplug all your devices for an hour to save energy.",
        "Create a recycling bin system at home or in your office.",
        "Switch off all unnecessary lights for the day and save energy.",
        "Try eating a plant-based meal to reduce your carbon footprint."
    ],
    Hobbies: [
        "Learn how to juggle or improve your juggling skills.",
        "Try knitting or crocheting something simple.",
        "Start a scrapbook or photo album with your favorite memories.",
        "Learn to play a musical instrument, even if it’s just for fun.",
        "Start a new hobby you’ve been curious about for a while.",
        "Spend 30 minutes on a puzzle or a brain teaser."
    ],
    Technology: [
        "Try learning a new coding language or framework.",
        "Build a simple website or app.",
        "Take a virtual tour of a museum or historical site.",
        "Try using a new productivity tool or app for a day.",
        "Set up a smart home device or improve your home automation.",
        "Learn a new tech skill, like editing videos or photos."
    ]
};

// Track completed challenges and to-do list
let completedChallenges = {
    Social: [],
    Creative: [],
    Physical: [],
    Intellectual: [],
    Culinary: [],
    Adventure: [],
    Mindfulness: [],
    Environment: [],
    Hobbies: [],
    Technology: []
};
let todoList = []; // Array to store to-do list challenges
let currentChallenge = ""; // Store the current challenge for adding to To-Do List

// Function to get a random challenge based on selected category
function getRandomChallenge(category) {
    let availableChallenges = challenges[category].filter(challenge => !completedChallenges[category].includes(challenge));

    // If all challenges in this category are completed, reset the pool
    if (availableChallenges.length === 0) {
        completedChallenges[category] = []; // Reset challenges for this category
        availableChallenges = challenges[category];
    }

    const randomChallenge = availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
    completedChallenges[category].push(randomChallenge);

    return randomChallenge;
}

// Event listener to trigger challenge generation when the user selects a category and clicks "Get Challenge"
document.getElementById('get-challenge-btn').addEventListener('click', function() {
    const categorySelect = document.getElementById('category-select');
    const selectedCategory = categorySelect.value;

    // Get a random challenge for the selected category
    const challenge = getRandomChallenge(selectedCategory);

    // Display the challenge in the HTML
    document.getElementById('challenge-title').innerText = `Today's ${selectedCategory} Challenge`;
    document.getElementById('challenge-description').innerText = challenge;

    // Show "Add to To-Do List" button and To-Do list section
    document.getElementById('add-to-todo-btn').style.display = 'inline-block';
    document.getElementById('todo-section').style.display = 'block';
    currentChallenge = challenge; // Store the current challenge for the to-do list
});

// Add challenge to To-Do List
document.getElementById('add-to-todo-btn').addEventListener('click', function() {
    if (!todoList.includes(currentChallenge)) {
        todoList.push(currentChallenge);
        updateTodoList();
    }
});

// Function to update To-Do List display
function updateTodoList() {
    const todoListElement = document.getElementById('todo-list');
    todoListElement.innerHTML = ''; // Clear current list

    todoList.forEach((challenge, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${challenge} <button class="remove-btn" onclick="removeFromTodoList(${index})">Remove</button>`;
        todoListElement.appendChild(listItem);
    });
}

// Function to remove a challenge from the To-Do List
function removeFromTodoList(index) {
    todoList.splice(index, 1);
    updateTodoList();
}

// Add completed challenge to history
function addToHistory(category, challenge) {
    const historyList = document.getElementById('history-list');
    const newItem = document.createElement('li');
    newItem.innerText = `${category}: ${challenge}`;
    historyList.appendChild(newItem);
}

// On page load, show an initial message
window.onload = function() {
    document.getElementById('challenge-title').innerText = "Choose a category to see a challenge";
    document.getElementById('challenge-description').innerText = "Once you select a category, a challenge will appear here.";
};
