// Milan Wosti Portfolio - Professional JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initStatusBar();
    initQuoteOfDay();
    initITFacts();
    initNavigation();
    initSiteSearch();
    initFloatingTools();
    initLiveData();
    initSidebar();
    initMusicPlayer();
    initTechQuiz();
    initThemeToggle();
    initContactForm();
    initScheduleMeeting();
    initChatbox();
});

// Status Bar - Time, Date, Weather
function initStatusBar() {
    const greeting = document.getElementById('greeting');
    const datetime = document.getElementById('datetime');
    const weather = document.getElementById('weather');

    function updateGreeting() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) greeting.textContent = '🌅 Good Morning';
        else if (hour >= 12 && hour < 17) greeting.textContent = '☀️ Good Afternoon';
        else if (hour >= 17 && hour < 21) greeting.textContent = '🌆 Good Evening';
        else greeting.textContent = '🌙 Good Night';
    }

    function updateDateTime() {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const date = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        datetime.textContent = `${date} • ${time}`;
    }

    async function updateWeather() {
        try {
            const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=37.35&longitude=-121.95&current=temperature_2m,weather_code&temperature_unit=fahrenheit');
            const data = await response.json();
            if (data.current) {
                const temp = Math.round(data.current.temperature_2m);
                const code = data.current.weather_code;
                let emoji = '🌡️';
                if (code === 0) emoji = '☀️';
                else if (code <= 3) emoji = '⛅';
                else if (code <= 49) emoji = '🌫️';
                else if (code <= 69) emoji = '🌧️';
                else if (code <= 79) emoji = '❄️';
                else if (code <= 99) emoji = '⛈️';
                weather.textContent = `${emoji} ${temp}°F Santa Clara`;
            }
        } catch {
            weather.textContent = '📍 Santa Clara, CA';
        }
    }

    updateGreeting();
    updateDateTime();
    updateWeather();
    setInterval(updateDateTime, 1000);
    setInterval(updateGreeting, 60000);
}

// Quote of the Day - Changes every 5 seconds
function initQuoteOfDay() {
    const brandQuote = document.getElementById('brand-quote');
    
    const quotes = [
        "The only way to do great work is to love what you do. — Steve Jobs",
        "Innovation distinguishes between a leader and a follower. — Steve Jobs",
        "Stay hungry, stay foolish. — Steve Jobs",
        "The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt",
        "Success is not final, failure is not fatal: it is the courage to continue that counts. — Winston Churchill",
        "The best time to plant a tree was 20 years ago. The second best time is now. — Chinese Proverb",
        "Your time is limited, don't waste it living someone else's life. — Steve Jobs",
        "The only limit to our realization of tomorrow is our doubts of today. — Franklin D. Roosevelt",
        "In the middle of difficulty lies opportunity. — Albert Einstein",
        "It does not matter how slowly you go as long as you do not stop. — Confucius",
        "Believe you can and you're halfway there. — Theodore Roosevelt",
        "The journey of a thousand miles begins with one step. — Lao Tzu",
        "What you get by achieving your goals is not as important as what you become. — Zig Ziglar",
        "The secret of getting ahead is getting started. — Mark Twain",
        "Don't watch the clock; do what it does. Keep going. — Sam Levenson",
        "Everything you've ever wanted is on the other side of fear. — George Addair",
        "Success usually comes to those who are too busy to be looking for it. — Henry David Thoreau",
        "The harder you work for something, the greater you'll feel when you achieve it. — Unknown",
        "Dream big and dare to fail. — Norman Vaughan",
        "It always seems impossible until it's done. — Nelson Mandela",
        "The only person you are destined to become is the person you decide to be. — Ralph Waldo Emerson",
        "Go confidently in the direction of your dreams. — Henry David Thoreau",
        "Quality is not an act, it is a habit. — Aristotle",
        "The mind is everything. What you think you become. — Buddha",
        "Strive not to be a success, but rather to be of value. — Albert Einstein",
        "The best revenge is massive success. — Frank Sinatra",
        "I have not failed. I've just found 10,000 ways that won't work. — Thomas Edison",
        "A person who never made a mistake never tried anything new. — Albert Einstein",
        "The greatest glory in living lies not in never falling, but in rising every time we fall. — Nelson Mandela",
        "Life is what happens when you're busy making other plans. — John Lennon",
        "The way to get started is to quit talking and begin doing. — Walt Disney"
    ];
    
    let currentIndex = Math.floor(Math.random() * quotes.length);
    
    function showQuote() {
        brandQuote.style.opacity = '0';
        setTimeout(() => {
            brandQuote.textContent = `💡 "${quotes[currentIndex]}"`;
            brandQuote.style.opacity = '1';
            currentIndex = (currentIndex + 1) % quotes.length;
        }, 300);
    }
    
    // Shuffle quotes
    for (let i = quotes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quotes[i], quotes[j]] = [quotes[j], quotes[i]];
    }
    
    showQuote();
    setInterval(showQuote, 5000);
}

