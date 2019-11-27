/* Stylesheet by Andrew Wiseman, 2018 */

var map = L.map('map',{
  center: [37.0902,-95.7129],
  zoom: 4,
  minZoom: 2,
  maxZoom: 18
});

// basemap

$(document).ready(function() {
    $("#dialog").dialog({
		maxWidth:500,
		maxHeight: 300,
		width: 500,
		height: 300
	});
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYWF3aXNlbWFuIiwiYSI6ImNpc2wxcTdtajA3Mjkyem53b211bzJha3MifQ.DNfN9N3PXgw-Fgq6fs-_3g'
}).addTo(map);

// make them all circles

var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

// add empty geojson for adding downloaded data
var userLayer = L.geoJSON().addTo(map);

// easy button

L.Control.geocoder({position: 'topleft'}).addTo(map);


// start mapping
L.easyButton( 'fa-pencil-alt', function(){
  console.log('yep');
  map.on('click', addMarker);
}, 'Draw area of interest').addTo(map);


// stop mapping
L.easyButton( 'fa-check-circle', function(){
  console.log('stop');
  listMaker(markerList)
}, 'Submit area of interest').addTo(map);

// reset mapping
L.easyButton( 'fa-redo', function(){
  console.log('remove');
  eraser();
}, 'Reset map').addTo(map);

// export
L.easyButton( 'fa-download', function(){
  console.log('export');
  //document.getElementById("demo").innerHTML = newGeo;
  $("#download").dialog({
		maxWidth:600,
        maxHeight: 500,
        width: 600,
        height: 500,
		classes: {
            "ui-dialog": "dialog_style"
        }
	});
}, 'Export').addTo(map);

function eraser (){
	console.log("reset")
	//map.removeLayer(geojsonLayer);
	geojsonLayer.clearLayers();
	bboxGroup.clearLayers();
	lineGroup.clearLayers();
	/*
	console.log(myPolyline)
	myPolyline.clearLayers()
	console.log(myPolyline)
	myPolyline.remove();
	*/
	//map.removeLayer(bboxGroup);
	count = 0;
	max = 9999;
	markerList = [];
	lineList = [];
	console.log(markerList)
	coordList = [];
	console.log(coordList)

};

function softErase () {
	
	bboxGroup.clearLayers();
	lineGroup.clearLayers();
	lineList = [];
	//map.removeLayer(bboxGroup);
	count = 0;
	max = 9999;
	markerList = [];
	console.log(markerList)
	coordList = [];
	
};

function myFunction(data) {
	document.getElementById("demo").innerHTML = data;
}

function exporter () {

			// Create export
			$("a").click();
			document.getElementById('export').setAttribute('download','data.geojson');

};

// need reset/clear also

// create markers when clicking	
//newMarkerGroup = new L.LayerGroup();


// when you add a marker 

var markerList = []
var lineList = []
var coordList = []
var max = 9999;
var count = 0;

////////////////
// all the icons
////////////////

var borderIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [19, 31],
  iconAnchor: [12, 31],
  popupAnchor: [1, -34],
  shadowSize: [31, 31]
});

var greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


