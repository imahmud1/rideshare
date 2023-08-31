document.addEventListener("DOMContentLoaded", function() {

  var map, existingMarker, existingCircles = [];

  // Initialize the map with a default location
  function initializeMap(lat = 33.2845, lng = 131.4907) {
    map = L.map('map').setView([lat, lng], 17);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Create Price Box (Legend)
    var legend = L.control({position: 'bottomleft'});
    legend.onAdd = function (map) {
      return document.getElementById('mapLegend');
    };
    legend.addTo(map);

    // Event Listener for map clicks
    map.on('click', function(e) {
      if (existingMarker) map.removeLayer(existingMarker);
      existingCircles.forEach(circle => map.removeLayer(circle));

      existingMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

      var circle200 = L.circle([e.latlng.lat, e.latlng.lng], { radius: 500, color: 'green' }).addTo(map);
      var circle500 = L.circle([e.latlng.lat, e.latlng.lng], { radius: 1000, color: 'blue' }).addTo(map);
      var circle1000 = L.circle([e.latlng.lat, e.latlng.lng], { radius: 2000, color: 'red' }).addTo(map);
      existingCircles = [circle200, circle500, circle1000];

      document.getElementById('price200').textContent = '500 Yen';
      document.getElementById('price500').textContent = '1000 Yen';
      document.getElementById('price1000').textContent = '2000 Yen';
    });
  }

  // Try to get the user's location
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      initializeMap(position.coords.latitude, position.coords.longitude);
    }, function(error) {
      console.error("Error occurred. Using default location.");
      initializeMap();
    });
  } else {
    console.log("Browser doesn't support Geolocation. Using default location.");
    initializeMap();
  }

  // Form submission
  document.getElementById('rideForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const phoneNumber = document.getElementById('phoneNumber').value;
    const startLocation = document.getElementById('startLocation').value;
    const endLocation = document.getElementById('endLocation').value;

    alert(`Details submitted. Phone: ${phoneNumber}, Start: ${startLocation}, End: ${endLocation}`);
  });

  // Stop click event propagation for scroll button
  var scrollToFormBtn = document.getElementById('scrollToFormBtn');
  scrollToFormBtn.addEventListener('click', function(event) {
    event.stopPropagation(); // Stop the event from bubbling up to the map

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  });
});