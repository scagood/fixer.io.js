const http = require('http');

var rates = {};
var triggers = {};

function init() {
    http.get('http://api.fixer.io/latest', res => {
        var body = '';

        res.on('data', chunk => {
            body += chunk;
        });

        res.on('end', () => {
            var response = JSON.parse(body);
            var base = response.base;
            rates = response.rates;
            rates[base] = 1;
            
            fire('ready');
        });
    }).on('error', e => {
            fire('error', e);
    });
}

function allowedRates() {
    return Object.keys(rates);
}
function convert(fromCurrency, toCurrency, amount) {
    return ((amount / rates[fromCurrency]).toFixed(4) * rates[toCurrency]).toFixed(4);
}

function on (event, callback) {
    if (!triggers[event]) {
        triggers[event] = [];
    }
    triggers[event].push(callback);
}
function fire (event, params) {
    var i;
    if (triggers[event]) {
        for (i in triggers[event]) {
            triggers[event][i].apply(null, Array.prototype.slice.call(arguments, 1));
        }
    }
}

module.exports = function () {
    init();
    this.on = on;
    this.allowedRates = allowedRates;
    this.convert = convert;
}