var shopIcon = new L.Icon({
  iconUrl: '/images/004-cart-1.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [35, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var dollarIcon = new L.Icon({
  iconUrl: '/images/049-dollar.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [35, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

 // Creates a red marker with the coffee icon
  var testMarker = L.AwesomeMarkers.icon({
    icon: 'coffee',
	prefix: 'fa',
    markerColor: 'blue'
  });
  
 // dining
  var dineIcon = L.AwesomeMarkers.icon({
    icon: 'utensils',
	prefix: 'fa',
    markerColor: 'blue'
  });  
  
 // dental
  var dentalIcon = L.AwesomeMarkers.icon({
    icon: 'tooth',
	prefix: 'fa',
    markerColor: 'red'
  });

 // pharm
  var pharmIcon = L.AwesomeMarkers.icon({
    icon: 'prescription-bottle-alt',
	prefix: 'fa',
    markerColor: 'red'
  });    

 // doctor
  var medicalIcon = L.AwesomeMarkers.icon({
    icon: 'user-md',
	prefix: 'fa',
    markerColor: 'red'
  });      
  
 // cafe
  var cafeIcon = L.AwesomeMarkers.icon({
    icon: 'coffee',
	prefix: 'fa',
    markerColor: 'blue'
  });    
  
 // gas
  var gasIcon = L.AwesomeMarkers.icon({
    icon: 'gas-pump',
	prefix: 'fa',
    markerColor: 'green'
  }); 

 // car
  var carIcon = L.AwesomeMarkers.icon({
    icon: 'car-alt',
	prefix: 'fa',
    markerColor: 'green'
  });   
  
 // service
  var servIcon = L.AwesomeMarkers.icon({
    icon: 'cash-register',
	prefix: 'fa',
    markerColor: 'green'
  });
  
// misc
  var convIcon = L.AwesomeMarkers.icon({
    icon: 'shopping-basket',
	prefix: 'fa',
    markerColor: 'green'
  });   
  
  // misc
  var miscIcon = L.AwesomeMarkers.icon({
    icon: 'dollar-sign',
	prefix: 'fa',
    markerColor: 'green'
  });  
  
  var schoolIcon = L.AwesomeMarkers.icon({
    icon: 'graduation-cap',
	prefix: 'fa',
    markerColor: 'orange'
  });  
  
  var churchIcon = L.AwesomeMarkers.icon({
    icon: 'place-of-worship',
	prefix: 'fa',
    markerColor: 'pink'
  });   
  
  var helpIcon = L.AwesomeMarkers.icon({
    icon: 'hands-helping',
	prefix: 'fa',
    markerColor: 'pink'
  });  

  var fireIcon = L.AwesomeMarkers.icon({
    icon: 'fire-alt',
	prefix: 'fa',
    markerColor: 'pink'
  });  
  
  var barIcon = L.AwesomeMarkers.icon({
    icon: 'glass-martini-alt',
	prefix: 'fa',
    markerColor: 'blue'
  });  
  
  // half size
  var sizeIcon = L.AwesomeMarkers.icon({
    icon: 'dollar-sign',
	prefix: 'fa',
    markerColor: 'green',
	extraClasses: 'fa-3x'
  });  
  

  // tester for size
 var divsizeIcon = L.divIcon({
    html: '<i class="fa fa-truck" style="color: red"></i>',
    iconSize: [20, 20],
    className: 'myDivIcon'
  });

// add empty layer for points 

var bboxGroup = L.layerGroup().addTo(map);
var lineGroup = L.layerGroup().addTo(map);

// add when clicking
function addMarker(e){
    // Add marker to map at click location; add popup window
	//bboxGroup.clearLayers();
	map.addLayer(bboxGroup);
	map.addLayer(lineGroup);
	//map.addLayer(bboxLine);
	if (count != max){
		var newMarker = new L.marker(e.latlng, {icon: borderIcon})
		var newLat = e.latlng.lat;
		var newLong = e.latlng.lng;
		// adding each as a separate item
		console.log(coordList);
		markerList.push(newLat);
		console.log(markerList);
		markerList.push(newLong);
		lineList.push([newLat, newLong])
		bboxGroup.addLayer(newMarker);
		//bboxLine.addLayer(newMarker);
		//newMarker.addTo(map);
		//var cities = L.layerGroup([littleton, denver, aurora, golden]);
		//someMarker.addTo(someLayerGroup)
		console.log(markerList);
		count += 1;
		console.log(count);
		console.log(newMarker);
		lineMaker(lineList);
	};
}

// send the list of line points to a new polyline
function lineMaker(lineList){
	var myPolyline = L.polyline(lineList, {color: 'gray'})
	lineGroup.addLayer(myPolyline)
};

function listMaker(markerList){
	var i;
	// add a space at the end of the coordinate list
	for (i = 0; i < markerList.length; i++) {
		coordList += markerList[i];
		if (i < markerList.length-1){
		coordList += '%20';}
	};
	console.log(coordList);
	overpassData(coordList);
	// once you hit stop, don't allow any more markers
	max = count;
};

// generate the overpass query
  
function overpassTest () {
	// node["shop"](poly:"50.7 7.1 50.7 7.2 50.75 7.15")
	// http://overpass-api.de/api/interpreter?data=[out:json];(node[shop](poly:%2250.7%207.1%2050.7%207.2%2050.75%207.15%22);<;);out%20meta;
  var overpassCall = "http://overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node[shop](38.92858,-77.03489,38.93381,-77.03196);<;);out meta;";

	 var showData = $('#codeblock');

    $.getJSON(overpassCall, function (data) {
      console.log(data);
	  console.log("updating demo");
	  $('#demo').text(data);
	  console.log("trying again");
	  $('#demo').empty().append(data);
    showData.text('Loading the JSON file.');	  
	  showData.empty();
	  console.log("appending");
	  showData.append(data);
    });

};

function overpassData (coordList) {
	// http://overpass-api.de/api/interpreter?data=[out:json];(node[shop](poly:%2250.7%207.1%2050.7%207.2%2050.75%207.15%22);<;);out%20meta;
	/* correct query
	http://overpass-api.de/api/interpreter?data=[out:json];(node[shop](poly:%22
	38.93261129766294%20-77.03908056020738%2038.93128847490246%20-77.03891962766647%2038.9310631335502%20-77.03806668519975%2038.9324109980098%20-77.03839927911758%22);<;);out%20meta;
/*
http://overpass-api.de/api/interpreter?data=[out:json];(node[shop](poly:%22
poly data here 50.7%207.1%2050.7%207.2%2050.75%207.15%22);
%0A%20%20node[amenity][amenity!=post_box][amenity!=parking][amenity!=vending_machine][amenity!=parking_entrance][amenity!=car_sharing][amenity!=bicycle_parking][amenity!=waste_basket][amenity!=bench](poly:%2250.7%207.1%2050.7%207.2%2050.75%207.15%22%29%3B%0A);%0Aout%20body%3B%0A%3E%3B%0Aout%20skel%20qt%3B
*/
	var overpassStart = "http://overpass-api.de/api/interpreter?data=[out:json][maxsize:12536870];(node[shop](poly:%22"
	var overpassMid = "%22);%0A%20%20node[amenity][amenity!=post_box][amenity!=parking][amenity!=public_bookcase][amenity!=drinking_water][amenity!=construction][amenity!=telephone][amenity!=vending_machine][amenity!=car_sharing][amenity!=parking_entrance][amenity!=bicycle_parking][amenity!=waste_basket][amenity!=bench](poly:%22"
	var overpassEnd = "%22);<;);out%20meta;"
  var overpassCall_old = overpassStart+coordList+overpassEnd;
  var overpassCall = overpassStart+coordList+overpassMid+coordList+overpassEnd;
  console.log(overpassCall)
  $('#activity_pane').showLoading();

	 var showData = $('#codeblock');

    $.getJSON(overpassCall, function (data) {
      console.log(data);
    showData.text('Loading the JSON file.');	  
	  showData.empty();
	  console.log("appending");
	  //console.log(data.features.length);
	  //console.log(Object.keys(data).length);
	  var myText = JSON.stringify(data);
	  //var amountOfChars = myText.length;
	  console.log(myText.length);
	  //console.log(myText)
	  //console.log(Object.keys(data).length)
	  if (myText.includes("remark")) { 
			console.log('no work'); 
			//alert("Your download area is too large or has too many businesses. Please try again with a smaller area.");
			/*
			  $( function() {
				$( "#alert" ).dialog();
			});
			*/
			$(function() {
			// this initializes the dialog (and uses some common options that I do)
				$("#alert").dialog({
					maxWidth:400,
					maxHeight: 200,
					width: 400,
					height: 200
				});

			});	
			softErase();		
		} else { 
			console.log('aok'); 
		} 
	  var newGeo = osmtogeojson(data);
	  $('#geojson').text(myText);
	  //console.log(newGeo.length);
	  console.log(newGeo.features.length);
	  //console.log(Object.keys(newGeo).length);	  
	  /*
	  if (Array.isArray(newGeo) && newGeo.length) {
                console.log("cool")
	  }  else {
	  alert("Sorry, your search area is too big. Try again.") };
	  */
	  console.log(newGeo);
		 document.getElementById('export').onclick = function(e) {
			// Extract GeoJson from featureGroup

			// Stringify the GeoJson
			var convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(newGeo));

			// Create export
			document.getElementById('export').setAttribute('href', 'data:' + convertedData);
			document.getElementById('export').setAttribute('download','data.geojson');
		} 
	  createMap(newGeo) 
    })
	.fail(function() { 
		//alert("error"); }
				$("#ptError").dialog({
					maxWidth:500,
					maxHeight: 400,
					width: 500,
					height: 400
				});
				softErase ();
	})

};


function onEachFeature(feature, layer) {
	//var housenumber = "feature.properties.tags.addr:housenumber"
	//var street = "feature.properties.tags.addr:street"
	//obj.x == obj['x']
    // does this feature have a property named popupContent?
	if (feature.properties.tags['addr:housenumber'] && feature.properties.tags['addr:street']){
		var address = feature.properties.tags['addr:housenumber']+' '+feature.properties.tags['addr:street'];
	} else {
	var address = ''
	};
    if (feature.properties && feature.properties.tags.name) {
		if (feature.properties.tags.shop) {
			layer.bindPopup('Name: '+feature.properties.tags.name+'<br>Shop: '+feature.properties.tags.shop+'<br>'+address);
		}
		else if (feature.properties.tags.amenity) {
			layer.bindPopup('Name: '+feature.properties.tags.name+'<br>Amenity: '+feature.properties.tags.amenity+'<br>'+address);
		}	
    }
	else if (feature.properties) {
				if (feature.properties.tags.shop) {
			layer.bindPopup('Unnamed '+feature.properties.tags.shop+'<br>'+address);
		}
		else if (feature.properties.tags.amenity) {
			layer.bindPopup('Unnamed '+feature.properties.tags.amenity+'<br>'+address);
		}	
	}
		
}
// create map

function createMap (inputData){
	console.log("create map start")
	geojsonLayer = L.geoJSON(inputData, {
		pointToLayer: function(feature, latlng) {
			//var icon:
			// restaurant fast_food cafe bar nightclub ice_cream
			if (feature.properties.tags.shop === 'massage' || feature.properties.tags.shop === 'hairdresser' || feature.properties.tags.shop === 'rug_cleaning' || feature.properties.tags.shop === 'nail_salon' || feature.properties.tags.shop === 'beauty' || feature.properties.tags.shop === 'laundry' || feature.properties.tags.shop === 'frame' || feature.properties.tags.shop === 'dry_cleaning') {
				var icon = servIcon;
			} else if (feature.properties.tags.shop === 'convenience_store' || feature.properties.tags.shop === 'convenience') {
				var icon = convIcon;				
			} else if (feature.properties.tags.amenity === 'fast_food' || feature.properties.tags.amenity === 'restaurant' || feature.properties.tags.amenity === 'ice_cream') {
				var icon = dineIcon;
			} else if (feature.properties.tags.amenity === 'cafe') {
				var icon = cafeIcon;
			} else if (feature.properties.tags.amenity === 'fire_station' ) {
				var icon = fireIcon;	
			} else if (feature.properties.tags.amenity === 'dentist' ) {
				var icon = dentalIcon;	
			} else if (feature.properties.tags.amenity === 'doctors' || feature.properties.tags.amenity === 'veterinary' || feature.properties.tags.amenity === 'alternative_medicine' || feature.properties.tags.amenity === 'doctor' || feature.properties.tags.amenity === 'clinic') {
				var icon = medicalIcon;
			} else if (feature.properties.tags.amenity === 'pharmacy' ) {
				var icon = pharmIcon;
			} else if (feature.properties.tags.amenity === 'bar' || feature.properties.tags.amenity === 'pub' || feature.properties.tags.amenity === 'nightclub') {
				var icon = barIcon;								
			} else if (feature.properties.tags.amenity === 'school' || feature.properties.tags.amenity === 'prep_school' || feature.properties.tags.amenity === 'kindergarten' ) {
				var icon = schoolIcon;	
			} else if (feature.properties.tags.amenity === 'place_of_worship' || feature.properties.tags.amenity === 'sdfsdf' ) {
				var icon = churchIcon;	
			} else if (feature.properties.tags.amenity === 'social_facility' || feature.properties.tags.amenity === 'post_office' ) {
				var icon = helpIcon;	
			} else if (feature.properties.tags.shop === 'car_repair' || feature.properties.tags.amenity === 'car_rental' || feature.properties.tags.shop === 'car_detail' || feature.properties.tags.shop === 'auto_parts' || feature.properties.tags.amenity === 'charging_station' ) {
				var icon = carIcon;			
			} else if (feature.properties.tags.amenity === 'fuel' || feature.properties.tags.shop === 'sdfsf' ) {
				var icon = gasIcon;	
			} else {
				var icon = sizeIcon;
			}

			var layer = L.marker(latlng, {icon: icon});

			return layer;
			//$('#activity_pane').showLoading();
		},
		onEachFeature: onEachFeature
	});
	geojsonLayer.addTo(map);
	$('#activity_pane').hideLoading();

};

function createMapSimple (inputData){
	userLayer.addData(inputData);
};

// function to size each icon proportionally based on number of stations
function iconByStations(feature){
  var calculatedSize = (feature.properties.STATIONS / 80) * 30;
            
  // create metro icons
  return L.icon({
	  icon: greenIcon
  });
}

// function to size each icon proportionally based on number of stations
function iconByType(feature){
  // create metro icons
  var shop = feature.properties.tags.shop;
            
  if (shop === "convenience") 
  return L.icon({
	  icon: greenIcon
  });
};

  
  // Set up styles for subway lines
function subteStyle(feature) {
  var colorToUse;
  var line = feature.properties.LINEASUB;
            
  if (line === "LINEA A") colorToUse = "#46C7FA";
  else if (line === "LINEA B") colorToUse = "#E81D1A";
  else if (line === "LINEA C") colorToUse = "#4161BA";
  else if (line === "LINEA D") colorToUse = "#599C65";
  else if (line === "LINEA E") colorToUse = "#65018A";
  else if (line === "LINEA H") colorToUse = "#FAF739";
  else colorToUse = "#000000";
            
  return {
    "color": colorToUse,
    "weight": 5
  };
}

$(document).ready(function () {

    $('#spinner').bind("ajaxSend", function() {
        $(this).show();
    }).bind("ajaxComplete", function() {
        $(this).hide();
    });

});
