# JavaScript Object Comparer

When I was learning JavaScript some years back, it took me sometime to understand what Javascript Objects really are. I remember asking myself questions like why comparism operators doesn't work with Objects.

I recently started reading a book by [javascript tutor](https://twitter.com/js_tut) titled [JavaScript grammar](http://javascriptgrammar.com/dark/). Towards the end of the book, he talked about comparing objects and gave a nice approach to how it could be achieved. This reminded me of my question way back then, so I decided to write a script that does deep comparism on Object literals.

This little project could also serve as a good learning resource for anyone who is inquisitive enough to want to know how to really compare any kind of Object literals(simple or complex). The code has been properly commented and formatted for readability and ease of understanding.

## Build Setup

#### install dependencies
`npm install --save`

#### run the script
`npm run start`

#### to run test's
`npm run test`

The package has also been published as an npm module and can be used.

### Installation

`npm install compare-object`

After installing the module, you can make use of it as shown

```javascript
const objCompare = require('compare-object');
const a = {
a: 1,
b: 'string',
c: true,
d: () => 'wooow!!',
e: new Date(15, 7, 2019),
f: new RegExp('Gbadebo', 'gi'),
g: new Set([1, 2, 3, 4]),h: [1, 2, 3, true, "gbadebo", new Date(15, 7, 2019), new Set([4, 5, 6, 7])]


const b = {
f: new RegExp('Gbadebo', 'gi'),
c: true,e: new Date(15, 7, 2019),
h: [1, 2, 3, true, "gbadebo", new Date(15, 7, 2019), new Set([4, 5, 6, 7])],
b: 'string'
g: new Set([1, 2, 3, 4]),d: () => 'wooow!!',
a: 1}

console.log(objCompare(a, b)) //returns true
```

##### I have written an article that explains how everything here works under the hood, the article can be found

[here](https://link.medium.com/BSTOFSGfyX)

### Thank you!
