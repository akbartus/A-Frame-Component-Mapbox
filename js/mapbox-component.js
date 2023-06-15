// Create the Mapbox GL JS script element
var mapboxScript = document.createElement("script");
mapboxScript.src = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js";
// Create the Mapbox GL JS stylesheet link element
var mapboxStylesheet = document.createElement("link");
mapboxStylesheet.href =
  "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css";
mapboxStylesheet.rel = "stylesheet";
// Attach the elements to the head of the HTML document
document.head.appendChild(mapboxScript);
document.head.appendChild(mapboxStylesheet);
// Language Plugin for MapBox
function MapboxLanguage(e) {
  if (((e = Object.assign({}, e)), !(this instanceof MapboxLanguage)))
    throw Error("MapboxLanguage needs to be called with the new keyword");
  (this.setLanguage = this.setLanguage.bind(this)),
    (this._initialStyleUpdate = this._initialStyleUpdate.bind(this)),
    (this._defaultLanguage = e.defaultLanguage),
    (this._isLanguageField = e.languageField || /^name_/),
    (this._getLanguageField =
      e.getLanguageField ||
      function e(t) {
        return "mul" === t ? "name" : `name_${t}`;
      }),
    (this._languageSource = e.languageSource || null),
    (this._languageTransform = e.languageTransform),
    (this._excludedLayerIds = e.excludedLayerIds || []),
    (this.supportedLanguages = e.supportedLanguages || [
      "ar",
      "de",
      "en",
      "es",
      "fr",
      "it",
      "ja",
      "ko",
      "mul",
      "pt",
      "ru",
      "vi",
      "zh-Hans",
      "zh-Hant",
    ]);
}
const isTokenField = /^\{name/;
function isFlatExpressionField(e, t) {
  let a = Array.isArray(t) && "get" === t[0];
  return (
    a &&
      isTokenField.test(t[1]) &&
      console.warn(
        "This plugin no longer supports the use of token syntax (e.g. {name}). Please use a get expression. See https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/ for more details."
      ),
    a && e.test(t[1])
  );
}
function adaptNestedExpressionField(e, t, a) {
  if (Array.isArray(t))
    for (let n = 1; n < t.length; n++)
      Array.isArray(t[n]) &&
        (isFlatExpressionField(e, t[n]) && (t[n][1] = a),
        adaptNestedExpressionField(e, t[n], a));
}
function adaptPropertyLanguage(e, t, a) {
  if (
    (isFlatExpressionField(e, t) && (t[1] = a),
    adaptNestedExpressionField(e, t, a),
    "get" === t[0] && "name" === t[1])
  ) {
    let n = t.slice();
    t = ["coalesce", ["get", a], n];
  }
  return t;
}
function changeLayerTextProperty(e, t, a, n) {
  return t.layout && t.layout["text-field"] && -1 === n.indexOf(t.id)
    ? Object.assign({}, t, {
        layout: Object.assign({}, t.layout, {
          "text-field": adaptPropertyLanguage(e, t.layout["text-field"], a),
        }),
      })
    : t;
}
function findStreetsSource(e) {
  let t = Object.keys(e.sources).filter((t) => {
    let a = e.sources[t].url;
    return (
      (a && a.indexOf("mapbox.mapbox-streets-v8") > -1) ||
      /mapbox-streets-v[1-9][1-9]/.test(a)
    );
  });
  if (!t.length)
    throw Error(
      'If using MapboxLanguage with a Mapbox style, the style must be based on vector tile version 8, e.g. "streets-v11"'
    );
  return t[0];
}
function browserLanguage(e) {
  let t = navigator.languages
      ? navigator.languages[0]
      : navigator.language || navigator.userLanguage,
    a = t && t.split("-"),
    n = t;
  return (a.length > 1 && (n = a[0]), e.indexOf(n) > -1) ? n : null;
}
(MapboxLanguage.prototype.setLanguage = function (e, t) {
  if (0 > this.supportedLanguages.indexOf(t))
    throw Error(`Language ${t} is not supported`);
  let a = this._languageSource || findStreetsSource(e);
  if (!a) return e;
  let n = this._getLanguageField(t),
    s = this._isLanguageField,
    i = this._excludedLayerIds,
    o = e.layers.map((e) =>
      e.source === a ? changeLayerTextProperty(s, e, n, i) : e
    ),
    g = Object.assign({}, e, { layers: o });
  return this._languageTransform ? this._languageTransform(g, t) : g;
}),
  (MapboxLanguage.prototype._initialStyleUpdate = function () {
    let e = this._map.getStyle(),
      t = this._defaultLanguage || browserLanguage(this.supportedLanguages);
    this._map.setStyle(this.setLanguage(e, t));
  }),
  (MapboxLanguage.prototype.onAdd = function (e) {
    return (
      (this._map = e),
      this._map.on("style.load", this._initialStyleUpdate),
      (this._container = document.createElement("div")),
      this._container
    );
  }),
  (MapboxLanguage.prototype.onRemove = function () {
    this._map.off("style.load", this._initialStyleUpdate), (this._map = void 0);
  }),
  "undefined" != typeof module && void 0 !== module.exports
    ? (module.exports = MapboxLanguage)
    : (window.MapboxLanguage = MapboxLanguage);
// A-Frame Component for MapBox
AFRAME.registerComponent("mapbox-component", {
  schema: {
    token: {
      type: "string",
      default:
        "pk.eyJ1IjoiZGFudmsiLCJhIjoiY2lrZzJvNDR0MDBhNXR4a2xqNnlsbWx3ciJ9.myJhweYd_hrXClbKk8XLgQ",
    },
    style: { type: "string", default: "mapbox://styles/mapbox/streets-v12" },
    center: { type: "array", default: [69.2787079, 41.3123363] },
    zoom: { type: "int", default: 15 },
    pitch: { type: "int", default: 0 },
    deltaDistance: { type: "int", default: 100 }, // Distance to move vertically
    deltaDegrees: { type: "int", default: 25 }, // rotation degrees
    language: { type: "string", default: "en" }, // zh-Hans / ar / fr / vi / es / pt / ko / ja / it / de / ru / en
    attach: { type: "boolean", default: false },
  },
  init: function () {
    // create div
    const div = document.createElement('div');
    div.id = 'map';
    div.style.display = 'none';
    document.body.appendChild(div);
    // Create parent entity
    var parentEntity = document.createElement("a-entity");
    parentEntity.setAttribute("position", "0 -1 0");
    // Create up plane
    var upPlane = document.createElement("a-plane");
    upPlane.setAttribute("id", "up");
    upPlane.setAttribute("class", "clickable");
    upPlane.setAttribute("position", "0 0 -2");
    upPlane.setAttribute("rotation", "0 0 0");
    upPlane.setAttribute("width", "0.4");
    upPlane.setAttribute("height", "0.25");
    upPlane.setAttribute("color", "#000");
    // Add text to up plane
    var upText = document.createElement("a-text");
    upText.setAttribute("value", "Up");
    upText.setAttribute("align", "center");
    upText.setAttribute("color", "#fff");
    upText.setAttribute("scale", "0.5 0.5 0.5");
    upPlane.appendChild(upText);
    // Create down plane
    var downPlane = document.createElement("a-plane");
    downPlane.setAttribute("id", "down");
    downPlane.setAttribute("class", "clickable");
    downPlane.setAttribute("position", "0 -0.35 -2");
    downPlane.setAttribute("rotation", "0 0 0");
    downPlane.setAttribute("width", "0.4");
    downPlane.setAttribute("height", "0.25");
    downPlane.setAttribute("color", "#000");
    // Add text to down plane
    var downText = document.createElement("a-text");
    downText.setAttribute("value", "Down");
    downText.setAttribute("align", "center");
    downText.setAttribute("color", "#fff");
    downText.setAttribute("scale", "0.5 0.5 0.5");
    downPlane.appendChild(downText);
    // Create left plane
    var leftPlane = document.createElement("a-plane");
    leftPlane.setAttribute("id", "left");
    leftPlane.setAttribute("class", "clickable");
    leftPlane.setAttribute("position", "-0.5 0 -2");
    leftPlane.setAttribute("rotation", "0 0 0");
    leftPlane.setAttribute("width", "0.4");
    leftPlane.setAttribute("height", "0.25");
    leftPlane.setAttribute("color", "#000");
    // Add text to left plane
    var leftText = document.createElement("a-text");
    leftText.setAttribute("value", "Left");
    leftText.setAttribute("align", "center");
    leftText.setAttribute("color", "#fff");
    leftText.setAttribute("scale", "0.5 0.5 0.5");
    leftPlane.appendChild(leftText);
    // Create right plane
    var rightPlane = document.createElement("a-plane");
    rightPlane.setAttribute("id", "right");
    rightPlane.setAttribute("class", "clickable");
    rightPlane.setAttribute("position", "0.5 0 -2");
    rightPlane.setAttribute("rotation", "0 0 0");
    rightPlane.setAttribute("width", "0.4");
    rightPlane.setAttribute("height", "0.25");
    rightPlane.setAttribute("color", "#000");
    // Add text to right plane
    var rightText = document.createElement("a-text");
    rightText.setAttribute("value", "Right");
    rightText.setAttribute("align", "center");
    rightText.setAttribute("color", "#fff");
    rightText.setAttribute("scale", "0.5 0.5 0.5");
    rightPlane.appendChild(rightText);
    // Create zoom in plane
    var zoomInPlane = document.createElement("a-plane");
    zoomInPlane.setAttribute("id", "zoom-in");
    zoomInPlane.setAttribute("class", "clickable");
    zoomInPlane.setAttribute("position", "-0.5 -0.35 -2");
    zoomInPlane.setAttribute("rotation", "0 0 0");
    zoomInPlane.setAttribute("width", "0.4");
    zoomInPlane.setAttribute("height", "0.25");
    zoomInPlane.setAttribute("color", "#000");

    // Add text to zoom in plane
    var zoomInText = document.createElement("a-text");
    zoomInText.setAttribute("value", "+");
    zoomInText.setAttribute("align", "center");
    zoomInText.setAttribute("color", "#fff");
    zoomInText.setAttribute("scale", "0.5 0.5 0.5");
    zoomInPlane.appendChild(zoomInText);
    // Create zoom out plane
    var zoomOutPlane = document.createElement("a-plane");
    zoomOutPlane.setAttribute("id", "zoom-out");
    zoomOutPlane.setAttribute("class", "clickable");
    zoomOutPlane.setAttribute("position", "0.5 -0.35 -2");
    zoomOutPlane.setAttribute("rotation", "0 0 0");
    zoomOutPlane.setAttribute("width", "0.4");
    zoomOutPlane.setAttribute("height", "0.25");
    zoomOutPlane.setAttribute("color", "#000");
    // Add text to zoom out plane
    var zoomOutText = document.createElement("a-text");
    zoomOutText.setAttribute("value", "-");
    zoomOutText.setAttribute("align", "center");
    zoomOutText.setAttribute("color", "#fff");
    zoomOutText.setAttribute("scale", "0.5 0.5 0.5");
    zoomOutPlane.appendChild(zoomOutText);
    // Append planes to parent entity
    parentEntity.appendChild(upPlane);
    parentEntity.appendChild(downPlane);
    parentEntity.appendChild(leftPlane);
    parentEntity.appendChild(rightPlane);
    parentEntity.appendChild(zoomInPlane);
    parentEntity.appendChild(zoomOutPlane);

    // Append parent entity to
    if (this.data.attach) {
      document.querySelector("a-camera").appendChild(parentEntity);
    } else {
      document.querySelector("a-scene").appendChild(parentEntity);
    }
    // Load variables for MapBox
    const deltaDistance = this.data.deltaDistance;
    const deltaDegrees = this.data.deltaDegrees;
    function easing(t) {
      return t * (2 - t);
    }
    const { MercatorCoordinate } = mapboxgl;
    mapboxgl.accessToken = this.data.token;
    const map = new mapboxgl.Map({
      container: "map",
      style: this.data.style,
      center: this.data.center,
      zoom: this.data.zoom,
      pitch: this.data.pitch,
    });

    map.addControl(
      new MapboxLanguage({
        defaultLanguage: this.data.language,
      })
    );
    map.on("load", () => {
      map.getCanvas().focus();
    });
    document.querySelector("#up").addEventListener("click", (e) => {
      map.panBy([0, -deltaDistance], {
        easing: easing,
      });
    });
    document.querySelector("#down").addEventListener("click", (e) => {
      map.panBy([0, deltaDistance], {
        easing: easing,
      });
    });
    document.querySelector("#left").addEventListener("click", (e) => {
      map.easeTo({
        bearing: map.getBearing() - deltaDegrees,
        easing: easing,
      });
    });
    document.querySelector("#right").addEventListener("click", (e) => {
      map.easeTo({
        bearing: map.getBearing() + deltaDegrees,
        easing: easing,
      });
    });
    map.on("render", () => {
      setTimeout(() => {
        document
          .querySelector("[mapbox-component]")
          .setAttribute("src", map.getCanvas().toDataURL());
      }, 100);
    });
    zoomInPlane.addEventListener("click", function () {
      map.zoomIn();
    });
    zoomOutPlane.addEventListener("click", function () {
      map.zoomOut();
    });
  },
});