// IT Facts - Changes every 5 seconds
function initITFacts() {
    const factText = document.getElementById('fact-text');
    
    const facts = [
        "The first computer virus was created in 1983 and was called 'Elk Cloner'.",
        "Google processes over 8.5 billion searches per day.",
        "The first 1GB hard drive weighed 550 pounds and cost $40,000 in 1980.",
        "About 90% of the world's data was created in the last two years.",
        "The average person spends 6 hours and 58 minutes online daily.",
        "There are approximately 5.3 billion internet users worldwide.",
        "The first website ever created is still online at info.cern.ch.",
        "Email existed before the World Wide Web was invented.",
        "The QWERTY keyboard was designed to slow down typing to prevent jamming.",
        "The first computer mouse was made of wood in 1964.",
        "WiFi doesn't stand for anything - it's just a marketing term.",
        "The first computer programmer was Ada Lovelace in the 1840s.",
        "Amazon Web Services (AWS) powers about 33% of the internet.",
        "The cloud stores about 100 zettabytes of data globally.",
        "Cybercrime costs the world $10.5 trillion annually by 2025.",
        "The average cost of a data breach is $4.45 million.",
        "95% of cybersecurity breaches are caused by human error.",
        "There are over 2,200 cyberattacks per day worldwide.",
        "The first domain ever registered was Symbolics.com in 1985.",
        "Linux powers 96.3% of the world's top 1 million servers.",
        "Over 500 hours of video are uploaded to YouTube every minute.",
        "The first iPhone was released on June 29, 2007.",
        "Microsoft was founded in a garage in Albuquerque, New Mexico.",
        "The term 'bug' came from an actual moth found in a computer in 1947.",
        "The average smartphone has more computing power than NASA in 1969.",
        "There are over 27 million software developers worldwide.",
        "Python is named after Monty Python, not the snake.",
        "JavaScript was created in just 10 days.",
        "The first webcam was used to monitor a coffee pot at Cambridge.",
        "Over 333 billion emails are sent and received daily.",
        "The @ symbol was chosen for email because it was rarely used.",
        "Active Directory was first released with Windows 2000.",
        "Okta processes over 17 billion authentications per month.",
        "Zero Trust security was coined by Forrester Research in 2010.",
        "Multi-factor authentication blocks 99.9% of account attacks.",
        "The average enterprise uses 1,295 cloud services.",
        "Kubernetes was originally developed by Google.",
        "Docker containers share the host OS kernel for efficiency.",
        "DevOps practices can reduce deployment failures by 60%.",
        "The first ransomware attack occurred in 1989 via floppy disk."
    ];
    
    let currentIndex = Math.floor(Math.random() * facts.length);
    
    function showFact() {
        factText.style.animation = 'none';
        factText.offsetHeight; // Trigger reflow
        factText.style.animation = 'fadeIn 0.5s ease';
        factText.textContent = facts[currentIndex];
        currentIndex = (currentIndex + 1) % facts.length;
    }
    
    // Shuffle facts for variety
    for (let i = facts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [facts[i], facts[j]] = [facts[j], facts[i]];
    }
    
    showFact();
    setInterval(showFact, 5000);
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

// Site Search
function initSiteSearch() {
    const searchInput = document.getElementById('site-search-input');
    const dropdown = document.getElementById('search-dropdown');
    
    // Searchable content on the website
    const searchableContent = [
        { title: 'Milan Wosti', section: 'Home', link: '#home', keywords: 'milan wosti name portfolio' },
        { title: 'IT Support Engineer', section: 'Home', link: '#home', keywords: 'it support engineer job role position' },
        { title: 'Palo Alto Networks', section: 'Home', link: '#home', keywords: 'palo alto networks panw company work' },
        { title: 'About Me', section: 'About', link: '#about', keywords: 'about me background story' },
        { title: 'Nepal - Kathmandu', section: 'About', link: '#about', keywords: 'nepal kathmandu born hometown country himalayas everest buddha' },
        { title: 'Education - KIST College', section: 'About', link: '#about', keywords: 'education kist college degree bachelor information technology' },
        { title: 'IT Support Skills', section: 'Skills', link: '#skills', keywords: 'it support skills technical troubleshooting' },
        { title: 'Data Analysis', section: 'Skills', link: '#skills', keywords: 'data analysis analytics sql excel' },
        { title: 'Cybersecurity', section: 'Skills', link: '#skills', keywords: 'cybersecurity security cyber' },
        { title: 'Project Management', section: 'Skills', link: '#skills', keywords: 'project management coordination' },
        { title: 'Active Directory', section: 'Skills', link: '#skills', keywords: 'active directory ad microsoft' },
        { title: 'Okta', section: 'Skills', link: '#skills', keywords: 'okta identity access management iam sso' },
        { title: 'Jamf Pro', section: 'Skills', link: '#skills', keywords: 'jamf pro apple mac management mdm' },
        { title: 'Microsoft 365', section: 'Skills', link: '#skills', keywords: 'microsoft 365 office outlook teams' },
        { title: 'AWS', section: 'Skills', link: '#skills', keywords: 'aws amazon web services cloud' },
        { title: 'Azure AD', section: 'Skills', link: '#skills', keywords: 'azure ad active directory microsoft cloud' },
        { title: 'Python', section: 'Skills', link: '#skills', keywords: 'python programming coding scripting' },
        { title: 'PowerShell', section: 'Skills', link: '#skills', keywords: 'powershell scripting automation windows' },
        { title: 'SQL', section: 'Skills', link: '#skills', keywords: 'sql database query' },
        { title: 'Docker', section: 'Skills', link: '#skills', keywords: 'docker containers containerization' },
        { title: 'Linux', section: 'Skills', link: '#skills', keywords: 'linux unix server' },
        { title: 'Work Experience', section: 'Experience', link: '#experience', keywords: 'work experience job career' },
        { title: 'Contact Milan', section: 'Contact', link: '#contact', keywords: 'contact email reach connect hire' },
        { title: 'LinkedIn Profile', section: 'Contact', link: '#contact', keywords: 'linkedin profile social connect' },
        { title: 'Schedule Meeting', section: 'Contact', link: '#contact', keywords: 'schedule meeting appointment calendar' },
        { title: 'Send Email', section: 'Contact', link: '#contact', keywords: 'send email message wmilan291@gmail.com' },
        { title: 'Play Tech Quiz', section: 'Games', link: '#', keywords: 'quiz game play tech trivia', action: 'quiz' },
        { title: 'Music Player', section: 'Music', link: '#', keywords: 'music player songs play listen', action: 'music' },
        { title: 'Ask Milan Chatbot', section: 'Chat', link: '#', keywords: 'ask milan chatbot ai assistant help question', action: 'chat' }
    ];
    
    function search(query) {
        const q = query.toLowerCase().trim();
        if (q.length < 2) {
            dropdown.classList.remove('active');
            return;
        }
        
        const results = searchableContent.filter(item => 
            item.title.toLowerCase().includes(q) || 
            item.keywords.toLowerCase().includes(q) ||
            item.section.toLowerCase().includes(q)
        );
        
        if (results.length > 0) {
            dropdown.innerHTML = results.slice(0, 8).map(item => `
                <div class="search-result" data-link="${item.link}" data-action="${item.action || ''}">
                    <div class="search-result-title">${item.title}</div>
                    <div class="search-result-section">${item.section}</div>
                </div>
            `).join('');
            dropdown.classList.add('active');
        } else {
            dropdown.innerHTML = '<div class="search-no-results">No results found</div>';
            dropdown.classList.add('active');
        }
    }
    
    searchInput.addEventListener('input', () => search(searchInput.value));
    
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.length >= 2) search(searchInput.value);
    });
    
    // Handle click on search results
    dropdown.addEventListener('click', (e) => {
        const result = e.target.closest('.search-result');
        if (result) {
            const action = result.dataset.action;
            const link = result.dataset.link;
            
            if (action === 'quiz') {
                document.getElementById('quiz-btn').click();
            } else if (action === 'music') {
                document.getElementById('music-btn').click();
            } else if (action === 'chat') {
                document.getElementById('chatbox-toggle').click();
            } else if (link && link !== '#') {
                window.location.href = link;
            }
            
            dropdown.classList.remove('active');
            searchInput.value = '';
            searchInput.blur();
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.site-search')) {
            dropdown.classList.remove('active');
        }
    });
    
    // Keyboard navigation
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdown.classList.remove('active');
            searchInput.blur();
        }
    });
}

