const SunCalc = require('suncalc3');

const sunPositionjava = SunCalc.getPosition(new Date(), 41.825226, -71.418884);
const sunAzimuth = Math.floor(sunPositionjava.azimuthDegrees);
const sunAltitude = Math.floor(sunPositionjava.altitudeDegrees);



console.log(sunPositionjava);
console.log(sunAzimuth);
console.log(sunAltitude);
console.log(sunAltitude+sunAzimuth);

// export{ SunPosition }; 