let comparisonText = '';
let time = 5;
let minTime = 1;
let maxTime = 40;
let figure = document.getElementById('figure');
let timeValue = document.getElementById('time-value');
let isTyping = false;

// Lautstärke aller Sounds reduzieren
window.addEventListener('DOMContentLoaded', () => {
  const sounds = [
    document.getElementById('capsule-appear'),
    document.getElementById('capsule-open'),
    document.getElementById('plushy-talk'),
    document.getElementById('click-sound'),
    document.getElementById('plush-appear'), 
  ];

  sounds.forEach(sound => {
    if (sound) sound.volume = 0.1; // 20% Lautstärke
  });
});


const capsuleSprites = [
  { src: "capsulesprite.jpg", frameWidth: 320, totalFrames: 3 },
  { src: "capsulesprite2.jpg", frameWidth: 320, totalFrames: 4 },
  { src: "capsulesprite3.jpg", frameWidth: 320, totalFrames: 5 }
];

const dragonSprites = [
  { src: "Dragonsprite.png", frameWidth: 453.9, totalFrames: 4 },
  { src: "Zebrasprite.png", frameWidth: 433.5, totalFrames: 4 },
  { src: "dragon3.png", frameWidth: 500, totalFrames: 5 }
];

let selectedCapsule;
let selectedDragon;

function updateFigurePosition() {
  let percentage = (time - minTime) / (maxTime - minTime) * 100;
  figure.style.left = `calc(${percentage}% - 15px)`;  // Bewegt das Element basierend auf der Zeit (Slider)
  timeValue.textContent = time;
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' && time > minTime) {
    time--;
    updateFigurePosition();
    startSpriteAnimation('left');
  } else if (event.key === 'ArrowRight' && time < maxTime) {
    time++;
    updateFigurePosition();
    startSpriteAnimation('right');
  }
  clearTimeout(idleTimer);
  idleTimer = setTimeout(stopSpriteAnimation, 300);
});


updateFigurePosition();

// -------- Submit Event mit Sternen + Logik ------------
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", function () {
  // Deaktiviert den Submit-Button, um mehrfaches Klicken zu verhindern
  const clickSound = document.getElementById('click-sound');
if (clickSound) clickSound.play();

  submitButton.disabled = true;
  
  const button = this;
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  button.classList.add('clicked');
  showStars(centerX, centerY);
  createStars(button);

  setTimeout(() => {
    button.classList.remove('clicked');
    handleSubmit();
  }, 600);
});

// ----------- Handle Submit Hauptfunktion ------------
function handleSubmit() {
  selectedCapsule = capsuleSprites[Math.floor(Math.random() * capsuleSprites.length)];
  selectedDragon = dragonSprites[Math.floor(Math.random() * dragonSprites.length)];

  let diceContainer = document.getElementById('dice-container');
  let result = document.getElementById('result');
  let capsuleContainer = document.getElementById('capsule-container');
  let inputGroup = document.querySelectorAll('.input-group');
  let capsule = document.getElementById('capsule');

  if (time) {
    let hoursPerWeek = parseInt(time);
    let lifeExpectancy = 81;
    let totalActivityHoursInLife = hoursPerWeek * 52 * lifeExpectancy;
    let randomComparison = Math.floor(Math.random() * 9);

    switch (randomComparison) {
      case 0:
        comparisonText = `Damit könntest du etwa ${(totalActivityHoursInLife / (4000 * 6.5)).toFixed(1)} Bachelorabschlüsse machen.`;
        break;
      case 1:
        comparisonText = `Das reicht für ${(totalActivityHoursInLife / (24 * 30)).toFixed(1)} Monate nonstop Katzenvideos.`;
        break;
      case 2:
        comparisonText = `Genug Zeit für etwa ${(totalActivityHoursInLife / 2).toFixed(1)} Tinder-Dates – und trotzdem 0 Matches.`;
        break;
      case 3:
        comparisonText = `Reicht für etwa ${(totalActivityHoursInLife / 2).toFixed(1)} Netflix-Filme (falls du dich irgendwann entscheiden kannst).`;
        break;
      case 4:
        comparisonText = `Damit könntest du ${(totalActivityHoursInLife / (24 * 400)).toFixed(1)} Mal um die Welt reisen.`;
        break;
      case 5:
        comparisonText = `Das entspricht etwa ${(totalActivityHoursInLife / 0.15).toFixed(1)} Hamburgern – mit extra Käse.`;
        break;
      case 6:
        comparisonText = `Du könntest die Erde ${(totalActivityHoursInLife / (24 * 365 * 3)).toFixed(1)} Mal zu Fuß umrunden.`;
        break;
      case 7:
        comparisonText = `Das wären etwa ${(totalActivityHoursInLife / 0.00278).toFixed(1)} olympische 100-Meter-Sprints. Usain wäre stolz.`;
        break;
      case 8:
        comparisonText = `Du könntest Minecraft Hardcore etwa ${(totalActivityHoursInLife / 50).toFixed(1)} Mal durchspielen – inklusive Redstone-Farmen und Netherite-Beacon.`;
        break;

    }

    capsule.src = selectedCapsule.src;
    capsule.style.display = 'block';
    capsule.style.objectPosition = '0 0';
    capsule.style.pointerEvents = 'auto';

    screen.innerHTML = `Zeitangabe: ${time} Stunden pro Woche.<br><br> Öffne deine Kapsel!`;

    submitButton.style.display = 'none';
    inputGroup.forEach(group => group.style.display = 'none');
    capsuleContainer.style.display = 'block';
    diceContainer.style.display = 'none';
    document.getElementById('teddy-container').style.display = 'none';
    result.innerHTML = '';
    document.getElementById('back-button').style.display = 'none';
    document.querySelector('.vending-machine').style.display = 'none';

    document.getElementById('capsule-appear')?.play();
  }
}