// Floating Tools with Cursor Interaction
function initFloatingTools() {
    const container = document.getElementById('floating-tools');
    
    // IT tool icons
    const tools = [
        '🖥️', '💻', '🔐', '🔑', '☁️', '🛡️', '⚙️', '🔧', 
        '📊', '🗄️', '🌐', '📡', '🔌', '💾', '📁', '🖨️',
        '🔒', '📱', '🖱️', '⌨️', '🔋', '📶', '💿', '🧮'
    ];

    const elements = [];

    tools.forEach((icon, i) => {
        const el = document.createElement('div');
        el.className = 'float-item';
        el.textContent = icon;
        el.style.left = Math.random() * 85 + 5 + '%';
        el.style.top = Math.random() * 85 + 5 + '%';
        
        // Store original position
        el.dataset.baseX = parseFloat(el.style.left);
        el.dataset.baseY = parseFloat(el.style.top);
        
        // Animation
        const duration = 40 + Math.random() * 40;
        const delay = Math.random() * 15;
        el.style.animation = `floatMove${i % 4} ${duration}s ${delay}s infinite ease-in-out`;
        
        container.appendChild(el);
        elements.push(el);
    });

    // Mouse interaction - icons move away from cursor
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const elX = rect.left + rect.width / 2;
            const elY = rect.top + rect.height / 2;
            
            const distX = mouseX - elX;
            const distY = mouseY - elY;
            const distance = Math.sqrt(distX * distX + distY * distY);
            
            // If cursor is within 150px, push the icon away
            if (distance < 150) {
                const force = (150 - distance) / 150;
                const moveX = -distX * force * 0.5;
                const moveY = -distY * force * 0.5;
                
                el.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.3})`;
                el.style.opacity = 0.3 + force * 0.7;
                el.style.filter = 'grayscale(0%)';
        } else {
                el.style.transform = '';
                el.style.opacity = '';
                el.style.filter = '';
            }
        });
    });

    // Add animation keyframes
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
    setInterval(fetchCrypto, 60000);      // Every 1 minute
    setInterval(fetchStocks, 60000);      // Every 1 minute
    setInterval(fetchNews, 3600000);      // Every 1 hour (news rotates hourly)
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

async function fetchNews() {
    const container = document.getElementById('news-data');
    
    // Try to fetch real news from free APIs
    try {
        // Using GNews API (free tier)
        const response = await fetch('https://gnews.io/api/v4/top-headlines?category=general&lang=en&max=3&apikey=demo');
        
        if (response.ok) {
            const data = await response.json();
            if (data.articles && data.articles.length > 0) {
                container.innerHTML = data.articles.slice(0, 3).map(article => `
                    <div class="news-item">
                        <a href="${article.url}" target="_blank" rel="noopener noreferrer">
                            ${article.title.length > 60 ? article.title.substring(0, 60) + '...' : article.title}
                            <span class="news-source">${article.source.name} ↗</span>
                        </a>
                    </div>
                `).join('');
                return;
            }
        }
    } catch (e) {
        console.log('News API unavailable, using curated headlines');
    }
    
    // Fallback: Rotating curated world news headlines
    const allHeadlines = [
        { title: 'AI Revolution: Tech Giants Race to Deploy New Models', source: 'Reuters', url: 'https://www.reuters.com/technology/' },
        { title: 'Global Markets Rally on Economic Optimism', source: 'Bloomberg', url: 'https://www.bloomberg.com/markets' },
        { title: 'Climate Summit: World Leaders Announce New Targets', source: 'BBC', url: 'https://www.bbc.com/news/world' },
        { title: 'Space Exploration: New Discoveries Beyond Mars', source: 'NASA', url: 'https://www.nasa.gov/news/' },
        { title: 'Cybersecurity Alert: Major Vulnerabilities Patched', source: 'TechCrunch', url: 'https://techcrunch.com/security/' },
        { title: 'Electric Vehicles Sales Surge Worldwide', source: 'CNBC', url: 'https://www.cnbc.com/technology/' },
        { title: 'Healthcare Breakthrough: New Treatment Approved', source: 'CNN', url: 'https://www.cnn.com/health' },
        { title: 'Renewable Energy Investment Hits Record High', source: 'Guardian', url: 'https://www.theguardian.com/environment' },
        { title: 'Global Trade: New Agreements Shape Economy', source: 'WSJ', url: 'https://www.wsj.com/world' },
        { title: 'Tech Layoffs Continue Amid Industry Shifts', source: 'Forbes', url: 'https://www.forbes.com/technology/' },
        { title: 'Cryptocurrency Markets Show Signs of Recovery', source: 'CoinDesk', url: 'https://www.coindesk.com/' },
        { title: 'Aviation Industry Rebounds Post-Pandemic', source: 'Reuters', url: 'https://www.reuters.com/business/' },
        { title: 'Education Tech Transforms Learning Globally', source: 'EdWeek', url: 'https://www.edweek.org/' },
        { title: 'Smart Cities: Urban Innovation Accelerates', source: 'Wired', url: 'https://www.wired.com/' },
        { title: 'Supply Chain Improvements Boost Manufacturing', source: 'Bloomberg', url: 'https://www.bloomberg.com/supply-chain' }
    ];
    
    // Rotate based on current hour (changes every hour)
    const currentHour = new Date().getHours();
    const startIndex = (currentHour * 3) % allHeadlines.length;
    
    const headlines = [
        allHeadlines[startIndex % allHeadlines.length],
        allHeadlines[(startIndex + 1) % allHeadlines.length],
        allHeadlines[(startIndex + 2) % allHeadlines.length]
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

// Sidebar visibility on scroll (only left sidebar hides)
function initSidebar() {
    const sidebar = document.getElementById('live-sidebar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 500) {
            sidebar.classList.add('hidden');
        } else {
            sidebar.classList.remove('hidden');
        }
    });
    // IT Facts sidebar stays visible always
}

// Music Player with YouTube Search
function initMusicPlayer() {
    const btn = document.getElementById('music-btn');
    const btnMobile = document.getElementById('music-btn-mobile');
    const modal = document.getElementById('music-modal');
    const closeBtn = document.getElementById('music-close');
    const tracksContainer = document.getElementById('music-tracks');
    const searchResults = document.getElementById('search-results');
    const playerContainer = document.getElementById('youtube-player');
    const searchInput = document.getElementById('music-search-input');
    const searchBtn = document.getElementById('music-search-btn');
    const persistentPlayer = document.getElementById('persistent-player');
    const musicControl = document.getElementById('music-control');
    const musicControlIcon = document.getElementById('music-control-icon');
    const nowPlaying = document.getElementById('now-playing');
    const navLinks = document.getElementById('nav-links');

    let isPlaying = false;
    let currentVideoId = null;
    let ytPlayer = null;
    let ytPlayerReady = false;

    // Song database with YouTube IDs
    const songs = {
        'hall of fame': 'mk48xRzuNvA', 'see you again': 'RgKAFK5djSk', 'die with a smile': 'kPa7bsKwL-c',
        'shape of you': 'JGwWNGJdvx8', 'perfect': 'HjmBLCbTgDo', 'thinking out loud': 'lp-EO5I60KA',
        'blinding lights': '4NRXx6U8ABQ', 'starboy': 'dqRZDebPIGs', 'save your tears': 'XXYlFuWEuKI',
        'uptown funk': 'OPf0YbXqDm0', 'just the way you are': 'LjhCEhWiKXk', '24k magic': 'UqyT8IEBkvY',
        'hello': 'YQHsXMglC9A', 'someone like you': 'hLQl3WQQoQ0', 'rolling in the deep': 'rYEDA3JcQqw',
        'easy on me': 'U3ASj1L6_sY', 'despacito': 'kJQP7kiw5Fk', 'dance monkey': 'q0hyYWKXF0Q',
        'bad guy': 'DyDfgMOUjCI', 'lovely': 'V1Pl8CzNzCw', 'ocean eyes': 'viimfQi_pUw',
        'levitating': 'TUVcZfQe-Kw', 'dont start now': 'oygrmJFKYZY', 'new rules': 'k2qgadSvNyU',
        'dynamite': 'gdZLi9oWNZg', 'butter': 'WMweEpGlu_U', 'boy with luv': 'XsX3ATc3FbA',
        'pink venom': 'gQlMMD8auMs', 'how you like that': 'ioNng23DkIM', 'kill this love': '2S24-y0Ij3Y',
        'stay': 'kTJczUoc26U', 'peaches': 'tQ0yjYUFKAE', 'drivers license': 'ZmDBbnmKpqQ',
        'good 4 u': 'gNi_6U5Pm_o', 'anti hero': 'b1kbLwvqugk', 'shake it off': 'nfWlot6h_JM',
        'believer': '7wtfhZwyrcc', 'thunder': 'fKopy74weus', 'radioactive': 'ktvTqknDobU',
        'closer': 'PT2_F-1esPk', 'attention': 'nfs8NYg7yQM', 'senorita': 'Pkh8UtuejGw',
        'havana': 'BQ0mxQXmLsk', 'circles': 'wXhTHyIgQ_U', 'sunflower': 'ApXoWvfEYVU',
        'heat waves': 'mRD0-GxqHVo', 'as it was': 'H5v3kku4y6Q', 'watermelon sugar': 'E07s5ZYygMg',
        'flowers': 'G7KNmW9a75Y', 'unholy': 'Uq9gPaIzbe8', 'calm down': 'WcIcVapfqXw',
        'kill bill': 'hTGJfRPLe08', 'vampire': 'RlPNh_PBZb4', 'cruel summer': 'ic8j13piAhQ',
        'faded': '60ItHLz5WEA', 'alone': '1-xGerv5FOk', 'let her go': 'RBumgq5yVrA',
        'photograph': 'nSDgHBxUbVQ', 'happier': 'm7Bc3pLyij0', 'memories': 'SlPhMPnQ58k',
        'sugar': '09R8_2nJtjg', 'girls like you': 'aJOTlE1K90k', 'payphone': 'KRaWnd3LJfs',
        'yellow': 'yKNxeF4KMsY', 'fix you': 'k4V3Mo61fJM', 'viva la vida': 'dvgZkm1xWPE',
        'counting stars': 'hT_nvWreIhg', 'apologize': 'ZSM3w1v-A_Y', 'grenade': 'SR6iYWJxHqs',
        'locked out of heaven': 'e-fA-gBCkj0', 'treasure': 'nPvuNsRccVw', 'lazy song': 'fLexgOxsZu0',
        'enemy': 'D9G1VOjN_84', 'natural': '0I647GU3Jsc', 'bones': 'TO-_3tck2tg',
        'dna': 'MBdVXkSdhwU', 'fake love': 'LmApDbvNCXg', 'spring day': 'xEeFrLSkMm8',
        'ddu du ddu du': 'IHNzOHi8sJs', 'boombayah': 'bwmSjveL3Lc', 'lovesick girls': 'dyRsYk0LyA8',
        'mood': 'GrAchTdepsU', 'montero': '6swmTBVI83k', 'industry baby': 'UTHLKHL_whs',
        'abcdefu': 'NaFd8ucHLuo', 'about damn time': 'Z5Uy3VH_Rrg', 'running up that hill': 'wp43OdtAAkM',
        'cupid': 'Qc7_zRjH808', 'seven': 'UUSbUBYqU_4', 'super shy': 'ArmDp-zijuc'
    };

    function openMusicModal() {
        modal.classList.add('active');
        // Close mobile nav if open
        if (navLinks) navLinks.classList.remove('active');
    }

    btn.addEventListener('click', openMusicModal);
    if (btnMobile) btnMobile.addEventListener('click', openMusicModal);
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    // Create the YouTube player in the persistent container
    function createPlayer(videoId) {
        // Destroy existing player if any
        if (ytPlayer) {
            try {
                ytPlayer.destroy();
            } catch(e) {}
        }
        ytPlayerReady = false;
        
        // Create player div in persistent container
        persistentPlayer.innerHTML = '<div id="yt-persistent-player"></div>';
        
        // Wait for YT API to be ready
        if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
            // API not ready, set up callback
            window.onYouTubeIframeAPIReady = function() {
                buildPlayer(videoId);
            };
        } else {
            buildPlayer(videoId);
        }
    }
    
    function buildPlayer(videoId) {
        ytPlayer = new YT.Player('yt-persistent-player', {
            height: '1',
            width: '1',
            videoId: videoId,
            playerVars: {
                'autoplay': 1,
                'controls': 0,
                'rel': 0,
                'enablejsapi': 1,
                'origin': window.location.origin
            },
            events: {
                'onReady': function(event) {
                    ytPlayerReady = true;
                    isPlaying = true;
                    musicControlIcon.textContent = '⏸️';
                    event.target.playVideo();
                },
                'onStateChange': function(event) {
                    if (event.data === YT.PlayerState.PLAYING) {
                        isPlaying = true;
                        musicControlIcon.textContent = '⏸️';
                    } else if (event.data === YT.PlayerState.PAUSED) {
                        isPlaying = false;
                        musicControlIcon.textContent = '▶️';
                    } else if (event.data === YT.PlayerState.ENDED) {
                        isPlaying = false;
                        musicControlIcon.textContent = '▶️';
                    }
                }
            }
        });
    }

    function playTrack(videoId) {
        currentVideoId = videoId;
        
        // Show visual player in modal
        playerContainer.innerHTML = `<iframe id="modal-player" src="https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        
        // Create the actual audio player
        createPlayer(videoId);
        
        // Show control button and now playing
        musicControl.style.display = 'block';
        musicControlIcon.textContent = '⏸️';
        nowPlaying.style.display = 'block';
        isPlaying = true;
    }

    function togglePlayPause() {
        if (!ytPlayer || !ytPlayerReady) {
            console.log('Player not ready');
            return;
        }
        
        try {
            const playerState = ytPlayer.getPlayerState();
            
            if (playerState === YT.PlayerState.PLAYING) {
                ytPlayer.pauseVideo();
                musicControlIcon.textContent = '▶️';
                isPlaying = false;
            } else {
                ytPlayer.playVideo();
                musicControlIcon.textContent = '⏸️';
                isPlaying = true;
            }
        } catch(e) {
            console.log('Error toggling playback:', e);
        }
    }

    musicControl.addEventListener('click', togglePlayPause);

    tracksContainer.addEventListener('click', (e) => {
        const playBtn = e.target.closest('.play-btn');
        if (playBtn) {
            const track = playBtn.closest('.track-item');
            playTrack(track.dataset.video);
        }
    });

    searchResults.addEventListener('click', (e) => {
        const playBtn = e.target.closest('.play-btn');
        if (playBtn) {
            const track = playBtn.closest('.track-item');
            if (track.dataset.video) playTrack(track.dataset.video);
        }
    });

    function searchMusic(query) {
        const q = query.toLowerCase().replace(/[^a-z0-9\s]/g, '');
        const matches = [];
        
        for (const [name, id] of Object.entries(songs)) {
            if (name.includes(q) || q.includes(name) || q.split(' ').some(w => name.includes(w) && w.length > 2)) {
                matches.push({ name, id });
            }
        }

        if (matches.length > 0) {
            searchResults.innerHTML = matches.slice(0, 6).map(m => 
                `<div class="track-item" data-video="${m.id}"><span class="track-name">▶ ${m.name.replace(/\b\w/g, c => c.toUpperCase())}</span><button class="play-btn">▶</button></div>`
            ).join('');
        } else {
            const suggestions = Object.entries(songs).sort(() => Math.random() - 0.5).slice(0, 6);
            searchResults.innerHTML = `<div class="no-results">No match for "${query}". Try these:</div>` +
                suggestions.map(([name, id]) => 
                    `<div class="track-item" data-video="${id}"><span class="track-name">▶ ${name.replace(/\b\w/g, c => c.toUpperCase())}</span><button class="play-btn">▶</button></div>`
                ).join('');
        }
    }

    searchInput.addEventListener('focus', () => {
        if (!searchInput.value) {
            const suggestions = Object.entries(songs).sort(() => Math.random() - 0.5).slice(0, 6);
            searchResults.innerHTML = `<div class="suggestions-title">🎵 Try these songs:</div>` +
                suggestions.map(([name, id]) => 
                    `<div class="track-item" data-video="${id}"><span class="track-name">▶ ${name.replace(/\b\w/g, c => c.toUpperCase())}</span><button class="play-btn">▶</button></div>`
                ).join('');
        }
    });

    searchInput.addEventListener('input', () => {
        if (searchInput.value.length >= 2) searchMusic(searchInput.value);
        else if (!searchInput.value) searchResults.innerHTML = '';
    });

    searchBtn.addEventListener('click', () => { if (searchInput.value.trim()) searchMusic(searchInput.value.trim()); });
    searchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter' && searchInput.value.trim()) searchMusic(searchInput.value.trim()); });
}

