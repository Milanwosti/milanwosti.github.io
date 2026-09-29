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
    initSudoku();
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
        { title: 'Play Sudoku Game', section: 'Games', link: '#', keywords: 'sudoku game play puzzle', action: 'sudoku' },
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
            
            if (action === 'sudoku') {
                document.getElementById('sudoku-btn').click();
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

    btn.addEventListener('click', () => modal.classList.add('active'));
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    // Initialize YouTube Player
    function initYTPlayer(videoId) {
        // Create a div for the player if it doesn't exist
        persistentPlayer.innerHTML = '<div id="yt-player-div"></div>';
        
        ytPlayer = new YT.Player('yt-player-div', {
            height: '0',
            width: '0',
            videoId: videoId,
            playerVars: {
                'autoplay': 1,
                'controls': 0,
                'rel': 0,
                'enablejsapi': 1
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        ytPlayerReady = true;
        event.target.playVideo();
    }

    function onPlayerStateChange(event) {
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

    function playTrack(videoId) {
        currentVideoId = videoId;
        isPlaying = true;
        
        // Show in modal player (visual only)
        playerContainer.innerHTML = `<iframe id="modal-player" src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        
        // Initialize or load new video in YT Player
        if (ytPlayer && ytPlayerReady) {
            ytPlayer.loadVideoById(videoId);
        } else if (typeof YT !== 'undefined' && YT.Player) {
            initYTPlayer(videoId);
        } else {
            // Fallback: wait for API to load
            window.onYouTubeIframeAPIReady = function() {
                initYTPlayer(videoId);
            };
        }
        
        // Show control button and now playing
        musicControl.style.display = 'block';
        musicControlIcon.textContent = '⏸️';
        nowPlaying.style.display = 'block';
    }

    function togglePlayPause() {
        if (!ytPlayer || !ytPlayerReady) {
            // Fallback for when YT player isn't ready
            return;
        }
        
        if (isPlaying) {
            ytPlayer.pauseVideo();
            musicControlIcon.textContent = '▶️';
            isPlaying = false;
        } else {
            ytPlayer.playVideo();
            musicControlIcon.textContent = '⏸️';
            isPlaying = true;
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

// Sudoku Game with Timer and Leaderboard
function initSudoku() {
    const btn = document.getElementById('sudoku-btn');
    const modal = document.getElementById('sudoku-modal');
    const closeBtn = document.getElementById('sudoku-close');
    const nameEntry = document.getElementById('sudoku-name-entry');
    const gameArea = document.getElementById('sudoku-game');
    const playerNameInput = document.getElementById('player-name');
    const startGameBtn = document.getElementById('start-game-btn');
    const currentPlayerEl = document.getElementById('current-player');
    const grid = document.getElementById('sudoku-grid');
    const errorsEl = document.getElementById('sudoku-errors');
    const timerEl = document.getElementById('sudoku-timer');
    const numberPad = document.getElementById('number-pad');
    const newGameBtn = document.getElementById('new-game');
    const levelBtns = document.querySelectorAll('.level-btn');
    const leaderboardList = document.getElementById('leaderboard-list');

    let board = [];
    let solution = [];
    let currentPuzzle = [];
    let selectedCell = null;
    let errors = 0;
    let currentLevel = 'beginner';
    let playerName = 'Guest';
    let timerInterval = null;
    let seconds = 0;
    const maxErrors = 10;

    // Load leaderboard from localStorage
    let leaderboard = JSON.parse(localStorage.getItem('sudokuLeaderboard')) || [];

    const puzzles = {
        beginner: {
            puzzle: [5,3,4,0,7,0,0,0,0,6,0,0,1,9,5,0,0,0,0,9,8,0,0,0,0,6,0,8,0,0,0,6,0,0,0,3,4,0,0,8,0,3,0,0,1,7,0,0,0,2,0,0,0,6,0,6,0,0,0,0,2,8,0,0,0,0,4,1,9,0,0,5,0,0,0,0,8,0,0,7,9],
            solution: [5,3,4,6,7,8,9,1,2,6,7,2,1,9,5,3,4,8,1,9,8,3,4,2,5,6,7,8,5,9,7,6,1,4,2,3,4,2,6,8,5,3,7,9,1,7,1,3,9,2,4,8,5,6,9,6,1,5,3,7,2,8,4,2,8,7,4,1,9,6,3,5,3,4,5,2,8,6,1,7,9]
        },
        normal: {
            puzzle: [0,0,0,0,7,0,0,0,0,6,0,0,1,9,5,0,0,0,0,9,0,0,0,0,0,6,0,8,0,0,0,6,0,0,0,3,4,0,0,8,0,3,0,0,1,0,0,0,0,2,0,0,0,0,0,6,0,0,0,0,2,8,0,0,0,0,4,1,9,0,0,5,0,0,0,0,8,0,0,0,0],
            solution: [5,3,4,6,7,8,9,1,2,6,7,2,1,9,5,3,4,8,1,9,8,3,4,2,5,6,7,8,5,9,7,6,1,4,2,3,4,2,6,8,5,3,7,9,1,7,1,3,9,2,4,8,5,6,9,6,1,5,3,7,2,8,4,2,8,7,4,1,9,6,3,5,3,4,5,2,8,6,1,7,9]
        },
        pro: {
            puzzle: [0,0,0,0,0,0,0,0,0,0,0,0,1,9,5,0,0,0,0,9,0,0,0,0,0,6,0,8,0,0,0,0,0,0,0,3,0,0,0,8,0,3,0,0,0,0,0,0,0,0,0,0,0,6,0,6,0,0,0,0,0,8,0,0,0,0,4,1,9,0,0,0,0,0,0,0,0,0,0,0,0],
            solution: [5,3,4,6,7,8,9,1,2,6,7,2,1,9,5,3,4,8,1,9,8,3,4,2,5,6,7,8,5,9,7,6,1,4,2,3,4,2,6,8,5,3,7,9,1,7,1,3,9,2,4,8,5,6,9,6,1,5,3,7,2,8,4,2,8,7,4,1,9,6,3,5,3,4,5,2,8,6,1,7,9]
        }
    };

    function formatTime(secs) {
        const m = Math.floor(secs / 60).toString().padStart(2, '0');
        const s = (secs % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    function startTimer() {
        stopTimer();
        seconds = 0;
        timerEl.textContent = '00:00';
        timerInterval = setInterval(() => {
            seconds++;
            timerEl.textContent = formatTime(seconds);
        }, 1000);
    }

    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    function updateLeaderboard() {
        if (leaderboard.length === 0) {
            leaderboardList.innerHTML = '<div class="leaderboard-empty">No records yet. Be the first!</div>';
            return;
        }
        
        const ranks = ['gold', 'silver', 'bronze'];
        leaderboardList.innerHTML = leaderboard.slice(0, 3).map((entry, i) => `
            <div class="leaderboard-item">
                <span class="leaderboard-rank ${ranks[i]}">#${i + 1}</span>
                <span class="leaderboard-name">${entry.name}</span>
                <span class="leaderboard-time">${formatTime(entry.time)}</span>
            </div>
        `).join('');
    }

    function saveToLeaderboard(name, time) {
        leaderboard.push({ name, time, date: new Date().toISOString() });
        leaderboard.sort((a, b) => a.time - b.time);
        leaderboard = leaderboard.slice(0, 10); // Keep top 10
        localStorage.setItem('sudokuLeaderboard', JSON.stringify(leaderboard));
        updateLeaderboard();
    }

    function initBoard() {
        const puzzle = puzzles[currentLevel];
        currentPuzzle = [...puzzle.puzzle];
        board = [...puzzle.puzzle];
        solution = [...puzzle.solution];
        errors = 0;
        errorsEl.textContent = errors;
        selectedCell = null;
        startTimer();
        renderBoard();
    }

    function renderBoard() {
        grid.innerHTML = '';
        board.forEach((num, i) => {
            const cell = document.createElement('div');
            cell.className = 'sudoku-cell';
            cell.dataset.index = i;
            
            if (currentPuzzle[i] !== 0) {
                cell.classList.add('given');
                cell.textContent = num;
            } else if (num !== 0) {
                cell.textContent = num;
                if (num !== solution[i]) cell.classList.add('error');
            }
            
            cell.addEventListener('click', () => selectCell(i));
            grid.appendChild(cell);
        });
    }

    function selectCell(index) {
        if (currentPuzzle[index] !== 0) return;
        document.querySelectorAll('.sudoku-cell').forEach(c => c.classList.remove('selected'));
        grid.children[index].classList.add('selected');
        selectedCell = index;
    }

    function enterNumber(num) {
        if (selectedCell === null || currentPuzzle[selectedCell] !== 0) return;
        
        if (num === 0) {
            board[selectedCell] = 0;
        } else {
            board[selectedCell] = num;
            
            if (num !== solution[selectedCell]) {
                errors++;
                errorsEl.textContent = errors;
                
                if (errors >= maxErrors) {
                    stopTimer();
                    setTimeout(() => {
                        alert('Game Over! You made ' + maxErrors + ' mistakes. Try again!');
                        initBoard();
                    }, 300);
                    return;
                }
            }
            
            // Check win
            if (board.every((val, i) => val === solution[i])) {
                stopTimer();
                const finalTime = seconds;
                setTimeout(() => {
                    alert(`🎉 Congratulations ${playerName}! You solved the ${currentLevel} puzzle in ${formatTime(finalTime)}!`);
                    saveToLeaderboard(playerName, finalTime);
                    // Show name entry again
                    gameArea.style.display = 'none';
                    nameEntry.style.display = 'block';
                }, 300);
            }
        }
        
        renderBoard();
        if (selectedCell !== null) grid.children[selectedCell].classList.add('selected');
    }

    // Start game button
    startGameBtn.addEventListener('click', () => {
        playerName = playerNameInput.value.trim() || 'Guest';
        currentPlayerEl.textContent = playerName;
        nameEntry.style.display = 'none';
        gameArea.style.display = 'block';
        initBoard();
    });

    playerNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') startGameBtn.click();
    });

    // Level selection
    levelBtns.forEach(levelBtn => {
        levelBtn.addEventListener('click', () => {
            levelBtns.forEach(b => b.classList.remove('active'));
            levelBtn.classList.add('active');
            currentLevel = levelBtn.dataset.level;
            initBoard();
        });
    });

    btn.addEventListener('click', () => {
        modal.classList.add('active');
        updateLeaderboard();
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        stopTimer();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            stopTimer();
        }
    });

    numberPad.addEventListener('click', (e) => {
        if (e.target.dataset.num !== undefined) enterNumber(parseInt(e.target.dataset.num));
    });

    newGameBtn.addEventListener('click', initBoard);

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active') || gameArea.style.display === 'none') return;
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
