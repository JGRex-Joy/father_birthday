const btn = document.getElementById('start');
const text = document.getElementById('text');
const music = document.getElementById('music');

const messageText = `Папа, спасибо Вам за Вашу заботу, терпение и силы! 
Вы всегда был примером, на который нужно равняться :)
Я горжусь Вами и благодарен за всё, что Вы нам дали 😊
Пусть впереди будет много радостных дней, крепкое здоровье и спокойствие! 
Мы очень Вас любим ❤️`;

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '<span class="typing-cursor"></span>';
    
    function type() {
    if (i < text.length) {
        const char = text.charAt(i);
        const cursor = element.querySelector('.typing-cursor');
        const textNode = document.createTextNode(char);
        element.insertBefore(textNode, cursor);
        i++;
        setTimeout(type, speed);
    } else {
        const cursor = element.querySelector('.typing-cursor');
        if (cursor) cursor.remove();
    }
    }
    
    type();
}

btn.addEventListener('click', () => {
    music.play().catch(() => {});
    startConfetti();

    const area = document.getElementById('action-area');
    area.innerHTML = '';
    text.style.display = 'block';
    setTimeout(() => {
    text.classList.add('show');
    typeWriter(text, messageText, 40);
    }, 50);
});

const modal = document.getElementById('modal');
const modalImg = modal.querySelector('img');

document.querySelectorAll('.photo img').forEach(img => {
    img.addEventListener('click', () => {
    modalImg.src = img.src;
    modal.classList.add('show');
    });
});

modal.addEventListener('click', () => modal.classList.remove('show'));

const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];

function startConfetti() {
    for (let i = 0; i < 80; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        color: Math.random() > 0.5 ? '#f59e0b' : '#0ea5e9',
        speed: Math.random() * 1 + 0.8
    });
    }
    requestAnimationFrame(draw);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.y += p.speed;ч
    if (p.y > canvas.height) p.y = -10;
    });
    requestAnimationFrame(draw);
}

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});