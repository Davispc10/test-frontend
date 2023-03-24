import { heroMock } from "./hero.mock";
import { Chance } from "chance";

const chance = new Chance();

const heroList = Array.from({ length: 10 }, () => heroMock);
