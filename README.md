# Node-fixer.io
## Install
```
npm install node-fixer-io
```

## Including
```javascript
const fixer = require('node-fixer-io');
```

## Functions
```javascript
fixer.get(callback);
fixer.allowedRates(); // Lists ISO_4217 codes available to convert
var newAmount = fixer.convert(fromCurrency, toCurrency, oldAmount); 
```

## Example
```javascript
fixer.get(function (err, res, body) {
  var GBP = fixer.convert('USD', 'GBP', 10); // 10 US Dollars in British Pounds
  var USD = fixer.convert('EUR', 'USD', 14); // 14 Euros in US Dollars
  var EUR = fixer.convert('GBP', 'EUR', 27); // 27 British Pounds in Euros
});
```
