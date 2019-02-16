const socket = io.connect('wss://letsrobot.tv:8000');

const volumeSlider = document.getElementById("volumeSlider");
const speedSlider = document.getElementById("speedSlider");
const tableButton = document.getElementById("tableButton");
const micButton = document.getElementById("micButton");

let volumeSliderValue = volumeSlider.value;
let speedSliderValue = speedSlider.value;
let tableButtonValue = tableButton.checked;
let micButtonValue = micButton.checked;

let commands = [];

function setVolume() {
    let str = "vol " + volumeSlider.value;
    //sendMessage(str);
    commands.push(str);
}

function setSpeed() {
    let str = "speed " + speedSlider.value;
    //sendMessage(str);
    commands.push(str);
}

function setTableMode() {
    let str = "table";
    if (tableButton.checked === true) {
        str += " on";
    } else {
        str += " off";
    }
    //sendMessage(str);
    commands.push(str);
}

function setMicEnabled() {
    let str="mic";
    if (micButton.checked === true) {
        str += " unmute";
    } else {
        str += " mute";
    }
    //sendMessage(str);
    commands.push(str);
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

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
            console.log("sending command " + commands[i]);
            sendMessage(commands[i]);
            await sleep(1000)
        }
    }
    commands = [];
}

function sendMessage(message) {
    socket.emit("chat_message", {
        "message": "[sixy] ." + message,
        "robot_name": "sixy",
        "robot_id": "80459902",
        "room": "jill",
        "secret": "iknowyourelookingatthisthatsfine"
    });
}