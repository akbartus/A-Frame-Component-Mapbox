# A-Frame Component: Mapbox
<img src="img/screenshot.gif" title="Video screen capture" alt="Video screen capture" height="400">

### **Description / Rationale**
This is A-Frame component for Mapbox, which offer some additional features for 3D map visualizations (compare with <a href="https://github.com/mattrei/aframe-mapbox-component">A-Frame Mapbox Component</a> created by Matthias Treitler). In particular the new component allows doing the following, among others:
* Choosing map styles
* Choosing the language of the map
* Dynamically navigating the map


### **Instructions**
In order to use the component attach "mapbox-component" to a-plane primitive. The component has the following attributes: 
* <b>token: { type: "string", default: ""}</b> - Mapbox token
* <b>style: { type: "string", default: "mapbox://styles/mapbox/streets-v12" }</b> - Mapbox map style. Has the following styles:
  - mapbox://styles/mapbox/streets-v12 (Mapbox Streets);
  - mapbox://styles/mapbox/outdoors-v12 (Mapbox Outdoors);
  - mapbox://styles/mapbox/light-v11 (Mapbox Light);
  - mapbox://styles/mapbox/dark-v11 (Mapbox Dark);
  - mapbox://styles/mapbox/satellite-v9 (Mapbox Satellite);
  - mapbox://styles/mapbox/satellite-streets-v12 (Mapbox Satellite Streets);
  - mapbox://styles/mapbox/navigation-day-v1 (Mapbox Navigation Day);
  - mapbox://styles/mapbox/navigation-night-v1 (Mapbox Navigation Night)
* <b>center: { type: "array", default: [69.2787079, 41.3123363] }</b> - Center coordinates on the map, lat and lng.
* <b>zoom: { type: "int", default: 15 }</b> - Zoom level. The higher zoom level is, the more detailed is the view.
* <b>pitch: { type: "int", default: 0 }</b> - Camera pitch.
* <b>deltaDistance: { type: "int", default: 100 }</b> - Distance for moving up or down on the map.
* <b>deltaDegrees: { type: "int", default: 25 }</b> - Degrees og rotation when left or right is clicked.
* <b>language: { type: "string", default: "en" }</b> - Map language. Has the following languages: 
  - "zh-Hans" (Chinese); 
  - "ar" (Arabic); 
  - "fr" (French);
  - "vi" (Vietnamese);
  - "es" (Spanish);
  - "pt" (Portuguese);
  - "ko" (Korean);
  - "ja" (Japanese);
  - "it" (Italian); 
  - "de" (German); 
  - "ru" (Russian); 
  - "en" (English).
* <b>attach: { type: "boolean", default: false }</b> - Whether navigation buttons should be attached to camera or should be freely stainding in 3D space.

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
