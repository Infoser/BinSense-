// Sample data for dustbins
const dustbins = [
  { id: 1, location: "City Park", status: "Full", fillLevel: 95, lat: 51.505, lng: -0.09 },
  { id: 2, location: "Main Street", status: "Near Full", fillLevel: 80, lat: 51.51, lng: -0.1 },
  { id: 3, location: "Shopping Mall", status: "Normal", fillLevel: 30, lat: 51.515, lng: -0.09 },
];

// Initialize map
const map = L.map("map").setView([51.505, -0.09], 13);

// Adding Leaflet library import
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Get notification list container
const notificationList = document.getElementById("notificationList");
notificationList.innerHTML = ""; // Clear previous notifications

// Add markers to the map and update notification list
dustbins.forEach((dustbin) => {
  let markerColor = "blue"; // Default marker color

  // Determine marker color based on fill level
  if (dustbin.fillLevel > 80) {
      markerColor = "red"; // Full bin - Needs urgent attention
  } else if (dustbin.fillLevel > 50) {
      markerColor = "orange"; // Half full
  }

  // Create a marker with the respective color
  const marker = L.marker([dustbin.lat, dustbin.lng], {
      icon: L.icon({
          iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
      }),
  }).addTo(map);

  // Bind popup to the marker
  marker.bindPopup(`
      <b>Dustbin ID:</b> ${dustbin.id}<br>
      <b>Location:</b> ${dustbin.location}<br>
      <b>Current Fill Level:</b> ${dustbin.fillLevel}%<br>
      <b>Status:</b> ${dustbin.status}<br>
      <b>Last Updated:</b> ${new Date().toLocaleString()}
  `);

  // Add notification if the bin is full
  if (dustbin.fillLevel > 80) {
      const listItem = document.createElement("li");
      listItem.className = "notification-item";
      listItem.innerHTML = `<strong>Bin ${dustbin.id}:</strong> ${dustbin.location} (Fill Level: ${dustbin.fillLevel}%)`;
      notificationList.appendChild(listItem);
  }
});
// Background Image Rotation for the Header
const header = document.querySelector('.hero-header');
const images = [
    'img1.jpg', 
    'img4.jpg', 
    'img3.webp'
];

let index = 0;

function changeBackground() {
    header.style.backgroundImage = `url('${images[index]}')`;
    index = (index + 1) % images.length;
}

// Change header background every 5 seconds
setInterval(changeBackground, 5000);
