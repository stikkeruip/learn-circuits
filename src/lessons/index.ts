import type { Lesson } from "../lesson/types";
import { closedLoop } from "./closed-loop";
import { ohmsLaw } from "./ohms-law";

/** Every lesson, in course order. */
export const lessons: Lesson[] = [closedLoop, ohmsLaw];
