let comparisonText = '';
let time = 5;
let minTime = 1;
let maxTime = 40;

let figure = document.getElementById('figure');
let timeValue = document.getElementById('time-value');

const capsuleSprites = [
  { src: "capsulesprite.jpg", frameWidth: 320, totalFrames: 3 },
  { src: "capsulesprite2.jpg", frameWidth: 320, totalFrames: 4 },
  { src: "capsulesprite3.jpg", frameWidth: 320, totalFrames: 5 }
];

const dragonSprites = [
  { src: "Dragonsprite.png", frameWidth: 453.9, totalFrames: 4 },
  { src: "dragon2.png", frameWidth: 480, totalFrames: 6 },
  { src: "dragon3.png", frameWidth: 500, totalFrames: 5 }
];

let selectedCapsule = capsuleSprites[Math.floor(Math.random() * capsuleSprites.length)];
let selectedDragon = dragonSprites[Math.floor(Math.random() * dragonSprites.length)];

function updateFigurePosition() {
  let percentage = (time - minTime) / (maxTime - minTime) * 100;
  figure.style.left = `calc(${percentage}% - 15px)`;
  timeValue.textContent = time;
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' && time > minTime) {
    time--;
    updateFigurePosition();
  } else if (event.key === 'ArrowRight' && time < maxTime) {
    time++;
    updateFigurePosition();
  }
});

updateFigurePosition();

document.getElementById("submit").addEventListener("click", function (e) {
  const button = this;
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  button.classList.add("clicked");
  showStars(centerX, centerY);

  // Verzögert ausführen – hier kommt ALLES was vorher im "handleSubmit" war
  setTimeout(() => {
    button.classList.remove("clicked");

    // Hier beginnt deine Original-Submit-Logik
    let screen = document.querySelector('.screen');
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
          let bachelors = totalActivityHoursInLife / (4000 * 6.5);
          comparisonText = `Damit könntest du etwa ${bachelors.toFixed(1)} Bachelorabschlüsse machen.`;
          break;
        case 1:
          let monthsWatchingCats = totalActivityHoursInLife / (24 * 30);
          comparisonText = `Das reicht für ${monthsWatchingCats.toFixed(1)} Monate nonstop Katzenvideos.`;
          break;
        case 2:
          let tinderDates = totalActivityHoursInLife / 2;
          comparisonText = `Genug Zeit für etwa ${tinderDates.toFixed(1)} Tinder-Dates – und trotzdem 0 Matches.`;
          break;
        case 3:
          let netflixMovies = totalActivityHoursInLife / 2;
          comparisonText = `Reicht für etwa ${netflixMovies.toFixed(1)} Netflix-Filme (falls du dich irgendwann entscheiden kannst).`;
          break;
        case 4:
          let worldTrips = totalActivityHoursInLife / (24 * 400);
          comparisonText = `Damit könntest du ${worldTrips.toFixed(1)} Mal um die Welt reisen.`;
          break;
        case 5:
          let hamburgers = totalActivityHoursInLife / 0.15;
          comparisonText = `Das entspricht etwa ${hamburgers.toFixed(1)} Hamburgern – mit extra Käse.`;
          break;
        case 6:
          let walksAroundEarth = totalActivityHoursInLife / (24 * 365 * 3);
          comparisonText = `Du könntest die Erde ${walksAroundEarth.toFixed(1)} Mal zu Fuß umrunden. Ohne Blasenpflaster.`;
          break;
        case 7:
          let olympicRuns = totalActivityHoursInLife / 0.00278;
          comparisonText = `Das wären etwa ${olympicRuns.toFixed(1)} olympische 100-Meter-Sprints. Usain wäre stolz.`;
          break;
        case 8:
          let minecraftHardcoreRuns = totalActivityHoursInLife / 50;
          comparisonText = `Du könntest Minecraft Hardcore etwa ${minecraftHardcoreRuns.toFixed(1)} Mal durchspielen – inklusive Redstone-Farmen und Netherite-Beacon.`;
          break;
      }

      capsule.src = selectedCapsule.src;
      capsule.style.display = 'block';
      capsule.style.objectPosition = '0 0';
      capsule.style.pointerEvents = 'auto';

      screen.innerHTML = `Zeitangabe: ${time} Stunden pro Woche.<br><br> Öffne deine Kapsel!`;

      button.style.display = 'none';
      inputGroup.forEach(group => group.style.display = 'none');
      capsuleContainer.style.display = 'block';
      diceContainer.style.display = 'none';
      document.getElementById('teddy-container').style.display = 'none';
      result.innerHTML = '';
      document.getElementById('back-button').style.display = 'none';

      document.getElementById('capsule-appear')?.play();
    }

  }, 600); // kleine Pause für Animation
});


