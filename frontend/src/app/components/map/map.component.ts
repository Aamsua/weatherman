import { AfterViewInit, Component, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @Output() coordinates = new EventEmitter<object>();

  map: any;
  newMarker: any;

  sendCoordinates(value: object) {
    this.coordinates.emit(value);
  }

  initMap(): void {
    this.map = L.map('map', {
      center: [ 53.8282, 25.5795 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  selectLocation() {
    this.map.on('click', (e: any) => {
      var coord = e.latlng;
      var lat = coord.lat;
      var lng = coord.lng;

      let coordinates: any = {
        lat: lat,
        lon: lng
      }

      this.sendCoordinates(coordinates);

      if(typeof(this.newMarker)==='undefined') {
        this.newMarker = L.marker(e.latlng,{ draggable: true});
        this.newMarker.addTo(this.map);        
      }
      else {
        this.newMarker.setLatLng(e.latlng);         
      }
    })
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
    this.selectLocation();
  }
}