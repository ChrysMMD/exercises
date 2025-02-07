"use strict";

//Objekt der indeholder de forskellige tekster på de forskellige sprog. de og da er keywords i objektet, mens texts er navnet på listen. Text: er hvad der skal stå og location viser til hvor den skal placeres.
const texts = {
  de: {
    texts: [
      { text: "Das Bot", location: ".header" },
      { text: "Das Ro-Bot", location: ".footer" },
    ],
  },
  da: {
    texts: [
      { text: "Båden", location: ".header" },
      { text: "Robotten", location: ".footer" },
    ],
  },
};

//Det nuværende sprog
let locale = "da";

//Jeg starter med at lave en funktion, til at skifte teksten, samt hente teksterne for det valgte sprog. Det gør jeg ved at navngive min funktion, og vælger som argument locale. Derefter laver jeg en variabel, som finder det nuværende sprog. Vi bruger locale til at gå igennem texts, og finde det rigtige keyword. HVis det er "da", så er det dansk og hvis det er "da" er det tysk.
function updateTexts(locale) {
  const currentTexts = texts[locale].texts;

  //Her iterer jeg igennem teksterne og finder deres lokation. Jeg bruger forEach til at gennemgå hver tekst i listen. Her leder jeg efter informationerne i text og location.
  currentTexts.forEach(({ text, location }) => {

    //Her finder jeg html-elementet. Jeg finder location-klassen i location, og aflæser hvor den er i HTML-dokumentet.
    const element = document.querySelector(location)

    //ved at lave en conditioning er jeg sikker på, at der kun sker en ændring, hvis teksten faktisk findes. Og hvis den gør, så ændres teksten.
    if (element) {
      element.textContent = text;
    }

  });
}

// Når DOM'en er klar, kald funktionen med det ønskede sprog
document.addEventListener("DOMContentLoaded", () => {
  updateTexts(locale);
});

//Her er eventListeneren der ændrer sproget i min dropbox. 
const languageSelect = document.getElementById("languageSelect");
languageSelect.addEventListener("change", (event) => {
  locale = event.target.value;
  updateTexts(locale);
});