// function greeting(firstName) {
//   return `Hello ${firstName}`;
// }
// const result = greeting("Chrys");
// console.log(result);

// function greeting(firstName) {
//   return `Hello ${firstName}`;
// }
// const result = greeting("any name");
// console.log(result);

//Der kommer til at stå Hello any name, fordi at jeg ændre parameteret i den kaldte funktion greeting.

// function greeting(firstName) {
//   return `Hello ${firstName}`;
// }
// const result = greeting("any name");
// console.log(greeting("any name"));

//Der kommer til at stå; Hello any name, fordi at parameteret stadigæk er i den kaldte funktion, som vi beder om at få console.log.

// function greeting(firstName) {
//   return `Hello ${firstName}`;
// }
// const result = greeting();
// console.log(result);

//Der vil stå; Hello undentified, fordi at et parameter ikke er blevet defineret, så der er ikke noget defineret hos fistName.


function greeting(firstName) {
  return `Hello ${firstName}`;
}
const txt = `Greeting is ${greeting("a name")}`;
console.log(txt);

//Der kommer til at stå; Greeting is Hello a name, fordi at vi i template literal godtkan kalde en funktion med et parameter.



// const person3 = {
//   firstName: "Harry",
//   lastName: "Potter",
//   hired: false
// }

// const person4 = {
//   firstName: "Fred",
//   lastName: "Weasley",
//   hired: false
// }

// function hire(person) {
//   person.hired = true;
// }

// function fire(person) {
//   person.hired = false;
// }

// function fireOrHire(action, person) {
//   action(person);
// }

// fireOrHire(hire, person4);

// fireOrHire(fire, person3);

// fireOrHire(hire, person3)

// console.log(person3)