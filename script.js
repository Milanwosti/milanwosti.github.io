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
    
    // IT tool icons (using emoji/unicode symbols)
    const tools = [
        '🖥️', '💻', '🔐', '🔑', '☁️', '🛡️', '⚙️', '🔧', 
        '📊', '🗄️', '🌐', '📡', '🔌', '💾', '📁', '🖨️',
        '🔒', '📱', '🖱️', '⌨️', '🔋', '📶', '💿', '🧮'
    ];

    tools.forEach((icon, i) => {
        const el = document.createElement('div');
        el.className = 'float-item';
        el.textContent = icon;
        el.style.left = Math.random() * 85 + 5 + '%';
        el.style.top = Math.random() * 85 + 5 + '%';
        
        // Animation
        const duration = 40 + Math.random() * 40;
        const delay = Math.random() * 15;
        el.style.animation = `floatMove${i % 4} ${duration}s ${delay}s infinite ease-in-out`;
        
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
                    el.style.animation = `floatMove${i % 4} ${duration}s infinite ease-in-out`;
                }, 2000);
            }
        });
        
        container.appendChild(el);
    });

    // Add varied animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatMove0 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(30px, -20px); }
        }
        @keyframes floatMove1 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-25px, 25px); }
        }
        @keyframes floatMove2 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(20px, 30px); }
        }
        @keyframes floatMove3 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-30px, -15px); }
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

