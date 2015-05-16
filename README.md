# libhdate-js
A pure javascript (partial) implementation of libhdate

[![NPM Version](https://img.shields.io/npm/v/gm.svg?style=flat)](https://www.npmjs.org/package/libhdate)

## Install

    npm install libhdate

## Basic Usage

```js
// import this module
var Hdate = require("libhdate");

// create a new Hdate object
var h = new Hdate();

// Set the Date
h.setGdate(16, 5, 2015);

// Printout
console.log(h);

// get holydays
var holyday = h.getHolyday(h);
var omer = h.getOmerDay(h);
console.log(h.getHolydayName(holyday));
console.log(omer);

// get parasha for next shabbat
var reading = h.getShabbatsParasha(h);
console.log(h.getParashaName(reading));

// get times
var latitude = 32.07;
var longitude = 34.77;
var timeZone = 3 * 60;
var times = h.getSunTimeFull(h, latitude, longitude);

// adjust time zone
var timeStrings = times.slice(1).map(function (t) {
t += timeZone;
return "" + Math.floor(t / 60) + ":" + (t % 60);
});
console.log(timeStrings);
```
