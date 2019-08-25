const step = 1000
const numOfTubes = 9
const encoder = new TextEncoder('utf-8');

function openValve(valveNumber, color) {
    if(!window.characteristic)
        return console.log('not connected to bubble wall')
    valveNumber = parseInt(valveNumber) - 1
    valveNumber += ",1"
    valveNumber += changeColor(color)
    bus.push(valveNumber)
    console.log('OPENING VALVE ' + valveNumber)
}

// function closeValve(valveNumber) {
    // if(!window.characteristic)
    //     return console.log('not connected to bubble wall')
    // valveNumber = parseInt(valveNumber) - 1
    // valveNumber += ",0"
    // bus.push(valveNumber)
    // console.log('CLOSING VALVE ' + valveNumber)
// }

function changeColor(color) {
    if(!window.characteristic) 
        return console.log('not connected to bubble wall')
    let r, g, b
    switch(color) {
        case 'red':
            r = 255
            g = 0
            b = 0
            break
        case 'green':
            r = 0
            g = 255
            b = 0
            break
        case 'blue':
            r = 0
            g = 0
            b = 255
            break
        case 'yellow':
            r = 255
            g = 255
            b = 0
            break
        case 'orange':
            r = 255
            g = 125
            b = 0
            break
        case 'purple':
            r = 255
            g = 0
            b = 255
            break
    }
    console.log('Changed LED color to ' + color)
    return ("," + r + "," + g + "," + b)
}

let bus = []

setInterval(() => {
    if(bus.length && window.characteristic) {
        console.log(bus.slice(0, 7).join('&') + '&')
        window.characteristic.writeValue(encoder.encode(bus.slice(0, 7).join('&') + '&'));
        bus = []
    }
}, 1000)

export {step, numOfTubes, openValve, changeColor}