var Cloud = require("ti.cloud");
Cloud.debug = true;

var tourName = "Мистический Киев";

function Place(name, latitude, longitude, address, text, photo) {
	this.name = name;
	this.address = address;
	this.latitude = latitude;
	this.longitude = longitude;
	this.text = text;
	this.photo = photo;
}

var places = [];

function login() {
	Cloud.Users.login({
		login: "admin@gmail.com",
		password: "admin"
	}, function(e) {
		if (e.success)   {
			Ti.API.info("Logged as admin.");
			//upload();
			//createCollections();
			//cleanComments();
			//createComments();
			//modifyComments();
			updatePlaces();
		} else {
			alert('Login Error: ' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}

function upload() {
	var i = 0, size = places.length;
	
	for(i; i < size; i++) {
		Cloud.Places.create({
		    name: places[i].name,
		    address: places[i].address,
		    latitude: places[i].latitude,
		    longitude: places[i].longitude,
		    city: "Киев",
		    //photo: places[i].photo,
		    custom_fields: {
				text: places[i].text
		    }
		}, function (e) {
		    if (e.success) {
		        Ti.API.info("Place(" + i + ") uploaded.");
		    } else {
		        alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		    }
		});
	}
}

function createCollections() {
	var i = 0, size = places.length;
	
	for(i; i < size; i++) {
		Cloud.PhotoCollections.create({
		    name: tourName + "_" + places[i].name
		}, function (e) {
		    if (e.success) {
		        Ti.API.info("Collections created.");
		    } else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		    }
		});
	}
}

function misticKievInit() {
	var e2 = ["Могучее дерево за оградой – «Старейшина липа», или липа Петра Могилы – является одним из самых старых деревьев Украины.",
	"Сейчас ей почти 400 лет.",
	"Считается, что липа исполняет желания, но исполнитель она довольно капризный: приходить с разными желаниями нужно в разное время дня, а уходя – обязательно поблагодарить «старейшину» и извиниться за беспокойство. Желание нужно загадать мысленно и молча постоять перед деревом минутку.",
	"Для верности можно семь раз обойти его по часовой стрелке.",
	"Желание, загаданное липе, будет исполнено, только если прийти с ним в нужное время дня.",
	"На рассвете дерево нужно просить о замужестве, рождении ребенка, начале важного дела или путешествия.",
	"Если прийти к липе днем, можно попросить что-то хорошее для других: счастья в браке для женатых, вечной дружбы для товарищей, успеха в бизнесе для предпринимателей.",
	"Вечером липа принимает просьбы об успешной сдаче экзамена, завершении давно тянувшегося дела.",
	"Ночью же дерево лучше не беспокоить.",
	"Поворачиваемся спиной к липе и видим большой участок, огражденный зеленым забором."];
	places.push(new Place("Стрейшая липа", 50.457477, 30.517659, "", e2, "526116a5a9d4500b0300084c")); 
	
	//.......
}

function modifyComments() {
	Cloud.Places.query({ 
	    per_page: 100
	}, function (e) {
	    if (e.success) {
	        var places = e.places;
	        var i = 0;
	        
	        for (i; i < places.length; i++) {
				setCommentName(places[i]);
	        }
			
	    } else {
	        alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
	    }
	});	
}

function setCommentName(place) {
	Cloud.Objects.update({
	    classname: 'PlaceComments',
	    id: place.custom_fields.comments_id,
	    fields: {
			acls: "52665a2243a1b5561200fada"
	    }
	}, function (e) {
	    if (e.success) {
	        Ti.API.info(place.name + ' updated.');
	    } else {
	        alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

function updatePlaces() {
	Cloud.Places.query({ 
	    per_page: 100
	}, function (e) {
	    if (e.success) {
	        getPlaces(e.places);
	    } else {
	        alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
	    }
	});	
}

function getPlaces(places) {
	var i = 0, length = places.length;
	for (i; i < length; i++) {
        updatePlace(places[i].id);
    }
}

function saveComment(placeId) {
	Cloud.Objects.create({
	    classname: 'PlaceComments',
	    fields: {
	    	rate: 0,
			users_vouted: [],
			comments: [],
			rate_number: 0
	    }
	}, function (e) {
	    if (e.success) {
	        updatePlace(e.PlaceComments[0].id, placeId);
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
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
	}, function (e) {
	    if (e.success) {
	        Ti.API.info('updateCloud.js| updatePlace');
	    } else {
	        alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

function cleanComments() {
	Cloud.Objects.query({
	    classname: 'PlaceComments',
	    per_page: 100
	}, function (e) {
	    if (e.success) {
	    	for (var i = 0; i < e.PlaceComments.length; i++) {
	        	deleteComment(e.PlaceComments[i].id);
			}
	    } else {
	        alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

function deleteComment(id) {
	Cloud.Objects.remove({
	    classname: 'PlaceComments',
	    id: id
	}, function (e) {
	    if (e.success) {
	        Ti.API.info('Success');
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

exports.start = function() {
	login();
};

//"52611585884786222201a0c5","52612b321cd89230ba01a33f","52612b32bfed71245701a459","52612b3243a1b53a7701a48f","52612b3243a1b53a7701a48d","52612b3343a1b53a6d01a2b8","52612b33bfed71244d01a2a3","52612b33884786222c01a597","52612b33884786222c01a599","52612b341cd89230ba01a342","52612b34884786222c01a59b","52612b34d72ec82f1401a54c","52612b34bfed71245701a45b","52612b351cd89230ba01a344","52612b3543a1b53a7701a491","52612b351cd89230ba01a346"
