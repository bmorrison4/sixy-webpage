const socket = io.connect('wss://letsrobot.tv:8000');   // Socket.io connection

// get the html objects
const volumeSlider = document.getElementById("volumeSlider");
const speedSlider = document.getElementById("speedSlider");
const tableButton = document.getElementById("tableButton");
const micButton = document.getElementById("micButton");

// value of the objects when the page first loads
let volumeSliderValue = volumeSlider.value;
let speedSliderValue = speedSlider.value;
let tableButtonValue = tableButton.checked;
let micButtonValue = micButton.checked;

let commands = [];  // array for the command queue.

/**
 * Get the value of the slider and add it to the command queue.
 */
function setVolume() {
    let str = "vol " + volumeSlider.value;
    commands.push(str);
}

/**
 * Get the value of the slider and add it to the command queue.
 */
function setSpeed() {
    let str = "speed " + speedSlider.value;
    commands.push(str);
}

/**
 * Get the value of the table button and add it to the command queue.
 */
function setTableMode() {
    let str = "table";
    if (tableButton.checked === true) {
        str += " on";
    } else {
        str += " off";
    }
    commands.push(str);
}

/**
 * Get the value of the mic button and add it to the command queue.
 */
function setMicEnabled() {
    let str="mic";
    if (micButton.checked === true) {
        str += " unmute";
    } else {
        str += " mute";
    }
    commands.push(str);
}

/**
 * dummy delay function
 * @param {Number} ms milliseconds to delay 
 */
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Check values of the objects on the webpage against stored values for deltas
 * and update accordingly. Iterate through updated values and send the commands
 * to the chat.
 */
async function update() {
    if (volumeSlider.value !== volumeSliderValue) {
        setVolume();
        volumeSliderValue = volumeSlider.value;
    }
    if (speedSlider.value !== speedSliderValue) {
        setSpeed();
        speedSliderValue = speedSlider.value;
    }
    if (tableButton.checked !== tableButtonValue) {
        setTableMode();
        tableButtonValue = tableButton.checked;
    }
    if (micButton.checked !== micButtonValue) {
        setMicEnabled();
        micButtonValue = micButton.checked;
    }

    if(commands.length > 0) {
        for(let i = 0; i < commands.length; i++) {
            sendMessage(commands[i]);
            await sleep(1000)
        }
    }
    commands = [];
}

/**
 * Send a message to the chat.
 * @param {String} message 
 */
function sendMessage(message) {
    socket.emit("chat_message", {
        "message": "[sixy] ." + message,
        "robot_name": "sixy",
        "robot_id": "80459902",
        "room": "jill",
        "secret": "iknowyourelookingatthisthatsfine"
    });
}