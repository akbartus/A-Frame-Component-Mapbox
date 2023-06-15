# A-Frame Component: Mapbox
<img src="img/screenshot.gif" title="Video screen capture" alt="Video screen capture" height="400">

### **Description / Rationale**
This is A-Frame component for Mapbox, which offer some additional features for 3D map visualizations (compare with <a href="https://github.com/mattrei/aframe-mapbox-component">A-Frame Mapbox Component</a> created by Matthias Treitler). In particular the new component allows doing the following, among others:
* Choosing map styles
* Choosing the language of the map
* Dynamically navigating the map


### **Instructions**
In order to use the component attach "mapbox-component" to a-plane primitive. The component has the following attributes: 
token: { type: "string", default: ""},
    style: { type: "string", default: "mapbox://styles/mapbox/streets-v12" },
    center: { type: "array", default: [69.2787079, 41.3123363] },
    zoom: { type: "int", default: 15 },
    pitch: { type: "int", default: 0 },
    deltaDistance: { type: "int", default: 100 }, // Distance to move vertically
    deltaDegrees: { type: "int", default: 25 }, // rotation degrees
    language: { type: "string", default: "en" }, // zh-Hans / ar / fr / vi / es / pt / ko / ja / it / de / ru / en
    attach: { type: "boolean", default: false },

The code below shows the sample implementation of the component:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A-Frame Component: Three-geo (Updated)</title>
    <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
    <script src="js/three-geo-component.js">
    </script>
</head>
<body>
    <a-scene>
        <a-entity id="first" three-geo="token: your-mapbox-token-here;
                   lat: 36.2058;
                   lng:  -112.4413;
                   radius: 5;
                   zoom: 13;
                   axesHelper: false;
                   flatMap: false;
                   mapStyle: elevated;
                   wireframeColor: #ffffff;
                   " rotation="-90 180 0" position="0 0.7 -1.5" scale="2 2 2"></a-entity>
                   <a-sky color="#000000"></a-sky>
    </a-scene>
</body>
</html>
```
To learn more about "Three-geo" library, check the repository page of it.

### **Tech Stack**
The project is powered by AFrame and Three.js.

### **Demo**
See demo of the component here: [Demo](https://three-geo.glitch.me/)
