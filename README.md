# Colorwheel

A script for a generating a visualization of data aggregated by [Color of Seattle](https://twitter.com/colorofseattle)

Each ring is a day, the outermost ring being the first of day in the series. Each segment is an hour with the corresponding color of the sky. 

## Set-up

Create a JavaScript file with the color data stored in an object called dataHourly. The object should be organized by date and hour:

```
var dataHourly = {
    "YYYY-MM-DD": {
		"HH": {
			date,
			hex, // color
			hour,
			time
		},
		...
	},
	...
}
```

Update the path to the JavaScript file in index.html
