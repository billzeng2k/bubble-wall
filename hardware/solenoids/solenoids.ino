#include <SoftwareSerial.h>
#include <FastLED.h>

#define LED_PIN     9
#define NUM_LEDS    20
CRGB leds[NUM_LEDS];

SoftwareSerial mySerial(10, 11); // RX, TX

int pins[9] = {12, 6, 8, 13, 5, 4, 7, 2, 3};

String input;

void setup() {
  FastLED.addLeds<WS2812, LED_PIN, GRB>(leds, NUM_LEDS);
  
  for (int i=0;i<9; i++) {
    pinMode(pins[i], OUTPUT);
    digitalWrite(pins[i], HIGH);
  }
  mySerial.begin(9600); // Default communication rate of the Bluetooth module
  Serial.begin(9600);

  for (int i=0;i<20;i++)
    leds[i] = CRGB(0,0,0);
  
  FastLED.show();
}

int k = millis();
void loop() {
  bool updated = updateSolenoids();
  if (updated == true) {
    k = millis();
    return;
  }

//  if (millis() - k >= 3000) {
//    openSolenoid(pins[0]);
//    delay(1000);
//    closeAll();
//    k=millis();
//  }
//  for (int i=0;i<9; i++) {
//    openSolenoid(pins[i]);
//    turnOnRGB(i);
//    delay(2000);
//  }
//  for (int i=0;i<20;i++)
//    leds[i] = CRGB(0,0,0);
  
   //updateSolenoids();
//   for (int i=0;i<7;i++) {
//    for (int ii=0;ii<10;ii++) {
//        openSolenoid(pins[i]);
//        delay(50);
//        openSolenoid(pins[i+1]);
//        delay(50);
//        openSolenoid(pins[i+2]);
//        delay(50);
//      } 
//   }
  
}

void closeAll() {
  for (int i=0;i<9; i++) {
    digitalWrite(pins[i], HIGH);
  }
}

void printState(int solenoid, int state) {
  Serial.println("SOLENOID: " + String(solenoid));
  Serial.println("STATE: " + String(state));
}

int countInstanceOfChar(String string, char c) {
  int count = 0;
  for (int i=0;i<string.length();i++) {
    if (string[i] == c) count ++; 
  }
  return count;
}

// https://stackoverflow.com/questions/9072320/split-string-into-string-array
String getValue(String data, char separator, int index)
{
  int found = 0;
  int strIndex[] = {0, -1};
  int maxIndex = data.length()-1;

  for(int i=0; i<=maxIndex && found<=index; i++){
    if(data.charAt(i)==separator || i==maxIndex){
        found++;
        strIndex[0] = strIndex[1]+1;
        strIndex[1] = (i == maxIndex) ? i+1 : i;
    }
  }

  return found>index ? data.substring(strIndex[0], strIndex[1]) : "";
}

void writePins(String data) {
    int count = countInstanceOfChar(data, ',');
    // Open input, close all others, and turn on lights
    int solenoid = getValue(data, ',', 0).toInt();
    int state = getValue(data, ',', 1).toInt();
    if (count > 2){
      int r = getValue(data, ',', 2).toInt();
      int g = getValue(data, ',', 3).toInt();
      int b = getValue(data, ',', 4).toInt();
      leds[2*solenoid+1] = CRGB(r, g, b);
      leds[2*solenoid] = CRGB(r, g, b); 
      FastLED.show();
    }
    if (state == 1) openSolenoid(pins[solenoid]);
    if (state == 0) closeAll();
    printState(solenoid, state);
}

void turnOnSingle() {
    input = mySerial.readString(); // Reads the data from the serial port
    Serial.println(input);
    writePins(input);
}

void turnOnMany(String s) {
    Serial.println(s);
    int count = countInstanceOfChar(s, '&');
    for (int i = 0;i<count+1;i++) {
      input = getValue(s, '&', i);
      writePins(input);
      delay(200);
    }
    turnOffLEDS();
    
//    openEscape();
}

void turnOffLEDS() {
  for (int i=0;i<20;i++)
    leds[i] = CRGB(0,0,0);
  FastLED.show();
}

void openEscape() {
  for (int i=0;i<9; i++) {
    digitalWrite(pins[i], HIGH);
  }
  digitalWrite(pins[0], LOW);
}

bool updateSolenoids() {
  if(mySerial.available() > 0){ // Checks whether data is comming from the serial port
    turnOnMany(mySerial.readString());
    return true;
  }

  if (Serial.available() > 0) {
    turnOnMany(Serial.readString());
    return true;
  }

  return false;
}

void openSolenoid(int pin) {
  for (int i=0;i<9;i++) {
    if (pins[i] == pin) {
      digitalWrite(pin, LOW);
    } else {
      digitalWrite(pins[i], HIGH);
    }
  }
}

void turnOnRGB(int col) {
     
    int r = 0;
    int g = 0;
    int b = 0;

    if ((col % 3) == 0)
      r = 255;

    if ((col % 3) == 1)
      g = 255;

    if ((col % 3) == 2)
      b = 255;

    if (col <= 5)
      leds[2*col+3] = CRGB(r, g, b);

    if (col > 5)
      leds[2*col+2] = CRGB(r, g, b);

    FastLED.show();
}

void loopRandomColors() {
  for (int i=0;i<20;i++) {
    int r = random(0, 10);
    int g = random(0, 10);
    int b = random(0, 10);
    leds[i] = CRGB(r, g, b);
    FastLED.show();
    delay(500); 
  }
}
