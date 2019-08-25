const step = 1000
const numOfTubes = 9
const encoder = new TextEncoder('utf-8');

function openValve(valveNumber) {
    if(!window.characteristic)
        return console.log('not connected to bubble wall')
    valveNumber += ",0"
    bus.push(valveNumber)
    console.log('OPENING VALVE ' + valveNumber)
}

function closeValve(valveNumber) {
    if(!window.characteristic)
        return console.log('not connected to bubble wall')
    valveNumber += ",1"
    bus.push(valveNumber)
    console.log('CLOSING VALVE ' + valveNumber)
}

function changeColor(ledNumber, color) {
    if(!window.characteristic) 
        return console.log('not connected to bubble wall')
    bus.push(ledNumber + ',' + color[0])
    console.log('Changed LED ' + ledNumber + ' color to ' + color)
}

let bus = []

setInterval(() => {
    if(bus.length && window.characteristic) {
        console.log(bus.join('&'))
        window.characteristic.writeValue(encoder.encode(bus.join('&')));
        bus = []
    }
}, 1000)

export {step, numOfTubes, openValve, closeValve, changeColor}