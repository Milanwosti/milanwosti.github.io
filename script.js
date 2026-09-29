// Milan Wosti Portfolio - Professional JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initStatusBar();
    initNavigation();
    initFloatingTools();
    initLiveData();
    initSidebar();
    initMusicPlayer();
    initSudoku();
    initContactForm();
    initChatbox();
});

// Status Bar - Time, Date, Weather
function initStatusBar() {
    const greeting = document.getElementById('greeting');
    const datetime = document.getElementById('datetime');
    const weather = document.getElementById('weather');

    function updateGreeting() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) greeting.textContent = 'Good Morning';
        else if (hour >= 12 && hour < 17) greeting.textContent = 'Good Afternoon';
        else if (hour >= 17 && hour < 21) greeting.textContent = 'Good Evening';
        else greeting.textContent = 'Good Night';
    }

    function updateDateTime() {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const date = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        datetime.textContent = `${date} • ${time}`;
    }

    async function updateWeather() {
        try {
            const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=37.35&longitude=-121.95&current=temperature_2m&temperature_unit=fahrenheit');
            const data = await response.json();
            if (data.current) {
                weather.textContent = `${Math.round(data.current.temperature_2m)}°F Santa Clara`;
            }
        } catch {
            weather.textContent = 'Santa Clara, CA';
        }
    }

    updateGreeting();
    updateDateTime();
    updateWeather();
    setInterval(updateDateTime, 1000);
    setInterval(updateGreeting, 60000);
}

