# MalachiteDB
The Malachite json Database

![](https://img.shields.io/npm/dw/malachitedb)
![](https://img.shields.io/npm/v/malachitedb)
![](https://img.shields.io/librariesio/sourcerank/npm/malachitedb)

## Update notes
- Implement a `.remove()` feature,

## Todo
- Add more support for more data types.

## Syntax
### Initialization
Initialize your database with the constructor by defining the json file location as the first variable and the json file name as the second.<br>[Example](#example)

### Reading
Using `.read()` with no arguments with simple return the whole files contents, using `.read(<index>)` will attempt to read the value of the index specified.<br>[Example](#example)

### Writing
Using `.write(<index>, <value>)` when is doesn't previously exist will create it in the database, using `.write(<index>, <value>)` when it currently exists will append the value in the database<br>[Example](#example)

### Removing
Using `.remove(<index>)` will remove the index specified from the database.<br>[Example](#example)

### Example
``` js
const { Database } = require('malachite');
const exampleDatabase = new Database('/databases', 'users'); // initialises the database

// Database Variables
console.log(exampleDatabase.databaseName); // returns the database name
console.log(exampleDatabase.location); // returns the database location

// Basic writing and reading
exampleDatabase.write('username', 'Bill'); // writes bill to the database with username as the index
exampleDatabase.read('username'); // returns the value of user1 (bill)

// Appending existing things in the database
exampleDatabase.write('password', 'p@ssw0rd123'); // writes p@ssw0rd123 to the database with password as the index
exampleDatabase.write('password', 'P@SSW0RD123'); // appends the value of password to P@SSW0RD123

// Removing from the database
exampleDatabase.remove('password'); // removes the password from the database

exampleDatabase.read(); // returns all values and index's in the database
```