// Tech Quiz Game
function initTechQuiz() {
    const btn = document.getElementById('quiz-btn');
    const btnMobile = document.getElementById('quiz-btn-mobile');
    const modal = document.getElementById('quiz-modal');
    const closeBtn = document.getElementById('quiz-close');
    const startScreen = document.getElementById('quiz-start');
    const gameScreen = document.getElementById('quiz-game');
    const resultsScreen = document.getElementById('quiz-results');
    const playerNameInput = document.getElementById('quiz-player-name');
    const startBtn = document.getElementById('start-quiz-btn');
    const difficultyBtns = document.querySelectorAll('.quiz-difficulty .level-btn');
    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    const currentEl = document.getElementById('quiz-current');
    const scoreEl = document.getElementById('quiz-score');
    const timerEl = document.getElementById('quiz-timer');
    const finalScoreEl = document.getElementById('final-score');
    const resultsMessageEl = document.getElementById('results-message');
    const playAgainBtn = document.getElementById('play-again-btn');
    const leaderboardList = document.getElementById('quiz-leaderboard-list');
    const navLinks = document.getElementById('nav-links');

    let currentQuestion = 0;
    let score = 0;
    let timer = 30;
    let timerInterval = null;
    let difficulty = 'easy';
    let playerName = 'Guest';
    let questions = [];
    let leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard')) || [];

    const allQuestions = {
        easy: [
            { q: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Computer Processing Unit"], answer: 0 },
            { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], answer: 0 },
            { q: "Which company created Windows?", options: ["Apple", "Microsoft", "Google", "IBM"], answer: 1 },
            { q: "What is the brain of a computer?", options: ["RAM", "Hard Drive", "CPU", "Monitor"], answer: 2 },
            { q: "What does USB stand for?", options: ["Universal Serial Bus", "United System Bus", "Universal System Backup", "User Serial Bus"], answer: 0 },
            { q: "Which is a web browser?", options: ["Windows", "Chrome", "Python", "Excel"], answer: 1 },
            { q: "What does RAM stand for?", options: ["Read Access Memory", "Random Access Memory", "Run Access Memory", "Real Access Memory"], answer: 1 },
            { q: "What is the shortcut to copy?", options: ["Ctrl+V", "Ctrl+X", "Ctrl+C", "Ctrl+Z"], answer: 2 },
            { q: "Which is a programming language?", options: ["HTML", "Python", "HTTP", "FTP"], answer: 1 },
            { q: "What does PDF stand for?", options: ["Portable Document Format", "Print Document File", "Personal Data Format", "Public Document Format"], answer: 0 }
        ],
        medium: [
            { q: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Language", "Standard Query Logic", "System Query Language"], answer: 0 },
            { q: "What is the default port for HTTPS?", options: ["80", "443", "8080", "22"], answer: 1 },
            { q: "Which protocol is used for email?", options: ["FTP", "HTTP", "SMTP", "SSH"], answer: 2 },
            { q: "What does API stand for?", options: ["Application Programming Interface", "Advanced Program Integration", "Application Process Interface", "Automated Programming Interface"], answer: 0 },
            { q: "What is the main function of DNS?", options: ["Security", "Domain to IP translation", "Data storage", "Email routing"], answer: 1 },
            { q: "Which is NOT a cloud provider?", options: ["AWS", "Azure", "Oracle", "Linux"], answer: 3 },
            { q: "What does VPN stand for?", options: ["Virtual Private Network", "Virtual Public Network", "Verified Private Network", "Visual Private Network"], answer: 0 },
            { q: "What is Git used for?", options: ["Database management", "Version control", "Web hosting", "Email"], answer: 1 },
            { q: "What does SSD stand for?", options: ["Solid State Drive", "System Storage Device", "Super Speed Disk", "Solid System Drive"], answer: 0 },
            { q: "Which port does SSH use?", options: ["21", "22", "23", "25"], answer: 1 }
        ],
        hard: [
            { q: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], answer: 1 },
            { q: "Which layer of OSI handles routing?", options: ["Transport", "Network", "Data Link", "Session"], answer: 1 },
            { q: "What does RAID 5 provide?", options: ["Mirroring only", "Striping with parity", "Just striping", "Just parity"], answer: 1 },
            { q: "What is a Docker container?", options: ["Virtual machine", "Lightweight isolated environment", "Database", "Web server"], answer: 1 },
            { q: "What does CI/CD stand for?", options: ["Code Integration/Code Deployment", "Continuous Integration/Continuous Deployment", "Computer Integration/Computer Deployment", "Central Integration/Central Deployment"], answer: 1 },
            { q: "Which is a NoSQL database?", options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"], answer: 2 },
            { q: "What is Kubernetes used for?", options: ["Version control", "Container orchestration", "Database management", "Web development"], answer: 1 },
            { q: "What does LDAP stand for?", options: ["Lightweight Directory Access Protocol", "Local Directory Access Protocol", "Linked Data Access Protocol", "Large Directory Access Protocol"], answer: 0 },
            { q: "What is the purpose of a load balancer?", options: ["Store data", "Distribute traffic", "Encrypt data", "Monitor logs"], answer: 1 },
            { q: "What does SAML stand for?", options: ["Security Assertion Markup Language", "Simple Authentication Markup Language", "Secure Access Management Layer", "System Authentication Module Layer"], answer: 0 }
        ]
    };

    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    function updateLeaderboard() {
        if (leaderboard.length === 0) {
            leaderboardList.innerHTML = '<div class="leaderboard-empty">No scores yet. Be the first!</div>';
            return;
        }
        const ranks = ['gold', 'silver', 'bronze'];
        leaderboardList.innerHTML = leaderboard.slice(0, 3).map((entry, i) => `
            <div class="leaderboard-item">
                <span class="leaderboard-rank ${ranks[i]}">#${i + 1}</span>
                <span class="leaderboard-name">${entry.name}</span>
                <span class="leaderboard-time">${entry.score}/10</span>
            </div>
        `).join('');
    }

    function saveScore(name, score) {
        leaderboard.push({ name, score, date: new Date().toISOString() });
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard = leaderboard.slice(0, 10);
        localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard));
        updateLeaderboard();
    }

    function startQuiz() {
        playerName = playerNameInput.value.trim() || 'Guest';
        questions = shuffleArray(allQuestions[difficulty]).slice(0, 10);
        currentQuestion = 0;
        score = 0;
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        resultsScreen.style.display = 'none';
        showQuestion();
    }

    function showQuestion() {
        if (currentQuestion >= questions.length) {
            endQuiz();
            return;
        }
        const q = questions[currentQuestion];
        currentEl.textContent = currentQuestion + 1;
        scoreEl.textContent = score;
        questionEl.textContent = q.q;
        feedbackEl.textContent = '';
        feedbackEl.className = 'quiz-feedback';
        
        optionsEl.innerHTML = q.options.map((opt, i) => `
            <button class="quiz-option" data-index="${i}">${opt}</button>
        `).join('');

        // Start timer
        timer = difficulty === 'easy' ? 30 : difficulty === 'medium' ? 20 : 15;
        timerEl.textContent = timer;
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timer--;
            timerEl.textContent = timer;
            if (timer <= 0) {
                clearInterval(timerInterval);
                handleAnswer(-1); // Time's up
            }
        }, 1000);
    }

    function handleAnswer(selectedIndex) {
        clearInterval(timerInterval);
        const q = questions[currentQuestion];
        const options = optionsEl.querySelectorAll('.quiz-option');
        
        options.forEach(opt => {
            opt.classList.add('disabled');
            const idx = parseInt(opt.dataset.index);
            if (idx === q.answer) {
                opt.classList.add('correct');
            } else if (idx === selectedIndex) {
                opt.classList.add('wrong');
            }
        });

        if (selectedIndex === q.answer) {
            score++;
            scoreEl.textContent = score;
            feedbackEl.textContent = '✓ Correct!';
            feedbackEl.style.color = '#22c55e';
        } else if (selectedIndex === -1) {
            feedbackEl.textContent = "⏱️ Time's up!";
            feedbackEl.style.color = '#f59e0b';
        } else {
            feedbackEl.textContent = '✗ Wrong!';
            feedbackEl.style.color = '#ef4444';
        }

        setTimeout(() => {
            currentQuestion++;
            showQuestion();
        }, 1500);
    }

    function endQuiz() {
        gameScreen.style.display = 'none';
        resultsScreen.style.display = 'block';
        finalScoreEl.textContent = `${score}/10`;
        
        let message = '';
        if (score === 10) message = '🏆 Perfect! You\'re a tech genius!';
        else if (score >= 8) message = '🌟 Excellent! Great tech knowledge!';
        else if (score >= 6) message = '👍 Good job! Keep learning!';
        else if (score >= 4) message = '📚 Not bad! Room for improvement.';
        else message = '💪 Keep studying! You\'ll get better!';
        
        resultsMessageEl.textContent = message;
        saveScore(playerName, score);
    }

    function resetQuiz() {
        resultsScreen.style.display = 'none';
        startScreen.style.display = 'block';
        updateLeaderboard();
    }

    // Event Listeners
    optionsEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('quiz-option') && !e.target.classList.contains('disabled')) {
            handleAnswer(parseInt(e.target.dataset.index));
        }
    });

    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            difficultyBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            difficulty = btn.dataset.difficulty;
        });
    });

    startBtn.addEventListener('click', startQuiz);
    playAgainBtn.addEventListener('click', resetQuiz);

    playerNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') startQuiz();
    });

    function openQuizModal() {
        modal.classList.add('active');
        updateLeaderboard();
        if (navLinks) navLinks.classList.remove('active');
    }

    btn.addEventListener('click', openQuizModal);
    if (btnMobile) btnMobile.addEventListener('click', openQuizModal);

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        clearInterval(timerInterval);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            clearInterval(timerInterval);
        }
    });
}

