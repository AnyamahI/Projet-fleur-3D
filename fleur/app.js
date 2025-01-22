import { Search } from "./modules/Search.js";
import { Flower } from "./modules/Flower.js";

window.app = {
  resetAnimation: false,
  city: "",
  windDirection: "",
  windSpeed: "",
};

// Entrer dans mon rogramme
new Search();
new Flower();
