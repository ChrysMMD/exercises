const vehicles = [
  { type: "Bus", fuel: "Diesel", passengers: 45, stops: ["Nørrebrogade", "Elmegade"] },
  { type: "Bil", fuel: "Benzin", passengers: 4, ownedBy: "Klaus" },
  { type: "Cykel", fuel: "Rugbrød", passengers: 0, ownedBy: "Jonas", isElectric: true },
  { type: "Bil", passengers: 5, ownedBy: "Elon", isElectric: true },
  { type: "MC", fuel: "Benzin", passengers: 2, ownedBy: "Fonda" },
  { type: "Cykel", fuel: "Rugbrød", passengers: 2, ownedBy: "Vingegård", isTandem: true },
  { type: "MC", fuel: "Benzin", passengers: 2, ownedBy: "Yolanda" },
  { type: "Knallert", fuel: "Benzin", passengers: 1, ownedBy: "Børge" },
  { type: "Knallert", fuel: "Benzin", passengers: 1, ownedBy: "Jonas" },
  { type: "Løbehjul", passengers: 1, isElectric: true },
];
const tbodyPointer = document.querySelector("tbody");
showAllVehicles(vehicles)

function showTheseVehicles(arr) {
  tbodyPointer.innerHTML = "";
  arr.forEach((each) => {
    tbodyPointer.innerHTML += `<tr>
  <td>${each.type || ""}</td>
  <td>${each.fuel || ""}</td>
  <td>${each.passengers || ""}</td> 
  <td>${each.stops ? each.stops.join(', ') : ''}</td>
  <td>${each.ownedBy || ""}</td>
  <td>${each.isElectric ? "Yes" : ""}</td>
  <td>${each.isTandem ? "Yes" : ""}</td>
</tr>`;
  });
}

export function filterElectric() {
  //Jeg starter med at filtrere alle de køretøjer som er elektriske. Det gør jeg ved at bruge filter-metoden. Jeg filtrere mit array et element af gangen, og leder efter alle med boolea'en isElectric som er true. 
  const electricVehicles = vehicles.filter(vehicle => vehicle.isElectric);
  //Herefter viser jeg alle de filtreret køretøjer ved at bruge funktionen "showTheseVehicles", og fortæller det er electricVehicles, som skal ind i (arr) som argument.
  showTheseVehicles(electricVehicles);
}

//Jeg forsætter med samme udgangspunkt i de andre filte.
export function filterMoreThanTwoSeats() {
  const moreThanTwoSeats = vehicles.filter(vehicle => vehicle.passengers > 2);
  showTheseVehicles(moreThanTwoSeats);
}

export function filterJonasElectric() {
  const electricJonas = vehicles.filter(vehicle => vehicle.isElectric && vehicle.ownedBy === "Jonas");
  showTheseVehicles(electricJonas);
}

export function filterRugPassenger() {
  const rugpassenger = vehicles.filter(vehicle => vehicle.fuel === "Rugbrød" && vehicle.passengers > 1);
  showTheseVehicles(rugpassenger);
}

export function showAllVehicles() {
  showTheseVehicles(vehicles);
}


