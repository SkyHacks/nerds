# nerdsJS

## The API after every nerd's heart...

nerdsJS is an API for easily generating random data from your favorite nerdy movies, tv shows, and hobbies. Pull mock data into your app or presentation from Pokemon, Harry Potter, Star Wars and more. Effortlessly compose nerdy datasets by chaining methods in succint and intelligible expressions.

Return the datasets in whatever form works best for you. You can get it as a simple Array, wrapped in a Promise, or even get a Generator back.

## Installation
nerdsJS is available on npm. Navigate to your project's folder and run:
```
npm install nerds
```

## Examples
```javascript
let nerds = require('nerds');

let singleSW = nerds.resolve("Star Wars").asArray();
console.log(singleSW); // {"first":"Han", "last":"Solo", "full":"Han Solo"}

let multiHP = nerds.resolve("Harry Potter", 3).include(["first"]).asArray();
console.log(multiHP); // {"first":"Harry", "first":"Ron", "first":"Hermione"}

let genSW = nerds.resolve("Star Wars", 3).exclude(["first", "last"]).asGenerator();
genSW.next().value; // {"full":"Luke Skywalker"}
genSW.next().value; // {"full":"Nute Gunray"}
genSW.next().value; // {"full":"Leia Organa"}
genSW.next().value; // undefined
```