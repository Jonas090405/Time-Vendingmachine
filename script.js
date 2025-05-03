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

document.getElementById('submit').addEventListener('click', function () {
  let screen = document.querySelector('.screen');
  let diceContainer = document.getElementById('dice-container');
  let result = document.getElementById('result');
  let capsuleContainer = document.getElementById('capsule-container');
  let submitButton = document.getElementById('submit');
  let inputGroup = document.querySelectorAll('.input-group');
  let capsule = document.getElementById('capsule');

  if (time) {
    let hoursPerWeek = parseInt(time);
    let lifeExpectancy = 81;
    let totalActivityHoursInLife = hoursPerWeek * 52 * lifeExpectancy;
    let randomComparison = Math.floor(Math.random() * 9);

    switch (randomComparison) {
      case 0:
        let bachelors = totalActivityHoursInLife / (4000 * 52); // Ein Bachelor dauert ca. 4000 Stunden pro Semester
        comparisonText = `Damit könntest du etwa ${bachelors.toFixed(1)} Bachelorabschlüsse machen.`;
        break;
      case 1:
        let monthsWatchingCats = totalActivityHoursInLife / (24 * 30); // 1 Monat Katzenvideos schauen
        comparisonText = `Das reicht für ${monthsWatchingCats.toFixed(1)} Monate nonstop Katzenvideos.`;
        break;
      case 2:
        let tinderDates = totalActivityHoursInLife / 2; // Ein Tinder-Date dauert ca. 2 Stunden
        comparisonText = `Genug Zeit für etwa ${tinderDates.toFixed(1)} Tinder-Dates – und trotzdem 0 Matches.`;
        break;
      case 3:
        let netflixMovies = totalActivityHoursInLife / 2; // Ein durchschnittlicher Film dauert ca. 2 Stunden
        comparisonText = `Reicht für etwa ${netflixMovies.toFixed(1)} Netflix-Filme (falls du dich irgendwann entscheiden kannst).`;
        break;
      case 4:
        let worldTrips = totalActivityHoursInLife / (24 * 400); // Eine Weltreise dauert ca. 1 Jahr
        comparisonText = `Damit könntest du ${worldTrips.toFixed(1)} Mal um die Welt reisen.`;
        break;
      case 5:
        let hamburgers = totalActivityHoursInLife / 0.15; // Ein Hamburger dauert ca. 9 Minuten (0.15 Stunden)
        comparisonText = `Das entspricht etwa ${hamburgers.toFixed(1)} Hamburgern – mit extra Käse.`;
        break;
      case 6:
        let walksAroundEarth = totalActivityHoursInLife / (24 * 365 * 3); // Einmal zu Fuß um die Erde: ca. 3 Jahre
        comparisonText = `Du könntest die Erde ${walksAroundEarth.toFixed(1)} Mal zu Fuß umrunden. Ohne Blasenpflaster.`;
        break;
      case 7:
        let olympicRuns = totalActivityHoursInLife / 0.00278; // 100m Sprint: ~10 Sekunden = 0.00278 Stunden
        comparisonText = `Das wären etwa ${olympicRuns.toFixed(1)} olympische 100-Meter-Sprints. Usain wäre stolz.`;
        break;
      case 8:
        let minecraftHardcoreRuns = totalActivityHoursInLife / 50; // Minecraft Hardcore dauert ~50 Stunden
        comparisonText = `Du könntest Minecraft Hardcore etwa ${minecraftHardcoreRuns.toFixed(1)} Mal durchspielen – inklusive Redstone-Farmen und Netherite-Beacon.`;
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

    document.getElementById('capsule-appear')?.play();
  }
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
  location.reload();
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
