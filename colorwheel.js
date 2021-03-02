var positions = [0, 0, 0, 0, 21.1, 36.6, 50, 63.4, 78.9, 100, 100, 100, 100, 100, 100, 100, 78.9, 63.4, 50, 36.6, 21.1, 0, 0, 0];

var diameter, radius, axis, tics,
	w = window,
	x = w.innerWidth || e.clientWidth || g.clientWidth,
	y = w.innerHeight|| e.clientHeight|| g.clientHeight;
	
axis = (x < y) ? "vw" : "vh";
diameter = "100" + axis;
radius = "50" + axis;


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function addWedge(date, hour, hex) {
	let posx, posy, a, b, cp, 
		divDate, divWedge, divColor;
	
	posx = (hour + 6) % 24;
	posy = hour;
	
	a = [positions[posx], positions[posy]];
	b = [positions[(posx + 1) % 24], positions[(posy + 1) % 24]];
	
	cp = "polygon(50% 50%, "+a[0]+"% "+a[1]+"%,  "+b[0]+"% "+b[1]+"%)";

	divDate = $("div#" + date);

	divWedge = $("<div></div>");
	divWedge.addClass("hour wedge");
	divWedge.css("clip-path", cp);
	divWedge.css("-webkit-clip-path", cp);

	divColor = $("<div></div>");
	divColor.addClass("hour circle");
	divColor.css("background-color", hex);
	
	divWedge.append(divColor);
	divDate.append(divWedge);

	$("div#currentColor").css("background-color", hex);
}


async function main() {
	let date, year, month, numDays = 0, dataHour, dataHourLast;
	let step, stepDiameter

	year = data[0].date.substring(0, 4);
	month = data[0].date.substring(0, 7);
	
	for (date in dataHourly) {
		divDate = $("<div></div>");
		divDate.attr("id", date);
		divDate.addClass("date");
		divDate.css("z-index", date.replace(/-/g, ''));
		$("div#colors").append(divDate);
		numDays += 1;
	}
	
	tics = 100;
	for (i = 1; i <= numDays; i++) {
		date = month + "-" + ("0" + i).slice(-2);
		
		for (j = 0; j < 24; j++) {
			hour = ("0" + j).slice(-2);
			
			if (hour in dataHourly[date]) {
				dataHour = dataHourly[date][hour];
				dataHourLast = dataHour;
			} else {
				dataHour = dataHourLast;
			}
			
			$("div#textDate").html(date + ", " + dataHour.time);
			addWedge(dataHour.date, parseInt(dataHour.hour), dataHour.hex);
			await sleep(tics);
		}
		
		// embiggen
		divDate = $("div#" + date);
		step = i - 1;
		stepDiameter = ((92 - (92*(step/numDays))) + 8) + axis;

		divDate.animate({
			width: stepDiameter,
			height: stepDiameter,
		}, (numDays - step)*24*tics, "linear");
	}
}


$(document).ready(function() {
	main();
});