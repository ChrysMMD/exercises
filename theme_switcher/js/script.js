//dropboxen bliver hentet fra HTML gennem id'et.
const dropdown = document.getElementById("dropbox");
const themeImage = document.getElementById("themeImage");

//funktionen for at ændre temaet, og som blivr tilkaldt senere i dropboxxen.
function changeTheme(themeName) {
  //funktionen ændre body's attribute data-theme.
  const body = document.querySelector("body");
  body.setAttribute("data-theme", themeName);
}


//temaet bliver ændret til hawaii
changeTheme("hawaii");


//dropdown får en eventlistener, som lytter efter et change, og når det ssket bliiver funktionen kaldt.
dropdown.addEventListener('change', function () {
  const selectedValue = dropdown.value;
  document.body.setAttribute('data-theme', selectedValue);

  // Skift billede baseret på valgt tema
  if (selectedValue === "hawaii") {
    themeImage.src = "../img/hawaii.jpg";
  } else if (selectedValue === "dark") {
    themeImage.src = "../img/dark.jpg";
  } else if (selectedValue === "light") {
    themeImage.src = "../img/light.jpg";
  }

});


