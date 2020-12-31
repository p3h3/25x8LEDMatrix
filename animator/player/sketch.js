var pixels;
var copy_mode = false;
var codeString = "";
var tempCodeString = "";
var picNumber = 0;
var q = "";

let framerate = 1;

var counter = 0;

function updateAnimation(){
    q = document.getElementById("textarea").value;
}

function setup() {
    frameRate(30);
    createCanvas(25, 8);

    pixels = Array(25);
    for (var i = 0; i < pixels.length; i++) {
        pixels[i] = Array(8).fill(false);
    }
}

function draw() {
    fill(100,100,100);
    noStroke();
    rect(0, 0, 25, 8);

    stroke(127, 10, 10);
    strokeWeight(1);

    counter++;

    try {
        let maxPicNumber = q.split("PROGMEM const byte").length - 1;

        if(counter > (30 / framerate)) {
            counter = 0;
            picNumber++;
            if(picNumber >= maxPicNumber){
                picNumber = 0;
            }
            console.log(picNumber);
        }

        let s = q.split("PROGMEM const byte")[picNumber + 1].split("{")[1];

        for (var i = 0; i < 25; i++) {
            let x = s.split("0b")[i];
            for (var j = 0; j < 8; j++) {
                if (x.charAt(j) == "0") {
                    pixels[i][j] = true;
                } else {
                    pixels[i][j] = false;
                }

            }
        }
    }catch (x){}

    for(var i = 0; i < 25; i++){
        for(var j = 0; j < 8; j++){
            if(pixels[i][j] == true){
                point(i,j);
            }
        }
    }
}

function convertToCode(array){
    tempCodeString = "PROGMEM const byte pic" + picNumber + "[] = { </br>";
    array.forEach((byte) => {
        tempCodeString += "  0b";
        for(var i = 0; i < 8; i++) {
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