// ----------- Kapsel öffnen und Drache animieren ----------
document.getElementById('capsule').addEventListener('click', function () {
  let capsule = document.getElementById('capsule');
  let dragon = document.getElementById('dragon');
  let speechBubble = document.getElementById('speech-bubble');
  let speechTextElement = document.getElementById('speech-text');
  let backButton = document.getElementById('back-button');

  capsule.style.pointerEvents = 'none';

  setTimeout(() => {
    capsule.style.display = 'none';
  
    dragon.src = selectedDragon.src;
    dragon.style.objectPosition = '0 0';
    dragon.style.display = 'block';
  
    // Sound beim Erscheinen des Tiers abspielen
    const plushAppearSound = document.getElementById('plush-appear');
    if (plushAppearSound) plushAppearSound.play();
    }, 1200);
  
  

  let frame = 0;
  let capsuleAnim = setInterval(() => {
    let offsetX = -frame * selectedCapsule.frameWidth;
    capsule.style.objectPosition = `${offsetX}px 0`;
    frame++;
    if (frame >= selectedCapsule.totalFrames) {
      clearInterval(capsuleAnim);
      setTimeout(() => {
        capsule.style.display = 'none';

        dragon.src = selectedDragon.src;
        dragon.style.objectPosition = '0 0';
        dragon.style.display = 'block';

        animateDragon(selectedDragon.totalFrames, selectedDragon.frameWidth, 200, 5000);

        speechBubble.style.display = 'block';
        typeWriterEffect(speechTextElement, comparisonText, 50);

        screen.innerHTML = `Berechnung abgeschlossen!`;
        backButton.style.display = 'block';
      }, 700);
    }
  }, 300);

  document.getElementById('capsule-open')?.play();
});

function animateDragon(totalFrames, frameWidth, frameDuration, totalTime) {
  let dragon = document.getElementById('dragon');
  let currentFrame = 0;
  let interval = setInterval(() => {
    let offsetX = -currentFrame * frameWidth;
    dragon.style.objectPosition = `${offsetX}px 0`;
    currentFrame = (currentFrame + 1) % totalFrames;
  }, frameDuration);
  setTimeout(() => {
    clearInterval(interval);
    dragon.style.objectPosition = '0 0';
  }, totalTime);
}

document.getElementById('back-button').addEventListener('click', function () {
  const clickSound = document.getElementById('click-sound');
if (clickSound) clickSound.play();

  // Deaktiviert den Back-Button, um mehrfaches Klicken zu verhindern
  this.disabled = true;

  const speechBubble = document.getElementById('speech-bubble');
  const speechText = document.getElementById('speech-text');
  const capsule = document.getElementById('capsule');
  const dragon = document.getElementById('dragon');
  const result = document.getElementById('result');
  const plushyTalk = document.getElementById('plushy-talk');

  if (plushyTalk) {
    plushyTalk.pause();
    plushyTalk.currentTime = 0;
  }

  // Kapsel & Co. ausblenden
  capsule.style.display = 'none';
  capsule.style.pointerEvents = 'none';
  dragon.style.display = 'none';
  speechBubble.style.display = 'none';
  isTyping = false;
  speechText.textContent = '';
  result.innerHTML = '';
  submitButton.classList.remove('clicked');

  // Interface-Elemente zurücksetzen
  document.querySelectorAll('.input-group').forEach(group => {
    group.style.display = '';
  });

  submitButton.style.display = '';
  document.getElementById('capsule-container').style.display = 'none';
  document.getElementById('dice-container').style.display = '';
  document.getElementById('teddy-container').style.display = '';
  document.querySelector('.vending-machine').style.display = '';

  this.style.display = 'none';

  // Position & Layout durch CSS regeln lassen
  document.getElementById('scale-container').style.display = '';
  document.getElementById('time-display').style.display = '';

  // Aufräumen
  document.querySelectorAll('.star').forEach(star => star.remove());

  updateFigurePosition();

  // Nach der Verzögerung den Back-Button und den Submit-Button wieder aktivieren
  setTimeout(() => {
    this.disabled = false;
    submitButton.disabled = false; // Hier den Submit-Button wieder aktivieren
  }, 600); // Verzögerung von 600 ms
});

