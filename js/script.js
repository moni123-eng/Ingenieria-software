// Expansión de cartas con 'Ver más'
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.see-more-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const card = btn.closest('.card');
            card.classList.toggle('expanded');
            const details = card.querySelector('.card-details');
            const summary = card.querySelector('.card-summary');
            if (card.classList.contains('expanded')) {
                details.style.display = 'block';
                summary.style.display = 'none';
                btn.textContent = 'Ver menos';
            } else {
                details.style.display = 'none';
                summary.style.display = 'block';
                btn.textContent = 'Ver más';
            }
        });
    });
});
const triviaQuestions = [
    {
        question: "¿En qué década surge la 'Crisis del Software'?",
        answers: ["1950s", "1960s", "1970s", "1980s"],
        correct: 1,
        explanation: "La Crisis del Software surgió en los 1960s cuando se evidenciaron fallos en proyectos grandes y costosos."
    },
    {
        question: "¿Quién introdujo el Modelo en Cascada en 1970?",
        answers: ["Royce", "Dijkstra", "Brooks", "Knuth"],
        correct: 0,
        explanation: "Winston Royce introdujo el Modelo en Cascada en 1970, aunque irónicamente él mismo criticaba su rigidez."
    },
    {
        question: "¿En qué año se creó el lenguaje C?",
        answers: ["1970", "1972", "1974", "1976"],
        correct: 1,
        explanation: "El lenguaje C fue creado por Dennis Ritchie en 1972 en los laboratorios Bell."
    },
    {
        question: "¿Cuál de estos lenguajes introdujo la Programación Orientada a Objetos?",
        answers: ["C", "FORTRAN", "Smalltalk", "COBOL"],
        correct: 2,
        explanation: "Smalltalk fue uno de los primeros lenguajes en implementar completamente la POO en los 1980s."
    },
    {
        question: "¿En qué año se publicó el Manifiesto Ágil?",
        answers: ["1999", "2001", "2003", "2005"],
        correct: 1,
        explanation: "El Manifiesto Ágil fue publicado en 2001 por 17 desarrolladores que buscaban mejores formas de desarrollar software."
    },
    {
        question: "¿Cuál fue el primer navegador web ampliamente usado?",
        answers: ["Internet Explorer", "Netscape", "Mosaic", "Firefox"],
        correct: 2,
        explanation: "Mosaic fue el primer navegador web popular, lanzado en 1993 y que popularizó la World Wide Web."
    },
    {
        question: "¿Qué significa 'DevOps'?",
        answers: ["Development Operations", "Device Optimization", "Developer Options", "Design Operations"],
        correct: 0,
        explanation: "DevOps combina Development (Desarrollo) y Operations (Operaciones) para mejorar la colaboración."
    },
    {
        question: "¿En qué década aparecieron los primeros frameworks de JavaScript como jQuery?",
        answers: ["1990s", "2000s", "2010s", "2020s"],
        correct: 1,
        explanation: "jQuery fue lanzado en 2006, en la década de los 2000s, revolucionando el desarrollo web frontend."
    },
    {
        question: "¿Cuál es la principal característica de los microservicios?",
        answers: ["Monolítico", "Distribuido", "Centralizado", "Secuencial"],
        correct: 1,
        explanation: "Los microservicios son una arquitectura distribuida donde cada servicio es independiente."
    },
    {
        question: "¿Qué tecnología popularizó el concepto de 'contenedores' en software?",
        answers: ["Kubernetes", "Docker", "AWS", "VMware"],
        correct: 1,
        explanation: "Docker popularizó los contenedores de software, aunque Kubernetes los orquesta a gran escala."
    }
];

// Variables del juego
let currentQuestionIndex = 0;
let score = 0;
let streak = 0;
let gameActive = false;
let questions = [];

// Elementos del DOM
const gameToggle = document.getElementById('gameToggle');
const gameOverlay = document.getElementById('gameOverlay');
const gameContainer = document.getElementById('gameContainer');
const questionText = document.getElementById('questionText');
const answersContainer = document.getElementById('answersContainer');
const currentScoreEl = document.getElementById('currentScore');
const questionNumberEl = document.getElementById('questionNumber');
const streakEl = document.getElementById('streak');
const progressBar = document.getElementById('progressBar');
const nextButton = document.getElementById('nextQuestion');
const closeButton = document.getElementById('closeGame');
const playAgainButton = document.getElementById('playAgain');
const gameResults = document.getElementById('gameResults');
const questionContainer = document.getElementById('questionContainer');
const finalScoreEl = document.getElementById('finalScore');
const scoreMessageEl = document.getElementById('scoreMessage');

