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
<html>
<head>
    <meta charset='utf-8' />
    <title>A-Frame Component: Mapbox</title>
    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
    <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
    <script src="js/mapbox-component.js">
    </script>
</head>
<body>
     <a-scene>
        <a-plane mapbox-component="attach: true" position="0 0 -3" rotation="0 0 0" width="8" height="5"
            color="#ddd"></a-plane>       
        <a-camera position="0 0 0" cursor="rayOrigin: mouse;" raycaster="objects: .clickable"></a-camera>
        <a-sky color="#ECECEC"></a-sky>
    </a-scene>
</body>
</html>
```
Please note that a-camera primitive is used with raycast and rayorigin to enable click events. Without them navigation buttons will not work! 
If you want to use it in VR, just attach laser pointer with raycaster showing to .clickable class.

### **Tech Stack**
The project is powered by AFrame and Three.js.

### **Demo**
See demo of the component here: [Demo](mapbox-component.glitch.me/)
