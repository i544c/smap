var mapArea = document.getElementById("map");
var isGeo = true; //端末が現在地取得に対応しているか
var map;
var lat = 35.709984, lng = 139.810703;
var markers = [];
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

/**
* データ取得
*/
function getData() {
  return $.ajax({
    url: "/sumari/",
    type: "get"
  });
}

/**
* マーカー作成
*/
function makeMarker(title, position) {
  return new google.maps.Marker({
    map: map,
    title: title,
    position: position,
    animation: google.maps.Animation.DROP
  });
}

/**
* マーカーを取得する
*/
function getMarker() {
  getData().then(function(data) {
    for(var i = 0; i < data.length; i++) {
      var name = data[i]["name"];
      var lat = data[i]["position"]["lat"];
      var lng = data[i]["position"]["lng"];
      var message = data[i]["message"];
      marker = makeMarker(name, {lat: lat,lng: lng});
      marker.addListener('click', function() {
        infoWindow = new google.maps.InfoWindow({
          content: this.title
        });
        infoWindow.open(map, this);
      });
    }
  });
};

/**
* 現在地を反映する
*/
function initMap() {
  var opts = {
    zoom: 15,
    center: new google.maps.LatLng(lat, lng)
  };
  map = new google.maps.Map(mapArea, opts);
  $.getJSON("mapStyles.json", function(mapStyles) {
    map.setOptions({styles:mapStyles});
  });
  var location = new google.maps.Circle({
    strokeColor: '#1e90ff',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#1e90ff',
    fillOpacity: 0.35,
    map: map,
    center: {lat:lat, lng:lng},
    radius: 100
  })

  getMarker();
}
