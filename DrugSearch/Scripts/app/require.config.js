var require = {
    baseUrl: "/Scripts/",
    paths: {
        "bootstrap": "/Scripts/lib/bootstrap.min",        
        "jquery": "/Scripts/lib/jquery-1.10.2",
        "ko": "/Scripts/lib/knockout-3.4.2",
        "ymaps": "https://api-maps.yandex.ru/2.1/?lang=ru_RU"
    },
    shim: {
        "bootstrap": { deps: ["jquery"] },
        'ymaps': {
            exports: 'ymaps'
        }
    }
};