document.addEventListener("DOMContentLoaded", function () {
    // Initialize Map
    var map = L.map('map').setView([21.2514, 81.6296], 14);

    // Add OpenStreetMap Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Force Map to Render Properly
    setTimeout(() => { map.invalidateSize(); }, 1000);

	 // Icons for different fill levels
    var greenBinIcon = L.icon({ iconUrl: 'green dustbin.png', iconSize: [32, 32] });
    var yellowBinIcon = L.icon({ iconUrl: 'yellow dustbin.png', iconSize: [32, 32] });
    var redBinIcon = L.icon({ iconUrl: 'red dustbin.png', iconSize: [32, 32] });

    // Placeholder for marker (starts empty)
    var binMarker = null;
const EMAILJS_SERVICE_ID = "service_vyzzy0q";  // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = "template_b3dacbs";  // Replace with your Template ID
const EMAILJS_PUBLIC_KEY = "mXkZpR3syO0qWljnV";  // Replace with your Public Key

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

let dustbin = "Dustbin 1"
let userName = "Senior Manager";
    let userMessage = `the ${dustbin} has been filled to a high level and needs cleaning`;

    function emailsend(){
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name: userName,
        message: userMessage
    }).then(() => {
        console.log("email was sent");
        
    }).catch(error => {
        console.error("Error sending email:", error);
        document.getElementById("statusMessage").textContent = "Error sending email.";
    });
});

}

   

    // Store the last 4 readings
    let readings = [];

    // Function to Analyze Readings
    function analyzeReadings() {
         if (readings.length < 4) return; // Ensure at least 4 readings exist

        let greenCount = readings.filter(value => value <= 50).length;
        let yellowCount = readings.filter(value => value > 50 && value <= 75).length;
        let redCount = readings.filter(value => value > 75).length;
	let flag = 0;
        let statusText = "🟢 Bin is OK"; // Default
        let selectedIcon = greenBinIcon;
        
        if (redCount >= 3) {
            statusText = "🔴 Bin needs urgent cleaning! (<50%)";
            selectedIcon = redBinIcon;
            emailsend();
		flag = flag+1;
        } else if (yellowCount >= 3) {
            statusText = "🟡 Bin needs attention (50-75%)";
            selectedIcon = yellowBinIcon;
            flag--;
        }

        // Update the marker with the analyzed result
        updateMarker(readings[readings.length - 1], selectedIcon, statusText);

    }

    // Function to Update Marker
    function updateMarker(fillLevel, selectedIcon, statusText) {
        let binLat = 21.2514;
        let binLng = 81.6296;

        if (binMarker) {
            binMarker.setLatLng([binLat, binLng])
                .setIcon(selectedIcon)
                .bindPopup(`${statusText} - Fill Level: ${fillLevel.toFixed(2)}%`)
                .openPopup();
        } else {
            binMarker = L.marker([binLat, binLng], { icon: selectedIcon })
                .addTo(map)
                .bindPopup(`${statusText} - Fill Level: ${fillLevel.toFixed(2)}%`)
                .openPopup();
        }

        // Update the text status
        document.getElementById("status").innerText = statusText;
    }

    // Function to Fetch Data from ThingSpeak
    function fetchThingSpeakData() {
        fetch('https://api.thingspeak.com/channels/2832905/fields/1.json?results=1')
            .then(response => response.json())
            .then(data => {
                if (data.feeds.length > 0) {
                    let latestData = data.feeds[0];
                    let fillLevel = parseFloat(latestData.field1); // Bin Fill Percentage

                    if (isNaN(fillLevel)) {
                        console.error("Received invalid data:", latestData);
                        document.getElementById("error").style.display = "block";
                        return;
                    } else {
                        document.getElementById("error").style.display = "none";
                    }

                    // Store the latest reading and keep only the last 4
                    readings.push(fillLevel);
                    if (readings.length > 4) readings.shift(); // Remove the oldest value

                    // Analyze readings and update UI
                    analyzeReadings();
                } else {
                    console.error("No data received from ThingSpeak!");
                    document.getElementById("error").style.display = "block";
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                document.getElementById("error").style.display = "block";
            });
    }

    // Fetch Data Every 15 Seconds
    fetchThingSpeakData();
    setInterval(fetchThingSpeakData, 15000);
});
