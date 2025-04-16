let comparisonText = '';
let activity = '';
let time = '';

document.getElementById('submit').addEventListener('click', function () {
  activity = document.getElementById('activity').value;
  time = document.getElementById('time').value;

  let screen = document.querySelector('.screen');
  let diceContainer = document.getElementById('dice-container');
  let result = document.getElementById('result');
  let capsuleContainer = document.getElementById('capsule-container');
  let submitButton = document.getElementById('submit');
  let inputGroup = document.querySelectorAll('.input-group');

  if (activity && time) {
    let hoursPerWeek = parseInt(time);
    let lifeExpectancy = 81;
    let hoursPerYear = 8760;
    let totalActivityHoursInLife = hoursPerWeek * 52 * lifeExpectancy;

    // Auswahl des Vergleichs
    let randomComparison = Math.floor(Math.random() * 7);

    switch (randomComparison) {
      case 0:
        let bachelors = totalActivityHoursInLife / (360 * 52);
        comparisonText = `Mit der Zeit, die du für ${activity} aufwendest, könntest du etwa ${bachelors.toFixed(1)} Bachelorabschlüsse machen!`;
        break;
      case 1:
        let monthsWatchingCats = totalActivityHoursInLife / (24 * 30);
        comparisonText = `In dieser Zeit könntest du ${monthsWatchingCats.toFixed(1)} Monate lang nonstop Katzenvideos anschauen!`;
        break;
      case 2:
        let booksRead = totalActivityHoursInLife / 10;
        comparisonText = `In dieser Zeit könntest du etwa ${booksRead.toFixed(1)} Bücher lesen – und trotzdem nicht alle guten finden!`;
        break;
      case 3:
        let seriesSeasons = totalActivityHoursInLife / 500;
        comparisonText = `Mit dieser Zeit könntest du alle Staffeln deiner Lieblingsserie schauen – mindestens ${seriesSeasons.toFixed(1)} mal!`;
        break;
      case 4:
        let worldTrips = totalActivityHoursInLife / (24 * 365);
        comparisonText = `In dieser Zeit könntest du ${worldTrips.toFixed(1)} Mal um die Welt reisen – und dabei immer wieder deine Lieblingsserie nachholen!`;
        break;
      case 5:
        let hamburgers = totalActivityHoursInLife / 0.2;
        comparisonText = `In dieser Zeit könntest du so viele Hamburger essen, dass du ${hamburgers.toFixed(1)} Hamburger verschlingen würdest!`;
        break;
      case 6:
        let islandDays = totalActivityHoursInLife / (24 * 365);
        comparisonText = `Mit dieser Zeit könntest du ${islandDays.toFixed(1)} Jahre lang auf einer Insel leben und den Sonnenuntergang jeden Tag genießen!`;
        break;
    }

    // Der Vergleichstext wird in der Konsole ausgegeben
    console.log(comparisonText);

    // Anzeige der Kapsel und Text aktualisieren
    screen.innerHTML = `Kapsel für Aktivität: ${activity} <br> Deine Eingabe: ${time} Stunden pro Woche. <br> öffne deine Kapsel!`;

    submitButton.style.display = 'none';
    inputGroup.forEach(group => group.style.display = 'none');

    capsuleContainer.style.display = 'block';
    diceContainer.style.display = 'none';

    const capsule = document.getElementById('capsule');
    capsule.style.display = 'block';
    capsule.style.objectPosition = '0 0';
    capsule.style.pointerEvents = 'auto'; // Aktivieren, wenn die Kapsel wiederholt klickbar sein soll

    document.getElementById('teddy-container').style.display = 'none';
    result.innerHTML = '';  // Der Text wird hier nicht mehr angezeigt
  } else {
    screen.innerHTML = 'Bitte alle Felder ausfüllen!';
  }
});

// Kapsel Klick-Event
document.getElementById('capsule').addEventListener('click', function () {
  const capsule = document.getElementById('capsule');
  const result = document.getElementById('result');
  const teddyContainer = document.getElementById('teddy-container');
  const screen = document.querySelector('.screen');
  const dragon = document.getElementById('dragon');
  const speechBubble = document.getElementById('speech-bubble'); // Sprechblase

  capsule.style.pointerEvents = 'none';

  let frame = 0;
  const totalFrames = 3;
  const frameWidth = 320;
  const frameDuration = 300;

  // Animation der Kapsel
  const capsuleAnim = setInterval(() => {
    const offsetX = -frame * frameWidth;
    capsule.style.objectPosition = `${offsetX}px 0`;

    frame++;

    if (frame >= totalFrames) {
      clearInterval(capsuleAnim);

      setTimeout(() => {
        capsule.style.display = 'none';
        teddyContainer.style.display = 'block';
        
        // Der Vergleichstext wird in der Konsole weiterhin ausgegeben
        console.log(`Wenn du dein Leben damit verbringen würdest, ${activity} zu machen, könntest du stattdessen: \n${comparisonText}`);

        // Sprechblase anzeigen und Text einfügen
        speechBubble.style.display = 'block';  // Sprechblase anzeigen
        document.getElementById('speech-text').textContent = comparisonText;  // Vergleichstext in die Sprechblase setzen

        screen.innerHTML = `Berechnung abgeschlossen!`;

        // Drachenanimation für 10 Sekunden starten
        dragon.style.display = 'block';
        animateDragon(4, 453.9, 200, 10000);
      }, 700);
    }
  }, frameDuration);
});

// Drachenanimation
function animateDragon(totalFrames, frameWidth, frameDuration, totalTime) {
  const dragon = document.getElementById('dragon');
  let currentFrame = 0;

  const interval = setInterval(() => {
    const offsetX = -currentFrame * frameWidth;
    dragon.style.objectPosition = `${offsetX}px 0`;
    currentFrame = (currentFrame + 1) % totalFrames;
  }, frameDuration);

  setTimeout(() => {
    clearInterval(interval);
    dragon.style.objectPosition = '0 0';
  }, totalTime);
}

// Zurück-Button für das Formular
document.getElementById('back-button').addEventListener('click', function () {
  let submitButton = document.getElementById('submit');
  let activityInput = document.getElementById('activity');
  let timeInput = document.getElementById('time');
  let inputGroup = document.querySelectorAll('.input-group');
  let capsuleContainer = document.getElementById('capsule-container');
  let teddyContainer = document.getElementById('teddy-container');
  let screen = document.querySelector('.screen');
  let result = document.getElementById('result');
  let capsule = document.getElementById('capsule');
  let dragon = document.getElementById('dragon');
  let speechBubble = document.getElementById('speech-bubble'); // Sprechblase zurücksetzen

  submitButton.style.display = 'block';
  inputGroup.forEach(group => group.style.display = 'flex');

  capsuleContainer.style.display = 'none';
  teddyContainer.style.display = 'none';
  result.innerHTML = '';
  activityInput.value = '';
  timeInput.value = '';
  screen.innerHTML = 'KAPSELAUTOMAT v0.1<br>Bitte gib eine Aktivität und wie viel Zeit pro Woche du mit ihr verbringst an.';

  capsule.style.display = 'block';
  capsule.style.objectPosition = '0 0';
  capsule.style.pointerEvents = 'auto'; // Wieder klickbar!

  dragon.style.display = 'none';
  dragon.style.objectPosition = '0 0';

  // Sprechblase ausblenden
  speechBubble.style.display = 'none';
});
