define(["ymaps"], function (ymaps) {

    var map;
    var placemarks = [];

    var exports = {
        createMap: createMap,
        putPlacemark: putPlacemark,
        clearPlacemarks: clearPlacemarks
    };
    return exports;

    function createMap() {
        map = new ymaps.Map("map", {
            center: getUserPosition(),
            zoom: 12,
            autoFitToViewport: "always",
            controls: getDefaultControls()
        });
    }

    function putPlacemark(address, text, url, color) {
        var preset = "islands#blueStretchyIcon";
        if (color)
            preset = "islands#" + color + "StretchyIcon";

        var myGeocoder = ymaps.geocode(address);
        myGeocoder.then(            
            function (res) {
                var len = res.geoObjects.getLength();
                if (len > 1) {
                    console.log(address);
                    for (var i = 0; i < len; i++) {
                        var o = res.geoObjects.get(i);
                        console.log("      "  + o.properties.get("text"));
                    }
                }
                //alert('Координаты объекта :' + res.geoObjects.get(0).geometry.getCoordinates());
                var myPlacemark = new ymaps.Placemark(res.geoObjects.get(0).geometry.getCoordinates(),
                    {
                        iconContent: text,
                        hintContent: text,
                        balloonContentBody: "<a href=\"" + url + "\">" + address + "</a>"
                    },
                    { preset: preset });
                map.geoObjects.add(myPlacemark);
                placemarks.push(myPlacemark);
            },
            function (err) {
                alert('Ошибка');
            }
        );
    }

    function getUserPosition() {
        return [56.85, 60.61];
    }

    function getDefaultControls() {
        return [];
    }

    function clearPlacemarks() {
        placemarks.forEach(function (pm) {
            map.geoObjects.remove(pm);
        });
    }
});