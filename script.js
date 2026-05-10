// ===== CONFETTI =====
const colors = ['#2d7a4f','#4caf7d','#c9a84c','#e8cc7a','#a8d5b5','#ffffff'];

function launchConfetti(count = 80) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      el.style.left = Math.random() * 100 + 'vw';
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.animationDuration = (2.5 + Math.random() * 3) + 's';
      el.style.animationDelay = (Math.random() * 0.5) + 's';
      el.style.width = (6 + Math.random() * 8) + 'px';
      el.style.height = (6 + Math.random() * 8) + 'px';
      el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 6000);
    }, i * 30);
  }
}

// Launch confetti after card entrance
setTimeout(() => launchConfetti(100), 1400);

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== RUNAWAY BUTTON =====
const noBtn = document.getElementById('btn-no');
const quizBox = noBtn.closest('.message-box');
let noClickCount = 0;

function getRandomPos() {
  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;
  const pad = 20;
  const maxX = quizBox.offsetWidth - btnW - pad;
  const maxY = quizBox.offsetHeight - btnH - pad;
  const x = pad + Math.random() * (maxX - pad);
  const y = pad + Math.random() * (maxY - pad);
  return { x, y };
}

function runAway() {
  noClickCount++;
  const labels = [
    'لا مش بحبه 😒',
    'مش بحبه خالص 🙄',
    'مش هديكي فرصة 😤',
    'هتحبيني عافية 😏',
    'مفيش فرصة 🚫',
    'انسي 💀',
    'ارحمنييي 😭',
    'هتحبيني يعني هتحبيني 😤',
    'حب بالإكراه 🔒',
  ];
  noBtn.textContent = labels[Math.min(noClickCount, labels.length - 1)];
  const pos = getRandomPos();
  noBtn.style.left = pos.x + 'px';
  noBtn.style.bottom = 'auto';
  noBtn.style.top = pos.y + 'px';
  noBtn.style.transform = 'none';
}

noBtn.addEventListener('mousemove', runAway);
quizBox.addEventListener('mousemove', function(e) {
  const btnRect = noBtn.getBoundingClientRect();
  const btnCenterX = btnRect.left + btnRect.width / 2;
  const btnCenterY = btnRect.top + btnRect.height / 2;
  const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);
  if (dist < 120) runAway();
});
noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); runAway(); });

function handleYes() {
  document.getElementById('btn-yes').style.display = 'none';
  noBtn.style.display = 'none';
  document.getElementById('quiz-result').style.display = 'block';
  launchConfetti(60);
}
