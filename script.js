// === МАССИВ ПРАВИЛЬНЫХ ИМЁН ===
const validNames = [
    'даня', 'данил', 'даниил', 'данюша', 'данечка', 
    'данька'
];

// Счётчик попыток для подсказок
let attempts = 0;

// === ФУНКЦИЯ ПРОВЕРКИ ИМЕНИ ===
// === ФУНКЦИЯ ПРОВЕРКИ ИМЕНИ ===
function checkName() {
    const input = document.getElementById('nameInput');
    const errorMsg = document.getElementById('errorMsg');
    const hintMsg = document.getElementById('hintMsg');
    
    const userInput = input.value.trim().toLowerCase();
    
    if (userInput === '') {
        errorMsg.textContent = 'Поле не может быть пустым 😅';
        hintMsg.textContent = '';
        return;
    }
    
    if (validNames.includes(userInput)) {
        // ✅ ПРАВИЛЬНО! Переходим к шагу 2
        document.getElementById('step1').classList.remove('active');
        document.getElementById('step2').classList.add('active');
        errorMsg.textContent = '';
        hintMsg.textContent = '';
    } else {
        // ❌ НЕВЕРНО
        attempts++;
        errorMsg.textContent = 'Неправильно! Попробуй ещё раз 🤔';
        
        if (attempts === 1) {
            hintMsg.textContent = 'Подсказка: имя начинается на букву "Д" 😉';
        } else if (attempts === 2) {
            hintMsg.textContent = 'Подсказка: у этого парня есть чувство юмора и он тебя обожает 💕';
        } else if (attempts === 3) {
            hintMsg.textContent = 'Серьёзно? Попробуй: Даня, Данюша, Данил...';
        } else {
            hintMsg.textContent = 'Ладно, спойлер: напиши "Данюша" 😄';
        }
        
        const card = document.querySelector('.card');
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = 'shake 0.5s';
        }, 10);
    }
}

// === ПРОВЕРКА ВОЗРАСТА ===
function updateAgeDisplay() {
    const ageValue = document.getElementById('ageValue');
    const slider = document.getElementById('ageSlider');
    ageValue.textContent = slider.value;
}

function checkAge() {
    const slider = document.getElementById('ageSlider');
    const ageError = document.getElementById('ageError');
    const selectedAge = parseInt(slider.value);
    
    if (selectedAge === 18) {
        // ✅ ПРАВИЛЬНО! Переходим к шагу 3
        document.getElementById('step2').classList.remove('active');
        document.getElementById('step3').classList.add('active');
        ageError.textContent = '';
    } else {
        // ❌ НЕВЕРНО
        ageError.textContent = 'Неправильно! Подумай ещё раз 🤔';
        
        const card = document.querySelector('.card');
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = 'shake 0.5s';
        }, 10);
    }
}

