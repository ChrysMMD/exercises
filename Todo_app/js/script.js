
//Koden skal først køre, når hele HTML-dokumentet er færdiglæst, så jeg ikke risikere at skulle tilgå elementer, der ikke eksistere endnu.
document.addEventListener("DOMContentLoaded", () => {
  console.log('JavaScript Loaded');

  //HTML-elementer til javascript
  const shoppingList = document.getElementById("shopping-list"); //aktive varer
  const completedList = document.getElementById("completed-list"); //færdige varer
  const categoryButtons = document.querySelectorAll(".food_category:not(#show-all)"); //filtrering
  const toggleButton = document.getElementById("toggle-completed"); //knappen til at skjule/vise færdig-listen
  const categories = ["kød", "grønt", "mejeri"];  //Array med kategorierne - der kan tilføjes flere hvis ønsket. Det gør jeg for at kunne matche knapperne med kategorierne.

  //array med objekter; navn, antal, kategori og om varen er færdigkøbt, hvilket jeg skal bruge senere.
  let items = JSON.parse(localStorage.getItem("shoppingList")) || [
    { name: "Mælk", quantity: 1, category: "mejeri", completed: false },
    { name: "Kylling", quantity: 2, category: "kød", completed: false },
    { name: "Tomater", quantity: 5, category: "grønt", completed: false },
  ];

  function saveToLocalStorage() {
    localStorage.setItem("shoppingList", JSON.stringify(items));
  }

  //Begger lister skal tømmes, så de kan genskabes fra bunden hver gang funktionen kaldes.
  function renderList() {
    shoppingList.innerHTML = "";
    completedList.innerHTML = "";

    //Tilføj varer til listen. Går gennem alle varer i arrayet og opretter et nyt html-element (div), for hver varer. 
    items.forEach((item, index) => {
      const listItem = document.createElement("div");
      listItem.classList.add("item"); //Tilføjer her CSS-klassen "item" til div'en, så den kan styles med CSS senere. 
      listItem.dataset.category = item.category;// varen bliver gemt, som et dataset-attribute på div. Dette er for at jeg senere kan filtrere varen.

      //Her putter jeg en CSS-klasse på ved navn completed, hvis item'et er færdig. 
      if (item.completed) {
        listItem.classList.add("completed");
      }

      //Her putter jeg html-indhold til varen. Det bliver, navn, checkboxen og antal-knappen. Jeg sætter klasser på de forskellige elementer, for at kunne style det i CSS samt gør den lettere at finde i javascript til senere. Backticks bruger jeg for at holde koden simpel og overskuelig, i stedet for at skulle dele den op med + og "". I stedet for at skrive en hel if/else kode, så vælger jeg at gøre den kortere ved brug af ?. Jeg gør også at quantity-knapperne er skjult, når varen kommer ned i indkøbt-listen.
      listItem.innerHTML = `
      <div class="item-content">
        <input type="checkbox" class="check-item" data-index="${index}" ${item.completed ? "checked" : ""}>
        <span class="item-name">${item.name}</span>
        
        <div class="quantity-container ${item.completed ? "hidden" : ""}">
          <button class="quantity-btn minus-btn" data-index="${index}">-</button>
          <span class="item-quantity">${item.quantity}</span>
          <button class="quantity-btn plus-btn" data-index="${index}">+</button>
        </div>
      </div>
    `;

      //Hvis item er completed, skal den i completedList. Hvis ikke skal den forblive i shoppingList.
      if (item.completed) {
        completedList.appendChild(listItem);
      } else {
        shoppingList.appendChild(listItem);
      }
    });

    saveToLocalStorage();
    addEventListener();
  }



  //Funktionen finder med QueryselectorAll alle elementer med en bestemt CSS-selector (check-item og quantity-btn).
  function addEventListener() {
    //For hver "check-item", der bliver fundet bliver der lagt en eventlistener på. 
    document.querySelectorAll(".check-item").forEach(checkbox => {
      //HVer gang en bruger ændre tilstanden af en checkbo, vil eventet "change" blive aktivieret. Så kaldes funktionen toggleItem, som håndtere at ændre status på varen om den er "færdig eller ikke færdig". Den kalder også på renderList som opdatere UI'en.
      checkbox.addEventListener("change", toggleItem);
    });

    //Der sker det samme her som opover. Ud over eventlisteneren ikke lytter efter "change" men efter "click". Når der sker et click, vil funktionen changeQuantity blive kaldt.
    document.querySelectorAll(".quantity-btn").forEach(button => {
      button.addEventListener("click", changeQuantity);
    });

    document.querySelectorAll(".minus-btn").forEach(button => {
      button.addEventListener("click", decreaseQuantity);
    });
  }



  //Tjek varer af som færdige
  //Flyt varer tilbage tiil indkøbslisten
  //Denne funktion bruger jeg til at ændre om en vare er færdigkøbt eller ej, når checkboxen bliver ændret. 
  function toggleItem(event) {
    const index = event.target.dataset.index; //Henter varens index i arrayet.
    items[index].completed = !items[index].completed; //laver ændringen som skifter væærdien af completed, så hvis completed er false, så bliver den true og omvendt.
    saveToLocalStorage();
    renderList(); //genopbyg!
  }

  //Ændre antal af varer
  //Den her funktion ændre antallet på en vare, når der klikkes på + eller -.
  function changeQuantity(event) {
    const index = event.target.dataset.index; //henter varens index igen igen.

    if (event.target.classList.contains("plus-btn")) {
      items[index].quantity++; //Øger antallet med én.
    } else if (event.target.classList.contains("minus-btn") && items[index].quantity > 1) {
      items[index].quantity--; // Reducér antallet, men aldrig under 1
    }
    saveToLocalStorage();
    renderList();  //OPDATER listen.
  }

  function decreaseQuantity(event) {
    const index = event.target.dataset.index;
    if (items[index].quantity > 1) {
      items[index].quantity--;
      saveToLocalStorage();
      renderList();
    }
  }

  //Filtrer varer efter kategori
  //Filter funktion. Først finnder den alle .item-elementer ved queryselectorAll. Med forEach gennemgår den hver enkel vare, og tjekker om den kategor (item.dataset.category) matcher den valgte kategori (category). Hvis category = "all" eller matcher, å bliver den vist. HVis ikke, så bliver den skjult. Jeg bruger igen ternary operator, for at gøre koden kortere og bedre struktureret.
  function filterItems(category) {
    document.querySelectorAll(".item").forEach(item => {
      item.style.display = item.dataset.category === category || category === "all" ? "block" : "none";
    });
  }

  //Her er eventlisteneren som gennemgør hver knap i categoryButtons-arrayet. i er selve placeringen i arrayet. button er selve knappen. 
  categoryButtons.forEach((button, i) => {
    //lytter efter et click, og så udføres funktionen.
    button.addEventListener("click", () => {

      //Her kalder jeg funktionen filterItems med den valgte kategori. i sikrer at knappen matcher filteret, dvs at hvis man trykker på den første knap (index 0), så vælger man "kød" osv.
      filterItems(categories[i]);

      //fjerne og tilføjer active-klassen fra alle knapper eller tilføjer til den knap, som der klikkes på.
      document.querySelectorAll(".food_category").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });

  //VIS ALLE KNAP! NY!
  document.getElementById("show-all").addEventListener("click", () => {
    filterItems("all"); //Vis alle varerne.

    //fjerner "active" fra alle kategori-knapperne.
    document.querySelectorAll(".food_category").forEach(btn => btn.classList.remove("active"));

    //tilføje active til vis alle knappen.
    document.getElementById("show-all").classList.add("active");
  });


  //AD KNAP!
  document.getElementById("add").addEventListener("click", () => {
    //først opretter jeg en container til inputs.
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("input-container");

    //Inputfelt til varenavn lige her
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Varenavn";
    nameInput.classList.add("item-input");

    //Inputfelt til antal
    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.placeholder = "Antal";
    quantityInput.min = "1"; //antal kan ikke være under 1.
    quantityInput.classList.add("quantity-input");

    //en dropdown til kategorierne.
    const categorySelect = document.createElement("select");
    categorySelect.classList.add("category-select");

    //kategorierne
    const categories = ["kød", "grønt", "mejeri"];
    categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category.charAt(0).toUpperCase() + category.slice(1); // Gør første bogstav stort
      categorySelect.appendChild(option);
    });

    //Oprettelse af en gem-knap
    const saveButton = document.createElement("button");
    saveButton.textContent = "+ Tilføj";
    saveButton.classList.add("save-btn");

    // Tilføj alt til inputContainer
    inputContainer.appendChild(nameInput);
    inputContainer.appendChild(quantityInput);
    inputContainer.appendChild(categorySelect);
    inputContainer.appendChild(saveButton);

    // Tilføj til shopping-list
    shoppingList.appendChild(inputContainer);

    // Eventlistener til at gemme varen
    saveButton.addEventListener("click", () => {
      const newItem = {
        name: nameInput.value.trim(),
        quantity: parseInt(quantityInput.value) || 1,
        category: categorySelect.value,
        completed: false
      };

      // Kun tilføj hvis navnet ikke er tomt
      if (newItem.name !== "") {
        items.push(newItem);
        renderList(); // Opdater listen
      }
    });
  });

  //Toggle færdig-listen
  //Vis og skjul listen med indkøbte varer ved at putte end eventlistener på knappen. Den bliver kaldt ved "click". Her bruger jeg også en ternary operator som før. Hvis completedList har display = none eller block. 
  toggleButton.addEventListener("click", () => {
    completedList.style.display = completedList.style.display === "none" ? "block" : "none";
  });

  renderList(); //GENOPBYG LISTEN!
});







