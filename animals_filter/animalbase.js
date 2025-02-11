"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

// The prototype for all animals: 
const Animal = {
    name: "",
    desc: "-unknown animal-",
    type: "",
    age: 0
};

function start() {
    console.log("ready");

    // TODO: Add event-listeners to filter and sort buttons

    loadJSON();
}


async function loadJSON() {
    const response = await fetch("animals.json");
    const jsonData = await response.json();

    // when loaded, prepare data objects
    prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
    allAnimals = jsonData.map(preapareObject);

    // TODO: This might not be the function we want to call first
    displayList(allAnimals);
}

function preapareObject(jsonObject) {
    const animal = Object.create(Animal);

    const texts = jsonObject.fullname.split(" ");
    animal.name = texts[0];
    animal.desc = texts[2];
    animal.type = texts[3];
    animal.age = jsonObject.age;

    return animal;
}


function displayList(animals) {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // append clone to list
    document.querySelector("#list tbody").appendChild(clone);
}

//min eventlistener til knapperne. Den vælger den valgte filtertype og bagefter kalder filter-funktionen på den valgte type. Fordi jeg gerne vil hente alle knapperne, bruger jeg querySelectorAll, og leder efter alle dem, som hedder "filter". ForEach bruges til at gå geennem hver af knapperne, så koden vil blive kørt.
document.querySelectorAll("button.filter").forEach(button => {
    //Her er eventlisteren som lytter til click, hvor der så sker en funktion.
    button.addEventListener("click", (event) => {
        //Med event.target referere vi til den knap, som er blevet trykket på. Ved at bruge dataset.filter, får vi adgang til værdien af data-filter-attributten i vores HTML.
        const filterType = event.target.dataset.filter;
        //funktionen med vores filterType-værdi.
        filterAnimals(filterType);
    });
});

//Her laver jeg min filter-funktion, som bliver kaldt til knapperne. Først laver jeg en kopi af alle dyrene, som kan filtreres igennem.
let filteredAnimals = [...allAnimals];

//Funktionen for at filtrere. Den har type som parameter, som angiver hvilket dyr, der skal filtreres.
function filterAnimals(type) {
    if (type === "*") {
        //hvis "*" er valgt, så vises alle dyr
        filteredAnimals = [...allAnimals];
    } else {
        //filterer efter type dyr ved at lave et nyt array med de udvalgte dyr. toLowerCase for at sammenligningen ikke er følsom overfor store og små bogstaver.
        filteredAnimals = allAnimals.filter(animal => animal.type.toLowerCase() === type.toLowerCase());
    }
    //Kalder på displayList-funktionen, og sender den filtreret liste med, så dyrene kan vises.
    displayList(filteredAnimals);
}