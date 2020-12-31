let pixels;
let picNumber = 0;
let q = "";

let framerate = 1;

let counter = 0;

function updateAnimation() {
    q = document.getElementById("textarea").value;
}

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

    counter++;

    try {
        let maxPicNumber = q.split("PROGMEM const byte").length - 1;

        if (counter > (30 / framerate)) {
            counter = 0;
            picNumber++;
            if (picNumber >= maxPicNumber) {
                picNumber = 0;
            }
            console.log(picNumber);
        }

        let s = q.split("PROGMEM const byte")[picNumber + 1].split("{")[1];

        for (let i = 0; i < 25; i++) {
            let x = s.split("0b")[i];
            for (let j = 0; j < 8; j++) {
                pixels[i][j] = x.charAt(j) === "0";
            }
        }
    } catch (x) {
    }

    for (let i = 0; i < 25; i++) {
        for (let j = 0; j < 8; j++) {
            if (pixels[i][j] === true) {
                point(i, j);
            }
        }
    }
}