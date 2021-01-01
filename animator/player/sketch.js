//global variables for good measure
let pixels;
let picNumber = 0;
let q = "";

let framerate = 1;

let counter = 0;

let animationRunning = true;

// all the on action functions for control elements
function updateAnimation() {
    q = document.getElementById("textarea").value;
}

function updateFramerate() {
    framerate = document.getElementById("frameRateRange").value;
    document.getElementById("frameRateLabel").innerText = framerate + "fps";
}

function toggleRunning() {
    animationRunning = !animationRunning;
    if (animationRunning) {
        document.getElementById("runningButton").innerText = "Stop Animation";
    } else {
        document.getElementById("runningButton").innerText = "Play Animation";
    }
}

function editCurrentFrame() {
    // turn animation off and set text accordingly
    animationRunning = true;
    toggleRunning();

    window.location.href =
        window.location.href.replace("animator/player/player.html", "animator/editor/editor.html")
        + "&pn=" + picNumber;
}

function setup() {
    frameRate(30);
    createCanvas(25, 8);

    // set text area height to fill screen
    document.getElementById("textarea").style =
        "height: " + (innerHeight
        - document.getElementById("defaultCanvas0").offsetHeight
        - document.getElementById("controls").offsetHeight
        - innerHeight * 0.1)
        + "px !important;";

    // get html param with code (from editor)
    q = window.location.href.split("?c=")[1].split("&")[0]
        .replaceAll("%20", " ")
        .replaceAll("%3C/br%3E", "\n");
    // insert code from editor
    document.getElementById("textarea").value = q;

    // fill blank pixel array
    pixels = Array(25);
    for (let i = 0; i < pixels.length; i++) {
        pixels[i] = Array(8).fill(false);
    }
}

function draw() {
    // grey background
    fill(100, 100, 100);
    noStroke();
    rect(0, 0, 25, 8);

    // set color for pixels
    stroke(127, 10, 10);
    strokeWeight(1);

    // only increase picture counter if animation is playing
    if (animationRunning) {
        counter++;
    }

    // try to interpret written code into pixel data
    try {
        let maxPicNumber = q.split("PROGMEM const byte").length - 2;

        if (counter > (30 / framerate)) {
            counter = 0;
            picNumber++;
            if (picNumber > maxPicNumber) {
                picNumber = 0;
            }
            document.getElementById("currentPicture").innerText =
                "Current Picture: " + picNumber + "/" + maxPicNumber;
        }

        let s = q.split("PROGMEM const byte")[picNumber + 1].split("{")[1];

        for (let i = 0; i < 25; i++) {
            let x = s.split("0b")[i];
            for (let j = 0; j < 8; j++) {
                pixels[i][j] = x.charAt(j) === "0";
            }
        }
    } catch (x) {
        document.getElementById("currentPicture").innerText =
            "Current Picture: " + picNumber + " ERROR WHILE INTERPRETING TO PIXEL DATA!";
    }

    // drawing pixels onto grid
    for (let i = 0; i < 25; i++) {
        for (let j = 0; j < 8; j++) {
            if (pixels[i][j] === true) {
                point(i, j);
            }
        }
    }
}