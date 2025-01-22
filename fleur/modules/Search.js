const moduleName = "Search";

/* ma bare de recherche : 
-récupère la ville renseignée par l'utilisateur
-a partir deu nom de la ville, récupère les coordonnées GPS (latitude et longitude)
-si la ville rensignée n'est pas dans la bdd (json), affiche un message d'erreur
- BONUS : 'AUTOCOMPLETION' propoer une liste de villes en fonction des premières lettres renseignées
- BONUS : enregistrer les dernires villes recherchées
*/
import { Wind } from "./Wind.js";

class Search {
  constructor() {
    /* 1er temps = il sert a definir les variables, les propriété de la classe*/
    this.input = document.querySelector(".js-search-input");
    this.form = document.querySelector(".js-search-form");
    this.cities = [];
    /* 2nd temps = lance les fonctions, les methodes */
    this.init();
  }
  // init = start : lace toutes les fonctions
  init() {
    this.watchUserInput();
    this.getCities();
  }

  watchUserInput() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.getLatLong();
    });
  }

  getLatLong() {
    const name = this.input.value;
    const cityData = this.getCityData(name);
    if (cityData) {
      console.log(cityData);
      const lat = cityData.lat;
      const lng = cityData.lng;
      new Wind({lat, lng});
    } else {
      alert("ville non trouvée");
    }
  }

  getCities() {
    fetch('./data/france-cities.json')
        .then(response => response.json())
        .then(data => {
            this.cities = data
        })
  }

  getCityDataWeithFor(cityName) {
    const cityNameLower = cityName.toLowerCase();
    let cityData = {};
    for (let i = 0; i < this.cities.length; i++) {
      const cityNameInDataLower = this.cities[i].city.toLowerCase();
      if (cityNameInDataLower === cityName) {
        cityData = this.cities[i];
        break;
      }
    }
    return cityData;
  }

  getCityData(userCityName) {
    const userCityNameLower = userCityName.toLowerCase();
    const data = this.cities.find(
      (cityObject) => cityObject.city.toLowerCase() === userCityNameLower
    );
    return data;
  }
}

export { Search };
