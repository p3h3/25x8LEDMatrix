let pixels;
let copyMode = false;
let codeString = "";
let tempCodeString = "";
let picNumber = 0;

function setup() {
    frameRate(30);
    createCanvas(25, 8);

    // initialise empty pixels array
    pixels = Array(25);
    for (let i = 0; i < pixels.length; i++) {
        pixels[i] = Array(8).fill(false);
    }

    // check if there are params
    if(window.location.href.split("pn=").length > 1){
        // get html param with code (from player)
        let pn = parseInt(window.location.href.split("pn=")[1].split("&")[0]);
        let q = window.location.href.split("c=")[1].split("&")[0]
            .replaceAll("%20", " ")
            .replaceAll("%3C/br%3E", "\n");

        // insert param code into output
        tempCodeString = window.location.href.split("c=")[1].split("&")[0]
            .replaceAll("%20", " ")
            .replaceAll("%3C/br%3E", "</br>");
        document.getElementById("code").innerHTML = codeString + tempCodeString;

        let s = q.split("PROGMEM const byte")[pn + 1];

        // insert pixel data from param
        for (let i = 0; i < 25; i++) {
            let x = s.split("0b")[i + 1];
            for (let j = 0; j < 8; j++) {
                pixels[i][j] = x.charAt(j) === "0";
            }
        }
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
    if (keyCode === 67) { // key code for key "c"
        copyMode = !copyMode;
    }
    if (keyCode === 78) { // key code for key "n"
        codeString += tempCodeString;
        tempCodeString = "";
        picNumber += 1;
    }
    if (keyCode === 80) { // key code for key "p"
        // check if editor was started with params
        if(window.location.href.split("pn=").length > 1){
            let pn = parseInt(window.location.href.split("pn=")[1].split("&")[0]);
            let q = window.location.href.split("c=")[1].split("&")[0]
                .replaceAll("%20", " ")
                .replaceAll("%3C/br%3E", "\n");

            let before = "PROGMEM const byte" + q.split("PROGMEM const byte")[pn];
            // replacing all duplicates
            before = before.replaceAll("PROGMEM const bytePROGMEM const byte", "PROGMEM const byte");

            let after = q.split("PROGMEM const byte")[pn+1].split("PROGMEM const byte")[1];
            if(after === undefined){
                after = "";
            }

            let combinedCode = (before + codeString + tempCodeString + after)
                .replaceAll("</br>", "\n");

            window.location.href =
                window.location.href.split("animator/editor/editor.html")[0] + "animator/player/player.html?c="
                + combinedCode;

        }else {
            window.location.href =
                window.location.href.split("animator/editor/editor.html")[0] + "animator/player/player.html?c="
                + codeString + tempCodeString;
        }
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