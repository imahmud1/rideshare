document.addEventListener("DOMContentLoaded", function() {
    // Initialize the map
    var map = L.map('map').setView([33.2845, 131.4907], 15); // Beppu, Oita coordinates
  
    // Set up the OSM layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);
  
    // Variables to keep track of existing marker, circles, and prices
    var existingMarker = null;
    var existingCircles = [];
    var existingPrices = [];
  
    // Function to create price label at bottom of circle
    function addPriceLabel(lat, lng, price, radiusInMeters) {
        var earth = 6378.137,  // radius of the earth in kilometer
            pi = Math.PI,
            m = (1 / ((2 * pi / 360) * earth)) / 1000;  // 1 meter in degree
    
        var newLat = lat - (radiusInMeters * m * 0.8);  // reduced offset for better position
        return L.marker([newLat, lng], { 
          icon: L.divIcon({ 
            html: `<div style="background-color:white; padding:3px; border:1px solid black; white-space: nowrap; display: inline-block;">${price} Yen</div>`, 
            className: 'price-label' 
          }) 
        }).addTo(map);
    }
  
    // Add a marker and circles when clicking on the map
    map.on('click', function(e) {
      // Remove existing marker, circles, and prices
      if (existingMarker) map.removeLayer(existingMarker);
      existingCircles.forEach(circle => map.removeLayer(circle));
      existingPrices.forEach(price => map.removeLayer(price));
  
      // Create new marker
      existingMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
  
      // Create and store circles
      var circle200 = L.circle([e.latlng.lat, e.latlng.lng], { radius: 500, color: 'green' }).addTo(map);
      var circle500 = L.circle([e.latlng.lat, e.latlng.lng], { radius: 1000, color: 'blue' }).addTo(map);
      var circle1000 = L.circle([e.latlng.lat, e.latlng.lng], { radius: 2000, color: 'red' }).addTo(map);
      existingCircles = [circle200, circle500, circle1000];
  
      // Create and store price labels
      var price200 = addPriceLabel(e.latlng.lat, e.latlng.lng, 500, 500);
      var price500 = addPriceLabel(e.latlng.lat, e.latlng.lng, 1000, 1000);
      var price1000 = addPriceLabel(e.latlng.lat, e.latlng.lng, 2000, 2000);
      existingPrices = [price200, price500, price1000];
    });
  
    // Handle form submission
    document.getElementById('rideForm').addEventListener('submit', function(event) {
      event.preventDefault();
      
      const phoneNumber = document.getElementById('phoneNumber').value;
      const startLocation = document.getElementById('startLocation').value;
      const endLocation = document.getElementById('endLocation').value;
  
      alert(`Details submitted. Phone: ${phoneNumber}, Start: ${startLocation}, End: ${endLocation}`);
    });
  });
  