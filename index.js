/**
* @author - Bello Gbadebo 
* @licence - https://github.com/Gbahdeyboh/ObjectCompare/blob/master/LICENSE
* @description - This module does a deep comparism between two Objects and return true if they match 
* It supports the following types of Objects - Objects, Strings, Numbers, Functions, Booleans, Arrays, Sets and Dates 
*/

function reject(msg){
	/**
	* @param {String} [msg] - The error message being thrown
	* @throw throws - the `msg` Error
	 */
	throw new Error(msg);
}
function compareObjects(obj1, obj2){
	/**
	* This function does a deep comparism between two Object passed as arguments to it
	* @param {Object} [obj1 | obj2] - Objects being compared
	 */
	'use strict';
	//first confirm if both parameters passed to the arguments are objects
	if(typeof obj1 !== 'object' || typeof obj2 !== 'object'){
		reject("Parameters passed into the arguments must be Objects")
	};
	//Then check if the Objects have different constructors
	if(obj1.constructor !== obj2.constructor){
		reject("Objects have different constructors!");
	}
	//The keys of each Objects which is sorted to aid uniformity between the key Array of both objects
	let objKeys1 = Object.keys(obj1).sort();
	let objKeys2 = Object.keys(obj2).sort();
	//If the keys are of different lengths
	if(objKeys1.length !== objKeys2.length){
		reject("Ooops!, the objects passed in are structured differently")
	}
	//Loops through every value of the Object
	for(let i in objKeys1){
		//check if both object have the same keys arranged in the same order
		if(objKeys1[i] !== objKeys2[i]){
			reject("Ooops!, the objects passed in are structured differently. Their keys mismatched!")
		}
		else{
			if(typeof obj1[objKeys1] !== typeof obj2[objKeys1]){
				//The value of each Object must always be the same 
				reject("Object values are of different types!");
			}
			else{
				//handle each type of supported values differently
				const value1 = obj1[objKeys1[i]];
				const value2 = obj2[objKeys1[i]];
				function valueHandler(val1, val2){
					switch(typeof val1){
						case 'number' : 
							if(val1 !== val2){
								reject("An Object value of type `number` mismatched");
							}
							break;
						case 'boolean' : 
							if(val1 !== val2){
								reject("An Object value of type `boolean` mismatched");
							}
							break;
						case 'string' : 
							if(val1 !== val2){
								reject("An Object value of type `string` mismatched");
							}
							break;
						case 'function' :
							if(val1.call(val1) !== val2.call(val2)){
								reject("An Object value of type `function` mismatched")
							}
							break;
						case 'object' :
							/*
							* An Object could be anything, literally everything in javascript is an Object.
							* Different kinds of objects are ompared differently. Date Objects can't be compared the
							* same way Array or Sets or Regular Expressions are compared. Each type of Object are compared
							* to each other differently as shown below
							*/
							// Every Array is an Object, so we first have to confirm if the Object is an array before proceeding
							if(Array.isArray(val1) && Array.isArray(val2)){
								for(let j in val1){
									//loop through the array and handle each data type in the array recursively
									valueHandler(val1[j], val2[j]);
								}
							}
							//Check if both Objects are instances of a Regular Expresion
							if(val1 instanceof RegExp || val2 instanceof RegExp){
								String(val1) !== String(val2) ? reject("The regular Expressions are different") : true;
							}
							//Check if both Objects are instances of a Date Object
							if(val1 instanceof Date || val2 instanceof Date){
								val1.valueOf() === val2.valueOf() ? true : reject("The Date Objects do not match")
							}
							//Check if both functions are instanes of a Set Object
							if(val1 instanceof Set || val2 instanceof Set){
								val1.size !== val2.size ? reject("The Set's Objects are of different sizes") : true;
								for (let a of val1){
									if (!val2.has(a)) reject("The Sets values are not equal");
								}
							}
							//If it's a regular object, call the parent function (compareObjects) recursively
							compareObjects(val1, val2);
							break;
						default: 
							reject("An Object value type that isn't supported was passed in");

					}
				}
				valueHandler(value1, value2);
			}
		}
	}
	return true;
	
}

module.exports = compareObjects;




