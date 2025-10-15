// Global Variables
let currentSubject = '';
let currentLesson = 0;
let userProgress = {
    math: 0,
    science: 0,
    english: 0,
    hindi: 0
};
let studyTime = 0;
let achievements = 0;
let totalLessons = 0;

// API Configuration
const GEMINI_API_KEY = 'AIzaSyC0papZa44uagYYxtGEZHy56mPqxCEBzLI';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent';

// Subject Data
const subjectData = {
    math: {
        title: 'Mathematics',
        lessons: [
            {
                title: 'Numbers 1-10',
                content: `
                    <h2>Learning Numbers 1 to 10</h2>
                    <p>Let's start with the basic numbers. Numbers help us count things around us.</p>
                    
                    <div class="lesson-example">
                        <h3>Numbers and Their Names:</h3>
                        <div class="math-problem">
                            1 - One 🍎<br>
                            2 - Two 🍎🍎<br>
                            3 - Three 🍎🍎🍎<br>
                            4 - Four 🍎🍎🍎🍎<br>
                            5 - Five 🍎🍎🍎🍎🍎
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Practice:</h3>
                        <p>Count the objects around you. How many chairs do you see? How many windows?</p>
                    </div>
                `
            },
            {
                title: 'Simple Addition',
                content: `
                    <h2>Adding Numbers Together</h2>
                    <p>Addition means putting numbers together to make a bigger number.</p>
                    
                    <div class="lesson-example">
                        <h3>Let's Add:</h3>
                        <div class="math-problem">
                            1 + 1 = 2<br>
                            🍎 + 🍎 = 🍎🍎<br><br>
                            2 + 1 = 3<br>
                            🍎🍎 + 🍎 = 🍎🍎🍎<br><br>
                            3 + 2 = 5<br>
                            🍎🍎🍎 + 🍎🍎 = 🍎🍎🍎🍎🍎
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Try This:</h3>
                        <p>If you have 2 apples and someone gives you 3 more apples, how many apples do you have in total?</p>
                        <p><strong>Answer: 2 + 3 = 5 apples</strong></p>
                    </div>
                `
            },
            {
                title: 'Money Basics',
                content: `
                    <h2>Understanding Money</h2>
                    <p>Money helps us buy things we need. Let's learn about coins and notes.</p>
                    
                    <div class="lesson-example">
                        <h3>Indian Currency:</h3>
                        <div class="math-problem">
                            ₹1 - One Rupee<br>
                            ₹2 - Two Rupees<br>
                            ₹5 - Five Rupees<br>
                            ₹10 - Ten Rupees<br>
                            ₹20 - Twenty Rupees
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Practice:</h3>
                        <p>If you buy bread for ₹5 and milk for ₹10, how much money do you need?</p>
                        <p><strong>Answer: ₹5 + ₹10 = ₹15</strong></p>
                    </div>
                `
            },
            {
                title: 'Time Reading',
                content: `
                    <h2>Reading Time on Clock</h2>
                    <p>Time helps us know when to do different activities during the day.</p>
                    
                    <div class="lesson-example">
                        <h3>Parts of a Day:</h3>
                        <div class="math-problem">
                            🌅 Morning - 6:00 AM to 12:00 PM<br>
                            ☀️ Afternoon - 12:00 PM to 6:00 PM<br>
                            🌆 Evening - 6:00 PM to 9:00 PM<br>
                            🌙 Night - 9:00 PM to 6:00 AM
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Daily Activities:</h3>
                        <p>• Wake up in the morning<br>
                        • Eat lunch in the afternoon<br>
                        • Watch TV in the evening<br>
                        • Sleep at night</p>
                    </div>
                `
            }
        ]
    },
    science: {
        title: 'Science',
        lessons: [
            {
                title: 'Our Body Parts',
                content: `
                    <h2>Learning About Our Body</h2>
                    <p>Our body has many parts that help us do different things.</p>
                    
                    <div class="lesson-example">
                        <h3>Main Body Parts:</h3>
                        <div class="math-problem">
                            👁️ Eyes - Help us see<br>
                            👂 Ears - Help us hear<br>
                            👃 Nose - Help us smell<br>
                            👄 Mouth - Help us eat and speak<br>
                            ✋ Hands - Help us hold things<br>
                            🦵 Legs - Help us walk
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Take Care of Your Body:</h3>
                        <p>• Wash your hands before eating<br>
                        • Brush your teeth twice a day<br>
                        • Exercise daily<br>
                        • Eat healthy food</p>
                    </div>
                `
            },
            {
                title: 'Plants Around Us',
                content: `
                    <h2>Understanding Plants</h2>
                    <p>Plants are living things that grow around us. They give us oxygen and food.</p>
                    
                    <div class="lesson-example">
                        <h3>Parts of a Plant:</h3>
                        <div class="math-problem">
                            🌱 Roots - Take water from soil<br>
                            🌿 Stem - Supports the plant<br>
                            🍃 Leaves - Make food for plant<br>
                            🌸 Flowers - Make seeds<br>
                            🍎 Fruits - Contain seeds
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Plants Give Us:</h3>
                        <p>• Oxygen to breathe<br>
                        • Fruits and vegetables to eat<br>
                        • Wood for furniture<br>
                        • Shade from sun</p>
                    </div>
                `
            },
            {
                title: 'Healthy Food',
                content: `
                    <h2>Eating Healthy Food</h2>
                    <p>Good food keeps our body strong and healthy.</p>
                    
                    <div class="lesson-example">
                        <h3>Healthy Foods:</h3>
                        <div class="math-problem">
                            🍎 Fruits - Give us vitamins<br>
                            🥬 Vegetables - Give us minerals<br>
                            🥛 Milk - Makes bones strong<br>
                            🍞 Grains - Give us energy<br>
                            🥜 Nuts - Good for brain
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Healthy Habits:</h3>
                        <p>• Eat fruits daily<br>
                        • Drink plenty of water<br>
                        • Avoid too much sugar<br>
                        • Eat at proper times</p>
                    </div>
                `
            },
            {
                title: 'Weather and Seasons',
                content: `
                    <h2>Understanding Weather</h2>
                    <p>Weather changes throughout the year. We have different seasons.</p>
                    
                    <div class="lesson-example">
                        <h3>Three Main Seasons:</h3>
                        <div class="math-problem">
                            ☀️ Summer - Hot weather<br>
                            🌧️ Monsoon - Rainy weather<br>
                            ❄️ Winter - Cold weather
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>What to Wear:</h3>
                        <p>• Summer: Light cotton clothes<br>
                        • Monsoon: Raincoat and umbrella<br>
                        • Winter: Warm clothes and sweaters</p>
                    </div>
                `
            }
        ]
    },
    english: {
        title: 'English',
        lessons: [
            {
                title: 'English Alphabet',
                content: `
                    <h2>Learning the English Alphabet</h2>
                    <p>The English alphabet has 26 letters. Let's learn them!</p>
                    
                    <div class="lesson-example">
                        <h3>Capital Letters (A-Z):</h3>
                        <div class="math-problem">
                            A B C D E F G H I J K L M<br>
                            N O P Q R S T U V W X Y Z
                        </div>
                    </div>
                    
                    <div class="lesson-example">
                        <h3>Small Letters (a-z):</h3>
                        <div class="math-problem">
                            a b c d e f g h i j k l m<br>
                            n o p q r s t u v w x y z
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Practice:</h3>
                        <p>Try to write each letter. Start with A, B, C...</p>
                    </div>
                `
            },
            {
                title: 'Simple Words',
                content: `
                    <h2>Learning Simple Words</h2>
                    <p>Let's learn some easy words that we use every day.</p>
                    
                    <div class="lesson-example">
                        <h3>Family Words:</h3>
                        <div class="math-problem">
                            Mother - मां<br>
                            Father - पिता<br>
                            Son - बेटा<br>
                            Daughter - बेटी<br>
                            Brother - भाई<br>
                            Sister - बहन
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Practice Reading:</h3>
                        <p>Point to each word and say it out loud. Practice every day!</p>
                    </div>
                `
            },
            {
                title: 'Common Objects',
                content: `
                    <h2>Names of Things Around Us</h2>
                    <p>Let's learn the English names of things we see every day.</p>
                    
                    <div class="lesson-example">
                        <h3>Home Objects:</h3>
                        <div class="math-problem">
                            Chair - कुर्सी<br>
                            Table - मेज<br>
                            Book - किताब<br>
                            Water - पानी<br>
                            Food - खाना<br>
                            House - घर
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Practice:</h3>
                        <p>Look around your home and try to name things in English!</p>
                    </div>
                `
            },
            {
                title: 'Simple Sentences',
                content: `
                    <h2>Making Simple Sentences</h2>
                    <p>A sentence is a group of words that tells us something complete.</p>
                    
                    <div class="lesson-example">
                        <h3>Easy Sentences:</h3>
                        <div class="math-problem">
                            I am happy. - मैं खुश हूं।<br>
                            This is a book. - यह एक किताब है।<br>
                            I like food. - मुझे खाना पसंद है।<br>
                            The sun is bright. - सूरज चमकीला है।
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>Try Making Sentences:</h3>
                        <p>Use words like: I, am, is, like, good, nice</p>
                    </div>
                `
            }
        ]
    },
    hindi: {
        title: 'हिंदी (Hindi)',
        lessons: [
            {
                title: 'स्वर (Vowels)',
                content: `
                    <h2>हिंदी के स्वर सीखें</h2>
                    <p>हिंदी में 11 स्वर होते हैं। आइए इन्हें सीखते हैं।</p>
                    
                    <div class="lesson-example">
                        <h3>स्वर (Vowels):</h3>
                        <div class="hindi-text">
                            अ आ इ ई उ ऊ<br>
                            ए ऐ ओ औ
                        </div>
                    </div>
                    
                    <div class="lesson-example">
                        <h3>स्वर की मात्राएं:</h3>
                        <div class="hindi-text">
                            ा ि ी ु ू<br>
                            े ै ो ौ
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>अभ्यास:</h3>
                        <p>हर स्वर को जोर से बोलें और लिखने का अभ्यास करें।</p>
                    </div>
                `
            },
            {
                title: 'व्यंजन (Consonants)',
                content: `
                    <h2>हिंदी के व्यंजन सीखें</h2>
                    <p>व्यंजन वे अक्षर हैं जो स्वर की मदद से बोले जाते हैं।</p>
                    
                    <div class="lesson-example">
                        <h3>पहले 10 व्यंजन:</h3>
                        <div class="hindi-text">
                            क ख ग घ ङ<br>
                            च छ ज झ ञ
                        </div>
                    </div>
                    
                    <div class="lesson-example">
                        <h3>और व्यंजन:</h3>
                        <div class="hindi-text">
                            ट ठ ड ढ ण<br>
                            त थ द ध न
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>अभ्यास:</h3>
                        <p>हर व्यंजन के साथ 'अ' लगाकर बोलें: क, ख, ग...</p>
                    </div>
                `
            },
            {
                title: 'सरल शब्द (Simple Words)',
                content: `
                    <h2>आसान हिंदी शब्द</h2>
                    <p>रोजमर्रा के उपयोग में आने वाले सरल शब्द सीखें।</p>
                    
                    <div class="lesson-example">
                        <h3>परिवार के शब्द:</h3>
                        <div class="hindi-text">
                            माता - Mother<br>
                            पिता - Father<br>
                            पुत्र - Son<br>
                            पुत्री - Daughter<br>
                            भाई - Brother<br>
                            बहन - Sister
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>अभ्यास:</h3>
                        <p>इन शब्दों को रोज पढ़ें और लिखने का अभ्यास करें।</p>
                    </div>
                `
            },
            {
                title: 'छोटे वाक्य (Short Sentences)',
                content: `
                    <h2>सरल हिंदी वाक्य</h2>
                    <p>छोटे और आसान वाक्य बनाना सीखें।</p>
                    
                    <div class="lesson-example">
                        <h3>आसान वाक्य:</h3>
                        <div class="hindi-text">
                            मैं खुश हूं।<br>
                            यह एक किताब है।<br>
                            सूरज चमकता है।<br>
                            पानी ठंडा है।<br>
                            फूल सुंदर है।
                        </div>
                    </div>
                    
                    <div class="lesson-exercise">
                        <h3>अभ्यास:</h3>
                        <p>इन वाक्यों को पढ़ें और अपने वाक्य बनाने की कोशिश करें।</p>
                    </div>
                `
            }
        ]
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Show loading screen
    setTimeout(() => {
        hideLoadingScreen();
        initializeApp();
    }, 3000);
    
    // Initialize event listeners
    setupEventListeners();
    
    // Load user progress from localStorage
    loadUserProgress();
});

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.opacity = '0';
    loadingScreen.style.visibility = 'hidden';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500);
}

