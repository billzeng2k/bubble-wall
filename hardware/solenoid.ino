#define ledPin 7

#include <SoftwareSerial.h>

SoftwareSerial mySerial(2, 3); // RX, TX

int pins[10] = {4, 5, 6, 7, 8, 9, 10, 11, 12, 13};

String input;
String solenoid;
String state;

void setup() {
  pinMode(ledPin, OUTPUT);
  for (int i=0;i<10; i++) {
    pinMode(pins[i], OUTPUT);
    digitalWrite(pins[i], HIGH);
  }
  mySerial.begin(9600); // Default communication rate of the Bluetooth module
  Serial.begin(9600);
}
void printState(String solenoid, String state) {
  Serial.println("SOLENOID: "+solenoid);
  Serial.println("STATE: "+state);
}

void loop() {
  if(mySerial.available() > 0){ // Checks whether data is comming from the serial port
    input = mySerial.readString(); // Reads the data from the serial port
    solenoid = input.substring(0, 1);
    state = input.substring(2,3);
    digitalWrite(solenoid.toInt(), state.toInt());
    printState(solenoid, state);
  }

  if (Serial.available() > 0) {
    input = Serial.readString(); // Reads the data from the serial port
    solenoid = input.substring(0, 1);
    state = input.substring(2,3);
    digitalWrite(solenoid.toInt(), state.toInt());
    printState(solenoid, state);
  }
}
