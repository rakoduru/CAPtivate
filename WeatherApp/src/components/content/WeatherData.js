import React, { useState } from 'react';
import { Row } from 'simple-flexbox';
import "./Form.css";
import { StyleSheet, css } from 'aphrodite/no-important';
import Jobs from "../../Jobs"
import axios from 'axios';
import {default as UUID} from "uuid";
import { getUser, getUserid, setJobid, getJobid, setUserSession, getUsername, setUsername } from '../../Utils/Common';

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
  const userid = getUsername();
  const [loading, setLoading] = useState(false);
  const date = useFormInput('');
  const zipcode = useFormInput('');
  const [error, setError] = useState(null);
  const jobid = UUID.v4();
  setJobid(jobid);
  //const del = getJobid();
  /*constructor(props) {
   super(props);
   this.state = {
      jobid: ''
   }
   this.updateState = this.updateState.bind(this);
  };
  updateState() {
   this.setState({jobid: UUID.v4()})
 }*/
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
      axios.post('http://localhost:8080/data-retrieval', { date: date.value, location_id: 'ZIP:' + zipcode.value, user_id : userid, job_id: jobid, status: "In-Progress" },
      //axios.post('http://api-gateway:8080/data-retrieval', { date: date.value, location_id: 'ZIP:' + zipcode.value, user_id : userid, job_id: jobid, status: "In-Progress" },
        {headers: {
            'Content-Type': 'application/json',
        }}).then(response => {
        setLoading(false);
        //setUserSession(response.data.accessToken, response.data.user, response.data.userid);
        //setUserSession(response.data.accessToken);
        //setUserSession(response.data.userid);
      }).catch(error => {
        setLoading(false);
        //if (error.response.status === 401) setError(error.response.data.message);
        //else setError("Something went wrong. Please try again later.");
        setError("Something went wrong. Please try again later.");
      });
    } catch (ex) {
      console.log(ex.message);
    }
    return (alert('Successfully submitted details! Please come back and check jobs page for your results'));
    //return (alert(del));
    props.history.push('/jobs');
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
                  <input type="text" {...date} name="date" placeholder="Date(YYYY-MM-DD)" />
                  <input type="text" {...zipcode} name="zipcode" placeholder="Zipcode..." />
                  <button className="form-button" onClick={getWeather}>get Weather</button>
                  <input type="reset" defaultValue="Reset" />
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