function initializeApp() {
    // Initialize navigation
    setupNavigation();
    
    // Initialize progress tracking
    updateProgressDisplay();
    
    // Setup AI assistant
    setupAIAssistant();
    
    // Load settings
    loadSettings();
    
    // Add scroll animations
    setupScrollAnimations();
}

function setupEventListeners() {
    // Navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Enter key for chat input
    const userInput = document.getElementById('user-input');
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Settings form
    const apiKeyInput = document.getElementById('api-key');
    const largeTextCheckbox = document.getElementById('large-text');
    const highContrastCheckbox = document.getElementById('high-contrast');
    
    if (largeTextCheckbox) {
        largeTextCheckbox.addEventListener('change', toggleLargeText);
    }
    
    if (highContrastCheckbox) {
        highContrastCheckbox.addEventListener('change', toggleHighContrast);
    }
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Close mobile menu
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function openSubject(subject) {
    currentSubject = subject;
    currentLesson = 0;
    
    const modal = document.getElementById('learning-modal');
    const modalTitle = document.getElementById('modal-title');
    const lessonList = document.getElementById('lesson-list');
    
    if (modal && modalTitle && lessonList) {
        modalTitle.textContent = subjectData[subject].title;
        
        // Populate lesson list
        lessonList.innerHTML = '';
        subjectData[subject].lessons.forEach((lesson, index) => {
            const li = document.createElement('li');
            li.textContent = lesson.title;
            li.addEventListener('click', () => loadLesson(index));
            if (index === 0) li.classList.add('active');
            lessonList.appendChild(li);
        });
        
        // Load first lesson
        loadLesson(0);
        
        modal.style.display = 'block';
        modal.classList.add('animate-fade-in');
    }
}

function loadLesson(lessonIndex) {
    if (!currentSubject || !subjectData[currentSubject]) return;
    
    currentLesson = lessonIndex;
    const lesson = subjectData[currentSubject].lessons[lessonIndex];
    const lessonDisplay = document.getElementById('lesson-display');
    const lessonItems = document.querySelectorAll('.lesson-list li');
    
    if (lessonDisplay && lesson) {
        lessonDisplay.innerHTML = lesson.content;
        lessonDisplay.classList.add('animate-slide-up');
        
        // Update active lesson
        lessonItems.forEach((item, index) => {
            item.classList.toggle('active', index === lessonIndex);
        });
        
        // Track progress
        updateLessonProgress();
    }
}

function nextLesson() {
    if (!currentSubject || !subjectData[currentSubject]) return;
    
    const maxLessons = subjectData[currentSubject].lessons.length;
    if (currentLesson < maxLessons - 1) {
        loadLesson(currentLesson + 1);
        
        // Update progress
        userProgress[currentSubject] = Math.max(
            userProgress[currentSubject],
            ((currentLesson + 1) / maxLessons) * 100
        );
        saveUserProgress();
        updateProgressDisplay();
    } else {
        // Course completed
        showCourseCompletion();
    }
}

function previousLesson() {
    if (currentLesson > 0) {
        loadLesson(currentLesson - 1);
    }
}

function closeLearningModal() {
    const modal = document.getElementById('learning-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function updateLessonProgress() {
    if (!currentSubject) return;
    
    const maxLessons = subjectData[currentSubject].lessons.length;
    const progressPercentage = ((currentLesson + 1) / maxLessons) * 100;
    
    // Update subject card progress
    const subjectCard = document.querySelector(`[data-subject="${currentSubject}"]`);
    if (subjectCard) {
        const progressFill = subjectCard.querySelector('.progress-fill');
        const progressText = subjectCard.querySelector('.progress-text');
        
        if (progressFill && progressText) {
            progressFill.style.width = `${progressPercentage}%`;
            progressText.textContent = `${Math.round(progressPercentage)}% Complete`;
        }
    }
    
    // Update global progress
    userProgress[currentSubject] = Math.max(userProgress[currentSubject], progressPercentage);
    totalLessons = Math.max(totalLessons, currentLesson + 1);
    studyTime += 2; // Add 2 minutes per lesson
    
    saveUserProgress();
}

function showCourseCompletion() {
    achievements++;
    saveUserProgress();
    updateProgressDisplay();
    
    // Show completion message
    const lessonDisplay = document.getElementById('lesson-display');
    if (lessonDisplay) {
        lessonDisplay.innerHTML = `
            <div class="success-message animate-bounce">
                <h2>🎉 Congratulations!</h2>
                <p>You have completed the ${subjectData[currentSubject].title} course!</p>
                <p>Keep learning and exploring new subjects.</p>
            </div>
        `;
    }
}

// AI Assistant Functions
function setupAIAssistant() {
    // Initialize chat with welcome message
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
        // Welcome message is already in HTML
    }
}

async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const sendBtn = document.getElementById('send-btn');
    
    if (!userInput || !chatMessages || !sendBtn) return;
    
    const message = userInput.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    userInput.value = '';
    
    // Show loading state
    sendBtn.innerHTML = '<div class="spinner"></div>';
    sendBtn.disabled = true;
    
    try {
        // Get AI response
        const response = await getAIResponse(message);
        addMessageToChat(response, 'ai');
    } catch (error) {
        console.error('AI Error:', error);
        addMessageToChat('Sorry, I encountered an error. Please try again later.', 'ai');
    } finally {
        // Reset button
        sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
        sendBtn.disabled = false;
    }
}