// Inicializar juego
function initGame() {
    questions = [...triviaQuestions].sort(() => Math.random() - 0.5); // Mezclar preguntas
    currentQuestionIndex = 0;
    score = 0;
    streak = 0;
    gameActive = true;

    gameResults.classList.remove('show');
    questionContainer.style.display = 'block';
    nextButton.style.display = 'none';
    playAgainButton.style.display = 'none';

    updateGameStats();
    showQuestion();
}

// Mostrar pregunta actual
function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }

    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;

    // Limpiar respuestas anteriores
    answersContainer.innerHTML = '';

    // Crear botones de respuesta
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(button);
    });

    updateProgressBar();
}

// Seleccionar respuesta
function selectAnswer(selectedIndex) {
    if (!gameActive) return;

    const question = questions[currentQuestionIndex];
    const buttons = answersContainer.querySelectorAll('.answer-btn');

    // Deshabilitar todos los botones
    buttons.forEach(btn => btn.classList.add('disabled'));

    // Marcar respuesta correcta e incorrecta
    buttons[question.correct].classList.add('correct');
    if (selectedIndex !== question.correct) {
        buttons[selectedIndex].classList.add('incorrect');
        streak = 0;
    } else {
        score += 10 + (streak * 2); // Bonus por racha
        streak++;
    }

    updateGameStats();

    // Mostrar botón siguiente después de un delay
    setTimeout(() => {
        nextButton.style.display = 'block';
    }, 1000);
}

// Siguiente pregunta
function nextQuestion() {
    currentQuestionIndex++;
    nextButton.style.display = 'none';

    if (currentQuestionIndex >= questions.length) {
        endGame();
    } else {
        showQuestion();
    }
}

// Finalizar juego
function endGame() {
    gameActive = false;
    questionContainer.style.display = 'none';
    gameResults.classList.add('show');

    finalScoreEl.textContent = score;

    let message = '';
    if (score >= 80) {
        message = '🏆 ¡Excelente! Eres un experto en historia del software';
    } else if (score >= 60) {
        message = '🎉 ¡Muy bien! Tienes buen conocimiento de la evolución del software';
    } else if (score >= 40) {
        message = '👍 ¡No está mal! Hay espacio para aprender más sobre la historia';
    } else {
        message = '📚 ¡Sigue aprendiendo! La línea de tiempo te ayudará a mejorar';
    }

    scoreMessageEl.textContent = message;
    playAgainButton.style.display = 'block';
}

// Actualizar estadísticas del juego
function updateGameStats() {
    currentScoreEl.textContent = score;
    questionNumberEl.textContent = currentQuestionIndex + 1;
    streakEl.textContent = streak;
}

// Actualizar barra de progreso
function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
}

// Abrir/cerrar juego
function toggleGame() {
    if (gameContainer.classList.contains('active')) {
        closeGame();
    } else {
        openGame();
    }
}

function openGame() {
    gameOverlay.classList.add('active');
    gameContainer.classList.add('active');
    initGame();
}

function closeGame() {
    gameOverlay.classList.remove('active');
    gameContainer.classList.remove('active');
}

// Event listeners del juego
gameToggle.addEventListener('click', toggleGame);
gameOverlay.addEventListener('click', closeGame);
closeButton.addEventListener('click', closeGame);
nextButton.addEventListener('click', nextQuestion);
playAgainButton.addEventListener('click', initGame);

// Array de iconos de software y tecnología
const techIcons = [
    'fas fa-code', 'fas fa-laptop-code', 'fas fa-server', 'fas fa-database',
    'fas fa-cloud', 'fas fa-mobile-alt', 'fas fa-desktop', 'fas fa-wifi',
    'fas fa-cog', 'fas fa-microchip', 'fas fa-memory', 'fas fa-hdd',
    'fas fa-network-wired', 'fas fa-terminal', 'fas fa-bug', 'fas fa-shield-alt',
    'fab fa-python', 'fab fa-java', 'fab fa-js', 'fab fa-react',
    'fab fa-angular', 'fab fa-vuejs', 'fab fa-node-js', 'fab fa-npm',
    'fab fa-github', 'fab fa-gitlab', 'fab fa-docker', 'fab fa-aws',
    'fab fa-google', 'fab fa-microsoft', 'fab fa-apple', 'fab fa-linux',
    'fab fa-ubuntu', 'fab fa-android', 'fab fa-chrome', 'fab fa-firefox',
    'fas fa-robot', 'fas fa-brain', 'fas fa-eye', 'fas fa-fingerprint',
    'fas fa-lock', 'fas fa-key', 'fas fa-search', 'fas fa-chart-line',
    'fas fa-project-diagram', 'fas fa-sitemap', 'fas fa-layer-group', 'fas fa-cubes'
];

