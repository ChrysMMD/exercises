//Her er mit array med elementerne i mine breadbrumbs. De består af to informationer; navn og link. Mit array er lavet til en konstant variabel ved navn bc.
const bc = [{ name: "Hvidevarer", link: "/hvidevarer" }, { name: "Vaskemaskiner", link: "/hvidevarer/vaskemaskiner" }, { name: "Bosch", link: "/hvidevarer/vaskemaskiner/bosch/" },];

//Jeg laver en funktion der generere mine breadcrumbs
function generateBreadcrumb(breadcrumbData) {

  //Jeg finder <nav> i HTMLkoden, så jeg kan manipulere med indholdet i nav med javascript.
  const nav = document.getElementById("breadcrumb");

  //For at rydde tidligere indhold i nav, så det hele ikke bliver gentaget. hvergang at generate-knappen bliver trykket på, laver jeg et property, som vil fjerne det.
  nav.innerHTML = "";

  //Nu går jeg igennem hvert element i mit array ved at bruge forEach. Item repræsentere det aktuelle trin vi arbejder med og index repræsentere trinnets position i arrayet - altså hvad nummer det har. ==>
  breadcrumbData.forEach((item, index) => {
    //Her laver jeg en condition, hvor jeg fortæller, hvis det ikke er det sidste element, så laves et link og en separator
    if (index !== breadcrumbData.length - 1) {
      //her opretter jeg et <a>-element
      const link = document.createElement("a");
      //Her sætter jeg linkets URL
      link.href = item.link;
      //Her skriver jeg linkets navn eller tekst
      link.textContent = item.name;
      //Her tilføjes linket til <nav>. appendChild
      nav.appendChild(link);

      //Nu tilføjer jeg en seperator som jeg har valgt skal være / for nemhedens skyld. Jeg laver en variabel, som laver et element ved navn span.
      const separator = document.createElement("span");
      //Jeg tager fat i variablen og siger den skal have noget tekst som indhold, der så er min seperator /
      separator.textContent = " | ";
      //Bagefter putter jeg seperatoren bag min >nav>
      nav.appendChild(separator);
    } else {
      //Her fortæller jeg, at hvis det er sidste element i breadcrumbs, så skal det kun væree tekst og ikke et link.
      const span = document.createElement("span");
      span.textContent = item.name;
      nav.appendChild(span);
    }
  });

}

//Nu går jeg videre til knappen, som skal have en eventlistener på, så hele min funktion bliver kaldt, når den trykkes på.
document.getElementById("generate").addEventListener("click", () => {
  generateBreadcrumb(bc);

});

