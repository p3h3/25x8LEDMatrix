var pixels;
var copy_mode = false;
var codeString = "";
var tempCodeString = "";
var picNumber = 0;

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

    for(var i = 0; i < 25; i++){
        for(var j = 0; j < 8; j++){
            if(pixels[i][j] == true){
                point(i,j);
            }
        }
    }
}

function mouseClicked() {
    if(!copy_mode) {
        let x = Math.floor(mouseX);
        let y = Math.floor(mouseY);
        let val = pixels[x][y];
        pixels[x][y] = !val;

        convertToCode(pixels);
    }

    // prevent default
    return false;
}

function keyPressed(){
    if(keyCode == "c"){
        copyMode = !copyMode;
    }
    if(keyCode = "n"){
        codeString += tempCodeString;
        tempCodeString = "";
        picNumber += 1;
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