// ------------ Sterneffekte + Typewriter -----------------
function typeWriterEffect(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  let typingSound = document.getElementById('plushy-talk');
  isTyping = true;

  function loopSound() {
    if (typingSound) {
      typingSound.currentTime = 0;
      typingSound.play();
    }
  }

  function type() {
    if (!isTyping) {
      if (typingSound) {
        typingSound.pause();
        typingSound.currentTime = 0;
      }
      return;
    }

    if (i < text.length) {
      element.textContent += text.charAt(i);
      loopSound();
      i++;
      setTimeout(type, speed);
    } else {
      if (typingSound) {
        typingSound.pause();
        typingSound.currentTime = 0;
      }
      isTyping = false;
    }
  }

  type();
}


function showStars(x, y) {
  for (let i = 0; i < 0; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    const sideOffset = Math.random() < 0.5 ? -40 : 40;
    const verticalJitter = (Math.random() - 0.5) * 20;
    star.style.left = `${x + sideOffset}px`;
    star.style.top = `${y + verticalJitter}px`;
    const angle = Math.random() * 60 - 30;
    const distance = 60 + Math.random() * 40;
    const dx = Math.cos(angle * (Math.PI / 180)) * distance;
    const dy = Math.sin(angle * (Math.PI / 180)) * distance;
    star.style.setProperty('--x', `${dx}px`);
    star.style.setProperty('--y', `${dy}px`);
    document.body.appendChild(star);
    setTimeout(() => {
      star.remove();
    }, 800);
  }
}

function createStars(button) {
  const buttonRect = button.getBoundingClientRect();
  const corners = [
    { x: buttonRect.left, y: buttonRect.top },
    { x: buttonRect.right - 10, y: buttonRect.top }
  ];
  corners.forEach(corner => {
    for (let i = 0; i < 4; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.position = "fixed";
      star.style.left = `${corner.x}px`;
      star.style.top = `${corner.y}px`;
      star.style.transform = "translate(-50%, -50%)";
      const angle = (Math.random() * Math.PI) - Math.PI / 2;
      const distance = 60 + Math.random() * 50;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      star.style.setProperty("--x", `${dx}px`);
      star.style.setProperty("--y", `${dy}px`);
      document.body.appendChild(star);
      setTimeout(() => {
        star.remove();
      }, 800);
    }
  });
}


// Startet Audio beim ersten Klick
window.addEventListener('click', function () {
  const audio = document.getElementById('bg-audio');
  if (audio.paused) {
    audio.volume = 0.035; // Leiser machen (0.0 bis 1.0)
    audio.play();
  }
}, { once: true });


let frameIndex = 0;
let totalFrames = 2;
let frameWidth = 55;
let animationInterval;
let moveDirection = null;
let idleTimer;

function startSpriteAnimation(direction) {
  if (moveDirection === direction) return;

  moveDirection = direction;

  

  // Bild wechseln je nach Richtung
  figure.style.backgroundImage = `url('Panda${direction}.png')`;

  // Animation starten
  clearInterval(animationInterval);
  animationInterval = setInterval(() => {
    frameIndex = (frameIndex + 1) % totalFrames;
    const offsetX = -frameIndex * frameWidth;
    figure.style.backgroundPosition = `${offsetX}px 0px`;
  }, 150);
}

function stopSpriteAnimation() {
  moveDirection = null;
  clearInterval(animationInterval);
  frameIndex = 0;
  figure.style.backgroundPosition = `0px 0px`;
}

document.getElementById('slider').addEventListener('input', function () {
  const value = parseInt(this.value); // Wert des Sliders

  // Wenn der Slider nach rechts geht
  if (value > 0) {
    startSpriteAnimation('right');
  }
  // Wenn der Slider nach links geht
  else if (value < 0) {
    startSpriteAnimation('left');
  }
  // Wenn der Slider in der Neutralposition ist
  else {
    stopSpriteAnimation();
  }
  clearTimeout(idleTimer);
  idleTimer = setTimeout(stopSpriteAnimation, 300);
});