function addMessageToChat(message, sender) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = sender === 'ai' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = `<p>${message}</p>`;
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function getAIResponse(userMessage) {
    const apiKeyInput = document.getElementById('api-key');
    const apiKey = apiKeyInput ? apiKeyInput.value || GEMINI_API_KEY : GEMINI_API_KEY;
    
    if (!apiKey) {
        return 'Please set your Gemini API key in the settings to use the AI assistant.';
    }
    
    const prompt = `You are a helpful AI assistant for senior citizens learning basic subjects like Mathematics, Science, English, and Hindi. 
    The user is asking: "${userMessage}"
    
    Please provide a simple, clear, and encouraging response. Use easy language and be patient. 
    If the question is about learning, provide step-by-step explanations with examples.
    Keep your response under 200 words and be supportive.`;
    
    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.error('Gemini API Error:', error);
        return 'I apologize, but I am having trouble connecting right now. Please try asking your question again in a moment.';
    }
}

function askQuickQuestion(question) {
    const userInput = document.getElementById('user-input');
    if (userInput) {
        userInput.value = question;
        sendMessage();
    }
}

function openAIAssistant() {
    scrollToSection('ai-assistant');
}

// Progress Functions
function updateProgressDisplay() {
    // Update stats
    const totalLessonsEl = document.getElementById('total-lessons');
    const studyTimeEl = document.getElementById('study-time');
    const achievementsEl = document.getElementById('achievements');
    
    if (totalLessonsEl) totalLessonsEl.textContent = totalLessons;
    if (studyTimeEl) studyTimeEl.textContent = studyTime;
    if (achievementsEl) achievementsEl.textContent = achievements;
    
    // Update subject progress bars
    Object.keys(userProgress).forEach(subject => {
        const progressBar = document.querySelector(`.${subject}-progress`);
        const progressItem = progressBar ? progressBar.closest('.subject-progress-item') : null;
        const percentageEl = progressItem ? progressItem.querySelector('.progress-percentage') : null;
        
        if (progressBar) {
            progressBar.style.width = `${userProgress[subject]}%`;
        }
        if (percentageEl) {
            percentageEl.textContent = `${Math.round(userProgress[subject])}%`;
        }
    });
}

