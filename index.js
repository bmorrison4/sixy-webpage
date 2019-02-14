const socket = io.connect('wss://letsrobot.tv:8000');

const volumeSlider = document.getElementById("volumeSlider");
const speedSlider = document.getElementById("speedSlider");

function setVolume() {
    let str = "vol " + volumeSlider.value;
    sendMessage(str);
}

function setSpeed() {
    let str = "speed " + speedSlider.value;
    sendMessage(str);
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