import type { Lesson } from "../lesson/types";
import { closedLoop } from "./closed-loop";
import { combiningResistors } from "./combining-resistors";
import { kirchhoff } from "./kirchhoff";
import { loadedDivider } from "./loaded-divider";
import { ohmsLaw } from "./ohms-law";
import { parallel } from "./parallel";
import { power } from "./power";
import { realBattery } from "./real-battery";
import { series } from "./series";
import { voltageDivider } from "./voltage-divider";

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
];
