console.log('JavaScript Loaded');

//Nu sørger jeg for at lave en eventlistener, som lytter til musens bevægelser over skærmen. 
document.addEventListener("mousemove", (event) => {
  //Først skal jeg beregne vores lightness og saturation. event.clientx er musens position vandret. windows.innerWidth er skærmens bredde. Regnestykket giver en værdi fra 0% til 100%. Det samme med saturation, ud over at vi regner med clientY som er højden samt at window.height er skærmens højde. Så ved at dividere mussens position med skærmens højde/bredde, for bagefter at gange med 100, får jeg en procent.
  let lightness = (event.clientX / window.innerWidth) * 100;
  let saturation = (event.clientY / window.innerHeight) * 100;

  //Nu skal CSS variablerne opdateres. Først referere jeg til html-elementetet globalt, og bagefter opdatere jeg CSS-variablen --lightness med den nye værdi. Det samme med saturation. Det gør at når musens bevæges ændres variablerne, hvilket ændre baggrundsfarven.
  document.documentElement.style.setProperty("--lightness", `${lightness}%`);
  document.documentElement.style.setProperty("--saturation", `${saturation}%`)
});