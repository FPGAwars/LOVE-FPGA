#!/usr/bin/env python3
# -*- coding: iso-8859-15 -*-
from serial import Serial

SERIAL_PORT = "/dev/ttyUSB1"

class bit_button:
    def __init__(self):
        self.sp = Serial(SERIAL_PORT, 115200)

    def bit(self, b):
        """Bit to Send
          0: send the '0\n' string
          1: send the '1\n' string
        """
        if b in [0,1]:
          self.sp.write(str(b).encode())
          self.sp.write(b'\n')


# -- Example
input_pin = bit_button()

# -- Send a 1
input_pin.bit(1)

# -- Ask the user for a bit
while True:
    b = int(input("Enter a bit value (0/1): "))
    input_pin.bit(b)
