import React, { useState } from 'react';
import debounceRender from 'react-debounce-render'
import { getUser, getUserid, getJobid, removeUserSession, setJobSession, getUsername, getDate, getLocation, getTemp, getJobdata } from './Utils/Common';
import axios from 'axios';

function Jobs(props){
  //const sleep = m => new Promise(r => setTimeout(r,m));
  //await sleep(10000);
  const userid = getUsername();
  const jobid = getJobid();
  //const jobdetails = getJobdata();
  //var val = false;
  //const date = getDate();
  //const location = getLocation();
  //const temperature = getTemp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flagvar, setflagvar] = useState(0);
  const [data, setData] = useState([])
  const handlejobs = () => {
    try {
      setError(null);
      setLoading(true);
      axios.get('http://localhost:3005/getbyid?user_id=' + userid).then(response => {
      //axios.get('http://session-management-service:3005/getbyid?user_id=' + userid).then(response => {
        setLoading(false);
        //setJobSession(response.data.value.date, response.data.value.location_id, response.data.value.tmax);
        console.log(response.data);
        setJobSession(response.data);
        setflagvar(flagvar+1);
        setData(response.data)
        //setVal(true);
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

    //val = getValue();
    //console.log("value" + val);
    //console.log('raas' + jobdetails[0].location_id);
}
const jobdetails = getJobdata();
//console.log("jooooooooooobs " + jobdetails[1].tmax);
/*return Object.keys(this.state.response).map( (row, index) => (
     <TableRow key={index} selected="false">
         <TableRowColumn>Test</TableRowColumn>
         <TableRowColumn>Test</TableRowColumn>
     </TableRow>
)) */
  //console.log(val);
  /*const handleCopy = () => {
    try {
      setError(null);
      setLoading(true);
      axios.post('http://localhost:8080/data-retrieval', { date: date.value, location_id: 'ZIP:' + zipcode.value, user_id : userid, job_id: jobid },
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

}*/
  const renderTable = () => {
    return data.map(value => {
      if(value.tmax){
        return (
          <tr>
            <td>{value.date}</td>
            <td>{value.location_id}</td>
            <td>{value.tmax}</td>
            <td>{value.tmin}</td>
            <td>{value.comment}</td>
            <td>{value.status}</td>
          </tr>
        )
      }
      else{
        return (
          <tr>
            <td>{value.date}</td>
            <td>{value.location_id}</td>
            <td>Fetching...</td>
            <td>Fetching...</td>
            <td>Fetching...</td>
            <td>{value.status}</td>
          </tr>
        )
      }
    })
  }

  if(flagvar==0 ){
    return(
      <div>
      Hi {userid} :
      <input type="button" value={loading ? 'Loading...' : 'Fetch Jobs'} onClick={handlejobs} disabled={loading} /><br />

      </div>
    );
  }
  else {

    return(
      /*<div>
          Here are your job details : <br></br>

          Temperature : {jobdetails[0].tmax}<br></br>
          Date : {jobdetails[0].date}<br></br>
          Location : {jobdetails[0].location_id}<br></br>
        </div>*/

      <div>
      <h1 id="title">Jobs</h1>
      <table id="users" border = "1" >
        <thead>
          <tr>
            <th>Date</th>
            <th>Location</th>
            <th>Max-Temperature</th>
            <th>Min-Temperature</th>
            <th>Comment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
      <input type="button" value={loading ? 'Loading...' : 'Refresh'} onClick={handlejobs} disabled={loading} /><br />
    </div>
      );

  }

}


export default debounceRender(Jobs, 10000);