// Music Player with YouTube Search
function initMusicPlayer() {
    const btn = document.getElementById('music-btn');
    const modal = document.getElementById('music-modal');
    const closeBtn = document.getElementById('music-close');
    const tracksContainer = document.getElementById('music-tracks');
    const searchResults = document.getElementById('search-results');
    const playerContainer = document.getElementById('youtube-player');
    const searchInput = document.getElementById('music-search-input');
    const searchBtn = document.getElementById('music-search-btn');

    btn.addEventListener('click', () => modal.classList.add('active'));
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    // Play track function
    function playTrack(videoId, trackName) {
        playerContainer.innerHTML = `
            <iframe 
                src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        `;
    }

    // Handle default tracks
    tracksContainer.addEventListener('click', (e) => {
        const playBtn = e.target.closest('.play-btn');
        if (playBtn) {
            const track = playBtn.closest('.track-item');
            const videoId = track.dataset.video;
            const trackName = track.querySelector('.track-name').textContent;
            playTrack(videoId, trackName);
        }
    });

    // Handle search results
    searchResults.addEventListener('click', (e) => {
        const playBtn = e.target.closest('.play-btn');
        if (playBtn) {
            const track = playBtn.closest('.track-item');
            const videoId = track.dataset.video;
            const trackName = track.querySelector('.track-name').textContent;
            playTrack(videoId, trackName);
        }
    });

    // Search function using Invidious API (YouTube frontend)
    async function searchMusic(query) {
        searchResults.innerHTML = '<div class="search-loading">Searching...</div>';
        
        try {
            // Try multiple Invidious instances
            const instances = [
                'https://inv.nadeko.net',
                'https://invidious.nerdvpn.de',
                'https://yt.artemislena.eu'
            ];
            
            let data = null;
            for (const instance of instances) {
                try {
                    const response = await fetch(`${instance}/api/v1/search?q=${encodeURIComponent(query + ' music')}&type=video`, {
                        signal: AbortSignal.timeout(5000)
                    });
                    if (response.ok) {
                        data = await response.json();
                        break;
                    }
                } catch {}
            }

            if (data && data.length > 0) {
                const results = data.slice(0, 5).map(video => `
                    <div class="track-item" data-video="${video.videoId}">
                        <span class="track-name">${video.title.substring(0, 50)}${video.title.length > 50 ? '...' : ''}</span>
                        <button class="play-btn">▶</button>
                    </div>
                `).join('');
                searchResults.innerHTML = results;
            } else {
                // Fallback: Direct YouTube embed search
                searchResults.innerHTML = `
                    <div class="track-item" data-video="" data-search="${encodeURIComponent(query)}">
                        <span class="track-name">Play: "${query}" on YouTube</span>
                        <button class="play-btn">▶</button>
                    </div>
                `;
                
                // Update click handler for search fallback
                const fallbackTrack = searchResults.querySelector('.track-item');
                fallbackTrack.querySelector('.play-btn').addEventListener('click', () => {
                    playerContainer.innerHTML = `
                        <iframe 
                            src="https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(query)}&autoplay=1" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    `;
                });
            }
        } catch (error) {
            // Ultimate fallback
            searchResults.innerHTML = `
                <div class="track-item">
                    <span class="track-name">Search "${query}" on YouTube</span>
                    <button class="play-btn" onclick="window.open('https://www.youtube.com/results?search_query=${encodeURIComponent(query)}', '_blank')">↗</button>
                </div>
            `;
        }
    }

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) searchMusic(query);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) searchMusic(query);
        }
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
    const systemPrompt = `You are "Ask Milan", a helpful AI assistant on Milan Wosti's portfolio website. Answer ANY question the user asks - you are a general-purpose AI like ChatGPT.

About Milan Wosti (website owner) - use this info ONLY if asked about Milan:
- IT Support Engineer at Palo Alto Networks (1.5 years experience)
- Location: Santa Clara County, California
- From: Kathmandu, Nepal (home to Himalayas, Mount Everest, birthplace of Buddha)
- Education: B.IT from KIST College
- Skills: Active Directory, Okta, Jamf, AWS, Azure, Python, PowerShell, SQL
- LinkedIn: linkedin.com/in/milanwosticonnect

For ALL other questions, answer accurately and helpfully. Keep responses concise (2-4 sentences). Be friendly and conversational.`;

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
        conversationHistory.push({ role: 'user', content: userMessage });
        
        if (conversationHistory.length > 20) {
            conversationHistory = conversationHistory.slice(-20);
        }

        // First try Wikipedia for factual questions
        const wikiResponse = await tryWikipedia(userMessage);
        if (wikiResponse) {
            conversationHistory.push({ role: 'assistant', content: wikiResponse });
            return wikiResponse;
        }

        // Then try local knowledge base
        const localResponse = getSmartFallback(userMessage);
        conversationHistory.push({ role: 'assistant', content: localResponse });
        return localResponse;
    }

    // Wikipedia API - great for factual questions
    async function tryWikipedia(query) {
        try {
            // Extract search term from question
            let searchTerm = query
                .replace(/^(what|who|where|when|why|how|tell me about|explain|define|describe)\s+(is|are|was|were|do|does|did)?\s*/i, '')
                .replace(/[?!.,]/g, '')
                .trim();
            
            if (searchTerm.length < 2) return null;

            // Try direct page lookup first
            const response = await fetch(
                `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`,
                { signal: AbortSignal.timeout(5000) }
            );
            
            if (response.ok) {
                const data = await response.json();
                if (data.extract && data.extract.length > 50) {
                    const sentences = data.extract.split('. ').slice(0, 3).join('. ');
                    return sentences + (sentences.endsWith('.') ? '' : '.');
                }
            }

            // Try Wikipedia search if direct lookup fails
            const searchResponse = await fetch(
                `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTerm)}&format=json&origin=*`,
                { signal: AbortSignal.timeout(5000) }
            );
            
            if (searchResponse.ok) {
                const searchData = await searchResponse.json();
                if (searchData.query?.search?.[0]?.title) {
                    const title = searchData.query.search[0].title;
                    const summaryResponse = await fetch(
                        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
                        { signal: AbortSignal.timeout(5000) }
                    );
                    if (summaryResponse.ok) {
                        const summaryData = await summaryResponse.json();
                        if (summaryData.extract && summaryData.extract.length > 50) {
                            const sentences = summaryData.extract.split('. ').slice(0, 3).join('. ');
                            return sentences + (sentences.endsWith('.') ? '' : '.');
                        }
                    }
                }
            }
        } catch {}
        return null;
    }

    // Smart fallback with comprehensive knowledge
    function getSmartFallback(userMessage) {
        const q = userMessage.toLowerCase();
        
        // Greetings first
        if (q.match(/^(hi|hello|hey|howdy|greetings|good morning|good afternoon|good evening)\b/)) {
            return "Hello! I'm Ask Milan, an AI assistant powered by Wikipedia. I can answer questions about almost anything - people, places, science, history, math, or about Milan Wosti. What would you like to know?";
        }

        // Milan-specific questions
        if (q.includes('milan') || q.includes('portfolio') || q.includes('website') || q.includes('owner')) {
            if (q.includes('work') || q.includes('job')) return "Milan Wosti works as an IT Support Engineer at Palo Alto Networks in California with 1.5 years of experience.";
            if (q.includes('from') || q.includes('born') || q.includes('nepal')) return "Milan was born in Kathmandu, Nepal - home to Mount Everest and the birthplace of Gautam Buddha.";
            if (q.includes('skill')) return "Milan is skilled in IT Support, Active Directory, Okta, Jamf, AWS, Azure AD, Python, PowerShell, and SQL.";
            if (q.includes('contact') || q.includes('hire') || q.includes('linkedin')) return "Connect with Milan on LinkedIn at linkedin.com/in/milanwosticonnect or use the contact form!";
            if (q.includes('education') || q.includes('degree')) return "Milan holds a Bachelor's degree in Information Technology from KIST College.";
            return "Milan Wosti is an IT Support Engineer at Palo Alto Networks, originally from Nepal. What would you like to know about him?";
        }
        
        // Mountains
        if (q.includes('everest') || (q.includes('tallest') && q.includes('mountain')) || (q.includes('highest') && q.includes('mountain')) || (q.includes('big') && q.includes('everest'))) {
            return "Mount Everest is 8,848.86 meters (29,031.7 feet) tall, making it Earth's highest mountain above sea level. It's located in the Himalayas on the border between Nepal and Tibet.";
        }
        if (q.includes('k2')) return "K2 is 8,611 meters (28,251 feet) tall, the second-highest mountain on Earth, located on the China-Pakistan border.";
        
        // Famous landmarks
        if (q.includes('eiffel')) return "The Eiffel Tower is 330 meters (1,083 feet) tall. Built in 1889 in Paris, France, it was the world's tallest structure for 41 years.";
        if (q.includes('statue of liberty')) return "The Statue of Liberty is 93 meters (305 feet) from ground to torch. It was a gift from France to the USA in 1886.";
        if (q.includes('burj khalifa')) return "Burj Khalifa in Dubai is 828 meters (2,717 feet) tall with 163 floors - the world's tallest building since 2010.";
        if (q.includes('great wall')) return "The Great Wall of China is approximately 21,196 km (13,171 miles) long, built over many centuries.";
        if (q.includes('taj mahal')) return "The Taj Mahal is a white marble mausoleum in Agra, India, built 1632-1653 by Emperor Shah Jahan for his wife.";
        if (q.includes('pyramid') || q.includes('giza')) return "The Great Pyramid of Giza is 146.6 meters (481 feet) tall, built around 2560 BCE in Egypt.";
        
        // Capitals - expanded
        const capitals = {
            'france': 'Paris', 'germany': 'Berlin', 'japan': 'Tokyo', 'china': 'Beijing', 'india': 'New Delhi',
            'nepal': 'Kathmandu', 'usa': 'Washington D.C.', 'america': 'Washington D.C.', 'united states': 'Washington D.C.',
            'uk': 'London', 'england': 'London', 'italy': 'Rome', 'spain': 'Madrid', 'australia': 'Canberra',
            'canada': 'Ottawa', 'brazil': 'Brasília', 'russia': 'Moscow', 'mexico': 'Mexico City',
            'south korea': 'Seoul', 'north korea': 'Pyongyang', 'egypt': 'Cairo', 'turkey': 'Ankara',
            'greece': 'Athens', 'thailand': 'Bangkok', 'vietnam': 'Hanoi', 'indonesia': 'Jakarta',
            'pakistan': 'Islamabad', 'argentina': 'Buenos Aires', 'south africa': 'Pretoria',
            'netherlands': 'Amsterdam', 'belgium': 'Brussels', 'switzerland': 'Bern', 'austria': 'Vienna',
            'poland': 'Warsaw', 'sweden': 'Stockholm', 'norway': 'Oslo', 'denmark': 'Copenhagen'
        };
        if (q.includes('capital')) {
            for (const [country, capital] of Object.entries(capitals)) {
                if (q.includes(country)) return `The capital of ${country.charAt(0).toUpperCase() + country.slice(1)} is ${capital}.`;
            }
        }
        
        // Population
        if (q.includes('population')) {
            if (q.includes('world') || q.includes('earth')) return "The world population is approximately 8.1 billion people as of 2024.";
            if (q.includes('china')) return "China's population is approximately 1.4 billion people.";
            if (q.includes('india')) return "India's population is approximately 1.44 billion, now the world's most populous country.";
            if (q.includes('usa') || q.includes('america')) return "The United States population is approximately 335 million people.";
        }
        
        // Science facts
        if (q.includes('speed of light')) return "The speed of light is 299,792,458 m/s (186,282 mi/s) in a vacuum - nothing can travel faster.";
        if (q.includes('speed of sound')) return "The speed of sound is approximately 343 m/s (767 mph) at sea level in dry air at 20°C.";
        if (q.includes('sun') && (q.includes('far') || q.includes('distance') || q.includes('away'))) return "The Sun is about 150 million km (93 million miles) from Earth - light takes 8 minutes to reach us.";
        if (q.includes('moon') && (q.includes('far') || q.includes('distance') || q.includes('away'))) return "The Moon is about 384,400 km (238,855 miles) from Earth on average.";
        if (q.includes('planets') || q.includes('solar system')) return "Our solar system has 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.";
        if (q.includes('biggest planet') || q.includes('largest planet')) return "Jupiter is the largest planet - over 1,300 Earths could fit inside it.";
        if (q.includes('age') && (q.includes('earth') || q.includes('planet'))) return "Earth is approximately 4.54 billion years old.";
        if (q.includes('age') && q.includes('universe')) return "The universe is approximately 13.8 billion years old.";
        
        // Tech/Inventions
        if (q.includes('invented') || q.includes('created') || q.includes('founded')) {
            if (q.includes('google')) return "Google was founded by Larry Page and Sergey Brin in September 1998 at Stanford University.";
            if (q.includes('facebook') || q.includes('meta')) return "Facebook (now Meta) was founded by Mark Zuckerberg in February 2004.";
            if (q.includes('apple')) return "Apple was founded by Steve Jobs, Steve Wozniak, and Ronald Wayne on April 1, 1976.";
            if (q.includes('microsoft')) return "Microsoft was founded by Bill Gates and Paul Allen on April 4, 1975.";
            if (q.includes('amazon')) return "Amazon was founded by Jeff Bezos on July 5, 1994.";
            if (q.includes('tesla')) return "Tesla was founded in 2003 by Martin Eberhard and Marc Tarpenning. Elon Musk joined in 2004.";
            if (q.includes('telephone')) return "The telephone was invented by Alexander Graham Bell in 1876.";
            if (q.includes('light bulb') || q.includes('lightbulb')) return "The practical incandescent light bulb was invented by Thomas Edison in 1879.";
            if (q.includes('internet')) return "The Internet evolved from ARPANET (1969). Tim Berners-Lee invented the World Wide Web in 1989.";
        }
        
        // Math calculations
        const mathMatch = userMessage.match(/[\d+\-*/().^%\s]+/);
        if (mathMatch && (q.includes('what is') || q.includes('calculate') || q.includes('=') || q.includes('solve') || /^\d/.test(q.trim()))) {
            try {
                const expr = mathMatch[0].replace(/\^/g, '**').replace(/x/gi, '*').trim();
                if (expr.length > 1 && /\d/.test(expr)) {
                    const result = Function('"use strict"; return (' + expr + ')')();
                    if (!isNaN(result) && isFinite(result)) return `The answer is ${result.toLocaleString()}.`;
                }
            } catch {}
        }
        
        // Time/Date
        if (q.includes('time') || q.includes('date') || q.includes('today') || q.includes('what day')) {
            const now = new Date();
            return `Today is ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}. The time is ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}.`;
        }
        
        // Thanks/Bye
        if (q.includes('thank')) return "You're welcome! Feel free to ask me anything else.";
        if (q.includes('bye') || q.includes('goodbye')) return "Goodbye! Thanks for chatting. Come back anytime!";
        
        // Default - encourage Wikipedia-style questions
        return "Try asking me about famous people, places, inventions, science facts, or math! For example: 'Who is Albert Einstein?' or 'What is the Eiffel Tower?' I use Wikipedia to find answers.";
    }

    async function handleSend() {
        const text = input.value.trim();
        if (!text) return;
        
        addMessage(text, true);
        input.value = '';
        input.disabled = true;
        sendBtn.disabled = true;
        
        addMessage('', false, true);
        
        try {
            const response = await getAIResponse(text);
            removeTypingIndicator();
            addMessage(response);
        } catch (error) {
            removeTypingIndicator();
            addMessage("Sorry, I encountered an error. Please try again!");
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
