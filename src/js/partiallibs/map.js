function googleMapsLoaded() {
    GoogleMapsLoader.initMaps();
}

var GoogleMapsLoader = {
    maps: null,
    resized: false,
    init: function () {
        if (document.getElementsByClassName('js-map').length > 0) {
            var lang = document.documentElement.getAttribute('lang');
            var mapsKey = document.getElementsByClassName('js-map')[0].getAttribute('data-key');

            var tag = document.createElement('script');
            tag.src = 'https://maps.googleapis.com/maps/api/js?callback=googleMapsLoaded&language=' + lang + '&key=' + mapsKey;
            document.head.appendChild(tag);
        }
    },
    initMaps: function () {
        Array.prototype.slice.call(document.getElementsByClassName('js-map')).forEach(GoogleMapsLoader.initMap);
    },
    initMap: function (mapNode) {
        var zoom = parseInt(mapNode.getAttribute('data-zoom'), 10);
        var marker = mapNode.parentNode.getElementsByClassName('map-marker');
        var markerCount = marker.length;
        var styleData = mapNode.getAttribute('data-style');
        var style = null;
        if (styleData) {
            style = JSON.parse(styleData);
        }

        mapNode.map = new google.maps.Map(mapNode, {
            zoom: zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: style,
            disableDefaultUI: true,
            zoomControl: true,
            scrollwheel: false
        });

        mapNode.bounds = new google.maps.LatLngBounds();
        Array.prototype.slice.call(marker).forEach(GoogleMapsLoader.initLocation, mapNode);
        mapNode.map.fitBounds(mapNode.bounds);

        google.maps.event.addListener(mapNode.map, 'bounds_changed', function () {
            if (markerCount !== 1) {
                if (GoogleMapsLoader.resized) {
                    mapNode.map.fitBounds(mapNode.bounds);
                    GoogleMapsLoader.resized = false;
                }
            }
        });

        google.maps.event.addListenerOnce(mapNode.map, 'bounds_changed', function () {
            if (markerCount === 1) {
                mapNode.map.setZoom(zoom);
            }
        });

        window.addEventListener('resize', GoogleMapsLoader.mapResized);
    },
    readMapInfo: function (marker) {
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
    initLocation: function (marker) {
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

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open(map, this);
                map.panTo(this.getPosition());
                GoogleMapsLoader.resized = false;
            });
        }
    },
    openMapLink: function () {
        if (this.url) {
            window.open(this.url, '_blank');
        }
    },
    mapResized: function () {
        GoogleMapsLoader.resized = true;
    }
};

GoogleMapsLoader.init();
