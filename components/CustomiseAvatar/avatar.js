export const LIGHTER = "lighter";
export const LIGHT = "light";
export const MID = "mid";
export const DARK = "dark";
export const DARKER = "darker";
export const GOLD = "gold";
const SKIN_TONES = {};
SKIN_TONES[LIGHTER] = {
        name: "Lighter",
        image: require("../../assets/avatar_images/skintones/skin-lighter.png"),
        price: 0
    };
SKIN_TONES[LIGHT] = {
        name: "Light",
        image: require("../../assets/avatar_images/skintones/skin-light.png"),
        price: 0
    };
SKIN_TONES[MID] = {
        name: "Mid",
        image: require("../../assets/avatar_images/skintones/skin-mid.png"),
        price: 0
    };
SKIN_TONES[DARK] = {
        name: "Dark",
        image: require("../../assets/avatar_images/skintones/skin-dark.png"),
        price: 0
    };
SKIN_TONES[DARKER] = {
        name: "Darker",
        image: require("../../assets/avatar_images/skintones/skin-darker.png"),
        price: 0
    };
SKIN_TONES[GOLD] = {
        name: "Gold",
        image: require("../../assets/avatar_images/skintones/skin-gold.png"),
        price: 2
    };

export const CRIMSON = "crimson";
export const FOREST_GREEN = "forestGreen";
export const BLUE = "blue";
export const SKY_BLUE = "skyBlue";
export const DARK_ORANGE = "darkOrange";
const SHIRT_COLOURS = {};
SHIRT_COLOURS[CRIMSON] = {
        name: "Crimson",
        image: require("../../assets/avatar_images/shirtcolours/shirt-crimson.png"),
        price: 2
    };
SHIRT_COLOURS[FOREST_GREEN] = {
        name: "Forest Green",
        image: require("../../assets/avatar_images/shirtcolours/shirt-forestgreen.png"),
        price: 2
    };
SHIRT_COLOURS[BLUE] = {
        name: "Blue",
        image: require("../../assets/avatar_images/shirtcolours/shirt-blue.png"),
        price: 2
    };
SHIRT_COLOURS[SKY_BLUE] = {
        name: "Sky Blue",
        image: require("../../assets/avatar_images/shirtcolours/shirt-skyblue.png"),
        price: 2
    };
SHIRT_COLOURS[DARK_ORANGE] = {
        name: "Dark Orange",
        image: require("../../assets/avatar_images/shirtcolours/shirt-darkorange.png"),
        price: 2
    };
SHIRT_COLOURS[GOLD] = {
        name: "Gold",
        image: require("../../assets/avatar_images/shirtcolours/shirt-gold.png"),
        price: 2
    };

export { SKIN_TONES, SHIRT_COLOURS };