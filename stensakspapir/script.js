// Elementer fra DOM'en. Jeg henter elementer fra HTML-koden ind i javascript, så jeg kan lave dem om til variabler. Jeg henter dem i HTML med deres ID-kode. Så nu kan jeg bruge dem i javascript ved fks, at vælge om de skal vises eller gemmes.
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const loseText = document.getElementById("lose");
const winText = document.getElementById("win");
const drawText = document.getElementById("draw");
const buttons = document.getElementById("buttons");

//Choices er et array med sten, saks eller papir. DEt fortæller hvilken muligheder/options der er for spillet.
const choices = ["rock", "scissors", "paper"];


//Her laver jeg en funktion, som gør at computeren vælger sten, saks eller papir. Math.random() giver mig et random tal, hvorefter math.floor runder tallet til et helt tal. Choices.length fortæller math.random, at den kan vælge et tal på størrelse med arrays' længde. Return giver mig svaret tilbage.
function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}


// Funktion til at afgøre vinderen. Jeg starter med at lave en funktion, som fortæller mig hvem vinderen er. Jeg har sat paramenter i form af playerChoice og computerChoice. Så parametrene kan skifte alt efter om der bliver valgt, sten saks eller papir. Derefter laver jeg en conditions, hvor jeg opstiller forskellige scenarier, i form af hvis der er et "draw" eller hvornår computeren har vundet eller hvornår spilleren har vundet. && fortæller at det skal være sandt på begge sider.
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "draw";
  }
  if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    return "win";
  }
  return "lose";
}


//Nu skal resultatet vises. Jeg starter med at skjule alle tekstfelterne ved at bruge hidden. Derefter sætter jeg en condition til at vise tekstfeltet, som passer med det resultat, vi har fået retuneret i determineWinner.
function showResult(result) {
  loseText.classList.add("hidden");
  winText.classList.add("hidden");
  drawText.classList.add("hidden");

  if (result === "win") {
    winText.classList.remove("hidden");
  } else if (result === "lose") {
    loseText.classList.remove("hidden");
  } else {
    drawText.classList.remove("hidden");
  }
}

// Funktion til at spille spillet. Jeg starter med at lave en funktion, med playerChoice som et parameter, så lige meget hvad spilleren vælger, så er det indikeret i funktionen. I funktionen playGame tilsætter jeg animationen shake samtidig med jeg disabler knapperne. Det sker, når playerChoice er blevet aktivieret.
function playGame(playerChoice) {
  // Tilføj rysteanimation
  player1.classList.add("shake");
  player2.classList.add("shake");
  buttons.classList.add("disabled");

  //Jeg putter en timeout på animationen, så den stopper med at ryste hænderne.
  setTimeout(() => {
    player1.classList.remove("shake");
    player2.classList.remove("shake");
    buttons.classList.remove("disabled");


    // Jeg laver en variabel til computerChoice, som bruger funktionen getComputerChoice, der vælger sten, saks eller papir for computeren.
    const computerChoice = getComputerChoice();

    // Her ændres HTML-koden til at vise den rigtige illustration for enteen sten, saks eller papir alt efter hvad spilleren eller computeren har valgt. Jeg bruger template literals, til at gøre strengen enkel. 
    player1.className = `player ${playerChoice}`;
    player2.className = `player ${computerChoice}`;

    //Så der står faktisk som eksempel player1.className = player .saks, hvis gør at den henter classen player.saks.

    // Jeg laver nu en variabel som udregner resultatet for spillet. Det gør jeg ved at indkludere vores funktion determineWinner med de to parameter. Det er for at jeg kan genbruge result nemt i koden.
    const result = determineWinner(playerChoice, computerChoice);

    // Her viser jeg resultatet. Resultatet ventes med at vises efter 2 sekunder. Det vælger jeg ved at bruge setTimeout, som jeg gjorde i starten. Efter de 2 sekunder stopper animationen, og resultatet vises igennem funktionen result.
    showResult(result);
  }, 2000); // Animationens varighed
}

// Her sætter jeg eventlisteners til knapperne, som spilleren kan trykke på.
document.querySelector(".rock").addEventListener("click", () => playGame("rock"));
document.querySelector(".paper").addEventListener("click", () => playGame("paper"));
document.querySelector(".scissors").addEventListener("click", () => playGame("scissors"));