function saveUserProgress() {
    const progressData = {
        userProgress,
        studyTime,
        achievements,
        totalLessons
    };
    localStorage.setItem('vidyaDhamProgress', JSON.stringify(progressData));
}

function loadUserProgress() {
    const saved = localStorage.getItem('vidyaDhamProgress');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            userProgress = data.userProgress || userProgress;
            studyTime = data.studyTime || 0;
            achievements = data.achievements || 0;
            totalLessons = data.totalLessons || 0;
        } catch (error) {
            console.error('Error loading progress:', error);
        }
    }
}

// Settings Functions
function openSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) {
        modal.style.display = 'block';
        loadSettings();
    }
}

function closeSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) {
        modal.style.display = 'none';
        saveSettings();
    }
}

function loadSettings() {
    const saved = localStorage.getItem('vidyaDhamSettings');
    if (saved) {
        try {
            const settings = JSON.parse(saved);
            
            const apiKeyInput = document.getElementById('api-key');
            const largeTextCheckbox = document.getElementById('large-text');
            const highContrastCheckbox = document.getElementById('high-contrast');
            
            if (apiKeyInput && settings.apiKey) {
                apiKeyInput.value = settings.apiKey;
            }
            if (largeTextCheckbox) {
                largeTextCheckbox.checked = settings.largeText || false;
                if (settings.largeText) document.body.classList.add('large-text');
            }
            if (highContrastCheckbox) {
                highContrastCheckbox.checked = settings.highContrast || false;
                if (settings.highContrast) document.body.classList.add('high-contrast');
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }
}

function saveSettings() {
    const apiKeyInput = document.getElementById('api-key');
    const largeTextCheckbox = document.getElementById('large-text');
    const highContrastCheckbox = document.getElementById('high-contrast');
    
    const settings = {
        apiKey: apiKeyInput ? apiKeyInput.value || '' : '',
        largeText: largeTextCheckbox ? largeTextCheckbox.checked || false : false,
        highContrast: highContrastCheckbox ? highContrastCheckbox.checked || false : false
    };
    
    localStorage.setItem('vidyaDhamSettings', JSON.stringify(settings));
}

function toggleLargeText() {
    const checkbox = document.getElementById('large-text');
    if (checkbox && checkbox.checked) {
        document.body.classList.add('large-text');
    } else {
        document.body.classList.remove('large-text');
    }
    saveSettings();
}

function toggleHighContrast() {
    const checkbox = document.getElementById('high-contrast');
    if (checkbox && checkbox.checked) {
        document.body.classList.add('high-contrast');
    } else {
        document.body.classList.remove('high-contrast');
    }
    saveSettings();
}

// Animation Functions
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.subject-card, .stat-card, .ai-header');
    animateElements.forEach(el => observer.observe(el));
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // Could show user-friendly error message here
});

