document.getElementById('submit').addEventListener('click', function() {
    let activity = document.getElementById('activity').value;
    let time = document.getElementById('time').value; // Eingabe der Stunden pro Woche
    let screen = document.querySelector('.screen');
    let diceContainer = document.getElementById('dice-container');
    let result = document.getElementById('result');
  
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
      let comparisonText = '';
  
      // Zufälliger Vergleich
      let randomComparison = Math.floor(Math.random() * 8); // Zufällige Zahl zwischen 0 und 7
  
      switch (randomComparison) {
        case 0:
          // Umrechnung in Bachelorabschlüsse
          let bachelors = totalActivityHoursInLife / (360 * 52); // Ein Bachelor dauert ca. 360 Stunden pro Semester
          comparisonText = `Mit der Zeit, die du für ${activity} aufwendest, könntest du etwa ${bachelors.toFixed(1)} Bachelorabschlüsse machen!`;
          break;
        case 1:
          // Katzenvideos
          let monthsWatchingCats = totalActivityHoursInLife / (24 * 30); // 1 Monat Katzenvideos schauen
          comparisonText = `In dieser Zeit könntest du ${monthsWatchingCats.toFixed(1)} Monate lang nonstop Katzenvideos anschauen!`;
          break;
        case 2:
          // Bücher lesen
          let booksRead = totalActivityHoursInLife / 10; // Ein Buch braucht ca. 10 Stunden
          comparisonText = `In dieser Zeit könntest du etwa ${booksRead.toFixed(1)} Bücher lesen – und trotzdem nicht alle guten finden!`;
          break;
        case 3:
          // Serien schauen
          let seriesSeasons = totalActivityHoursInLife / 500; // Eine Serie braucht ca. 500 Stunden für mehrere Staffeln
          comparisonText = `Mit dieser Zeit könntest du alle Staffeln deiner Lieblingsserie schauen – mindestens ${seriesSeasons.toFixed(1)} mal!`;
          break;
        case 4:
          // Weltreise
          let worldTrips = totalActivityHoursInLife / (24 * 365); // Eine Weltreise dauert ca. 1 Jahr
          comparisonText = `In dieser Zeit könntest du ${worldTrips.toFixed(1)} Mal um die Welt reisen – und dabei immer wieder deine Lieblingsserie nachholen!`;
          break;
        case 5:
          // Hamburger essen
          let hamburgers = totalActivityHoursInLife / 0.2; // Ein Hamburger dauert ca. 30 Minuten zu essen
          comparisonText = `In dieser Zeit könntest du so viele Hamburger essen, dass du ${hamburgers.toFixed(1)} Hamburger verschlingen würdest!`;
          break;
        case 6:
          // Insel leben
          let islandDays = totalActivityHoursInLife / (24 * 365); // Ein Jahr auf einer Insel
          comparisonText = `Mit dieser Zeit könntest du ${islandDays.toFixed(1)} Jahre lang auf einer Insel leben und den Sonnenuntergang jeden Tag genießen!`;
          break;
      }
  
      // Zeige das Ergebnis an
      screen.innerHTML = `Kapsel für Aktivität: ${activity} <br> Deine Eingabe: ${time} Stunden pro Woche. <br> Berechnung läuft...`;
  
      diceContainer.style.display = 'block'; // Zeige den Würfeln-Button
      result.innerHTML = '';
  
      // Würfeln Button aktivieren
      document.getElementById('dice').addEventListener('click', function() {
        result.innerHTML = `Wenn du dein Leben damit verbringen würdest, ${activity} zu machen, könntest du stattdessen: <br><strong>${comparisonText}</strong><br><br>Das entspricht insgesamt <strong>${totalActivityHoursInLife}</strong> Stunden in deinem Leben!`;
      });
  
    } else {
      screen.innerHTML = 'Bitte alle Felder ausfüllen!';
    }
});