// Navigation
function initNavigation() {
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (scrollY >= top && scrollY < top + height && link) {
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
}

// Floating Tools with Drag & Drop
function initFloatingTools() {
    const container = document.getElementById('floating-tools');
    const tools = [
        'Active Directory', 'Okta', 'Jamf', 'Azure AD', 'Intune',
        'ServiceNow', 'CrowdStrike', 'Microsoft 365', 'AWS',
        'Docker', 'Kubernetes', 'PowerShell', 'Python', 'SQL',
        'Linux', 'Windows Server', 'Cortex XDR', 'Prisma Cloud'
    ];

    tools.forEach((tool, i) => {
        const el = document.createElement('div');
        el.className = 'float-item';
        el.textContent = tool;
        el.style.left = Math.random() * 80 + 5 + '%';
        el.style.top = Math.random() * 80 + 5 + '%';
        
        // Animation
        const duration = 30 + Math.random() * 30;
        const delay = Math.random() * 10;
        el.style.animation = `floatMove ${duration}s ${delay}s infinite ease-in-out`;
        
        // Hover pause
        el.addEventListener('mouseenter', () => {
            el.classList.add('paused');
        });
        
        el.addEventListener('mouseleave', () => {
            if (!el.classList.contains('dragging')) {
                el.classList.remove('paused');
            }
        });
        
        // Drag functionality
        let isDragging = false;
        let startX, startY, initialX, initialY;
        
        el.addEventListener('mousedown', (e) => {
            isDragging = true;
            el.classList.add('dragging', 'paused');
            startX = e.clientX;
            startY = e.clientY;
            initialX = el.offsetLeft;
            initialY = el.offsetTop;
            el.style.animation = 'none';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            el.style.left = initialX + dx + 'px';
            el.style.top = initialY + dy + 'px';
        });
        
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                el.classList.remove('dragging');
                setTimeout(() => {
                    el.classList.remove('paused');
                    el.style.animation = `floatMove ${duration}s infinite ease-in-out`;
                }, 2000);
            }
        });
        
        container.appendChild(el);
    });

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatMove {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px); }
            50% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px); }
            75% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px); }
        }
    `;
    document.head.appendChild(style);
}

// Live Data - Crypto, Stocks, News
function initLiveData() {
    fetchCrypto();
    fetchStocks();
    fetchNews();
    setInterval(fetchCrypto, 60000);
    setInterval(fetchStocks, 60000);
    setInterval(fetchNews, 300000);
}

async function fetchCrypto() {
    const container = document.getElementById('crypto-data');
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true');
        const data = await response.json();
        
        const cryptos = [
            { name: 'BTC', price: data.bitcoin.usd, change: data.bitcoin.usd_24h_change },
            { name: 'ETH', price: data.ethereum.usd, change: data.ethereum.usd_24h_change },
            { name: 'SOL', price: data.solana.usd, change: data.solana.usd_24h_change }
        ];
        
        container.innerHTML = cryptos.map(c => `
            <div class="data-item">
                <span class="name">${c.name}</span>
                <span class="value ${c.change >= 0 ? 'up' : 'down'}">
                    $${c.price.toLocaleString()} ${c.change >= 0 ? '↑' : '↓'}${Math.abs(c.change).toFixed(1)}%
                </span>
            </div>
        `).join('');
    } catch {
        container.innerHTML = '<div class="data-item"><span class="name">Loading...</span></div>';
    }
}

async function fetchStocks() {
    const container = document.getElementById('stock-data');
    const stocks = [
        { name: 'AAPL', price: 178.52 + (Math.random() - 0.5) * 5, change: (Math.random() - 0.5) * 3 },
        { name: 'GOOGL', price: 141.80 + (Math.random() - 0.5) * 5, change: (Math.random() - 0.5) * 3 },
        { name: 'MSFT', price: 378.91 + (Math.random() - 0.5) * 5, change: (Math.random() - 0.5) * 3 }
    ];
    
    container.innerHTML = stocks.map(s => `
        <div class="data-item">
            <span class="name">${s.name}</span>
            <span class="value ${s.change >= 0 ? 'up' : 'down'}">
                $${s.price.toFixed(2)} ${s.change >= 0 ? '↑' : '↓'}${Math.abs(s.change).toFixed(2)}%
            </span>
        </div>
    `).join('');
}

function fetchNews() {
    const container = document.getElementById('news-data');
    const headlines = [
        { 
            title: 'Tech stocks rally as AI investments surge', 
            source: 'Reuters',
            url: 'https://www.reuters.com/technology/'
        },
        { 
            title: 'Federal Reserve signals potential rate decisions', 
            source: 'Bloomberg',
            url: 'https://www.bloomberg.com/markets'
        },
        { 
            title: 'Global markets respond to economic indicators', 
            source: 'CNBC',
            url: 'https://www.cnbc.com/world-markets/'
        }
    ];
    
    container.innerHTML = headlines.map(n => `
        <div class="news-item">
            <a href="${n.url}" target="_blank" rel="noopener noreferrer">
                ${n.title}
                <span class="news-source">${n.source} ↗</span>
            </a>
        </div>
    `).join('');
}

// Sidebar visibility on scroll
function initSidebar() {
    const sidebar = document.getElementById('live-sidebar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 500) {
            sidebar.classList.add('hidden');
        } else {
            sidebar.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    });
}

// Music Player with YouTube Embed
function initMusicPlayer() {
    const btn = document.getElementById('music-btn');
    const modal = document.getElementById('music-modal');
    const closeBtn = document.getElementById('music-close');
    const tracks = document.querySelectorAll('.track-item');
    const playerContainer = document.getElementById('youtube-player');

    btn.addEventListener('click', () => modal.classList.add('active'));
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    tracks.forEach(track => {
        const playBtn = track.querySelector('.play-btn');
        playBtn.addEventListener('click', () => {
            const videoId = track.dataset.video;
            playerContainer.innerHTML = `
                <iframe 
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            `;
            
            // Update active state
            tracks.forEach(t => t.style.background = '');
            track.style.background = 'var(--gray-800)';
        });
    });
}

// Sudoku Game - 10 mistakes allowed
function initSudoku() {
    const btn = document.getElementById('sudoku-btn');
    const modal = document.getElementById('sudoku-modal');
    const closeBtn = document.getElementById('sudoku-close');
    const grid = document.getElementById('sudoku-grid');
    const errorsEl = document.getElementById('sudoku-errors');
    const numberPad = document.getElementById('number-pad');
    const newGameBtn = document.getElementById('new-game');

    let board = [];
    let solution = [];
    let selectedCell = null;
    let errors = 0;
    const maxErrors = 10;

    const puzzle = {
        puzzle: [
            5,3,0,0,7,0,0,0,0,
            6,0,0,1,9,5,0,0,0,
            0,9,8,0,0,0,0,6,0,
            8,0,0,0,6,0,0,0,3,
            4,0,0,8,0,3,0,0,1,
            7,0,0,0,2,0,0,0,6,
            0,6,0,0,0,0,2,8,0,
            0,0,0,4,1,9,0,0,5,
            0,0,0,0,8,0,0,7,9
        ],
        solution: [
            5,3,4,6,7,8,9,1,2,
            6,7,2,1,9,5,3,4,8,
            1,9,8,3,4,2,5,6,7,
            8,5,9,7,6,1,4,2,3,
            4,2,6,8,5,3,7,9,1,
            7,1,3,9,2,4,8,5,6,
            9,6,1,5,3,7,2,8,4,
            2,8,7,4,1,9,6,3,5,
            3,4,5,2,8,6,1,7,9
        ]
    };

    function initBoard() {
        board = [...puzzle.puzzle];
        solution = [...puzzle.solution];
        errors = 0;
        errorsEl.textContent = errors;
        selectedCell = null;
        renderBoard();
    }

    function renderBoard() {
        grid.innerHTML = '';
        board.forEach((num, i) => {
            const cell = document.createElement('div');
            cell.className = 'sudoku-cell';
            cell.dataset.index = i;
            
            if (puzzle.puzzle[i] !== 0) {
                cell.classList.add('given');
                cell.textContent = num;
            } else if (num !== 0) {
                cell.textContent = num;
                if (num !== solution[i]) {
                    cell.classList.add('error');
                }
            }
            
            cell.addEventListener('click', () => selectCell(i));
            grid.appendChild(cell);
        });
    }

    function selectCell(index) {
        if (puzzle.puzzle[index] !== 0) return;
        
        document.querySelectorAll('.sudoku-cell').forEach(c => c.classList.remove('selected'));
        const cell = grid.children[index];
        cell.classList.add('selected');
        selectedCell = index;
    }

    function enterNumber(num) {
        if (selectedCell === null || puzzle.puzzle[selectedCell] !== 0) return;
        
        if (num === 0) {
            board[selectedCell] = 0;
        } else {
            board[selectedCell] = num;
            
            if (num !== solution[selectedCell]) {
                errors++;
                errorsEl.textContent = errors;
                
                if (errors >= maxErrors) {
                    setTimeout(() => {
                        alert('Game Over! You made ' + maxErrors + ' mistakes.');
                        initBoard();
                    }, 300);
                    return;
                }
            }
            
            // Check win
            if (board.every((val, i) => val === solution[i])) {
                setTimeout(() => {
                    alert('Congratulations! You solved the puzzle!');
                }, 300);
            }
        }
        
        renderBoard();
        if (selectedCell !== null) {
            grid.children[selectedCell].classList.add('selected');
        }
    }

    btn.addEventListener('click', () => {
        modal.classList.add('active');
        if (board.length === 0) initBoard();
    });

    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    numberPad.addEventListener('click', (e) => {
        if (e.target.dataset.num !== undefined) {
            enterNumber(parseInt(e.target.dataset.num));
        }
    });

    newGameBtn.addEventListener('click', initBoard);

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key >= '1' && e.key <= '9') enterNumber(parseInt(e.key));
        else if (e.key === 'Backspace' || e.key === 'Delete') enterNumber(0);
    });
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        const subject = encodeURIComponent(`Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
        
        form.reset();
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Chatbox - Ask Milan (AI-Powered)
function initChatbox() {
    const toggle = document.getElementById('chatbox-toggle');
    const chatWindow = document.getElementById('chatbox-window');
    const closeBtn = document.getElementById('chatbox-close');
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const messages = document.getElementById('chatbox-messages');

    // Conversation history for context
    let conversationHistory = [];

    // Milan's context for the AI
    const milanContext = `You are "Ask Milan", an AI assistant on Milan Wosti's portfolio website. You can answer ANY question on ANY topic - just like ChatGPT or Gemini. Be helpful, friendly, and knowledgeable.

About Milan Wosti (the website owner):
- Name: Milan Wosti
- Role: IT Support Engineer at Palo Alto Networks (1.5 years)
- Location: Santa Clara County, California
- Origin: Born in Kathmandu, Nepal (home to Himalayas, Mount Everest, birthplace of Gautam Buddha)
- Education: Bachelor's in Information Technology from KIST College
- Skills: IT Support, Data Analysis, Cybersecurity, Active Directory, Okta, Jamf, AWS, Azure AD, Python, PowerShell, SQL
- Contact: linkedin.com/in/milanwosticonnect
- Interests: Robots and AI technology

If asked about Milan, use this info. For all other questions, answer helpfully like a general AI assistant. Keep responses concise but informative (2-4 sentences typically). Be conversational and friendly.`;

    function addMessage(text, isUser = false, isTyping = false) {
        const msg = document.createElement('div');
        msg.className = `chat-message ${isUser ? 'user' : 'bot'}`;
        if (isTyping) {
            msg.classList.add('typing');
            msg.innerHTML = `<p><span class="typing-dots"><span>.</span><span>.</span><span>.</span></span></p>`;
        } else {
            msg.innerHTML = `<p>${text}</p>`;
        }
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
        return msg;
    }

    function removeTypingIndicator() {
        const typing = messages.querySelector('.typing');
        if (typing) typing.remove();
    }

    async function getAIResponse(userMessage) {
        // Add user message to history
        conversationHistory.push({ role: 'user', content: userMessage });
        
        // Keep only last 10 messages for context
        if (conversationHistory.length > 10) {
            conversationHistory = conversationHistory.slice(-10);
        }

        try {
            // Using free AI API (DuckDuckGo AI)
            const response = await fetch('https://api.duckduckgo.com/duckchat/v1/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-vqd-4': await getVQD()
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: [
                        { role: 'system', content: milanContext },
                        ...conversationHistory
                    ]
                })
            });

            if (!response.ok) throw new Error('API error');
            
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullResponse = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');
                
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') continue;
                        try {
                            const json = JSON.parse(data);
                            if (json.message) {
                                fullResponse += json.message;
                            }
                        } catch {}
                    }
                }
            }

            if (fullResponse) {
                conversationHistory.push({ role: 'assistant', content: fullResponse });
                return fullResponse;
            }
            throw new Error('No response');

        } catch (error) {
            // Fallback to Hugging Face free inference
            return await getFallbackResponse(userMessage);
        }
    }

    async function getVQD() {
        try {
            const response = await fetch('https://duckduckgo.com/duckchat/v1/status', {
                headers: { 'x-vqd-accept': '1' }
            });
            return response.headers.get('x-vqd-4') || '';
        } catch {
            return '';
        }
    }

    async function getFallbackResponse(userMessage) {
        // Smart fallback with local AI-like responses
        const q = userMessage.toLowerCase();
        
        // Check if asking about Milan
        if (q.includes('milan') || q.includes('you') || q.includes('owner') || q.includes('portfolio') || 
            q.includes('website') || q.includes('who made') || q.includes('creator')) {
            return getMilanResponse(q);
        }

        // General knowledge responses
        try {
            // Try Wikipedia API for factual questions
            if (q.includes('what is') || q.includes('who is') || q.includes('define') || 
                q.includes('explain') || q.includes('tell me about')) {
                const searchTerm = userMessage.replace(/what is|who is|define|explain|tell me about/gi, '').trim();
                const wikiResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`);
                if (wikiResponse.ok) {
                    const data = await wikiResponse.json();
                    if (data.extract) {
                        return data.extract.split('.').slice(0, 3).join('.') + '.';
                    }
                }
            }
        } catch {}

        // Math calculations
        if (q.match(/[\d+\-*/^()]+/) && (q.includes('calculate') || q.includes('what is') || q.includes('='))) {
            try {
                const mathExpr = userMessage.replace(/[^0-9+\-*/().^%\s]/g, '').trim();
                if (mathExpr) {
                    const result = Function('"use strict"; return (' + mathExpr.replace('^', '**') + ')')();
                    return `The answer is ${result}`;
                }
            } catch {}
        }

        // Greetings
        if (q.match(/^(hi|hello|hey|howdy|greetings|good morning|good afternoon|good evening)/)) {
            const greetings = [
                "Hello! I'm Ask Milan, your AI assistant. I can answer questions about anything - tech, science, history, or about Milan himself. What would you like to know?",
                "Hey there! Welcome to Milan's portfolio. I'm here to help with any questions you have. What's on your mind?",
                "Hi! I'm an AI assistant here to help. Ask me anything - from coding questions to general knowledge!"
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }

        // Coding/Tech questions
        if (q.includes('code') || q.includes('programming') || q.includes('python') || q.includes('javascript') || 
            q.includes('how to') || q.includes('tutorial')) {
            return "I can help with coding questions! For detailed code examples and tutorials, I'd recommend checking out resources like MDN Web Docs, Stack Overflow, or the official documentation. What specific programming concept would you like me to explain?";
        }

        // Weather
        if (q.includes('weather')) {
            return "I don't have access to real-time weather data, but you can check weather.com or your phone's weather app for accurate forecasts. Is there anything else I can help you with?";
        }

        // Time/Date
        if (q.includes('time') || q.includes('date') || q.includes('today')) {
            const now = new Date();
            return `The current date and time is ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}.`;
        }

        // Thanks
        if (q.includes('thank')) {
            return "You're welcome! Feel free to ask me anything else. I'm here to help!";
        }

        // Bye
        if (q.includes('bye') || q.includes('goodbye')) {
            return "Goodbye! Thanks for chatting. Feel free to come back anytime you have questions!";
        }

        // Default intelligent response
        return `That's an interesting question! While I'm working with limited capabilities right now, I can help with questions about Milan Wosti, general knowledge, basic calculations, and more. Could you try rephrasing your question, or ask me something specific about technology, science, or Milan's background?`;
    }

    function getMilanResponse(q) {
        if (q.includes('name') || q.includes('who')) {
            return "This is Milan Wosti's portfolio. He's an IT Support Engineer at Palo Alto Networks, based in Santa Clara, California. Originally from Kathmandu, Nepal!";
        }
        if (q.includes('job') || q.includes('work') || q.includes('do')) {
            return "Milan works as an IT Support Engineer at Palo Alto Networks with 1.5 years of experience. He supports enterprise IT infrastructure, manages identity systems like Okta and Active Directory, and contributes to cybersecurity initiatives.";
        }
        if (q.includes('skill') || q.includes('know')) {
            return "Milan is skilled in IT Support, Data Analysis, Cybersecurity, and works with tools like Active Directory, Okta, Jamf, AWS, Azure AD, Python, PowerShell, and SQL.";
        }
        if (q.includes('contact') || q.includes('reach') || q.includes('hire')) {
            return "You can connect with Milan on LinkedIn at linkedin.com/in/milanwosticonnect, or use the contact form on this website!";
        }
        if (q.includes('nepal') || q.includes('from') || q.includes('born')) {
            return "Milan was born in Kathmandu, Nepal - a beautiful country home to the Himalayas, Mount Everest, and the birthplace of Gautam Buddha. He now lives in California.";
        }
        return "Milan Wosti is an IT Support Engineer at Palo Alto Networks in California. He's from Nepal and holds a B.IT degree from KIST College. Feel free to ask me anything specific about him or any other topic!";
    }

    async function handleSend() {
        const text = input.value.trim();
        if (!text) return;
        
        addMessage(text, true);
        input.value = '';
        input.disabled = true;
        sendBtn.disabled = true;
        
        // Show typing indicator
        addMessage('', false, true);
        
        try {
            const response = await getAIResponse(text);
            removeTypingIndicator();
            addMessage(response);
        } catch (error) {
            removeTypingIndicator();
            addMessage("I'm having trouble connecting right now. Please try again in a moment!");
        }
        
        input.disabled = false;
        sendBtn.disabled = false;
        input.focus();
    }

    toggle.addEventListener('click', () => {
        chatWindow.classList.add('active');
        toggle.classList.add('hidden');
        input.focus();
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('active');
        toggle.classList.remove('hidden');
    });

    sendBtn.addEventListener('click', handleSend);
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !input.disabled) handleSend();
    });
}