// Crear iconos flotantes
function createFloatingIcon() {
    const icon = document.createElement('i');
    const randomIcon = techIcons[Math.floor(Math.random() * techIcons.length)];
    const sizes = ['small', 'medium', 'large'];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];

    icon.className = `floating-icon ${randomIcon} ${randomSize}`;

    // Posición horizontal aleatoria (distribuidos)
    icon.style.left = Math.random() * 98 + 1 + 'vw';

    // Posición vertical inicial cerca del top (lluvia)
    icon.style.top = Math.random() * 10 + 'vh';

    // Animación solo hacia abajo (sin reverse)
    // Eliminar reverse para que todos caigan
    // icon.classList.remove('reverse');

    // Añadir parallax aleatoriamente
    if (Math.random() > 0.7) icon.classList.add('parallax');

    // Delay aleatorio para que no caigan todos juntos
    icon.style.animationDelay = Math.random() * 10 + 's';

    return icon;
}

// Generar iconos iniciales
function generateIcons() {
    const container = document.getElementById('floatingIcons');
    const iconCount = window.innerWidth > 768 ? 50 : 30; 

    for (let i = 0; i < iconCount; i++) {
        container.appendChild(createFloatingIcon());
    }
}

// Agregar nuevos iconos periódicamente
function addPeriodicIcon() {
    const container = document.getElementById('floatingIcons');
    if (container.children.length < 60) {
        container.appendChild(createFloatingIcon());
    }
}

// Inicializar iconos flotantes
document.addEventListener('DOMContentLoaded', () => {
    generateIcons();

    setInterval(addPeriodicIcon, 3000);

    setInterval(() => {
        const container = document.getElementById('floatingIcons');
        if (container.children.length > 80) {
            for (let i = 0; i < 20; i++) {
                if (container.children[i]) {
                    container.removeChild(container.children[i]);
                }
            }
        }
    }, 30000);

    const gameObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.classList.contains('active')) {
                // Acelerar iconos cuando el juego está activo
                document.querySelectorAll('.floating-icon').forEach(icon => {
                    icon.style.animationDuration = '8s';
                    icon.style.color = 'rgba(40, 167, 69, 0.15)';
                });
            } else {
                document.querySelectorAll('.floating-icon').forEach(icon => {
                    icon.style.animationDuration = '';
                    icon.style.color = '';
                });
            }
        });
    });

    gameObserver.observe(gameContainer, { attributes: true, attributeFilter: ['class'] });
});

// Indicador de progreso de scroll
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollCurrent = window.pageYOffset;
    const scrollPercentage = (scrollCurrent / scrollTotal) * 100;
    scrollProgress.style.width = scrollPercentage + '%';
});

// Botón volver arriba
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Animación máquina del tiempo al bajar
function timeMachineScroll(targetY = 0, duration = 1200) {
    const startY = window.pageYOffset;
    const diff = targetY - startY;
    const startTime = performance.now();
    // Crear overlay de transición
    let overlay = document.createElement('div');
    overlay.className = 'time-machine-overlay';
    document.body.appendChild(overlay);

    // Partículas y desenfoque
    let particles = [];
    for (let i = 0; i < 40; i++) {
        let p = document.createElement('div');
        p.className = 'tm-particle';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = Math.random() * 100 + 'vh';
        overlay.appendChild(p);
        particles.push(p);
    }

    function animateScroll(now) {
        let elapsed = now - startTime;
        let progress = Math.min(elapsed / duration, 1);
        let ease = 0.5 - Math.cos(progress * Math.PI) / 2;
        window.scrollTo(0, startY + diff * ease);
        overlay.style.opacity = String(0.7 * (1 - Math.abs(0.5 - progress) * 2));
        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        } else {
            overlay.remove();
        }
    }
    requestAnimationFrame(animateScroll);
}

