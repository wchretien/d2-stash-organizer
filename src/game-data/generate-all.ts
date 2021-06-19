import { armorsToJson } from "./parsing/armors";
import { itemStatsToJson } from "./parsing/itemStats";
import { propertiesToJson } from "./parsing/properties";
import { weaponsToJson } from "./parsing/weapons";
import { setsToJson } from "./parsing/sets";
import { uniquesToJson } from "./parsing/uniques";
import { skillsToJson } from "./parsing/skills";
import { skillTabsToJson } from "./parsing/skillTabs";
import { rareNamesToJson } from "./parsing/rareNames";
import { miscToJson } from "./parsing/misc";
import { magicAffixesToJson } from "./parsing/magicAffixes";

void armorsToJson();
void weaponsToJson();
void miscToJson();
void itemStatsToJson();
void propertiesToJson();
void skillsToJson();
void skillTabsToJson();
void magicAffixesToJson();
void rareNamesToJson();
void uniquesToJson();
void setsToJson();