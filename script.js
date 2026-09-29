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
        { title: 'Tech stocks rally as AI investments surge', source: 'Reuters' },
        { title: 'Federal Reserve signals potential rate decisions', source: 'Bloomberg' },
        { title: 'Global markets respond to economic indicators', source: 'CNBC' }
    ];
    
    container.innerHTML = headlines.map(n => `
        <div class="news-item">
            ${n.title}
            <span class="news-source">${n.source}</span>
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