// Service Worker Registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    // ESC key closes modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
    
    // Arrow keys for lesson navigation
    if (e.key === 'ArrowLeft' && e.ctrlKey) {
        previousLesson();
    }
    if (e.key === 'ArrowRight' && e.ctrlKey) {
        nextLesson();
    }
});

// Touch/Swipe Support for Mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next lesson
            nextLesson();
        } else {
            // Swipe right - previous lesson
            previousLesson();
        }
    }
}

// Voice Commands (if supported)
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(command);
    };
    
    function handleVoiceCommand(command) {
        if (command.includes('next lesson')) {
            nextLesson();
        } else if (command.includes('previous lesson')) {
            previousLesson();
        } else if (command.includes('open math') || command.includes('mathematics')) {
            openSubject('math');
        } else if (command.includes('open science')) {
            openSubject('science');
        } else if (command.includes('open english')) {
            openSubject('english');
        } else if (command.includes('open hindi')) {
            openSubject('hindi');
        }
    }
}

// Print Functionality
function printLesson() {
    const lessonContent = document.getElementById('lesson-display');
    if (lessonContent) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Lesson - Krishi Sampada</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        .math-problem, .hindi-text { font-size: 1.2em; text-align: center; margin: 20px 0; }
                        .lesson-example, .lesson-exercise { margin: 20px 0; padding: 15px; border-left: 4px solid #6366f1; }
                    </style>
                </head>
                <body>
                    ${lessonContent.innerHTML}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

// Export Progress
function exportProgress() {
    const progressData = {
        userProgress,
        studyTime,
        achievements,
        totalLessons,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(progressData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'vidya-dham-progress.json';
    link.click();
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
document.getElementById('contactForm').onsubmit = async function(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);

  const response = await fetch(form.action, {
    method: "POST",
    body: data,
    headers: { 'Accept': 'application/json' }
  });

  if (response.ok) {
    document.getElementById('form-status').innerHTML = "<div class='success-message'>Thank you! Your message has been sent.</div>";
    form.reset();
  } else {
    document.getElementById('form-status').innerHTML = "<div class='error-message'>Sorry! Something went wrong. Please try again.</div>";
  }
};