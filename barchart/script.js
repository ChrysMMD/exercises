//Her laver jeg mit setup, hvor jeg finder nogle html-elementer og gør dem til en variabel. list finder en <ul>, li finder <li> og valueArr initalisere et tomt array, som skal holde tilfældige værdier.
const list = document.querySelector("ul");
const li = document.createElement("li");
let valueArr = [];

//Her sætter jeg en højde på en Css-variabel på det første <li> element. Bagefter tilføjer jeg det oprettet <li>element til <ul>
li.style.setProperty("--height", "20");
list.appendChild(li);

//Her kalder jeg på min funktion genererSoejle én gang i sekundet
setInterval(genererSoejle, 1000)


//Det er her jeg har skrevet min funktion, som generere søjlerne. Jeg starter med at generere et randomtal og tilføjer den til mit tomme valueArr-array.
function genererSoejle() {
  valueArr.push(Math.round(Math.random() * 100));
  console.log(valueArr)

  //Jeg opretter et nyt <li>element, og sætter dens højde til at være den seneste værdi i valueArr, som jeg lige har genereret opover.
  const li = document.createElement("li");
  li.style.setProperty("--height", valueArr[valueArr.length - 1]);
  //Her tilføjer jeg <li>elementet til <ul>.
  list.appendChild(li);

  console.log("genererSoejle")

  //Her lavede jeg en "if", hvor jeg beder op at hvis value-lenght er over 20, så vil den slette, det første item i array. Jeg lavede en variable, som hedder firstLi, til at fange "li", så jeg kan slette den.
  if (valueArr.length > 20) {
    console.log("STOP!");
    valueArr.shift();
    const firstLi = list.querySelector("li");
    list.removeChild(firstLi);
  }
}