// === ПРОВЕРКА ДАТЫ ЗНАКОМСТВА ===
function checkDate() {
    const dayInput = document.getElementById('dayInput');
    const monthInput = document.getElementById('monthInput');
    const yearInput = document.getElementById('yearInput');
    const dateError = document.getElementById('dateError');
    const dateHint = document.getElementById('dateHint');
    
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);
    
    // Правильная дата: 23.10.2023
    const correctDay = 23;
    const correctMonth = 10;
    const correctYear = 2023;
    
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        dateError.textContent = 'Заполни все поля! 📅';
        dateHint.textContent = '';
        return;
    }
    
    if (day === correctDay && month === correctMonth && year === correctYear) {
        // ✅ ПРАВИЛЬНО! Переходим на главный экран
        document.getElementById('screen1').classList.remove('active');
        document.getElementById('screen2').classList.add('active');
        
        // Запускаем конфетти
        launchConfetti();
        
        // Запускаем таймер
        startCountdown();
        
        // Активируем убегающую кнопку "Нет"
        initRunawayButton();
        
        dateError.textContent = '';
        dateHint.textContent = '';
    } else {
        // ❌ НЕВЕРНО
        dateError.textContent = 'Неправильная дата! Попробуй ещё раз 🤔';
        
        if (year !== correctYear) {
            dateHint.textContent = 'Подсказка: это было не так давно...';
        } else if (month !== correctMonth) {
            dateHint.textContent = 'Подсказка: год правильный, а месяц?';
        } else {
            dateHint.textContent = 'Подсказка: осень, конец октября...';
        }
        
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
    updateAgeDisplay();
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

// === ПОКАЗАТЬ ФОТОГРАФИИ ===
function showPhotos() {
    // Скрываем экран 2
    document.getElementById('screen2').classList.remove('active');
    // Показываем экран 3
    document.getElementById('screen3').classList.add('active');
    // Прокручиваем наверх
    window.scrollTo(0, 0);
}

// === ВЕРНУТЬСЯ НАЗАД ===
function backToMain() {
    // Скрываем экран 3
    document.getElementById('screen3').classList.remove('active');
    // Показываем экран 2
    document.getElementById('screen2').classList.add('active');
    // Прокручиваем наверх
    window.scrollTo(0, 0);
}

// === МОДАЛЬНОЕ ОКНО ДЛЯ ФОТО (ИСПРАВЛЕННАЯ ВЕРСИЯ) ===
let currentPhotoIndex = 0;
let photoItems = [];

function openModal(element) {
    // Находим родительский блок с фото
    const photoItem = element.closest('.photo-item');
    if (!photoItem) {
        console.error('Не удалось найти блок с фото');
        return;
    }

    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    const modalCaptionContainer = document.getElementById('modalCaptionContainer');
    const photoCounter = document.getElementById('photoCounter');
    
    // Собираем ВСЕ фото (независимо от класса clickable)
    photoItems = Array.from(document.querySelectorAll('.photo-item'));
    
    // Находим индекс текущего фото
    currentPhotoIndex = photoItems.indexOf(photoItem);
    
    // Получаем данные
    const img = photoItem.querySelector('img');
    const caption = photoItem.getAttribute('data-caption') || 'Красивое фото ❤️';
    const totalPhotos = photoItems.length;
    
    if (!img) {
        console.error('Картинка не найдена');
        return;
    }

    // Устанавливаем данные
    modalImg.src = img.src;
    modalCaption.textContent = caption;
    photoCounter.textContent = `${currentPhotoIndex + 1} из ${totalPhotos}`;
    
    // Настраиваем цвет текста
    updateCaptionStyle(currentPhotoIndex, totalPhotos);

    // Показываем окно
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    launchHearts();
    
    console.log('✅ Модальное окно открыто, фото номер:', currentPhotoIndex + 1, 'Всего фото:', totalPhotos);
}

function changePhoto(direction) {
    console.log('🔄 Переключение фото, направление:', direction, 'Текущий индекс:', currentPhotoIndex);
    
    if (photoItems.length === 0) {
        console.error('❌ Массив photoItems пуст!');
        return;
    }
    
    currentPhotoIndex += direction;
    
    // Циклическая навигация
    if (currentPhotoIndex < 0) {
        currentPhotoIndex = photoItems.length - 1;
    } else if (currentPhotoIndex >= photoItems.length) {
        currentPhotoIndex = 0;
    }
    
    console.log('📸 Новое фото номер:', currentPhotoIndex + 1);
    updateModalContent();
}

function updateModalContent() {
    if (photoItems.length === 0) {
        console.error('❌ Нет фото для отображения');
        return;
    }
    
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    const modalCaptionContainer = document.getElementById('modalCaptionContainer');
    const photoCounter = document.getElementById('photoCounter');
    
    const currentItem = photoItems[currentPhotoIndex];
    const img = currentItem.querySelector('img');
    const caption = currentItem.getAttribute('data-caption') || 'Красивое фото ❤️';
    const totalPhotos = photoItems.length;
    
    if (!img) {
        console.error('❌ Картинка не найдена в фото номер', currentPhotoIndex + 1);
        return;
    }
    
    modalImg.src = img.src;
    modalCaption.textContent = caption;
    photoCounter.textContent = `${currentPhotoIndex + 1} из ${totalPhotos}`;
    
    updateCaptionStyle(currentPhotoIndex, totalPhotos);
    
    console.log('✅ Фото обновлено:', currentPhotoIndex + 1);
}

function updateCaptionStyle(index, total) {
    const modalCaption = document.getElementById('modalCaption');
    const modalCaptionContainer = document.getElementById('modalCaptionContainer');
    
    // Плавный градиент от белого к красному для ВСЕХ фото
    const progress = index / (total - 1);
    const red = Math.floor(255 - (255 - 235) * progress);
    const green = Math.floor(255 - 255 * progress);
    const blue = Math.floor(255 - 255 * progress);
    
    modalCaption.style.color = `rgb(${red}, ${green}, ${blue})`;
    modalCaptionContainer.style.background = 'transparent';
    modalCaptionContainer.style.boxShadow = 'none';
    
    console.log(`📝 Фото ${index + 1}/${total}: цвет rgb(${red}, ${green}, ${blue})`);
}

function closeModal() {
    const modal = document.getElementById('photoModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    console.log('❌ Модальное окно закрыто');
}

// Закрытие по клику на фон
document.getElementById('photoModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Закрытие по Escape и навигация стрелками
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') changePhoto(-1);
    if (e.key === 'ArrowRight') changePhoto(1);
});

// === АНИМАЦИЯ СЕРДЕЧЕК ===
function launchHearts() {
    const duration = 2000;
    const end = Date.now() + duration;
    
    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            shapes: ['heart'],
            colors: ['#ff4081', '#f48fb1', '#ffffff'],
            scalar: 0.8
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            shapes: ['heart'],
            colors: ['#ff4081', '#f48fb1', '#ffffff'],
            scalar: 0.8
        });
        
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}