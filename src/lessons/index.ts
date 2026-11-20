import type { Lesson } from "../lesson/types";
import { capacitor } from "./capacitor";
import { closedLoop } from "./closed-loop";
import { coil } from "./coil";
import { combiningResistors } from "./combining-resistors";
import { diode } from "./diode";
import { fuse } from "./fuse";
import { kirchhoff } from "./kirchhoff";
import { led } from "./led";
import { loadedDivider } from "./loaded-divider";
import { mosfet } from "./mosfet";
import { ohmsLaw } from "./ohms-law";
import { parallel } from "./parallel";
import { power } from "./power";
import { realBattery } from "./real-battery";
import { relay } from "./relay";
import { series } from "./series";
import { thermistor } from "./thermistor";
import { transistor } from "./transistor";
import { voltageDivider } from "./voltage-divider";
import { zener } from "./zener";

/**
 * Every lesson, in course order: the fundamentals a learner needs before
 * meeting parts other than the resistor, then three jobs that fill gaps
 * those leave.
 */
export const lessons: Lesson[] = [
    closedLoop,
    ohmsLaw,
    power,
    series,
    parallel,
    voltageDivider,
    kirchhoff,
    combiningResistors,
    loadedDivider,
    realBattery,
    fuse,
    thermistor,
    capacitor,
    diode,
    led,
    zener,
    coil,
    relay,
    transistor,
    mosfet,
];
