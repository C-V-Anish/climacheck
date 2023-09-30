# ClimaCheck - Weather Forecast Application

ClimaCheck is a weather forecast application that allows users to search for weather conditions in specific locations. It provides current weather conditions, temperature, and humidity data for the selected location. This application is designed to be responsive, working seamlessly on both desktop and mobile devices.

## Features

- **Search by Location**: Users can search for weather conditions in any location worldwide.

- **Current Weather Data**: ClimaCheck displays real-time weather information, including temperature and humidity, for the selected location.

- **Responsive Design**: The application is designed to be responsive, ensuring a great user experience on both desktop and mobile devices.

- **API Integration**: ClimaCheck uses the OpenWeather API to retrieve accurate and up-to-date weather data.

- **Front-End Framework**: The front-end of ClimaCheck is built using React, a popular and powerful JavaScript framework for creating user interfaces.

- **Back-End Framework**: The back-end of ClimaCheck is powered by Django, a high-level Python web framework known for its reliability and scalability.

- **Cloud Hosting**: ClimaCheck is hosted on a cloud-based platform, specifically Google Cloud, ensuring high availability and scalability.

## OpenWeather API Integration

ClimaCheck utilizes the OpenWeather API to provide accurate and up-to-date weather information for locations around the world. OpenWeather API offers a wide range of weather data, including current weather conditions, temperature, humidity, wind speed, and more.

### How it Works

- When a user searches for weather conditions in a specific location, ClimaCheck makes a request to the OpenWeather API with the latitude and longitude coordinates of the chosen location.

- The OpenWeather API responds with the current weather data for the specified location, including detailed information about the weather conditions.

- ClimaCheck then processes and displays this weather data to the user in an easily understandable format.

### API Key Setup

To use the OpenWeather API with ClimaCheck, you'll need to obtain an API key from the [OpenWeather website](https://openweathermap.org/). Follow these steps:

1. Sign up for an account on the [OpenWeather website](https://openweathermap.org/).

2. Once logged in, navigate to the API Keys section and generate a new API key.

3. Copy the generated API key.

4. In your ClimaCheck project, configure the API key as an environment variable, as explained in the Configuration section of this README.

## Technologies Used

- Front-End: React
- Back-End: Django
- Hosting: Google Cloud Platform
- Weather Data: OpenWeather API

## Usage

To use ClimaCheck, follow these steps:

1. Clone this repository to your local machine.

2. Install the necessary dependencies for both the front-end and back-end.

3. Set up your API credentials (if applicable) and configure the application.

4. Run the application locally or deploy it to your preferred hosting platform (e.g., Google Cloud).

## Installation

Use the following commands to set up ClimaCheck locally:

```bash
# Clone the repository
git clone https://github.com/yourusername/climacheck.git

# Navigate to the project directory
cd climacheck

# Install front-end dependencies
cd frontend
npm install

# Install back-end dependencies
cd ../backend
pip install -r requirements.txt
