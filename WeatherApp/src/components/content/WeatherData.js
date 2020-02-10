import React, { useState } from 'react';
import { Row } from 'simple-flexbox';
import Weather from "./Weather";
import "./Form.css";
import { StyleSheet, css } from 'aphrodite/no-important';
import Jobs from "./Jobs"
import axios from 'axios';

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

function WeatherData(props) {
  const [loading, setLoading] = useState(false);
  const date = useFormInput('');
  const zipcode = useFormInput('');
  const [error, setError] = useState(null);
const Title = () => {
  return (
    <div>
      <h2 className="title-container__subtitle">
        Find out temperature, weather conditions and more...
      </h2>
    </div>
  );
};


const getWeather = () => {
  //preventDefault();

    try {
      setError(null);
      setLoading(true);
      axios.post('http://localhost:8080/data-retrieval/', { startdate: date.value, locationid: 'ZIP:' + zipcode.value }).then(response => {
        setLoading(false);
        //setUserSession(response.data.token, response.data.user);
        //setUserSession(response.data.accessToken);
        props.history.push('/Jobs');
      }).catch(error => {
        setLoading(false);
        //if (error.response.status === 401) setError(error.response.data.message);
        //else setError("Something went wrong. Please try again later.");
        setError("Something went wrong. Please try again later.");
      });
    } catch (ex) {
      console.log(ex.message);
    }
    return (alert('Your details are being fetched..!'));
}

        return (
          <div className="wrapper">
        <div className="main">
          <div className="container" style={{ width: "100%" }}>
            <div className="row">
              <div className="col-xs-5 title-container">
                <Title />
              </div>
              <div className="col-xs-7 form-container">
                  <input type="text" name="date" placeholder="Date..." />
                  <input type="text" name="zipcode" placeholder="Zipcode..." />
                  <button className="form-button" onClick={getWeather}>get Weather</button>
              </div>
            </div>
          </div>
        </div>
      </div>
        );
}
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default WeatherData;
