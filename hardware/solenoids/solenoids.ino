#define ledPin 2

#include <SoftwareSerial.h>

SoftwareSerial mySerial(12, 11); // RX, TX

int pins[9] = {2, 3, 4, 5, 6, 7, 8, 9, 10};

String input;
String solenoid;
String state;

void setup()
{
  pinMode(ledPin, OUTPUT);
  for (int i = 0; i < 9; i++)
  {
    pinMode(pins[i], OUTPUT);
    if (i != 0)
      digitalWrite(pins[i], HIGH);
  }
  mySerial.begin(9600); // Default communication rate of the Bluetooth module
  Serial.begin(9600);
}

void printState(String solenoid, String state)
{
  Serial.println("SOLENOID: " + solenoid);
  Serial.println("STATE: " + state);
}

void loop()
{
  if (mySerial.available() > 0)
  {                                // Checks whether data is comming from the serial port
    input = mySerial.readString(); // Reads the data from the serial port
    solenoid = input.substring(0, 1);
    state = input.substring(2, 3);
    if (solenoid == "0")
    {
      for (int i = 1; i < 9; i++) {
        digitalWrite(pins[i], state.toInt());
      }
    }
    else
    {
      if (state == "0" && solenoid != "2")
      {
        digitalWrite(2, 1);
      }
      else
      {
        digitalWrite(2, 0);
      }
      digitalWrite(solenoid.toInt(), state.toInt());
    }
    printState(solenoid, state);
  }

  if (Serial.available() > 0)
  {
    input = Serial.readString(); // Reads the data from the serial port
    solenoid = input.substring(0, 1);
    state = input.substring(2, 3);
    digitalWrite(solenoid.toInt(), state.toInt());
    printState(solenoid, state);
  }
}
