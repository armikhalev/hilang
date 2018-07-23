# hilang
Hilang - Hiccup-like syntax for JavaScript

## Highlights:
- Hilang can be used for VueJS, ReactJS or any other templates that expect single line html
- It is an alternative to JSX or es6 template literals without need of compilation step
- Written in ES5 and thus works in any browser
- No dependencies
- Clean syntax that uses native JavaScript array and object notation
- Hilang is JavaScript! So you can do with your html everything what you can do with JavaScript!
- Tiny script 972b minified

## Usage
- 1 form:
`var yourTemplate = hilang(['div', 'your text'])` -> first argument is html tag, second what goes between the tags
- 2 form:
`var yourTemplate = hilang(['div', {attrs: 'class="hide"'}, 'your text'])` -> first argument is html tag, second object with 'attrs:' property that takes any string of html attributes, third what goes between the tags

### Composability
We can compose hilang components:
```
hilang(['div',
  ['div', 'your 1 text'],
  ['div', 'your 2 text']])
 ```
 Which means you can use JavaScript to generate html:
 ```
 var headers =
  [
  'first',
  'second',
  'third'
  ].map(function(h){ return [ 'th', h ]; })
 ;
 var template = hilang(['thead'].concat(headers));
 ```
 Or with Lodash.js -> `var template = hilang([ 'thead', _.flatten(headers) ]);`
 
 # TODO:
 Add support for self-closing tags
