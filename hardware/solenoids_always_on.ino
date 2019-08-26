#include <SoftwareSerial.h>
#include <FastLED.h>

#define LED_PIN     9
#define NUM_LEDS    20
CRGB leds[NUM_LEDS];

int pins[9] = {2, 4, 5, 6, 8, 12, 13, 3, 7};
int prevColorIndex = 0;

String input;

void setup() {
  // put your setup code here, to run once:
  FastLED.addLeds<WS2812, LED_PIN, GRB>(leds, NUM_LEDS);
  
  for (int i=0;i<9; i++) {
    pinMode(pins[i], OUTPUT);
    digitalWrite(pins[i], HIGH);
  }

  for (int i=0;i<20;i++)
    leds[i] = CRGB(0,0,0);
  
  FastLED.show();
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

void turnOffLEDS() {
  for (int i=0;i<20;i++)
    leds[i] = CRGB(0,0,0);
  FastLED.show();
}

void closeAll() {
  for (int i=0;i<9; i++) {
    digitalWrite(pins[i], HIGH);
  }
}

void turnOnRGBSweep(int col) {
  int r = 0;
  int g = 0;
  int b = 0;
  if (prevColorIndex == 0) r = 120;
  if (prevColorIndex == 1) g = 120;
  if (prevColorIndex == 2) b = 120;
  if (col <= 5)
    leds[2*col+3] = CRGB(r, g, b);

  if (col > 5)
    leds[2*col+2] = CRGB(r, g, b);
  FastLED.show();
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

void loop1() {
    // put your main code here, to run repeatedly:
  for (int i=0;i<9;i++) {
    openSolenoid(pins[i]);
    turnOnRGBSweep(i);
    delay(100);
  }
  prevColorIndex +=1; 
  if (prevColorIndex > 2) prevColorIndex = 0;
  
  for (int i=8;i>-1;i--) {
    openSolenoid(pins[i]);
    turnOnRGBSweep(i);
    delay(100);
  }

  prevColorIndex +=1; 
  if (prevColorIndex > 2) prevColorIndex = 0;
  
}
void loop() {
    loop1();
}
