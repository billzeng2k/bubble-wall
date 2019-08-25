#define ledPin 2

#include <SoftwareSerial.h>

SoftwareSerial mySerial(12, 11); // RX, TX

int pins[9] = {2, 3, 10, 9, 4, 5, 6, 7, 8};

String input;
String solenoid;
String state;

void setup() {
  pinMode(ledPin, OUTPUT);
  for (int i=1;i<9; i++) {
    pinMode(pins[i], OUTPUT);
    digitalWrite(pins[i], HIGH);
  }
  mySerial.begin(9600); // Default communication rate of the Bluetooth module
  Serial.begin(9600);
}

void closeAll() {
  for (int i=1;i<9; i++) {
    digitalWrite(pins[i], HIGH);
  }
}

void printState(String solenoid, String state) {
  Serial.println("SOLENOID: "+solenoid);
  Serial.println("STATE: "+state);
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

void writePins(String input) {
    solenoid = input.substring(0, 1);
    state = input.substring(2,3);
    if (solenoid == "0") {
      for (int i=1;i<9; i++) {
        pinMode(pins[i], OUTPUT);
        digitalWrite(pins[i], HIGH);
      }
    } else {
       if (state == "0" && solenoid != "2") {
      digitalWrite(2, 1);
    } else {
      digitalWrite(2, 0);
    }
    digitalWrite(solenoid.toInt(), state.toInt());
    }
    printState(solenoid, state);
}

void turnOnSingle() {
    input = mySerial.readString(); // Reads the data from the serial port
    Serial.println(input);
    writePins(input);
}

void turnOnMany() {
    String s = mySerial.readString(); // Reads the data from the serial port
    int count = countInstanceOfChar(s, '&');
    for (int i = 0;i<count+1;i++) {
      closeAll();
      input = getValue(s, '&', i);
      writePins(input);
      delay(200);
    }
    closeAll();
}
void updateSolenoids() {
  if(mySerial.available() > 0){ // Checks whether data is comming from the serial port
    turnOnMany();
  }

  if (Serial.available() > 0) {
    input = Serial.readString(); // Reads the data from the serial port
    solenoid = input.substring(0, 1);
    state = input.substring(2,3);
    digitalWrite(solenoid.toInt(), state.toInt());
    printState(solenoid, state);
  }
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


void loop() {
   //updateSolenoids();
   for (int i=0;i<7;i++) {
    for (int ii=0;ii<10;ii++) {
        openSolenoid(pins[i]);
        delay(50);
        openSolenoid(pins[i+1]);
        delay(50);
        openSolenoid(pins[i+2]);
        delay(50);
      } 
   }
}
