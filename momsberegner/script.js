
//Jeg laver funktionen calculate med de to parametre beloeb og moms Jeg angiver at moms default = 25, hvis ikke andet bliver defineret. 
function calculate(beloeb, moms = 25) {

  //Her har jeg lavet en variabel for udregningen. Først finder jeg momsen ud fra beløbet, og lægger det til beløbet for at få det totale med moms.
  const total = beloeb + (beloeb * (moms / 100));

  //Her bruger jeg template literal til at putte det hele i consoleloggen. I placeholders tager den momsen som er default  på 25, og totalen fra variablen jeg har lavet.
  console.log(`Beløbet inklusiv moms (${moms}%): ${total}`)
}



