let pixels;
let copyMode = false;
let codeString = "";
let tempCodeString = "";
let picNumber = 0;

function setup() {
    frameRate(30);
    createCanvas(25, 8);

    pixels = Array(25);
    for (let i = 0; i < pixels.length; i++) {
        pixels[i] = Array(8).fill(false);
    }
}

function draw() {
    fill(100, 100, 100);
    noStroke();
    rect(0, 0, 25, 8);

    stroke(127, 10, 10);
    strokeWeight(1);

    for (var i = 0; i < 25; i++) {
        for (var j = 0; j < 8; j++) {
            if (pixels[i][j] === true) {
                point(i, j);
            }
        }
    }
}

function mouseClicked() {
    if (!copyMode) {
        let x = Math.floor(mouseX);
        let y = Math.floor(mouseY);
        let val = pixels[x][y];
        pixels[x][y] = !val;

        convertToCode(pixels);
    }

    // prevent default
    return false;
}

function keyPressed() {
    console.log(keyCode);
    if (keyCode === 67) { // key code for key "c"
        copyMode = !copyMode;
    }
    if (keyCode === 78) { // key code for key "n"
        codeString += tempCodeString;
        tempCodeString = "";
        picNumber += 1;
    }
    if (keyCode === 80) { // key code for key "p"
        console.log("lol");
        window.location.href =
            window.location.href.split("animator/editor/editor.html")[0] + "animator/player/player.html?c="
            + codeString + tempCodeString;
    }
}

function convertToCode(array) {
    tempCodeString = "PROGMEM const byte pic" + picNumber + "[] = { </br>";
    array.forEach((byte) => {
        tempCodeString += "  0b";
        for (let i = 0; i < 8; i++) {
            let bit = byte[i];
            // Note: outputs on board are inverted
            if (bit) {
                tempCodeString += "0";
            }
            if (!bit) {
                tempCodeString += "1";
            }
        }
        tempCodeString += ",</br>";
    });
    tempCodeString += "}; </br>";

    document.getElementById("code").innerHTML = codeString + tempCodeString;
}