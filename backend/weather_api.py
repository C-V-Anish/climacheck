import requests
from dotenv import load_dotenv
import os

# Converts Kelvin temperature to Celsius temperature
def k2c(c_temp):
    return c_temp - 273

# Used to read contents of the .env file
load_dotenv(".env")
api_key = os.getenv("OPEN_WEATHER_API_KEY")

city = input("Enter the City Name : ")

# We retrieve the latitude and longitude of the entered city by calling the geoLoc_URL
geoLoc_URL = f"http://api.openweathermap.org/geo/1.0/direct?q={city}&limit=1&appid={api_key}"

response = requests.get(geoLoc_URL)
data = response.json()

latitude = data[0]["lat"]
longitude = data[0]["lon"]

# Using the retrieved latitude and longitude, we calculate the weather conditions of the given city
weather_URL = f"https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={api_key}"

response = requests.get(weather_URL)
data=response.json()

abs_temp = k2c(data["main"]["temp"])
feel_temp = k2c(data["main"]["feels_like"])
max_temp = k2c(data["main"]["temp_max"])
min_temp = k2c(data["main"]["temp_min"])
pressure = (data["main"]["pressure"])/1000
humidity = data["main"]["humidity"]
description = data["weather"][0]["description"]
wind_speed = data["wind"]["speed"]
precipitation = data["clouds"]["all"]

print(abs_temp, feel_temp, max_temp, min_temp, pressure, humidity, wind_speed, precipitation, description)


