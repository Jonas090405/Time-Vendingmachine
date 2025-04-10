let comparisonText = ''; // Globale Deklaration von comparisonText
let activity = '';
let time = '';

document.getElementById('submit').addEventListener('click', function() {
  activity = document.getElementById('activity').value;
  time = document.getElementById('time').value; // Eingabe der Stunden pro Woche
  let screen = document.querySelector('.screen');
  let diceContainer = document.getElementById('dice-container');
  let result = document.getElementById('result');
  let capsuleContainer = document.getElementById('capsule-container');
  let submitButton = document.getElementById('submit');
  let activityInput = document.getElementById('activity');
  let timeInput = document.getElementById('time');
  let inputGroup = document.querySelectorAll('.input-group');
  let backButton = document.getElementById('back-button'); // Der "Back"-Button
  
  if (activity && time) {
    // Umrechnung der Benutzereingabe in eine Zahl
    let hoursPerWeek = parseInt(time);

    // Lebenserwartung und Gesamtstunden im Leben
    let lifeExpectancy = 81; // Lebenserwartung in Jahren
    let hoursPerYear = 8760; // Stunden pro Jahr (24 Stunden * 365 Tage)
    let totalHoursInLife = hoursPerYear * lifeExpectancy; // Gesamtstunden im Leben

    // Gesamtstunden für die Aktivität im Leben (über 81 Jahre)
    let totalActivityHoursInLife = hoursPerWeek * 52 * lifeExpectancy; // Wochenstunden * 52 Wochen * 81 Jahre

    // Lustige Vergleiche basierend auf der Benutzereingabe und einer zufälligen Auswahl
    comparisonText = ''; // Reset der Variable

    // Zufälliger Vergleich
    let randomComparison = Math.floor(Math.random() * 8); // Zufällige Zahl zwischen 0 und 7

    switch (randomComparison) {
      case 0:
        let bachelors = totalActivityHoursInLife / (360 * 52); // Ein Bachelor dauert ca. 360 Stunden pro Semester
        comparisonText = `Mit der Zeit, die du für ${activity} aufwendest, könntest du etwa ${bachelors.toFixed(1)} Bachelorabschlüsse machen!`;
        break;
      case 1:
        let monthsWatchingCats = totalActivityHoursInLife / (24 * 30); // 1 Monat Katzenvideos schauen
        comparisonText = `In dieser Zeit könntest du ${monthsWatchingCats.toFixed(1)} Monate lang nonstop Katzenvideos anschauen!`;
        break;
      case 2:
        let booksRead = totalActivityHoursInLife / 10; // Ein Buch braucht ca. 10 Stunden
        comparisonText = `In dieser Zeit könntest du etwa ${booksRead.toFixed(1)} Bücher lesen – und trotzdem nicht alle guten finden!`;
        break;
      case 3:
        let seriesSeasons = totalActivityHoursInLife / 500; // Eine Serie braucht ca. 500 Stunden für mehrere Staffeln
        comparisonText = `Mit dieser Zeit könntest du alle Staffeln deiner Lieblingsserie schauen – mindestens ${seriesSeasons.toFixed(1)} mal!`;
        break;
      case 4:
        let worldTrips = totalActivityHoursInLife / (24 * 365); // Eine Weltreise dauert ca. 1 Jahr
        comparisonText = `In dieser Zeit könntest du ${worldTrips.toFixed(1)} Mal um die Welt reisen – und dabei immer wieder deine Lieblingsserie nachholen!`;
        break;
      case 5:
        let hamburgers = totalActivityHoursInLife / 0.2; // Ein Hamburger dauert ca. 30 Minuten zu essen
        comparisonText = `In dieser Zeit könntest du so viele Hamburger essen, dass du ${hamburgers.toFixed(1)} Hamburger verschlingen würdest!`;
        break;
      case 6:
        let islandDays = totalActivityHoursInLife / (24 * 365); // Ein Jahr auf einer Insel
        comparisonText = `Mit dieser Zeit könntest du ${islandDays.toFixed(1)} Jahre lang auf einer Insel leben und den Sonnenuntergang jeden Tag genießen!`;
        break;
    }

    // Zeige das Ergebnis an
    screen.innerHTML = `Kapsel für Aktivität: ${activity} <br> Deine Eingabe: ${time} Stunden pro Woche. <br> Berechnung läuft...`;

    // Verstecke Eingabefelder und den Button
    submitButton.style.display = 'none'; // Button verstecken
    inputGroup.forEach(group => group.style.display = 'none'); // Eingabefelder verstecken

    // Zeige die Kapsel an
    capsuleContainer.style.display = 'block'; // Zeige die Kapsel
    diceContainer.style.display = 'none'; // Verstecke den Würfeln-Button
  } else {
    screen.innerHTML = 'Bitte alle Felder ausfüllen!';
  }
});

// Wenn der Benutzer auf die Kapsel klickt, zeige das Ergebnis
document.getElementById('capsule').addEventListener('click', function() {
  let result = document.getElementById('result');
  let teddyContainer = document.getElementById('teddy-container');
  
  // Zeige das Ergebnis und den Kuscheltier-Avatar
  result.innerHTML = `Wenn du dein Leben damit verbringen würdest, ${activity} zu machen, könntest du stattdessen: <br><strong>${comparisonText}</strong>`;
  teddyContainer.style.display = 'block'; // Zeige das Kuscheltier
  
  // Blende nur die Kapsel aus, nicht den gesamten Container
  document.getElementById('capsule').style.display = 'none';
});

// Back-Button zurücksetzen
document.getElementById('back-button').addEventListener('click', function() {
  let submitButton = document.getElementById('submit');
  let activityInput = document.getElementById('activity');
  let timeInput = document.getElementById('time');
  let inputGroup = document.querySelectorAll('.input-group');
  let capsuleContainer = document.getElementById('capsule-container');
  let teddyContainer = document.getElementById('teddy-container');
  let screen = document.querySelector('.screen');
  let result = document.getElementById('result');

  // Zeige Eingabefelder und Button wieder an
  submitButton.style.display = 'block'; // Button wieder sichtbar machen
  inputGroup.forEach(group => group.style.display = 'flex'); // Eingabefelder wieder sichtbar machen

  // Verstecke Kapsel und Kuscheltier
  capsuleContainer.style.display = 'none'; // Kapsel verstecken
  teddyContainer.style.display = 'none'; // Kuscheltier verstecken
  result.innerHTML = ''; // Ergebnis zurücksetzen

  // Setze Eingabefelder zurück
  activityInput.value = '';
  timeInput.value = '';

  // Setze den Bildschirmtext zurück
  screen.innerHTML = 'KAPSELAUTOMAT v0.1<br>Bitte gib eine Aktivität und wie viel Zeit pro Woche du mit ihr verbringst an.';
});
