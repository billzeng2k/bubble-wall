const step = 1000
const numOfTubes = 9

function openValve(valveNumber, characteristic) {
    console.log(characteristic)
    valveNumber += ",0"
    let encoder = new TextEncoder('utf-8');
    characteristic.writeValue(encoder.encode(valveNumber));
    console.log('OPENING VALVE ' + valveNumber)
}

function closeValve(valveNumber, characteristic) {
    console.log(characteristic)
    valveNumber += ",1"
    let encoder = new TextEncoder('utf-8');
    characteristic.writeValue(encoder.encode(valveNumber));
    console.log('CLOSING VALVE ' + valveNumber)
}

export {step, numOfTubes, openValve, closeValve}