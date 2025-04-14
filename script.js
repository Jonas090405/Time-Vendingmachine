let comparisonText = ''; // Globale Deklaration von comparisonText
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
    let totalHoursInLife = hoursPerYear * lifeExpectancy;
    let totalActivityHoursInLife = hoursPerWeek * 52 * lifeExpectancy;

    comparisonText = '';
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

    screen.innerHTML = `Kapsel für Aktivität: ${activity} <br> Deine Eingabe: ${time} Stunden pro Woche. <br> Berechnung läuft...`;

    submitButton.style.display = 'none';
    inputGroup.forEach(group => group.style.display = 'none');

    capsuleContainer.style.display = 'block';
    diceContainer.style.display = 'none';

    // Stelle sicher, dass die Kapsel wieder sichtbar ist (wichtig für Wiederholungen)
    document.getElementById('capsule').style.display = 'block';

    // Verstecke Teddy und Ergebnis beim neuen Start
    document.getElementById('teddy-container').style.display = 'none';
    result.innerHTML = '';
  } else {
    screen.innerHTML = 'Bitte alle Felder ausfüllen!';
  }
});

document.getElementById('capsule').addEventListener('click', function () {
  const capsule = document.getElementById('capsule');
  const result = document.getElementById('result');
  const teddyContainer = document.getElementById('teddy-container');
  const screen = document.querySelector('.screen');

  // Setze die Kapsel auf nicht klickbar, um Doppelklick zu verhindern
  capsule.style.pointerEvents = 'none';

  let frame = 0;
  const totalFrames = 3;
  const frameWidth = 320;
  const frameDuration = 300;

  const animation = setInterval(() => {
    const offsetX = -frame * frameWidth;
    capsule.style.objectPosition = `${offsetX}px 0`;

    frame++;

    if (frame >= totalFrames) {
      clearInterval(animation);

      setTimeout(() => {
        capsule.style.display = 'none';
        teddyContainer.style.display = 'block';
        result.innerHTML = `Wenn du dein Leben damit verbringen würdest, ${activity} zu machen, könntest du stattdessen: <br><strong>${comparisonText}</strong>`;
        screen.innerHTML = `Berechnung abgeschlossen! Öffne deine Kapsel der Erkenntnis! 🎉`;

        // Stelle sicher, dass die Kapsel wieder klickbar ist und der pointer-events Stil entfernt wird
        capsule.style.pointerEvents = 'auto';
      }, 700); // kurze Pause nach letzter Frame
    }
  }, frameDuration);
});

// Zurücksetzen auf den ersten Bildschirm nach der Berechnung
document.getElementById('back-button').addEventListener('click', function () {
  let submitButton = document.getElementById('submit');
  let activityInput = document.getElementById('activity');
  let timeInput = document.getElementById('time');
  let inputGroup = document.querySelectorAll('.input-group');
  let capsuleContainer = document.getElementById('capsule-container');
  let teddyContainer = document.getElementById('teddy-container');
  let screen = document.querySelector('.screen');
  let result = document.getElementById('result');

  // Zeige alle Eingabefelder und den Button wieder an
  submitButton.style.display = 'block';
  inputGroup.forEach(group => group.style.display = 'flex');

  // Verstecke Kapsel und Kuscheltier
  capsuleContainer.style.display = 'none';
  teddyContainer.style.display = 'none';
  result.innerHTML = '';

  // Setze Eingabefelder zurück
  activityInput.value = '';
  timeInput.value = '';

  // Setze den Bildschirmtext zurück
  screen.innerHTML = 'KAPSELAUTOMAT v0.1<br>Bitte gib eine Aktivität und wie viel Zeit pro Woche du mit ihr verbringst an.';

  // Kapsel für den nächsten Durchlauf wieder anzeigen und Sprite zurücksetzen
  let capsule = document.getElementById('capsule');
  capsule.style.display = 'block';
  capsule.style.objectPosition = '0 0'; // Setze Sprite zurück auf den ersten Frame
});
