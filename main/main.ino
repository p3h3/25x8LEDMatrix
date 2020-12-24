#include "pictures.h"

#define siR 3
#define oeR 4
#define lcR 5
#define scR 6
#define rstR 7

#define siZ 8
#define oeZ 9
#define lcZ 10
#define scZ 11
#define rstZ 12

byte pic[25];

void setup() {
  pinMode(siR, OUTPUT);
  pinMode(oeR, OUTPUT);
  pinMode(lcR, OUTPUT);
  pinMode(scR, OUTPUT);
  pinMode(rstR, OUTPUT);

  pinMode(siZ, OUTPUT);
  pinMode(oeZ, OUTPUT);
  pinMode(lcZ, OUTPUT);
  pinMode(scZ, OUTPUT);
  pinMode(rstZ, OUTPUT);

  digitalWrite(oeR, 0);
  digitalWrite(rstR, 1);

  digitalWrite(oeZ, 0);
  digitalWrite(rstZ, 1);
  
  Serial.begin(9600);

  // turn everything off
  digitalWrite(lcR, 0);
  shiftOut(siR, scR, LSBFIRST, 0b00111111);
  digitalWrite(lcR, 1);
  digitalWrite(lcZ, 0);
  shiftOut(siZ, scZ, LSBFIRST, 0);
  shiftOut(siZ, scZ, LSBFIRST, 255);
  shiftOut(siZ, scZ, LSBFIRST, 255);
  shiftOut(siZ, scZ, LSBFIRST, 255);
  digitalWrite(lcZ, 1);


  //copy pic1 from progmem to pic in ram
  memcpy_P(pic, pic1, sizeof(pic));
}


//counter threshold
short ct = 150;

//counter for changing frames
short c = ct+1; // to make it work instantly

//frame counter
short fc = 0;

void loop() {

  c++;
  if(c > ct){
    //copy pic from progmem to ram to be displayed
    switch(fc){
      default:
        fc = 1;
      case 1:
        memcpy_P(pic, pic1, sizeof(pic));
        break;
      case 2:
        memcpy_P(pic, pic2, sizeof(pic));
        break;
      case 3:
        memcpy_P(pic, pic3, sizeof(pic));
        break;
      case 4:
        memcpy_P(pic, pic4, sizeof(pic));
        break;
      case 5:
        memcpy_P(pic, pic5, sizeof(pic));
        break;
      case 6:
        memcpy_P(pic, pic6, sizeof(pic));
        break;
      case 7:
        memcpy_P(pic, pic7, sizeof(pic));
        break;/*
      case 8:
        memcpy_P(pic, pic8, sizeof(pic));
        break;/*
      case 9:
        memcpy_P(pic, pic9, sizeof(pic));
        break;
      case 10:
        memcpy_P(pic, pic10, sizeof(pic));
        break;
      /*case 10:
        memcpy_P(pic, pic11, sizeof(pic));
        break;
      case 11:
        memcpy_P(pic, pic12, sizeof(pic));
        break;
      case 12:
        memcpy_P(pic, pic13, sizeof(pic));
        break;
      case 13:
        memcpy_P(pic, pic14, sizeof(pic));
        break;*/
    }
    //switch to next frame
    fc ++;
    c = 0;
  }

  digitalWrite(oeZ, 1);
  shiftByteR(pic[0]);
  shiftOneZ(0);
  digitalWrite(oeZ, 0);
  delayMicroseconds(100);
  for(short i = 1; i < 25; i++){
    digitalWrite(oeZ, 1);
    shiftByteR(pic[i]);
    shiftOneZ(1);
    digitalWrite(oeZ, 0);
    delayMicroseconds(100);
  }
}

void shiftByteR(byte b){
  digitalWrite(lcR, 0);
  for(int i = 0; i < 8; i++){
    digitalWrite(siR, (b >> i) & 1);
    digitalWrite(scR, 1);
    delayMicroseconds(2);
    digitalWrite(scR, 0);
    digitalWrite(siR, 0);
  }
  digitalWrite(lcR, 1);
}

void shiftOneR(byte b){
  digitalWrite(lcR, 0);
  digitalWrite(siR, b);
  digitalWrite(scR, 1);
  delayMicroseconds(2);
  digitalWrite(scR, 0);
  digitalWrite(siR, 0);
  digitalWrite(lcR, 1);
}

void shiftOneZ(byte b){
  digitalWrite(lcZ, 0);
  digitalWrite(siZ, b);
  digitalWrite(scZ, 1);
  delayMicroseconds(2);
  digitalWrite(scZ, 0);
  digitalWrite(siZ, 0);
  digitalWrite(lcZ, 1);
}
