# **Sensor Dashboard**

A React and TypeScript-based sensor dashboard built with Vite and shadcn/ui components. Interfaces with a Spring Boot API to display real-time sensor data including temperatures, sensor names, reading dates, and locations.

## **Table of Contents**

- [Description](#description)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## **Description**

Sensor Dashboard is a web application that allows users to monitor real-time data from various sensors deployed in different locations. Built with modern technologies like React, Vite, and shadcn/ui, it provides an interactive and user-friendly interface to visualize temperature readings, sensor statuses, and historical data trends.

## **Features**

- Interactive UI built with React and shadcn/ui components
- Real-time sensor data fetching from a Spring Boot API
- Responsive design optimized for both desktop and mobile devices
- Graphs to showcase each sensors history

## **Demo**

Example:

![Sensor Dashboard Screenshot](https://github.com/user-attachments/assets/2545cfc7-a016-4dc0-8437-c92f656b196e)

<!-- **Live Demo:** [https://your-demo-link.com](https://your-demo-link.com)  -->

## **Installation**

### **Prerequisites**

- **Node.js** (v14 or later)
- **npm** (v6 or later)

### **Frontend Setup**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/sensor-dashboard.git
   cd sensor-dashboard
2. **Install dependencies:**
    ```bash
    npm install
3. **Set up environment variables:**
Create a .env file in the root of your project and add:
    ```env
    VITE_API_BASE_URL=http://localhost:8080
4. **Start the development server:**
    ```bash
    npm run dev
The application will be available at http://localhost:5173.

### Backend Setup
[Link to Backend Repository](https://github.com/NicoleNilsson/esp32BackendTemp)

## Usage
1. Access the application:
Open your browser and navigate to http://localhost:5173.
2. Interacting with the Dashboard:
    - View Sensor Data: Browse through the list of sensors and view their current readings.
    - Filter Sensors: Filter on Name, Temp or Online Status of the sensors.
    - View Historical Data: Select a sensor on the dashboard and view historical data.

## API Endpoints
    GET ```/api/sensors```
**Description:** Retrieves a list of all sensors with their latest readings.
**Response Example:**
```json
    [
      {
        "temperature": 22.5,
        "id": 1,
        "name": "Sensor A",
        "date": "2023-10-01T10:30:00Z",
        "location": "Building A"
      },
      {
        "id": 2,
        "name": "Sensor B",
        "temperature": 23.1,
        "date": "2023-10-01T11:00:00Z",
        "location": "Building B"
      }
      // More sensor data
    ]
```
**[Additional Endpoints]**
    GET ```/api/sensors/{id}```
**Description**: Retrieves detailed information for a specific sensor.
**Response Example:**
```json
            {
              "id": 1,
              "name": "Sensor A",
              "temperature": 22.5,
              "date": "2023-10-01T10:30:00Z",
              "location": "Building A",
              "historicalData": [
                // Historical readings
              ]
            }
```
## Contributing
Contributions are welcome! Please follow these guidelines:
**1. Fork the Repository**
**2. Create a Feature Branch**
```bash
git checkout -b feature/your-feature-name
```
**3. Commit Your Changes**
```bash
git commit -m "Add your descriptive commit message"
```
**4. Push to Your Branch**
```bash
    git push origin feature/your-feature-name
```
**5. Open a Pull Request**
- Provide a clear description of your changes.
- Reference any related issues.

**6. Code Style Guidelines**
- Follow the existing code style.
- Ensure your code passes all linting and formatting checks.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledgements
- **shadcn/ui** - For providing the UI components.
- **Vite** - For the fast development build tool.
- **React** - For the JavaScript library.
- **Tailwind CSS** - For utility-first CSS framework.
- **Axios** - For promise-based HTTP client.

You can add more sections to your README as your project evolves.
<!-- ### Testing
[Instructions on how to run tests, if applicable.]
### Deployment
[Instructions for deploying the project to a live environment.] -->
