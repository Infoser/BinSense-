# Smart Waste Management System

This project is a **Smart Waste Management System** that tracks the fill levels of dustbins in real-time using sensor data. The system provides visual updates on a map and sends email alerts when the dustbin fill level crosses a certain threshold. The system is built using HTML, JavaScript (with EmailJS for sending email notifications), Leaflet for map integration, and ThingSpeak for data retrieval.

## Project Overview

The Smart Waste Management System consists of two main parts:

1. **Frontend (HTML + JavaScript)**:
   - A map showing the location of the dustbin with color-coded icons based on the fill level of the bin.
   - Status messages and error handling for visual feedback to users.
   - Buttons to navigate to other functionalities such as alerts, reports, complaints, and notices.

2. **Backend**:
   - Fetches sensor data from **ThingSpeak** to determine the fill level of the dustbin.
   - Analyzes the readings to categorize the bin status into three levels:
     - 🟢 **Green**: Bin is OK (0-50%)
     - 🟡 **Yellow**: Bin needs attention (50-75%)
     - 🔴 **Red**: Bin needs urgent cleaning (>75%)
   - Sends an **email alert** using **EmailJS** when the bin is almost full (more than 75% filled).

## How It Works

1. **Map Initialization**:
   - The map is initialized using **Leaflet.js** with an OpenStreetMap layer.
   - A marker is placed at the location of the dustbin (latitude: 21.2514, longitude: 81.6296).

2. **Fetching Data from ThingSpeak**:
   - Data is fetched from a **ThingSpeak** channel every 15 seconds to get the latest fill level of the dustbin.
   - The fetched data is analyzed, and based on the fill percentage, the map marker is updated with one of three bin icons (green, yellow, or red).
   - The status text is updated to inform the user whether the bin is OK, needs attention, or needs urgent cleaning.

3. **Email Alert System**:
   - When the bin fill level exceeds 75% for three consecutive readings, an email alert is sent using **EmailJS** to notify the concerned team that the bin requires cleaning.

4. **Error Handling**:
   - If no valid data is received from **ThingSpeak**, an error message is displayed on the screen.

## Features

- **Real-Time Bin Status**: The system regularly fetches data and updates the map and status in real-time.
- **Map Integration**: Displays the dustbin's location on a map with color-coded markers based on the bin's fill level.
- **Email Alerts**: Automatically sends an email when the bin needs urgent cleaning.
- **Responsive UI**: The web interface is responsive and adapts to different screen sizes.

## Technologies Used

- **HTML/CSS**: For the frontend design and layout.
- **Bootstrap 5**: For a responsive and mobile-friendly design.
- **Leaflet.js**: For map integration and displaying dustbin locations.
- **EmailJS**: For sending email alerts when the bin is filled beyond the threshold.
- **ThingSpeak API**: For retrieving sensor data that indicates the fill level of the dustbin.
- **JavaScript**: For handling the logic, updating the map, and sending emails.

## How to Run

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/smart-waste-management.git
