// Deck de cartas de Tarot com URLs de imagens
const tarotDeck = [
    { name: "O Louco", image: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg" },
    { name: "O Mago", image: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg" },
    { name: "A Sacerdotisa", image: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg" },
    { name: "A Imperatriz", image: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg" },
    { name: "O Imperador", image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg" },
    { name: "O Hierofante", image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg" },
    { name: "Os Amantes", image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/TheLovers.jpg" },
    { name: "O Carro", image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg" },
    { name: "A Força", image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg" },
    { name: "O Eremita", image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg" },
    { name: "A Roda da Fortuna", image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg" },
    { name: "A Justiça", image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg" },
    { name: "O Enforcado", image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg" },
    { name: "A Morte", image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg" },
    { name: "A Temperança", image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg" },
    { name: "O Diabo", image: "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg" },
    { name: "A Torre", image: "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg" },
    { name: "A Estrela", image: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg" },
    { name: "A Lua", image: "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg" },
    { name: "O Sol", image: "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg" },
    { name: "O Julgamento", image: "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg" },
    { name: "O Mundo", image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg" }
];

// Função para embaralhar o deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Função para tirar cartas
function drawCards(deck, number) {
    return deck.slice(0, number);
}

// Função para exibir as cartas com animação
function displayCards(cards) {
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = '';
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.style.animationDelay = `${index * 0.1}s`;
        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">
                    <img src="${card.image}" alt="${card.name}">
                    <p>${card.name}</p>
                </div>
            </div>
        `;
        cardElement.addEventListener('click', () => {
            cardElement.classList.toggle('flipped');
        });
        gameArea.appendChild(cardElement);
    });
}

// Função para o jogo de 3 cartas
function playThreeCards() {
    const shuffledDeck = shuffleDeck([...tarotDeck]);
    const drawnCards = drawCards(shuffledDeck, 3);
    displayCards(drawnCards);
}

// Função para o jogo da Mesa Real
function playRoyalTable() {
    const shuffledDeck = shuffleDeck([...tarotDeck]);
    const drawnCards = drawCards(shuffledDeck, 32);
    displayCards(drawnCards);
}

// Funções de autenticação
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
}

function showRegisterForm() {
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
}

function register() {
    const name = document.getElementById('registerName').value;
    const birthday = document.getElementById('registerBirthday').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(user => user.email === email)) {
        alert('Este email já está cadastrado.');
        return;
    }

    users.push({ name, birthday, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Cadastro realizado com sucesso!');
    login(email);
}

function login(email = null) {
    const loginEmail = email || document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword')?.value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === loginEmail && (email || u.password === password));

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateUserInterface(true);
    } else if (!email) {
        alert('Email ou senha incorretos.');
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    updateUserInterface(false);
}

function updateUserInterface(loggedIn) {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');

    if (loggedIn) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        userInfo.style.display = 'inline';
        userName.textContent = user.name;
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'none';
    } else {
        loginBtn.style.display = 'inline';
        registerBtn.style.display = 'inline';
        userInfo.style.display = 'none';
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('threeCards').addEventListener('click', playThreeCards);
    document.getElementById('royalTable').addEventListener('click', playRoyalTable);
    document.getElementById('loginBtn').addEventListener('click', showLoginForm);
    document.getElementById('registerBtn').addEventListener('click', showRegisterForm);
    document.getElementById('submitLogin').addEventListener('click', () => login());
    document.getElementById('submitRegister').addEventListener('click', register);
    document.getElementById('logoutBtn').addEventListener('click', logout);

    updateUserInterface(!!localStorage.getItem('currentUser'));
});