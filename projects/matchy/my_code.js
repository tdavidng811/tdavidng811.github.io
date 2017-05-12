var animal = {};
animal.species = "Camel";
animal["name"] = "Joe";
animal.noises = [];
console.log(animal);
var noises = [];
noises[0] = "Moo";
noises.push("Boo");
noises.unshift("meow");
noises[noises.length] = ("wow");
console.log(noises.length);
console.log(noises[noises.length - 1]);
console.log(noises);
animal['noises'] = noises;
noises.push("haha");
console.log(animal);

var animals = [];
animals.push(animal);
var duck = { species: 'duck', name: 'Jerome', noises: ['quack', 'honk', 'sneeze', 'woosh'] };
console.log(duck);
animals.push(duck);
var bird = { species: 'bird', name: 'Bob', noises: ['Chirp', 'Tweet'] };
animals.push(bird);
var gator = { species: 'gator', name: 'Jack', noises: ['Yum', 'Crunch'] };
animals.push(gator);
console.log(animals);
console.log(animals.length);
var friends = []; // so we can list each name in each element in the array
function getRandom() {
    var i = Math.floor(Math.random() * animals.length);
    friends.push(animals[i].name);
}
getRandom();
console.log(friends);
animals[0].friends = friends;

function search(animalName) {
    for (var i = 0; i < animals.length; i++) {
        if (animals[i].name === animalName) {
            return animals[i];
        } 
    }       return null;
}

function edit(animalName, object) {
    for (var i = 0; i < animals.length; i++) {
        if (animals[i].name === animalName) {
            animals[i] = object;
        } 
    }      
}
function remove(animalName) {
    
    for(var i = 0; i < animals.length; i++) 
        if (animals[i].name === animalName) {
            animals.splice(i, 1);
        }
    
       
    }

function create(object) {
   
    if (object.name.length > 0 && object.species.length > 0) {
     
     for (var i = 0; i < animals.length; i++) {
     if (animals[i].name === object.name) {
       return null;
        }     
     }
     
     return animals.push(object);
}
}