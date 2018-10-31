var GoogleMapsLoader = {
    maps: null,
    resized: false,
    init: function() {
        if (document.getElementsByClassName('js-map').length > 0) {
            var lang = document.documentElement.getAttribute('lang');
            var mapsKey = document.getElementsByClassName('js-map')[0].getAttribute('data-key');

            var tag = document.createElement('script');
            tag.src = 'https://maps.googleapis.com/maps/api/js?callback=googleMapsLoaded&language=' + lang + '&key=' + mapsKey;
            document.head.appendChild(tag);
            this['googleMapsLoaded'] = GoogleMapsLoader.initMaps;
        }
    },
    initMaps: function() {
        Array.prototype.slice.call(document.getElementsByClassName('js-map')).forEach(GoogleMapsLoader.initMap);
    },
    initMap: function(mapNode) {
        var zoom = parseInt(mapNode.getAttribute('data-zoom'), 10);
        mapNode.map = new google.maps.Map(mapNode, {
            zoom: zoom,
            maxZoom: zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            //styles: [ { "featureType": "administrative", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [ { "visibility": "simplified" }, { "hue": "#ffc900" }, { "color": "#444444" } ] }, { "featureType": "landscape", "elementType": "all", "stylers": [ { "color": "#f2f2f2" }, { "visibility": "simplified" } ] }, { "featureType": "landscape", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "landscape.natural", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi", "elementType": "all", "stylers": [ { "visibility": "off" }, { "hue": "#00a1ff" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.attraction", "elementType": "all", "stylers": [ { "visibility": "on" } ] }, { "featureType": "poi.attraction", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.attraction", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.business", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.business", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.government", "elementType": "all", "stylers": [ { "visibility": "on" } ] }, { "featureType": "poi.government", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.medical", "elementType": "all", "stylers": [ { "visibility": "on" } ] }, { "featureType": "poi.medical", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "all", "stylers": [ { "visibility": "on" } ] }, { "featureType": "poi.park", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.place_of_worship", "elementType": "all", "stylers": [ { "visibility": "on" } ] }, { "featureType": "poi.school", "elementType": "all", "stylers": [ { "visibility": "on" } ] }, { "featureType": "poi.school", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.school", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.sports_complex", "elementType": "all", "stylers": [ { "visibility": "on" } ] }, { "featureType": "poi.sports_complex", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road", "elementType": "all", "stylers": [ { "saturation": -100 }, { "lightness": 45 }, { "visibility": "simplified" } ] }, { "featureType": "road", "elementType": "labels", "stylers": [ { "visibility": "on" }, { "lightness": "-12" } ] }, { "featureType": "road", "elementType": "labels.text", "stylers": [ { "lightness": "24" } ] }, { "featureType": "road.highway", "elementType": "all", "stylers": [ { "visibility": "simplified" } ] }, { "featureType": "road.highway", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.arterial", "elementType": "all", "stylers": [ { "visibility": "simplified" } ] }, { "featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [ { "visibility": "simplified" } ] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.local", "elementType": "all", "stylers": [ { "visibility": "simplified" } ] }, { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [ { "visibility": "simplified" } ] }, { "featureType": "road.local", "elementType": "geometry.stroke", "stylers": [ { "visibility": "simplified" } ] }, { "featureType": "road.local", "elementType": "labels", "stylers": [ { "visibility": "simplified" } ] }, { "featureType": "transit", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" } ] }, { "featureType": "transit.line", "elementType": "all", "stylers": [ { "visibility": "simplified" } ] }, { "featureType": "transit.station", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit.station.rail", "elementType": "all", "stylers": [ { "visibility": "simplified" } ] }, { "featureType": "water", "elementType": "all", "stylers": [ { "color": "#61c5ff" }, { "visibility": "simplified" } ] }],
            disableDefaultUI: true,
            zoomControl: true,
            scrollwheel: false
        });

        mapNode.bounds = new google.maps.LatLngBounds();
        Array.prototype.slice.call(mapNode.parentNode.getElementsByClassName('map-marker')).forEach(GoogleMapsLoader.initLocation, mapNode);
        mapNode.map.fitBounds(mapNode.bounds);

        google.maps.event.addListener(mapNode.map, 'bounds_changed', function() {
            if (GoogleMapsLoader.resized) {
                mapNode.map.fitBounds(mapNode.bounds);
                GoogleMapsLoader.resized = false;
            }
        });

        window.addEventListener('resize', GoogleMapsLoader.mapResized);
    },
    readMapInfo: function(marker) {
        return {
            'lng': parseFloat(marker.getAttribute('data-lng')),
            'lat': parseFloat(marker.getAttribute('data-lat')),
            'url': marker.getAttribute('data-url'),
            'text': marker.getAttribute('data-text'),
            'icon': marker.getAttribute('data-icon'),
            'width': parseInt(marker.getAttribute('data-width'), 10),
            'height': parseInt(marker.getAttribute('data-height'), 10),
        };
    },
    initLocation: function(marker) {
        var mapNode = this;
        var map = mapNode.map;
        var bounds = mapNode.bounds;
        var location = GoogleMapsLoader.readMapInfo(marker);
        var markerData = {
            position: new google.maps.LatLng(location.lat, location.lng),
            map: map,
        };

        if (location.icon) {
            markerData.icon = {
                url: location.icon,
            };

            if (location.width) {
                markerData.icon.scaledSize = new google.maps.Size(location.width, location.height);
            }
        }

        if (location.url) {
            markerData.url = location.url;
        }
        marker = new google.maps.Marker(markerData);
        bounds.extend(marker.position);

        if (location.url) {
            google.maps.event.addListener(marker, 'click', GoogleMapsLoader.openMapLink);
        }

        if (location.text) {
            var infoWindow = new google.maps.InfoWindow();
            infoWindow.setContent(location.text);

            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.open(map, this);
                map.panTo(this.getPosition());
                GoogleMapsLoader.resized = false;
            });
        }
    },
    openMapLink: function() {
        if (this.url) {
            window.open(this.url, '_blank');
        }
    },
    mapResized: function() {
        GoogleMapsLoader.resized = true;
    }
};

window.addEventListener('load', GoogleMapsLoader.init);
