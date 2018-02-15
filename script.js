$(document).ready(function () {
	var picurl = "https://api.nasa.gov/planetary/apod?api_key=A5GKkbkoWa6UP4PtLBRiqyr9swxzEJUQgY9kc3O8";
	$.ajax({
		url: picurl,
		dataType: "json",
		success: function (json) {
			console.log(json);
			var results = "";
			results += "<img src=\"" + json.url + "\"max-height=\"50%\"/>";
			results += "<p>" + json.explanation + "</p><br>";
			$("#NASAResults").html(results);
		}
	});

	/*$("#NEOSubmit").click(function (e) {
		e.preventDefault();
		var start = $("#START_DATE").val();
		var end = $("#END_DATE").val();
		console.log(start);
		console.log(end);

		var neourl = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + start + "&end_date=" + end + "&api_key=A5GKkbkoWa6UP4PtLBRiqyr9swxzEJUQgY9kc3O8";
		$.ajax({
			url: neourl,
			dataType: "json",
			success: function (json) {
				console.log(json);
				console.log(json.near_earth_objects.2014-01-08[0]);
				var results = "";
				$("#NEOResults").html(results);
			}
		});
	});*/

	var neourl = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=A5GKkbkoWa6UP4PtLBRiqyr9swxzEJUQgY9kc3O8";
	$.ajax({
		url: neourl,
		dataType: "json",
		success: function (json) {
			console.log(json);
			var results = "";
			results += "<h1>Near Earth Objects</h1>";
			results += "<table>";
			results += "<tr>";
			results += "<th>Name</th>";
			results += "<th>Danger?</th>";
			results += "<th>Diameter (miles)</th>";
			results += "</tr>";
			for (var i = 0; i < json.near_earth_objects.length; ++i) {
				results += "<tr>";
				results += "<td>" + json.near_earth_objects[i].name + "</td>";
				results += "<td>" + json.near_earth_objects[i].is_potentially_hazardous_asteroid + "</td>";
				results += "<td>" + json.near_earth_objects[i].estimated_diameter.miles.estimated_diameter_max + "</td>";
				results += "</tr>";
			}
			results += "</table>";
			$("#NEOResults").html(results);
		}
	});

	$("#marsSubmit").click(function (e) {
		e.preventDefault();
		var value = $("#marsInput").val();

		var marsurl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" + value + "&api_key=A5GKkbkoWa6UP4PtLBRiqyr9swxzEJUQgY9kc3O8";
		$.ajax({
			url: marsurl,
			dataType: "json",
			success: function (json) {
				console.log(json);
				var results = "";
				if (json.photos.length < 199) {
					results += "<h1>Error, no photos for this sol. Try sol 1000 or 1500.</h1>";
				}
				else {
					for (var i = 0; i < 200; i += 50) {
						console.log(json.photos[i].img_src);
						results += '<img src="' + json.photos[i].img_src + '"/>';
					}
				}
				$("#MarsResults").html(results);
			}
		});
	});

	$("#SpySubmit").click(function (e) {
		e.preventDefault();
		var xvalue = $("#SpyX").val();
		var yvalue = $("#SpyY").val();
		console.log(xvalue);
		console.log(yvalue);

		var spyurl = "https://api.nasa.gov/planetary/earth/imagery?lon=" + xvalue + "&lat=" + yvalue + "&date=2014-02-01&api_key=A5GKkbkoWa6UP4PtLBRiqyr9swxzEJUQgY9kc3O8";
		$.ajax({
			url: spyurl,
			dataType: "json",
			success: function (json) {
				console.log(json);
				if (json.error != null) {
					var results = "<h1>Error: " + json.error + "</h1>";
				}
				$("#SpyResults").html(results);
			}
		});
	});


});
