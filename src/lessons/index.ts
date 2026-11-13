import type { Lesson } from "../lesson/types";
import { closedLoop } from "./closed-loop";
import { kirchhoff } from "./kirchhoff";
import { ohmsLaw } from "./ohms-law";
import { parallel } from "./parallel";
import { power } from "./power";
import { series } from "./series";
import { voltageDivider } from "./voltage-divider";

/**
 * Every lesson, in course order: the fundamentals a learner needs before
 * meeting parts other than the resistor.
 */
export const lessons: Lesson[] = [closedLoop, ohmsLaw, power, series, parallel, voltageDivider, kirchhoff];
