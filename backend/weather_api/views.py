import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from dotenv import load_dotenv
import os

load_dotenv(".env")
api_key = os.environ.get('OPEN_WEATHER_API_KEY')

# Converts Kelvin temperature to Celsius temperature
def k2c(c_temp):
    return round(c_temp-273, 2)

class WeatherInfo(APIView):
    def get(self, request):
        # Used to read contents of the .env file
        city = request.query_params.get('city') or None
        latitude = request.query_params.get('latitude') or None
        longitude = request.query_params.get('longitude') or None
        
        if not city and not latitude and not longitude:
            return Response({"error": "City parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

        # We retrieve the latitude and longitude of the entered city by calling the geoLoc_URL
        geoLoc_URL = f"http://api.openweathermap.org/geo/1.0/direct?q={city}&limit=1&appid={api_key}"

        try:
            if city :
                response = requests.get(geoLoc_URL)
                data = response.json()

                if response.status_code == 200:
                    latitude = data[0]["lat"]
                    longitude = data[0]["lon"]
                    state = data[0]["state"]
                    name = data[0]["name"]

                else:
                    return Response(data, status=response.status_code)
            
            # Using the retrieved latitude and longitude, we calculate the weather conditions of the given city
            weather_URL = f"https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={api_key}"

            response = requests.get(weather_URL)
            data=response.json()
            weather_data = {
                "location": data['name'] + str(", "+state if city else ""),
                "abs_temp": k2c(data["main"]["temp"]),
                "feel_temp": k2c(data["main"]["feels_like"]),
                "max_temp": k2c(data["main"]["temp_max"]),
                "min_temp": k2c(data["main"]["temp_min"]),
                "pressure": (data["main"]["pressure"]) / 1000,
                "humidity": data["main"]["humidity"],
                "description": data["weather"][0]["description"],
                "wind_speed": data["wind"]["speed"],
                "precipitation": data["clouds"]["all"]
            }

            return Response(weather_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
