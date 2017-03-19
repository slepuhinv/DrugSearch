requirejs(["ko", "ymaps", "app/map", "jquery"], function (ko, ymaps, map, $) {
    var data = ko.observableArray([]);
    
    var vm;

    ymaps.ready(function () {
        map.createMap();
    });

    function AppViewModel() {
        this.searchString = ko.observable("аспирин");
        this.data = data;

        this.find = function () {
            data([]);
            $.post("http://www.medgorodok.ru/ajax.php", { qs: this.searchString() },
                function (result) {
                    var res = JSON.parse(result);
                    res.forEach(function (element) {
                        data.push({
                            drugName: element.DrugName,
                            priceMin: element.PriceMin / 100,
                            priceMax: element.PriceMax / 100,
                            aptekasCount: element.Enterprises,
                            url: element.url
                        });
                    }, this);
                });
        };

        this.rowClicked = function (row) {
            data([]);
            map.clearPlacemarks();
            $.post("/api/Aptekas", { url: row.url }).then(function (data) {
                if (!data)
                    return;
                debugger;
                var priceArray = data.map(function (d) {
                    return +d.price;
                });
                var min = Math.min.apply(null, priceArray);
                data.forEach(function (item) {
                    var color = "blue";
                    if (+item.price == min)
                        color = "green";

                    map.putPlacemark(item.address, item.price, item.url, color);
                });
            });
        };
    }
        
    vm = new AppViewModel();
    ko.applyBindings(vm);
});