backToTop.addEventListener('click', () => {
    timeMachineScroll(0, 1200);
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
}

// Lazy loading mejorado
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Efecto interactivo: cambiar velocidad de iconos al hacer hover sobre cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        document.querySelectorAll('.floating-icon').forEach(icon => {
            icon.style.animationDuration = '10s';
        });
    });

    card.addEventListener('mouseleave', () => {
        document.querySelectorAll('.floating-icon').forEach(icon => {
            icon.style.animationDuration = '';
        });
    });
});
// --- ZOOM DE IMÁGENES DE CARTAS ---
document.addEventListener('DOMContentLoaded', function () {
    const zoomables = document.querySelectorAll('.zoomable');
    const modal = document.getElementById('imgZoomModal');
    const modalImg = document.getElementById('imgZoomContent');
    const modalCaption = document.getElementById('imgZoomCaption');
    const modalClose = document.getElementById('imgZoomClose');

    zoomables.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function () {
            modal.style.display = 'block';
            modalImg.src = this.src;
            modalCaption.textContent = this.alt;
        });
    });

    modalClose.addEventListener('click', function () {
        modal.style.display = 'none';
        modalImg.src = '';
        modalCaption.textContent = '';
    });

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalImg.src = '';
            modalCaption.textContent = '';
        }
    });
});

function playFeedback(type) {
    if ('vibrate' in navigator) {
        switch (type) {
            case 'correct':
                navigator.vibrate([100, 50, 100]);
                break;
            case 'incorrect':
                navigator.vibrate([200]);
                break;
            case 'gameStart':
                navigator.vibrate([50, 100, 50]);
                break;
        }
    }
}

// Mejorar la experiencia del juego con feedback
const originalSelectAnswer = selectAnswer;
selectAnswer = function (selectedIndex) {
    const question = questions[currentQuestionIndex];
    if (selectedIndex === question.correct) {
        playFeedback('correct');
    } else {
        playFeedback('incorrect');
    }
    originalSelectAnswer(selectedIndex);
};

// Agregar efectos de partículas cuando se acierta
function createParticles(element) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.background = '#28a745';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';

            const rect = element.getBoundingClientRect();
            particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            particle.style.top = (rect.top + Math.random() * rect.height) + 'px';

            document.body.appendChild(particle);

            particle.animate([
                { transform: 'translateY(0px) scale(1)', opacity: 1 },
                { transform: 'translateY(-50px) scale(0)', opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => {
                document.body.removeChild(particle);
            };
        }, i * 100);
    }
}

let playerStats = {
    gamesPlayed: 0,
    totalScore: 0,
    bestScore: 0,
    averageScore: 0,
    questionsAnswered: 0,
    correctAnswers: 0
};

// Actualizar estadísticas
function updatePlayerStats(gameScore, totalQuestions, correctCount) {
    playerStats.gamesPlayed++;
    playerStats.totalScore += gameScore;
    playerStats.bestScore = Math.max(playerStats.bestScore, gameScore);
    playerStats.averageScore = Math.round(playerStats.totalScore / playerStats.gamesPlayed);
    playerStats.questionsAnswered += totalQuestions;
    playerStats.correctAnswers += correctCount;
}

// Mostrar estadísticas en los resultados
function showDetailedResults(gameScore, correctCount, totalQuestions) {
    updatePlayerStats(gameScore, totalQuestions, correctCount);

    const accuracy = Math.round((correctCount / totalQuestions) * 100);
    const sessionAccuracy = Math.round((playerStats.correctAnswers / playerStats.questionsAnswered) * 100);

    let detailedMessage = `
        🎯 Precisión: ${accuracy}%
        🏆 Mejor puntuación: ${playerStats.bestScore}
        📊 Promedio: ${playerStats.averageScore}
        🎮 Partidas jugadas: ${playerStats.gamesPlayed}
        📈 Precisión total: ${sessionAccuracy}%
      `;

    scoreMessageEl.innerHTML = scoreMessageEl.textContent + '<br><br>' +
        detailedMessage.split('\n').map(line => line.trim()).filter(line => line).join('<br>');
}

const originalEndGame = endGame;
endGame = function () {
    const correctCount = score / 10; 
    originalEndGame();
    showDetailedResults(score, correctCount, questions.length);
};