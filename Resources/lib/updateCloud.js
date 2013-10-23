function Place(name, latitude, longitude, address, text, photo) {
    this.name = name;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
    this.text = text;
    this.photo = photo;
}

function login() {
    Cloud.Users.login({
        login: "admin@gmail.com",
        password: "admin"
    }, function(e) {
        if (e.success) {
            Ti.API.info("Logged as admin.");
            updatePlaces();
        } else alert("Login Error: " + (e.error && e.message || JSON.stringify(e)));
    });
}

function upload() {
    var i = 0, size = places.length;
    for (i; size > i; i++) Cloud.Places.create({
        name: places[i].name,
        address: places[i].address,
        latitude: places[i].latitude,
        longitude: places[i].longitude,
        city: "Киев",
        custom_fields: {
            text: places[i].text
        }
    }, function(e) {
        e.success ? Ti.API.info("Place(" + i + ") uploaded.") : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
}

function createCollections() {
    var i = 0, size = places.length;
    for (i; size > i; i++) Cloud.PhotoCollections.create({
        name: tourName + "_" + places[i].name
    }, function(e) {
        e.success ? Ti.API.info("Collections created.") : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
}

function misticKievInit() {
    var e2 = [ "Могучее дерево за оградой – «Старейшина липа», или липа Петра Могилы – является одним из самых старых деревьев Украины.", "Сейчас ей почти 400 лет.", "Считается, что липа исполняет желания, но исполнитель она довольно капризный: приходить с разными желаниями нужно в разное время дня, а уходя – обязательно поблагодарить «старейшину» и извиниться за беспокойство. Желание нужно загадать мысленно и молча постоять перед деревом минутку.", "Для верности можно семь раз обойти его по часовой стрелке.", "Желание, загаданное липе, будет исполнено, только если прийти с ним в нужное время дня.", "На рассвете дерево нужно просить о замужестве, рождении ребенка, начале важного дела или путешествия.", "Если прийти к липе днем, можно попросить что-то хорошее для других: счастья в браке для женатых, вечной дружбы для товарищей, успеха в бизнесе для предпринимателей.", "Вечером липа принимает просьбы об успешной сдаче экзамена, завершении давно тянувшегося дела.", "Ночью же дерево лучше не беспокоить.", "Поворачиваемся спиной к липе и видим большой участок, огражденный зеленым забором." ];
    places.push(new Place("Стрейшая липа", 50.457477, 30.517659, "", e2, "526116a5a9d4500b0300084c"));
}

function modifyComments() {
    Cloud.Places.query({
        per_page: 100
    }, function(e) {
        if (e.success) {
            var places = e.places;
            var i = 0;
            for (i; places.length > i; i++) setCommentName(places[i]);
        } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
}

function setCommentName(place) {
    Cloud.Objects.update({
        classname: "PlaceComments",
        id: place.custom_fields.comments_id,
        fields: {
            acls: "52665a2243a1b5561200fada"
        }
    }, function(e) {
        e.success ? Ti.API.info(place.name + " updated.") : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
}

function updatePlaces() {
    Cloud.Places.query({
        per_page: 100
    }, function(e) {
        e.success ? getPlaces(e.places) : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
}

function getPlaces(places) {
    var i = 0, length = places.length;
    for (i; length > i; i++) updatePlace(places[i].id);
}

function saveComment(placeId) {
    Cloud.Objects.create({
        classname: "PlaceComments",
        fields: {
            rate: 0,
            users_vouted: [],
            comments: [],
            rate_number: 0
        }
    }, function(e) {
        e.success ? updatePlace(e.PlaceComments[0].id, placeId) : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
}

function updatePlace(placeId) {
    Cloud.Places.update({
        place_id: placeId,
        acl_id: "52665a2243a1b5561200fada",
        custom_fields: {
            rate: 0,
            comments_number: 0
        }
    }, function(e) {
        e.success ? Ti.API.info("updateCloud.js| updatePlace") : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
}

function cleanComments() {
    Cloud.Objects.query({
        classname: "PlaceComments",
        per_page: 100
    }, function(e) {
        if (e.success) for (var i = 0; e.PlaceComments.length > i; i++) deleteComment(e.PlaceComments[i].id); else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
}

function deleteComment(id) {
    Cloud.Objects.remove({
        classname: "PlaceComments",
        id: id
    }, function(e) {
        e.success ? Ti.API.info("Success") : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
}

var Cloud = require("ti.cloud");

Cloud.debug = true;

var tourName = "Мистический Киев";

var places = [];

exports.start = function() {
    login();
};