document.addEventListener("DOMContentLoaded", () => {
  const mapDiv = document.getElementById("map");
  if (!mapDiv || !MAP_TOKEN) return;  // Check if mapDiv and MAP_TOKEN are defined

  const title = mapDiv.dataset.title;
  const location = mapDiv.dataset.location;
  const lng = parseFloat(mapDiv.dataset.lng);
  const lat = parseFloat(mapDiv.dataset.lat);

  mapboxgl.accessToken = MAP_TOKEN;

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: (lng && lat) ? [lng, lat] : [78.9629, 20.5937],  // Default to India if coordinates are missing
    zoom: (lng && lat) ? 10 : 3
  });

  map.addControl(new mapboxgl.NavigationControl());

  function addMarker(lngLat, title, location) {
    new mapboxgl.Marker({ color: "#ff385c" })
      .setLngLat(lngLat)
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h6>${title}</h6><p>${location}</p>`))
      .addTo(map);

    map.flyTo({ center: lngLat, zoom: 10 });
  }

  if (!isNaN(lng) && !isNaN(lat)) {
    addMarker([lng, lat], title, location); // Show marker if valid coordinates exist
  } else if (location) {
    const client = mapboxSdk({ accessToken: MAP_TOKEN });
    client.geocoding.forwardGeocode({ query: location, limit: 1 })
      .send()
      .then(res => {
        const match = res.body.features[0];
        if (match) {
          addMarker(match.center, title, location);
        } else {
          mapDiv.innerHTML = "<p style='text-align:center;padding:1rem;'>Location not available</p>";
        }
      })
      .catch(err => {
        console.error("Geocoding error:", err);
        mapDiv.innerHTML = "<p style='text-align:center;padding:1rem;'>Location not available</p>";
      });
  } else {
    mapDiv.innerHTML = "<p style='text-align:center;padding:1rem;'>Location not available</p>";
  }
});
