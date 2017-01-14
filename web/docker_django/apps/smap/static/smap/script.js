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
  console.log(lat, lng);
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
    url: "/sumari",
    type: "get"
  });
}

/**
* マーカーを取得する
*/
function getMarker() {
  getData().then(function(data) {
    for(var i = 0; i < data.length; i++) {
      var lat = data[i]["position"]["lat"];
      var lng = data[i]["position"]["lng"];
      console.log(lat, lng);
      markers[i] = new google.maps.Marker({
        map: map,
        position: {
          lat: lat,
          lng: lng
        }
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

  getMarker();
}
