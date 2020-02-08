import React from 'react';
import { Row } from 'simple-flexbox';
import Weather from "./Weather";
import "./Form.css";
import { StyleSheet, css } from 'aphrodite/no-important';

const apiKey = "8ddceeacaf8b95fe943c88fc8389dee0";

const Title = () => {
  return (
    <div>
      <h2 className="title-container__subtitle">
        Find out temperature, weather conditions and more...
      </h2>
    </div>
  );
};

const Form = ({ onWeather }) => {
  return (
    <form onSubmit={e => onWeather(e)}>
      <input type="text" name="city" placeholder="City..." />
      <input type="text" name="country" placeholder="Country..." />
      <button className="form-button">get Weather</button>
    </form>
  );
};
const styles = StyleSheet.create({
    itemTitle: {
        fontFamily: 'Muli',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: '0.2px',
        color: '#252733'
    },
    itemValue: {
        color: '#9FA2B4'
    }
});

class WeatherData extends React.Component {
  state = {
  temperature: undefined,
  city: undefined,
  country: undefined,
  humidity: undefined,
  description: undefined,
  error: undefined
};

getWeather = async e => {
  e.preventDefault();
  const city = e.currentTarget.elements.city.value;
  const country = e.currentTarget.elements.country.value;
  if (city && country) {
    try {
      const apiCall = await fetch(
        `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`
      );
      const { main, sys, name, weather } = await apiCall.json();
      this.setState({
        temperature: main.temp,
        city: name,
        country: sys.country,
        humidity: main.humidity,
        description: weather[0].description,
        error: ""
      });
    } catch (ex) {
      console.log(ex.message);
    }
  } else {
    this.setState({
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: "please enter a valid values."
    });
  }
};



    render() {
        return (
          <div className="wrapper">
        <div className="main">
          <div className="container" style={{ width: "100%" }}>
            <div className="row">
              <div className="col-xs-5 title-container">
                <Title />
              </div>
              <div className="col-xs-7 form-container">
                <Form onWeather={this.getWeather} />
                <Weather
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
        );
    }
}

export default WeatherData;
