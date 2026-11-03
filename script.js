// === МАССИВ ПРАВИЛЬНЫХ ИМЁН ===
const validNames = [
    'даня', 'данил', 'даниил', 'данюша', 'данечка', 
    'данька'
];

// Счётчик попыток для подсказок
let attempts = 0;

// === ФУНКЦИЯ ПРОВЕРКИ ИМЕНИ ===
function checkName() {
    const input = document.getElementById('nameInput');
    const errorMsg = document.getElementById('errorMsg');
    const hintMsg = document.getElementById('hintMsg');
    
    // Убираем пробелы по краям и приводим к нижнему регистру
    const userInput = input.value.trim().toLowerCase();
    
    if (userInput === '') {
        errorMsg.textContent = 'Поле не может быть пустым 😅';
        hintMsg.textContent = '';
        return;
    }
    
    if (validNames.includes(userInput)) {
        // ✅ ПРАВИЛЬНО! Переходим на главный экран
        document.getElementById('screen1').classList.remove('active');
        document.getElementById('screen2').classList.add('active');
        
        // Запускаем конфетти в честь победы
        launchConfetti();
        
        // Запускаем таймер
        startCountdown();
        
        // Активируем убегающую кнопку "Нет"
        initRunawayButton();
    } else {
        // ❌ НЕВЕРНО
        attempts++;
        errorMsg.textContent = 'Неправильно! Попробуй ещё раз 🤔';
        
        // Подсказки в зависимости от количества попыток
        if (attempts === 1) {
            hintMsg.textContent = 'Подсказка: имя начинается на букву "Д" 😉';
        } else if (attempts === 2) {
            hintMsg.textContent = 'Подсказка: у этого парня есть чувство юмора и он тебя обожает 💕';
        } else if (attempts === 3) {
            hintMsg.textContent = 'Серьёзно? Попробуй: Даня, Данюша, Данил...';
        } else {
            hintMsg.textContent = 'Ладно, спойлер: напиши "Данюша" 😄';
        }
        
        // Трясём карточку при ошибке
        const card = document.querySelector('.card');
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = 'shake 0.5s';
        }, 10);
    }
}

// === АНИМАЦИЯ ТРЯСКИ ===
// Добавляем её прямо через JS, чтобы не раздувать CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// === ТАЙМЕР ОБРАТНОГО ОТСЧЁТА ===
function startCountdown() {
    // ⚠️ ВАЖНО: поставь свою дату свидания!
    // Формат: год, месяц-1 (январь=0), день, час, минута
    const eventDate = new Date(2026, 11, 19, 19, 0).getTime(); // 19 декабря 2026, 19:00
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        if (distance < 0) {
            document.getElementById('countdown').innerHTML = '<h2>Свидание уже началось! 🎉</h2>';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// === УБЕГАЮЩАЯ КНОПКА "НЕТ" ===
function initRunawayButton() {
    const noBtn = document.getElementById('noBtn');
    const buttonsContainer = document.querySelector('.buttons');
    
    noBtn.addEventListener('mouseover', () => {
        // Получаем размеры контейнера
        const containerRect = buttonsContainer.getBoundingClientRect();
        
        // Случайные координаты в пределах контейнера
        const maxX = containerRect.width - noBtn.offsetWidth;
        const maxY = 100; // небольшая высота "прыжка"
        
        const randomX = Math.random() * maxX - maxX / 2;
        const randomY = Math.random() * maxY - maxY / 2;
        
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
    
    // На телефоне — по нажатию тоже убегает
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const randomX = Math.random() * 200 - 100;
        const randomY = Math.random() * 100 - 50;
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
}

// === КНОПКА "ДА" ===
function sayYes() {
    // Прячем кнопки
    document.querySelector('.buttons').style.display = 'none';
    // Показываем финальное сообщение
    document.getElementById('finalMessage').style.display = 'block';
    // Мощный салют из конфетти
    bigConfetti();
}

// === КОНФЕТТИ ===
function launchConfetti() {
    confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#ff4081', '#f48fb1', '#ffffff']
    });
}

function bigConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;
    
    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff4081', '#f48fb1', '#ffffff', '#ffd54f']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff4081', '#f48fb1', '#ffffff', '#ffd54f']
        });
        
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

// === ENTER ТОЖЕ ОТПРАВЛЯЕТ ФОРМУ ===
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('nameInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkName();
    });
});

// === МУЗЫКА ===
let isPlaying = false;

function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('musicBtn');
    
    if (isPlaying) {
        music.pause();
        btn.textContent = '🎵 Включить музыку';
        btn.classList.remove('playing');
        isPlaying = false;
    } else {
        music.play().then(() => {
            btn.textContent = ' Выключить музыку';
            btn.classList.add('playing');
            isPlaying = true;
        }).catch(err => {
            console.log('Не удалось воспроизвести:', err);
            alert('Не удалось включить музыку. Проверь, что файл music/song.mp3 существует.');
        });
    }
}