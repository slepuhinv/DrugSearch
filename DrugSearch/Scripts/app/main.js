var data = ko.observableArray([]);
var vm;

var ymapsReady = false;
ymaps.ready(function () {
    ymapsReady = true;
});
var map;

function BtnVM() {
    this.balloon = function () {
        alert("baloon");
    }
}

function AppViewModel() {
    this.searchString = ko.observable("аспирин"),
        this.data = data,

        this.find = function () {
            data([]);
            $.post("http://www.medgorodok.ru/ajax.php", {
                qs: this.searchString()
            },
                function (result) {
                    var res = JSON.parse(result);
                    res.forEach(function (element) {
                        data.push({
                            drugName: element.DrugName,
                            priceMin: element.PriceMin / 100,
                            priceMax: element.PriceMax / 100,
                            url: element.url
                        });
                    }, this);
                });
        },

        this.rowClicked = function (row) {
            debugger;
            $.post("/api/Apthekas", { url: row.url }).then(function (data) {
                if (!data)
                    return;

                data.forEach(function (item) {
                    putPlaceMark(item.Address, item.Price);
                });
            });
        },

        this.createMap = function () {
            if (!ymapsReady)
                return;
            map = new ymaps.Map("map", {
                center: [55.76, 37.64],
                zoom: 7
            });

            var myPlacemark = new ymaps.Placemark([55.76, 37.64],
                {
                    iconContent: "Текст",
                    hintContent: 'Москва!',
                    balloonContent: 'Столица России'
                },
                { preset: 'islands#greenStretchyIcon' });

            var myPlacemark2 = new ymaps.Placemark([56.76, 37.64],
                {
                    iconContent: "Текст",
                    hintContent: 'Москва!',
                    balloonContent: '<button id="balloonBtn" class="btn btn-default" data-bind="click: balloon">Кнопка</button>'
                },
                { preset: 'islands#redStretchyIcon' });

            map.geoObjects.add(myPlacemark);
            map.geoObjects.add(myPlacemark2);
        },

        this.bind = function () {
            debugger;
            var el = document.getElementById("balloonBtn");
            ko.applyBindings(new BtnVM(), el);
        },

        this.balloon = function () {
            alert("ballooon");
        },

        this.searchPlaceString = ko.observable(),

        this.findPlace = function () {
        var placeName = this.searchPlaceString();
            
        }

}

// Activates knockout.js
vm = new AppViewModel();
ko.applyBindings(vm);

function putPlaceMark(address, text) {
    var myGeocoder = ymaps.geocode(address);
    myGeocoder.then(
        function (res) {
            //alert('Координаты объекта :' + res.geoObjects.get(0).geometry.getCoordinates());
            var myPlacemark = new ymaps.Placemark(res.geoObjects.get(0).geometry.getCoordinates(),
                {
                    iconContent: text,
                    hintContent: text
                },
                { preset: 'islands#blueStretchyIcon' });
            map.geoObjects.add(myPlacemark);
        },
        function (err) {
            alert('Ошибка');
        }
    );
}