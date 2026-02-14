// Elementos del DOM
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionScreen = document.getElementById('questionScreen');
const successScreen = document.getElementById('successScreen');
const heartsContainer = document.getElementById('heartsContainer');
const confettiContainer = document.getElementById('confettiContainer');
const attemptsNumber = document.getElementById('attemptsNumber');
const easterEgg = document.getElementById('easterEgg');

// Variables de control
let attempts = 0;
let yesBtnScale = 1;
const maxMovements = 5;
let noButtonMoved = 0;

// Mensajes de Easter Egg según intentos
const easterEggMessages = [
    "",
    "🤔 ¿En serio?",
    "😅 Daleee, sabes que quieres decir que sí...",
    "😏 Insistis mucho ehh...",
    "🙈 Daleeeeee...",
    "😂 Es nuestro destino",
    "🎯 Ta raro ese boton",
    "💪 Cuántos intentos más?",
    "🌟 El universo quiere que digas SÍ",
    "😎 ya te rendiste, te tengo enamorada"
];

// Crear corazones flotantes de fondo
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.textContent = ['❤️', '💕', '💖', '💗', '💝', '💘'][Math.floor(Math.random() * 6)];

    // Posición y tamaño aleatorios
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';

    heartsContainer.appendChild(heart);

    // Eliminar el corazón después de la animación
    setTimeout(() => {
        heart.remove();
    }, 7000);
}

// Generar corazones continuamente
setInterval(createFloatingHeart, 300);

// Inicializar con algunos corazones
for (let i = 0; i < 15; i++) {
    setTimeout(createFloatingHeart, i * 200);
}

// Mover botón "No" a posición aleatoria
function moveNoButton() {
    if (noButtonMoved >= maxMovements) {
        // Después de X movimientos, convertir a "Sí"
        convertNoToYes();
        return;
    }

    const container = questionScreen.querySelector('.question-box');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calcular posición aleatoria dentro del contenedor
    const maxX = containerRect.width - btnRect.width - 40;
    const maxY = containerRect.height - btnRect.height - 40;

    const randomX = Math.random() * maxX - maxX / 2;
    const randomY = Math.random() * maxY - maxY / 2;

    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

    noButtonMoved++;
    attempts++;
    updateAttempts();
    growYesButton();
}

// Convertir botón "No" a "Sí"
function convertNoToYes() {
    noBtn.textContent = 'Sí 💖';
    noBtn.classList.add('converting');
    noBtn.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    noBtn.style.cursor = 'pointer';

    // Después de la animación, hacer que funcione como el botón Sí
    setTimeout(() => {
        noBtn.addEventListener('click', handleYesClick);
    }, 500);
}

// Hacer crecer el botón "Sí"
function growYesButton() {
    yesBtnScale += 0.1;
    yesBtn.style.transform = `scale(${yesBtnScale})`;
}

// Actualizar contador de intentos
function updateAttempts() {
    attemptsNumber.textContent = attempts;

    // Mostrar Easter Egg según intentos
    if (attempts < easterEggMessages.length) {
        easterEgg.textContent = easterEggMessages[attempts];
    } else {
        easterEgg.textContent = "🔥 ¡Eres increíblemente persistente! 🔥";
    }
}

// Crear confetti
function createConfetti() {
    const colors = ['#ff6b9d', '#c44569', '#f093fb', '#4facfe', '#feca57', '#ff9ff3'];
    const shapes = ['❤️', '💕', '💖', '💗', '⭐', '✨', '💝'];

    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');

            // Decidir si es emoji o cuadrado de color
            if (Math.random() > 0.5) {
                confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
                confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
            } else {
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = (Math.random() * 10 + 5) + 'px';
                confetti.style.height = confetti.style.width;
            }

            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';

            confettiContainer.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }, i * 10);
    }
}

// Crear explosión de corazones
function createHeartExplosion(x, y) {
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘', '💓', '💞'];

    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.classList.add('explosion-particle');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

        const angle = (Math.PI * 2 * i) / 30;
        const velocity = Math.random() * 200 + 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--ty', ty + 'px');

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1000);
    }
}

// Manejar click en "Sí"
function handleYesClick(e) {
    // Crear explosión en la posición del click
    createHeartExplosion(e.clientX, e.clientY);

    // Crear confetti
    createConfetti();

    // Mostrar pantalla de éxito
    setTimeout(() => {
        successScreen.classList.add('active');
    }, 300);

    // Continuar creando más corazones en la pantalla de éxito
    setInterval(createFloatingHeart, 200);
}

// Event Listeners
yesBtn.addEventListener('click', handleYesClick);

noBtn.addEventListener('mouseenter', () => {
    attempts++;
    updateAttempts();
    moveNoButton();
    growYesButton();
});

// Prevenir click en el botón "No" (por si acaso)
noBtn.addEventListener('click', (e) => {
    if (noButtonMoved < maxMovements) {
        e.preventDefault();
        moveNoButton();
    }
});

// Prevenir que el botón "No" sea seleccionable
noBtn.style.userSelect = 'none';
