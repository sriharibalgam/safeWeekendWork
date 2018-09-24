import { Component } from '@angular/core';

import { IMarker, IPoint } from './interfaces';

@Component({
	templateUrl: 'google-maps.html'
})
export class GoogleMapsPage {
	public markers: IMarker[];
	public origin: IPoint;
	public zoom: number;

	constructor() {
		this.initMarkers();
		this.origin = {
			lat: 17.4462062,
			lng: 78.6340447,
		};
		this.zoom = 8;
	}

	public clickedMarker(label: string) {
		window.alert(`clicked the marker: ${label || ''}`);
	}

	private initMarkers(): void {
		this.markers = [{ //17.4462062,78.6340447 || 17.4456734,78.6352692 || 17.4487341,78.6325973
			lat: 17.4462062,
			lng: 78.6340447,
			label: 'employee1'
		}, {
			lat: 17.4456734,
			lng: 78.6352692,
			label: 'Emp2'
		}, {
			lat: 17.4487341,
			lng: 78.6325973,
			label: 'Emp3'
		}];
	}
}
