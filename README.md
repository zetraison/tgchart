# TChart
Open source chart library

# Getting Started

Let's get started using TChart.js. First, we need to have a div in our page.

```html
<div id="myChart"></div>
```

Now that we have a div we can use, we need to include TChart.js in our page.

```html
<script src="lib/tchart.js"></script>
```

Now, we can create a chart. We add a script to our page:

```javascript
var data = {
    "columns": [
        ["x", 1542412800000, 1542499200000, 1542585600000, 1542672000000, 1542758400000],
        ["y0", 37, 20, 32, 39, 32],
        ["y1", 22, 12, 30, 40, 33]
    ],
    "types": {
        "y0": "line",
        "y1": "line",
        "x": "x"
    },
    "names": {
        "y0": "One",
        "y1": "Two"
    },
    "colors": {
        "y0": "#3DC23F",
        "y1": "#F34C44"
    }
};

var options = {
    cssPath: "../src/css/style.css",

    canvasWidth: 400,
    canvasHeight: 400,

    sliderWidth: 400,
    sliderHeight: 50,

    thumbWidth: 10,
    thumbHeight: 50,

    fps: 60
};
```
