#!/usr/bin/env python3
# -*- coding: iso-8859-15 -*-
from serial import Serial

with Serial("/dev/ttyUSB1", 115200) as sp:
    sp.write(b"t\n")