document.getElementById('capsule').addEventListener('click', function () {
  let capsule = document.getElementById('capsule');
  let screen = document.querySelector('.screen');
  let dragon = document.getElementById('dragon');
  let speechBubble = document.getElementById('speech-bubble');
  let speechTextElement = document.getElementById('speech-text');
  let backButton = document.getElementById('back-button');

  capsule.style.pointerEvents = 'none';

  let frame = 0;
  let capsuleAnim = setInterval(() => {
    let offsetX = -frame * selectedCapsule.frameWidth;
    capsule.style.objectPosition = `${offsetX}px 0`;
    frame++;
    if (frame >= selectedCapsule.totalFrames) {
      clearInterval(capsuleAnim);
      setTimeout(() => {
        capsule.style.display = 'none';

        // Nur der zufällige animierte Drache wird angezeigt
        dragon.src = selectedDragon.src;
        dragon.style.objectPosition = '0 0';
        dragon.style.display = 'block';

        animateDragon(selectedDragon.totalFrames, selectedDragon.frameWidth, 200, 5000);

        speechBubble.style.display = 'block';
        typeWriterEffect(speechTextElement, comparisonText, 50);
        

        screen.innerHTML = `Berechnung abgeschlossen!`;
        backButton.style.display = 'block';
        document.querySelector('.vending-machine').style.display = 'none';
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
  const screen = document.querySelector('.screen');
  const speechBubble = document.getElementById('speech-bubble');
  const speechText = document.getElementById('speech-text');
  const capsule = document.getElementById('capsule');
  const dragon = document.getElementById('dragon');
  const result = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const plushyTalk = document.getElementById('plushy-talk');

  // Medien stoppen
  if (plushyTalk) {
    plushyTalk.pause();
    plushyTalk.currentTime = 0;
  }

  // UI zurücksetzen
  capsule.style.display = 'none';
  capsule.style.pointerEvents = 'none';
  dragon.style.display = 'none';
  speechBubble.style.display = 'none';
  speechText.textContent = '';
  result.innerHTML = '';

  // Elemente neu anzeigen
  document.querySelectorAll('.input-group').forEach(group => group.style.display = 'block');
  submitButton.style.display = 'inline-block';
  document.getElementById('capsule-container').style.display = 'none';
  document.getElementById('dice-container').style.display = 'flex';
  document.getElementById('teddy-container').style.display = 'block';
  document.querySelector('.vending-machine').style.display = 'block';

  // Back-Button ausblenden
  this.style.display = 'none';

  // *** Wiederherstellen des ursprünglichen Bildschirmtexts ***
  screen.innerHTML = `
    <div style="text-align: center;">
      KAPSELAUTOMAT v0.4<br><br>
      Denk an eine Aktivität!
    </div>
  `;

  // Entferne manuelle Styles, damit wieder CSS-Klassen greifen
  document.querySelector('.screen').removeAttribute('style');
  document.getElementById('dice-container').removeAttribute('style');
  document.getElementById('teddy-container').removeAttribute('style');
  document.getElementById('scale-container').removeAttribute('style');

  document.querySelectorAll('.input-group').forEach(group => {
    group.removeAttribute('style');
  });

  // Figur-Position an aktuelle Zeit anpassen
  updateFigurePosition();
});

function typeWriterEffect(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  let typingSound = document.getElementById('plushy-talk');
  function loopSound() {
    if (typingSound) {
      typingSound.currentTime = 0;
      typingSound.play();
    }
  }
  function type() {
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


document.getElementById("submit").addEventListener("click", function () {
  this.classList.add("clicked");
  createStars(this);
  setTimeout(() => this.classList.remove("clicked"), 300);
});

function createStars(button) {
  const buttonRect = button.getBoundingClientRect();

  const corners = [
    { x: buttonRect.left, y: buttonRect.top },                    // oben links
    { x: buttonRect.right - 10, y: buttonRect.top }              // oben rechts
  ];

  corners.forEach(corner => {
    for (let i = 0; i < 4; i++) {
      const star = document.createElement("div");
      star.classList.add("star");

      // Star relativ zur Seite platzieren
      star.style.position = "fixed"; // <-- wichtig: immer relativ zum Viewport!
      star.style.left = `${corner.x}px`;
      star.style.top = `${corner.y}px`;
      star.style.transform = "translate(-50%, -50%)";

      // Zufällige Richtung
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


// Eventlistener für den Button
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", () => {
  submitButton.classList.add("clicked");
  createStars(submitButton);

  setTimeout(() => {
    submitButton.classList.remove("clicked");
  }, 200);
});



document.getElementById("submit").addEventListener("click", function (e) {
  const button = this;
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  button.classList.add("clicked");
  showStars(centerX, centerY);

  // Warten bevor Aktion ausgeführt wird (für ESP-Effekt)
  setTimeout(() => {
    button.classList.remove("clicked");

    // Deine eigentliche Logik hier ausführen
    handleSubmit(); // <- diese Funktion musst du ggf. anpassen

  }, 600); // leichte Verzögerung für Animation
});
