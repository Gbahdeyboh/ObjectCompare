/**
* This module contains the test suite for teh objectEqualizer
*/

const compareObjects = require('../index');
const fetch = require('node-fetch');

describe('Several forms of Objects must confirmed be equal', () => {
	test('Simple Object with the same layout must be equal', () => {
		let obj1 = {
			a: 1, 
			b: 'string',
			c: true,
			d: () => 'wooow!!',
			e: new Date(15, 7, 2019),
			f: new RegExp('Gbadebo', 'gi'),
			g: new Set([1, 2, 3, 4]),
			h: [1, 2, 3, true, "gbadebo", new Date(15, 7, 2019), new Set([4, 5, 6, 7])]
		}
		let obj2 = {
			a: 1, 
			b: 'string',
			c: true,
			d: () => 'wooow!!',
			e: new Date(15, 7, 2019),
			f: new RegExp('Gbadebo', 'gi'),
			g: new Set([1, 2, 3, 4]),
			h: [1, 2, 3, true, "gbadebo", new Date(15, 7, 2019), new Set([4, 5, 6, 7])]
		}
		expect(compareObjects(obj1, obj2)).toBeTruthy();
	})
	test('When the objects are not in the same order', () => {
		//Objects are not being compared based on the order in which they are laid out 
		let obj1 = {
			a: 1, 
			b: 'string',
			c: true,
			d: () => 'wooow!!',
			e: new Date(15, 7, 2019),
			f: new RegExp('Gbadebo', 'gi'),
			g: new Set([1, 2, 3, 4]),
			h: [1, 2, 3, true, "gbadebo", new Date(15, 7, 2019), new Set([4, 5, 6, 7])]
		}
		let obj2 = {
			f: new RegExp('Gbadebo', 'gi'),
			c: true,
			e: new Date(15, 7, 2019),
			h: [1, 2, 3, true, "gbadebo", new Date(15, 7, 2019), new Set([4, 5, 6, 7])],
			b: 'string',
			g: new Set([1, 2, 3, 4]),
			d: () => 'wooow!!',
			a: 1
		}
		expect(compareObjects(obj1, obj2)).toBeTruthy();
	});
	test('When a more complex objects is passed, stuffs like objects within objects and Objects within arrays', () => {
		// Even complex Objects like, objects inside objects and objects inside arrays which keeps chaining to each other as such can be compared
		let obj1 = {
			a: 1, 
			b: 'string',
			c: true,
			d: () => 'wooow!!',
			e: new Date(15, 7, 2019),
			f: new RegExp('Gbadebo', 'gi'),
			g: new Set([1, 2, 3, 4]),
			h: [1, 2, 3, true, "gbadebo", new Date(15, 7, 2019), new Set([4, 5, 6, 7])],
			i: {
				name: "Bello Gbadebo",
				nationality: "Nigerian",
				age: 2000,
				date: new Date(10, 15, 2017),
				array: [
					{
						sets: new Set([3, 5, 6, 7]),
						array: ['debo', true, 20394, {
								language: 'javascript', 
								method: 'recursive',
								innerArray: [2, new RegExp('Gbaebo', 'gi'), [2, 3, 4, {}, {}, {}, {}]]
							}],
						testSuite: 'jest'
					},
					{
						sets: new Set([3, 5, 6, 7]),
						array: ['debo', true, 20394, {
								innerArray: [2, new RegExp('Gbaebo', 'gi'), [2, 3, 4, {}, {}, {}, {}]],
								method: 'recursive',
								language: 'javascript',
								index: "element2"
							}],
						testSuite: 'jest'
					}
				]
			}
		}
		let obj2 = {
			b: 'string',
			c: true,
			e: new Date(15, 7, 2019),
			f: new RegExp('Gbadebo', 'gi'),
			a: 1, 
			d: () => 'wooow!!',
			h: [1, 2, 3, true, "gbadebo", new Date(15, 7, 2019), new Set([4, 5, 6, 7])],
			g: new Set([1, 2, 3, 4]),
			i: {
				nationality: "Nigerian",
				age: 2000,
				array: [
					{
						array: ['debo', true, 20394, {
								language: 'javascript', 
								method: 'recursive',
								innerArray: [2, new RegExp('Gbaebo', 'gi'), [2, 3, 4, {}, {}, {}, {}]]
							}],
						sets: new Set([3, 5, 6, 7]),
						testSuite: 'jest'
					},
					{
						sets: new Set([3, 5, 6, 7]),
						array: ['debo', true, 20394, {
								innerArray: [2, new RegExp('Gbaebo', 'gi'), [2, 3, 4, {}, {}, {}, {}]],
								method: 'recursive',
								language: 'javascript',
								index: "element2"
							}],
						testSuite: 'jest'
					}
				],
				date: new Date(10, 15, 2017),
				name: "Bello Gbadebo"
			}
		}
		expect(compareObjects(obj1, obj2)).toBeTruthy();
	})
	test('Test with some realtime data from json placeholder', async () => {
		//Here, we are fetching the same data twice and trying to compare them to see if they would actually match
		let data1, data2;
		const url = "https://jsonplaceholder.typicode.com/users";
		function fetchData(url){
			return fetch(url)
			.then(res => res.json())
			.then(res => res)
			.catch(err => console.log(err));
		}
		//Fetch the first data
		await fetchData(url)
		.then(data => data1 = data);
		//Fetch the second data
		await fetchData(url)
		.then(data => data2 = data);
		expect(compareObjects(data1, data2)).toBeTruthy();
	})
});