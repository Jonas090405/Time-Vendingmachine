comparisonText = '';
time = 5; // Anfangswert
minTime = 1;
maxTime = 40;


const figure = document.getElementById('figure');
const timeValue = document.getElementById('time-value');

// Figur auf Skala aktualisieren
function updateFigurePosition() {
  const percentage = (time - minTime) / (maxTime - minTime) * 100;
  figure.style.left = `calc(${percentage}% - 15px)`;
  timeValue.textContent = time;
}

// Tastensteuerung
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    if (time > minTime) {
      time--;
      updateFigurePosition();
    }
  } else if (event.key === 'ArrowRight') {
    if (time < maxTime) {
      time++;
      updateFigurePosition();
    }
  }
});

// Initiale Position setzen
updateFigurePosition();

// Ab hier dein bekannter Code für "submit" und "Kapsel öffnen"...

document.getElementById('submit').addEventListener('click', function () {
  let screen = document.querySelector('.screen');
  let diceContainer = document.getElementById('dice-container');
  let result = document.getElementById('result');
  let capsuleContainer = document.getElementById('capsule-container');
  let submitButton = document.getElementById('submit');
  let inputGroup = document.querySelectorAll('.input-group');

  if (time) {
    let hoursPerWeek = parseInt(time);
    let lifeExpectancy = 81;
    let totalActivityHoursInLife = hoursPerWeek * 52 * lifeExpectancy;


    // Zufälliger Vergleich
    let randomComparison = Math.floor(Math.random() * 9); // Zufällige Zahl zwischen 0 und 8

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
    

    screen.innerHTML = `Überlege dir eine Aktivität! <br> Deine Wahl: ${time} Stunden pro Woche.<br> Öffne deine Kapsel!`;

    submitButton.style.display = 'none';
    inputGroup.forEach(group => group.style.display = 'none');

    capsuleContainer.style.display = 'block';
    diceContainer.style.display = 'none';

    const capsule = document.getElementById('capsule');
    capsule.style.display = 'block';
    capsule.style.objectPosition = '0 0';
    capsule.style.pointerEvents = 'auto';

    document.getElementById('teddy-container').style.display = 'none';
    result.innerHTML = '';
    document.getElementById('back-button').style.display = 'none';

    // Den ersten Sound abspielen, wenn die Kapsel erscheint
    const capsuleSound = document.getElementById('capsule-appear');
    if (capsuleSound) {
      capsuleSound.play(); // Abspielen des ersten Sounds
    } else {
      console.warn('Das "capsule-appear"-Audioelement wurde nicht gefunden!');
    }
  }
});

document.getElementById('capsule').addEventListener('click', function () {
  const capsule = document.getElementById('capsule');
  const result = document.getElementById('result');
  const teddyContainer = document.getElementById('teddy-container');
  const screen = document.querySelector('.screen');
  const dragon = document.getElementById('dragon');
  const speechBubble = document.getElementById('speech-bubble');
  const speechTextElement = document.getElementById('speech-text');
  const backButton = document.getElementById('back-button');

  capsule.style.pointerEvents = 'none';

  let frame = 0;
  const totalFrames = 3;
  const frameWidth = 320;
  const frameDuration = 300;

  const capsuleAnim = setInterval(() => {
    const offsetX = -frame * frameWidth;
    capsule.style.objectPosition = `${offsetX}px 0`;
    frame++;
    if (frame >= totalFrames) {
      clearInterval(capsuleAnim);
      setTimeout(() => {
        capsule.style.display = 'none';
        teddyContainer.style.display = 'block';
        speechBubble.style.display = 'block';
        typeWriterEffect(speechTextElement, comparisonText, 50); // Tippen des Textes mit Sound
        screen.innerHTML = `Berechnung abgeschlossen!`;
        dragon.style.display = 'block';
        animateDragon(4, 453.9, 200, 5000);
        backButton.style.display = 'block';
        document.querySelector('.vending-machine').style.display = 'none';
      }, 700);
    }
  }, frameDuration);

  // Den zweiten Sound abspielen, wenn die Kapsel geöffnet wird
  const openCapsuleSound = document.getElementById('capsule-open');
  if (openCapsuleSound) {
    openCapsuleSound.play(); // Abspielen des zweiten Sounds
  } else {
    console.warn('Das "capsule-open"-Audioelement wurde nicht gefunden!');
  }
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

// Typing Effect für den Text
function typeWriterEffect(element, text, speed = 50) {
  let i = 0;
  element.textContent = ''; // Löscht den vorhandenen Text
  const typingSound = document.getElementById('plushy-talk'); // Sound für das Tippen
  const loopSound = () => {
    typingSound.currentTime = 0; // Setzt den Sound zurück
    typingSound.play(); // Spielt den Sound ab
  };

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      loopSound(); // Sound während des Schreibens abspielen
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}
