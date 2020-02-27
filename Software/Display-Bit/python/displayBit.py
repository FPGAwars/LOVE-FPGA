#!/usr/bin/env python3
# -*- coding: iso-8859-15 -*-
from serial import Serial

sp = Serial("/dev/ttyUSB1", 115200)

while True:
    bit = sp.read(2)
    print(bit.decode("utf-8"), end="")
