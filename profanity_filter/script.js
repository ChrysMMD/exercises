
//Mit array med dårlige og gode ord som elementer
const curseWords = [
  { bad: "var", good: "const" },
  { bad: "float", good: "grid" },
  { bad: "marquee", good: "just don't" },
];

//Her laver jeg en funktion, som opdatere min tekst, som jeg har givet id text i html. jJeg starter med at lave en variabel, hvor jeg får fat på min <p> gennem id'et. Det samme gør jeg med min dialogboks.
function updateText() {
  const textElement = document.getElementById("text");
  const dialog = document.getElementById("info");
  let textContent = textElement.innerHTML;

  //Jeg laver en flag, til at holde styr på, om teksten er filtreret eller ej ved at lave en boolean. Her fortæller variablen at teksten ikke er blevet updated endnu.
  let updated = false;

  //Her gennemløber vi curseWords-arrayet med forEach, og erstattet de "bad" ord med de "god". Til det bruger jeg klassen RegEx med metoden test og replace. Ved at bruge regex, kan jeg også sørge for, at den matcher hele ordet, samt at det er globalt match. JEg bruger en placeholder md bad, for at lave dynamisk indsættelse.

  curseWords.forEach(({ bad, good }) => {
    const regex = new RegExp(`\\b${bad}\\b`, "g");
    if (regex.test(textContent)) {
      //Her putter vi vores ccs-klassen highlight på good-ordene, hvis de er der.
      textContent = textContent.replace(regex, `<span class="highlight">${good}</span>`);
      //fortæller at nu er teksten blevet updated.
      updated = true;
    }
  });


  //Her tjekker vi om ændringerne er sket ved at bruge variablen updated, og hvis den er true, så vises dialogboksen. Hvis den er false, så opdateres teksten. Dialogboksen lukkes automatisk med setTimeout efter 2 sek.
  if (updated) {
    textElement.innerHTML = textContent;
  } else {
    dialog.showModal();
    setTimeout(() => dialog.close(), 2000);
  }
}

// Tilføjet event listener til knappen ved at finde id'et for knappen i HTML. Updatetext-funktionen vil blive kaldt ved click.
document.getElementById("filterBtn").addEventListener("click", updateText);