// Theme Toggle (Light/Dark Mode)
function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    
    // Check saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        icon.textContent = '☀️';
    }

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        icon.textContent = isLight ? '☀️' : '🌙';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
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

        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        
        window.location.href = `mailto:wmilan291@gmail.com?subject=${subject}&body=${body}`;
        
        form.reset();
    });
}

// Schedule Meeting
function initScheduleMeeting() {
    const scheduleBtn = document.getElementById('schedule-btn');
    const modal = document.getElementById('schedule-modal');
    const closeBtn = document.getElementById('schedule-close');
    const form = document.getElementById('schedule-form');
    const dateInput = document.getElementById('meeting-date');
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    
    scheduleBtn.addEventListener('click', () => modal.classList.add('active'));
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('visitor-name').value;
        const email = document.getElementById('visitor-email').value;
        const date = document.getElementById('meeting-date').value;
        const time = document.getElementById('meeting-time').value;
        const topic = document.getElementById('meeting-topic').value;
        const notes = document.getElementById('meeting-notes').value;
        
        // Format the date nicely
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const subject = encodeURIComponent(`Meeting Request: ${topic} - ${formattedDate} at ${time}`);
        const body = encodeURIComponent(
`MEETING REQUEST

From: ${name}
Email: ${email}

Requested Date: ${formattedDate}
Requested Time: ${time} (Pacific Time)

Topic: ${topic}

Additional Notes:
${notes || 'None'}

---
Please reply to confirm or suggest an alternative time.
This meeting request was sent from Milan Wosti's Portfolio website.`
        );
        
        // Open email client with pre-filled meeting request
        window.location.href = `mailto:wmilan291@gmail.com?subject=${subject}&body=${body}`;
        
        // Show success message
        alert('Meeting request prepared! Your email client will open with the meeting details. Please send the email to complete your request.');
        
            form.reset();
        modal.classList.remove('active');
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

    function getResponse(userMessage) {
        const q = userMessage.toLowerCase().trim();
        
        // Greetings - friendly and warm
        if (q.match(/^(hi|hello|hey|howdy|yo|sup|greetings|good morning|good afternoon|good evening|what's up|whats up)\b/)) {
            const greetings = [
                "Hey there! 👋 I'm Milan's virtual assistant. Ask me anything about him, tech stuff, or just chat!",
                "Hello! Nice to meet you! I'm here to help - whether you want to know about Milan or just have a conversation.",
                "Hey! Welcome to Milan's corner of the internet. What can I help you with today?",
                "Hi! 😊 Feel free to ask me about Milan, his work, or anything else on your mind!"
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }

        // How are you / what's up
        if (q.match(/how are you|how's it going|how you doing|what's up|whats up|how do you do/)) {
            const responses = [
                "I'm doing great, thanks for asking! 😊 How can I help you today?",
                "All good here! Just hanging out on Milan's website. What brings you here?",
                "Pretty good! Always happy to chat. What's on your mind?",
                "Doing well! Ready to answer your questions or just have a friendly chat."
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }

        // Who are you / what are you
        if (q.match(/who are you|what are you|your name|about you/)) {
            return "I'm Ask Milan - a friendly chatbot here to tell you about Milan Wosti and answer your questions. Think of me as Milan's digital sidekick! 🤖";
        }

        // Milan-specific questions
        if (q.includes('milan') || q.includes('portfolio') || q.includes('website') || q.includes('owner') || q.includes('your') || q.includes('his')) {
            if (q.match(/work|job|company|employ|do for/)) {
                return "Milan works as an IT Support Engineer at Palo Alto Networks in California. He's been there for about 1.5 years, helping keep things running smoothly! 💼";
            }
            if (q.match(/from|born|nepal|country|where.*from|hometown/)) {
                return "Milan's from Kathmandu, Nepal! 🇳🇵 You know, the country with Mount Everest and where Buddha was born. Pretty cool place to grow up, right?";
            }
            if (q.match(/skill|know|tech|good at|specialize/)) {
                return "Milan's got a solid toolkit - Active Directory, Okta, Jamf, AWS, Azure, Python, PowerShell, SQL... basically the stuff that keeps IT departments happy! 🛠️";
            }
            if (q.match(/contact|hire|reach|linkedin|connect|email/)) {
                return "Want to connect with Milan? Hit him up on LinkedIn at linkedin.com/in/milanwosticonnect or use the contact form on this site! He's always open to chat. 📬";
            }
            if (q.match(/education|degree|college|study|school|university/)) {
                return "Milan has a Bachelor's in Information Technology from KIST College. That's where the tech journey began! 🎓";
            }
            if (q.match(/hobby|fun|free time|interest|like to do/)) {
                return "When Milan's not fixing IT issues, he's probably exploring new tech, learning something new, or enjoying some good food. Work-life balance, you know? 😄";
            }
            if (q.match(/age|old|birthday/)) {
                return "Hmm, I don't share personal details like that! But Milan's at that sweet spot where he's got enough experience to be useful but still young enough to stay curious. 😉";
            }
            return "Milan Wosti is an IT Support Engineer at Palo Alto Networks, originally from Nepal. He's passionate about tech and always learning. What specifically would you like to know about him?";
        }

        // Tech questions
        if (q.match(/what is|explain|tell me about/) && q.match(/python|javascript|aws|azure|cloud|programming|coding|it support|active directory|okta/)) {
            if (q.includes('python')) return "Python is a super versatile programming language - easy to learn, powerful to use. Milan uses it for automation and scripting. It's like the Swiss Army knife of coding! 🐍";
            if (q.includes('javascript')) return "JavaScript is the language that makes websites interactive. Pretty much every website you visit uses it. It's everywhere! 💻";
            if (q.includes('aws')) return "AWS (Amazon Web Services) is Amazon's cloud platform - basically renting computing power instead of buying servers. Milan works with it for cloud infrastructure stuff. ☁️";
            if (q.includes('azure')) return "Azure is Microsoft's cloud platform, similar to AWS. Milan uses Azure AD for identity management. It's big in enterprise environments! 🔷";
            if (q.includes('active directory')) return "Active Directory is Microsoft's way of managing users and computers in a company. It's like the phone book + security guard of corporate IT. Milan deals with it daily! 📁";
            if (q.includes('okta')) return "Okta is an identity management service - basically helps companies manage who can access what. Single sign-on, multi-factor auth, that kind of stuff. 🔐";
            if (q.includes('it support')) return "IT Support is all about keeping technology working for people - troubleshooting issues, setting up systems, and being the hero when things break! That's Milan's world. 🦸";
        }

        // General conversation
        if (q.match(/weather|sunny|rain|cold|hot/)) {
            return "I can't check the weather, but you can see the current conditions in Santa Clara up in the status bar! ☀️";
        }

        if (q.match(/joke|funny|laugh|humor/)) {
            const jokes = [
                "Why do programmers prefer dark mode? Because light attracts bugs! 🐛😄",
                "There are only 10 types of people in the world: those who understand binary and those who don't! 💻",
                "Why did the IT guy go broke? Because he lost his domain! 🌐",
                "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?' 🍺"
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        }

        if (q.match(/time|date|today|what day/)) {
            const now = new Date();
            return `It's ${now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} and the time is ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}. ⏰`;
        }

        // Math
        const mathMatch = userMessage.match(/[\d+\-*/().^%\s]+/);
        if (mathMatch && (q.includes('what is') || q.includes('calculate') || q.includes('=') || /^\d/.test(q.trim()))) {
            try {
                const expr = mathMatch[0].replace(/\^/g, '**').replace(/x/gi, '*').trim();
                if (expr.length > 1 && /\d/.test(expr)) {
                    const result = Function('"use strict"; return (' + expr + ')')();
                    if (!isNaN(result) && isFinite(result)) return `That equals ${result.toLocaleString()}! 🧮`;
                }
            } catch {}
        }

        // Thanks
        if (q.match(/thank|thanks|thx|appreciate/)) {
            const thanks = [
                "You're welcome! Happy to help! 😊",
                "No problem at all! Anything else you'd like to know?",
                "Anytime! That's what I'm here for!",
                "Glad I could help! Feel free to ask more questions!"
            ];
            return thanks[Math.floor(Math.random() * thanks.length)];
        }

        // Goodbye
        if (q.match(/bye|goodbye|see you|later|gotta go|leaving/)) {
            const byes = [
                "See you later! Thanks for stopping by! 👋",
                "Bye! Come back anytime you want to chat!",
                "Take care! Hope to see you again soon! 😊",
                "Goodbye! Don't be a stranger!"
            ];
            return byes[Math.floor(Math.random() * byes.length)];
        }

        // Compliments
        if (q.match(/cool|awesome|nice|great|amazing|love|beautiful/)) {
            return "Thanks! Milan put a lot of work into this site. Glad you're enjoying it! 🙌";
        }

        // Help
        if (q.match(/help|what can you|can you do|your purpose/)) {
            return "I can tell you about Milan - his work, skills, background, and how to contact him. I can also do basic math, tell jokes, and have a friendly chat! Try asking something! 💬";
        }

        // Default responses - varied and friendly
        const defaults = [
            "Hmm, I'm not sure about that one! But I'm great at answering questions about Milan or having a casual chat. What else would you like to know? 🤔",
            "That's a bit outside my wheelhouse! I'm best at talking about Milan and his work. Try asking about his skills, experience, or background!",
            "Interesting question! I might not have the answer, but I'd love to tell you about Milan or chat about tech stuff. What sounds good?",
            "I'm still learning! For now, I'm best at answering questions about Milan Wosti. Ask me about his job, skills, or how to contact him! 😊"
        ];
        return defaults[Math.floor(Math.random() * defaults.length)];
    }

    function handleSend() {
        const text = input.value.trim();
        if (!text) return;
        
        addMessage(text, true);
        input.value = '';
        input.disabled = true;
        sendBtn.disabled = true;
        
        addMessage('', false, true);
        
        // Simulate thinking time for more natural feel
        setTimeout(() => {
            removeTypingIndicator();
            const response = getResponse(text);
            addMessage(response);
            input.disabled = false;
            sendBtn.disabled = false;
            input.focus();
        }, 500 + Math.random() * 500);
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
