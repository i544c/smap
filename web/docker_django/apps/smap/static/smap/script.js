var mapArea = document.getElementById("map");
var isGeo = true; //端末が現在地取得に対応しているか
var map;
var lat = 35.709984, lng = 139.810703;
var markers = [];
var circle;
if(!navigator.geolocation) {
  alert("あなたの端末では、現在地の取得が出来ません。");
  isGeo = false;
}

/**
* 現在地が取得された時
*/
function successFunc(position) {
  lat = position.coords.latitude;
  lng = position.coords.longitude;
  initMap();
};

/**
* 現在地の取得に失敗した時
*/
function errorFunc() {
  alert("現在地の取得に失敗...");
}

/**
* 現在地を取得する
*/
function getLocation() {
  if(!isGeo) return;
  navigator.geolocation.getCurrentPosition(successFunc, errorFunc);
}


function updateLocation() {
  if(!isGeo) return;
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    console.log(lat, lng);
    circle.setMap(null);
    circle = new google.maps.Circle({
    strokeColor: '#1e90ff',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#1e90ff',
    fillOpacity: 0.35,
    map: map,
    center: {lat:lat, lng:lng},
    radius: 30
  });

  }, function() {
    console.log("現在地の取得に失敗...")
  });
}

/**
* データ取得
*/
function getData(url) {
  return $.ajax({
    url: url,
    type: "get"
  });
}

function grepTags(url, tags) {
  return $.ajax({
    url: url + "?tags=" + window.checkTags,
    type: "get"
  });
}

/**
* マーカー作成
*/
function makeMarker(title, position, message, good, id) {
  return new google.maps.Marker({
    map: map,
    title: title,
    position: position,
    message: message,
    good: good,
    id: id,
    animation: google.maps.Animation.DROP
  });
}

/**
* マーカーを取得する
*/
function getMarker() {
  getData("/sumari/").then(function(data) {
    for(var i = 0; i < data.length; i++) {
      console.log(data[i]);
      var name = data[i]["name"];
      var lat = data[i]["position"]["lat"];
      var lng = data[i]["position"]["lng"];
      var message = data[i]["message"];
      var good = data[i]["good"];
      var id = data[i]["id"];
      markers[i] = makeMarker(name, {lat: lat,lng: lng}, message, good, id);
      markers[i].addListener('click', function() {
        infoWindow = new google.maps.InfoWindow({
          content: "<b>" + this.title + "</b><br><p>" + this.message + "</br><button id='" + this.id + "' onclick='good(" + this.id + ")'>👍" + this.good + "</button>"
        });
        infoWindow.open(map, this);
      });
    }
  });
};

/**
* good
*/
function good(id) {
  console.log(id);
  $.ajax({
    url: "/sumari/" + id + "/good",
    type: "POST"
  }).done(function(res) {
    $("#" + id).text("👍" + res.good);
  });
}

/**
* マーカーを全て削除する
*/
function removeMarkers() {
  for(var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers.length = 0;
}

/**
* 現在地を反映する
*/
function initMap() {
  var opts = {
    zoom: 15,
    center: new google.maps.LatLng(lat, lng),
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: false,
    gestureHandling: 'greedy'
  };
  map = new google.maps.Map(mapArea, opts);
  $.getJSON("/static/smap/mapStyles.json", function(mapStyles) {
    map.setOptions({styles:mapStyles});
  });
  circle = new google.maps.Circle({
    strokeColor: '#1e90ff',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#1e90ff',
    fillOpacity: 0.35,
    map: map,
    center: {lat:lat, lng:lng},
    radius: 30
  });

  setInterval(updateLocation, 3000);

  getMarker();
}

/**
* タグを全件取得
*/
function getTags() {
  getData("/tag").then(function(data) {
    var tagsArea = $("#findtags");
    for(var i = 0; i < data.length; i++) {
      console.log(data[i]);
      tagsArea.append("<input type='checkbox' name='tags' value='" + data[i] + "'>" + data[i] + "<br>");
    }
  });
}
