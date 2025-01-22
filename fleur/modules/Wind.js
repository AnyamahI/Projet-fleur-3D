/*
RECUPERATION DES DONNEES DE VENT EN TEMPS REEL
-[ ] récupérer la direction du vent
-[ ] récupérer la vitesse du vent
-[ ] Bonnus : actualiser mes donnees toutes les 15 minutes

https://api.open-meteo.com/v1/forecast?latitude=48.8567&longitude=2.3522&current=wind_speed_10m,wind_direction_10m&timezone=Europe%2FLondon
*/
class Wind {
  constructor(props) {
    const { lat, lng } = props;
    this.lat = lat;
    this.lng = lng;
    this.init();
  }

  init() {
    this.buildUrl();
    this.fetchWindData();
  }

  buildUrl() {
    const base = "https://api.open-meteo.com/v1/forecast";
    const riquierdLatitude = "latitude=" + this.lat;
    const riquierdLongitude = "longitude=" + this.lng;

    const params = ["wind_speed_10m", "wind_direction_10m"];
    const paramsStrinList = params.join(",");

    this.url = `${base}?${riquierdLatitude}&${riquierdLongitude}&current=${paramsStrinList}`;
  }

  fetchWindData() {
    fetch(this.url)
      .then((response) => response.json())
      .then((data) => {
        window.app.windDirection = data.current.wind_direction_10m;
        window.app.windSpeed = data.current.wind_speed_10m;
        console.log('wonow.app');
      });
  }
}
export { Wind };
