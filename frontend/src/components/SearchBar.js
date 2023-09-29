import React, { useState, useEffect } from 'react';
import { TextField, Container, Typography, Grid, Paper, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const SearchBar = () => {
  const inputStyles = {
    padding: '12px 14px',
    borderRadius: '25px',
  };

  const iconStyles = {
    cursor: 'pointer', 
  };

  const paperStyles = {
    width: '600px',
    marginTop: '20px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
  };

  const weatherInfoStyles = {
    fontWeight: 'bold',
  };

  const [searchText, setSearchText] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, seterrorMessage] = useState('')

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          try{
            const response = await axios.get('http://127.0.0.1:8000/weather/', {
              params : { latitude: latitude, longitude: longitude }
            });
            seterrorMessage('');
            const conditions = response.data;
            setWeatherData(conditions);
          } catch(error) {
            console.error('Error fetching weather data:', error)
          }
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);  

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/weather/', {
        params : { city: searchText }
      });
  
      if (response.status === 200) {
        seterrorMessage('');
        setWeatherData(response.data);
      }
    } catch (error) {
      setWeatherData(null);
      if (error.message === "Request failed with status code 500") {
        seterrorMessage("City doesn't exist!!");
      } else if (error.message === "Request failed with status code 400"){
        seterrorMessage("Please Enter a city name!!")
      }
    }
  };  

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '100px auto' }}>
      <TextField
        placeholder="Type city name!!"
        variant="outlined"
        fullWidth
        size="small"
        InputProps={{
          style: inputStyles,
          endAdornment: (
            <InputAdornment 
              position="end"
              color="primary"
              aria-label="search"
              onClick={handleSearch}
              style={iconStyles}
            >
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={searchText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {errorMessage && (
        <Typography variant="subtitle1" color="error" style={{ marginBottom: '10px' }}>
          {errorMessage}
        </Typography>
      )}
      {weatherData && (
        <Paper elevation={3} style={paperStyles}>
          <Typography variant="h6" style={weatherInfoStyles}>Weather Information:</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <p style={weatherInfoStyles}>Location: {weatherData.location}</p>
              <p style={weatherInfoStyles}>Abs. Temperature: {weatherData.abs_temp} °C</p>
              <p style={weatherInfoStyles}>Max. Temperature: {weatherData.max_temp} °C</p>
              <p style={weatherInfoStyles}>Min. Temperature: {weatherData.min_temp} °C</p>
              <p style={weatherInfoStyles}>Pressure: {weatherData.pressure} atm</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p style={weatherInfoStyles}>Feels Like: {weatherData.feel_temp} °C</p>
              <p style={weatherInfoStyles}>Humidity: {weatherData.humidity}%</p>
              <p style={weatherInfoStyles}>Description: {weatherData.description}</p>
              <p style={weatherInfoStyles}>Wind Speed: {weatherData.wind_speed} m/s</p>
              <p style={weatherInfoStyles}>Precipitation: {weatherData.precipitation}%</p>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Container>
  );
};

export default SearchBar;
