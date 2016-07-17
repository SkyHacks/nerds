# nerdsJS

## The API after every nerd's heart...

nerdsJS is an API for easily generating random data from your favorite nerdy movies, tv shows, and hobbies. Pull mock data into your app or presentation from Pokemon, Harry Potter, Star Wars and more (very soon). Effortlessly compose nerdy datasets by chaining methods in succint and intelligible expressions.

Return the datasets in whatever form works best for you. You can get it as a simple Array, wrapped in a Promise, or even get a Generator back.

## Installation
nerdsJS is available on npm. Navigate to your project's folder and run:
```
npm install nerds
```
or download [the source code directly from Github](https://github.com/SkyHacks/nerds)

## Quick Examples
```javascript
let nerds = require('nerds');

let singleHP = nerds.resolve('Harry Potter').asArray();
console.log(singleHP);
/*
[{
	'first': 'Hermione',
	'last': 'Granger',
	'full': 'Hermione Granger',
	'blood_status': 'Muggle-Born',
	'birthday': '19 September, 1979',
	'gender': 'Female',
	'house': 'Gryffindor',
	'wand': '10¾", Vine Wood - Dragon Heartstring'
}]
*/

let multiPoke = nerds.resolve('Pokemon', 3).include(['name', 'type', 'hp']).asArray();
console.log(multiPoke);
/*
[
	{'name':'Bulbasaur', 'type': 'Grass Poison', 'hp': 45},
	{'name':'Charmander', 'type': 'Fire', 'hp': 39},
	{'name':'Squirtle', 'type': 'Water', 'hp': 44}
]
*/

let genSW = nerds.resolve('Star Wars', 3).exclude(['first', 'last']).asGenerator();
genSW.next().value; // {"full":"Luke Skywalker"}
genSW.next().value; // {"full":"Nute Gunray"}
genSW.next().value; // {"full":"Leia Organa"}
genSW.next().value; // undefined
```

## Methods

nerdsJS exposes an API that lets you chain methods together to get the exact fields and number of results you want. It is designed to be highly discoverable. Where possible, empty setters return valid options as examples. Every method comes standard with type and sanity checks and, if necessary, returns informative error messages.

---

### `resolve([topic], [results])`

Sets the topic and the max number of results to be returned (optionally). If no topic is assigned, returns all valid topics. If the number of results is not specified, nerds returns one random result by default. nerdsJS retrieves random data up to either the `results` or the size of the collection.

Parameter | Type | Description
---|---|---
topic|String|The topic that the data is based off of.
results|Number|Max number of results that will be returned.

```javascript
nerds.resolve('Harry Potter');  //sets topic and returns the nerd context

nerds.resolve('Harry Potter', 3);  //sets topic, number of results and returns the nerd context

let topics = nerds.resolve();
console.log(topics);  //['Harry Potter','Star Wars','Pokemon']
```

When used as a setter, `resolve` returns the `nerds` context, meaning you can (and should) continue chaining subsequent methods.

---

### `fields()`

Convenience getter method for discovering available fields. Topic must be set first. Returns array of all valid fields for the topic.

```javascript
let fields = nerds.resolve('Pokemon').fields();
console.log(fields);
/*[
	'national_pokedex_number',
	'name',
	'type',
	'height',
	'weight',
	'total',
	'hp',
	'attack',
	'defense',
	'special_attack',
	'special_defense',
	'speed',
	'base_experience',
	'evolves_from'
]*/
```

---

### `include(fields)`

Sets the fields to be included in the results. Accepts an array of strings. Any field not specified will not be included in the results. Topic must be set first.

```javascript
nerds.resolve('Star Wars').include(['first', 'last'])  //sets fields and returns the nerd context
```

`include` returns the `nerds` context, meaning you can (and should) continue chaining subsequent methods.

Parameter | Type | Description
---|---|---
fields|Array of Strings|The fields to include in the results.

---

### `exclude(fields)`

Sets the fields to be excluded in the results. Accepts an array of strings. Any field not specified will be included in the results. Topic must be set first.

```javascript
nerds.resolve('Star Wars').exclude(['first', 'last'])  //sets fields and returns the nerd context
```

Parameter | Type | Description
---|---|---
fields|Array of Strings|The fields to exclude from the results.

`exclude` returns the `nerds` context, meaning you can (and should) continue chaining subsequent methods.

---

#### *Once I've set the topic and fields, how to do I get the data?*

Any of the following `as` methods will resolve the `nerd` method chain. This is what tells nerdsJS what format you would like to receive the data in.

### `asArray()`

Returns the dataset as a plain ol' JavaScript Array. The Array will contain data objects representing the search results (characters, Pokemon, etc).

```javascript
let result = nerds.resolve('Harry Potter').asArray();
console.log(result);
/*
[{
	'first':'Albus',
	'last': 'Dumbledore',
	'full': 'Albus Dumbledore',
	'blood_status': 'Half-Blood',
	'birthday': 'Summer 1881',
	'gender': 'Male',
	'house': 'Gryffindor',
	'wand': '15", Elder - Thestral Tail Hair'
}]
*/
```

---

### `asPromise()`

Returns the same kind of result as `asArray()` except wrapped in a Promise. Once the promise is resolved, the resulting Array will contain data objects representing the search results (characters, Pokemon, etc).

```javascript
let promise = nerds.resolve('Harry Potter').asPromise();
promise.then(function (result) {
	console.log(result);
/*
[{
	'first': 'Neville',
	'last': 'Longbottom',
	'full': 'Neville Longbottom',
	'blood_status': 'Pure-Blood',
	'birthday': '30 July, 1980',
	'gender': 'Male',
	'house': 'Gryffindor',
	'wand': '13", Cherry - Unicorn Hair'
}]
*/
});
```

---

### `asGenerator()`

Returns the search results as a Generator. This allows you to iterate over the collection using the `next` method;

```javascript
let gen = nerds.resolve('Harry Potter', 3).include(['first']).asGenerator();
gen.next().value;  // {'first':'Harry'}
gen.next().value;  // {'first':'Ron'}
gen.next().value;  // {'first':'Hermione'}
gen.next().value;  // undefined
});
```

---

## What's Next?

nerdsJS is still under active development. Collecting, cleaning, compiling, and updating datasets are great ways to contribute. Just make sure that the data is consistent (they should all have the same keys and most of the fields should have some kind of data).

Topics Yet To Be Added:
- Star Wars (Needs more data)
- Super Mario
- Sherlock
- Lord Of The Rings
- Avengers
- Doctor Who
- Star Trek
- Dragonball Z
- Zelda