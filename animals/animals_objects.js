"use strict";

//Først laver jeg en eventlistener, som bliver kaldt, når siden loades. Den giver besked om, at funktionen start, skal gå i gang, når hele siden er loaded færdig.
window.addEventListener("DOMContentLoaded", start);

//Det nye array med den "rengjorte" data fra vores json.
const allAnimals = [];

//Funktionen start, der går igang når hele siden er loaded. Med console.log, fortælles der i konsollen, når dataen er loaded. loadJSON er funktionen, som går i gang, og loader alt dataen.
function start() {
    console.log("ready");

    loadJSON();
}

//Her er funktionen for upload af dataen fra vores JSON. Vi fetcher den rå data, så konverterer vi med respons, den rå data til javascript array eller element. Og bagefter sortere vi i dataen ved at bruge funktionen prepareObjects.
function loadJSON() {
    fetch("animals.json")
        .then(response => response.json())
        .then(jsonData => {
            prepareObjects(jsonData);
        });
}


//Her er funktionen for at "rydde op" i den konverteret data, vi har fået fra vores JSON. Vi gennemgår arrayet med forEach, for at dele fullname op i nogle nye objekter; name og desc. Det gør vi ved at bruge split, slice og join. Type og age er allerede i JSON'en, så den behøver vi ikke gøre noget ved.
function prepareObjects(jsonData) {
    jsonData.forEach(jsonObject => {
        const words = jsonObject.fullname.split(" "); //deler fullname op i ord
        const name = words[0]; //tager det første ord som et navn
        const type = words.slice(-1)[0]; //tager det sidste ord som type

        //Fjerner navn, type og "the" fra beskrivelsen
        const desc = words
            .slice(1, -1) //tager alt mellem navn og type
            .filter(word => word.toLowerCase() !== "the") //her fjerner vi "the" lige meget om det er skrevet med stort eller småt.
            .join(" "); //Og her samles det hele tilbage til én streng.

        const animal = {
            name: name,
            desc: desc,
            type: type,
            age: jsonObject.age

        };

        //her "pusher" jeg det nye objekt ind i allAnimals-arrayet.
        allAnimals.push(animal);


    });

    //Funktionen displayList bliver kaldt.
    displayList();
}

// displayList opdatere og genlaver tabellen, samt viser den i HTML. Det gør den ved at sætte <tbody>-indholdet til en tom streng først.
function displayList() {
    document.querySelector("#list tbody").innerHTML = "";
    allAnimals.forEach(displayAnimal);
}

//Funktionen her finder i HTML templaten med id'et "animal", samt kloner dens indhold.
function displayAnimal(animal) {
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    //Den fylder klonen med data fra et animal-objekt: animal.name, osv.  
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    //Bagefter tilføher den klonen til tbody-tabellen som et child.
    document.querySelector("#list tbody").appendChild(clone);
}


