var map;
var geocoder;
var lastCenter;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 23.58, lng: 120.58},
    zoom: 17
  });
  map.setOptions({draggable: true, zoomControl: false, scrollwheel: true, disableDoubleClickZoom: true,mapTypeControl: false,streetViewControl: false});
  geocoder = new google.maps.Geocoder();
  google.maps.event.addListener(map, "click", function(event) {
      geocode(false,false,{lat:event.latLng.lat(),lng:event.latLng.lng()});
  });
}


function geocode(type,centering,content) {
  var input;
  if (type){input = {'address': content};}
  else {input = {'location': content};}
  geocoder.geocode(input, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      processResult(results[0]);
      if (centering == true){
      map.setCenter(results[0].geometry.location);
      lastCenter = results[0].geometry.location;
      }
      else {lastCenter=false;}
      try{marker.setMap(null);} catch(e){}
      marker = new google.maps.Marker({map: map,position: results[0].geometry.location});
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function(){marker.setAnimation(null);},750);
    }
    else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function parseAddressComponents(address_components){
  var political = {};
  for (var x=0; x<address_components.length;x++){
    for (var y=0; y<address_components[x].types.length;y++){
      if(address_components[x].types[y].startsWith('administrative_area_level_')){
        political[address_components[x].types[y]]=address_components[x].long_name;
      }
    }
  }
  function getValue(value){
    if (value !== undefined){return value;}
    else {return '';}
  }
  return [getValue(political.administrative_area_level_1),getValue(political.administrative_area_level_2),getValue(political.administrative_area_level_3),getValue(political.administrative_area_level_4)];
}

function display(parsed,formatted){
  document.getElementById('level1').innerHTML=parsed[0];
  document.getElementById('level2').innerHTML=parsed[1];
  document.getElementById('level3').innerHTML=parsed[2];
  document.getElementById('level4').innerHTML=parsed[3];
  document.getElementById('formatted').innerHTML=formatted;
}

function processResult(result){
  var formatted = result.formatted_address;
  var parsed = parseAddressComponents(result.address_components);
  display(parsed,formatted);
  action(getMostFit(parsed));
}


function getMostFit(address_components){
  function search(source,position,term){
    var results = [];
    for (var x=0;x < source.length;x++){
      if (source[x][position] == term){results.push(source[x]);}
    }
    return results;
  }
  var filtered = electoralDistricts;
  for (var x=0;x < 4;x++){
    filtered = search(filtered,x,address_components[x]);
    if (filtered.length == 1){return filtered[0];}
  }
  return false;
}


function byGPS(){
  function gpsCallback(location) {
      geocode(false,true,{lat:location.coords.latitude,lng:location.coords.longitude});
      $('#addressInput').attr('placeholder','已定位，你也可以輸入地址。');
  }
  navigator.geolocation.getCurrentPosition(gpsCallback);
  $('#addressInput').val('');
  $('#addressInput').attr('placeholder','正在定位...');
}

$(document).ready(function(){
  //Enter then search binding
  $("#addressInput").keyup(function (e) {
      if (e.keyCode == 13) {
          geocode(true,true,$("#addressInput").val());
        }
      });
  //Do Gps Locating
  byGPS();
})

$(window).resize(function(){
    if (lastCenter != false){
      setTimeout(function(){map.setCenter(lastCenter);},0);
      setTimeout(function(){map.setCenter(lastCenter);},500);
      setTimeout(function(){map.setCenter(lastCenter);},1000);
  }
})
