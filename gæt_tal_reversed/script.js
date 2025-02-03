
//Mine knapper og min outputtekst har jeg lavet om til variabler
const messageElement = document.getElementById("message");
const startButton = document.getElementById("startButton");
const lowerButton = document.getElementById("lowerButton");
const higherButton = document.getElementById("higherButton");
const correctButton = document.getElementById("correctButton");

//Jeg laver også for nemhedens skyld variabler med values, jeg skal bruge senere
let min = 0;
let max = 100;
let guess = null;
let isGameActive = false;

//Så laver jeg en funktion, der opdatere teksten i id'et "message", som jeg har lavet til en variabel kaldet; messageElement.
function updateMessage(text) {
  messageElement.textContent = text;
}

//Her er min funktion for computerens generering af gættet. Jeg kalder den MakeGuess, og laver en udregning, som tager de to varialer let min og let max med values 0 og 100. Dem plusser jeg i udregningen og dividere med 2. Math.floor runder resultatet til et helt tal. Til sidst kalder jeg på min funktion updateMessage, som nu putter computerens gæt ind i messageElement.
function makeGuess() {
  guess = Math.floor((min + max) / 2);
  updateMessage(`Mit gæt er: ${guess}`);
}

//Så begynder jeg spillet. En Eventlistener venter på at der bliver klikket på startknappen. Når det sker bliver min isGameActive til true, hvilket er en sikkerhedsmekanisme, som sørge for, de rigtige knapper kan trykkes på.
startButton.addEventListener("click", () => {
  min = 0;
  max = 100;
  guess = null;
  isGameActive = true;

  startButton.disabled = true;
  lowerButton.disabled = false;
  higherButton.disabled = false;
  correctButton.disabled = false;

  //Jeg kalder funktionen for at computeren skal komme med et gæt.
  makeGuess();
});

//Her bruger jeg en EventListener til at vente på, den lowerButton bliver trykket på, og hvis den gør, så vil funktionen tage variablen max og gøre den lig med gættet minus 1. Det er fordi jeg gav computeren besked på, at den skulle vælge et lavere tal. Max vil nu få en ny værdi ud fra det gamle gæt, der skal være lavere. Og så køre jeg funnktionen for udregningen igen. 
lowerButton.addEventListener("click", () => {
  if (!isGameActive) return;
  max = guess - 1;
  makeGuess();
});


//Det samme sker næsten hvis jeg trykket på den, at den skal vælge et højere tal. Her er udregningen bare anderledes, da den får en ny værdi i "min" baseret ud fra det gamle gæt + 1.
higherButton.addEventListener("click", () => {
  if (!isGameActive) return;
  min = guess + 1;
  makeGuess();
});

//Hvis computeren gættede rigtigt, trykker man på oorrectButton, hvor en EventListener afventer  klikket. Funktionen updateMessage bliver kaldt med en literal template, som putter gættet ind i en string. Alle knapperne pånær startButton bliver disabled, og man kan køre et nyt spil.

correctButton.addEventListener("click", () => {
  if (!isGameActive) return;
  updateMessage(`Jeg gættede det! Tallet var ${guess}`);

  startButton.disabled = false;
  lowerButton.disabled = true;
  higherButton.disabled = true;
  correctButton.disabled = true;

  //Spillet er nu slut, og man kan ikke vælge knapperne, lower, higher eller correct.
  isGameActive = false;
});