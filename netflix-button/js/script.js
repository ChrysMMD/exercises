console.log('JavaScript Loaded');

//Javascript skal starte animationen, når siden bliver loaded. Jeg laver først en variabel, der får fat på knappen med queryselector i html//
document.addEventListener("DOMContentLoaded", () => {
  let button = document.querySelector("button");
  //Nu skal jeg holde øje med om musen bliver rykket på. Jeg starter med at lave en let variabel, som holder styr på det.
  let userMoved = false;

  //når siden er loaded, begynder funktionen "setTimeout", hvor animatioinen begynder. Det gør jeg ved at sætte klassen "start-animation" på min knap eg giver den lidt forsinkelse på, for at lave en smooth effekt. Når "start-animation" bliver tilføjet til knappen, aktiverer det CSS-animationen, som får pseudo-elementet (::before) til at udvide sig fra 0% til 100% bredde.
  setTimeout(() => {
    button.classList.add("start-animation");
  }, 500);

  //Her registrere den musens beevægelser. Hvis musen bevæges, så marker at brugeren har interageret. Det gør jeg ved at putte en eventlistener på mousemove, som så aktivierer variablen userMoved til true.
  document.addEventListener("mousemove", () => {
    if (!userMoved) {
      button.style.transition = "none";
      button.style.backgroundColor = "rgb(91, 91, 91)";
      button.style.setProperty("--width", "100%");
      userMoved = true;
    }
  });

  //Så laver jeg en eventlistener til at fortælle mig, hvornår animationen er færdig (transitionend), og om brugeren har bevæget musen. Det gør vi ved at tjekke om userMoved stadigvæk er false, hvis ja, så skal baggrunsfarven skiftes og knappen skjules. Hvis ikke så sker der ingenting indtil brugeren klikker på knappen
  button.addEventListener("transitionend", () => {
    if (!userMoved) {
      document.body.style.backgroundColor = "black";
      button.style.display = "none";
    }
  });

  //Først laver jeg en eventlistener, som lytter efter når der bliver trykket på mmin knap. Når det sker, vil man på netflix, få vist og startet den nye episode. Her skifter jeg baggrundsfarven til blå og skjuler knappen.
  button.addEventListener("click", () => {
    document.body.style.backgroundColor = "black";
    button.style.display = "none";
  });

});

