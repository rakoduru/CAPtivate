import React, { useState } from 'react';
import axios from 'axios';
//import { setUserSession,setUsername } from './Utils/Common';

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const name = useFormInput('');
  const email = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    //setUsername(username.value)
    axios.post('http://localhost:8181/api/auth/signup/', { name: name.value, email: email.value, username: username.value, password: password.value }).then(response => {
      setLoading(false);
      //setUserSession(response.data.token, response.data.user);
      if(response.data.sucess){return(alert("Sucessfully Registered. Please signin back!"));}
      props.history.push('/login');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div>
      Register<br /><br />
      <div>
        Name<br />
        <input type="text" {...name} autoComplete="new-password" placeholder="Between 4-40 charecters"/>
      </div>
      <div>
        Email<br />
        <input type="email" {...email} autoComplete="new-password" placeholder=" EX : abc@gmail.com"/>
      </div>
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" placeholder="Between 6-20 charecters" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Registering...' : 'Register'} onClick={handleLogin} disabled={loading} /><br />
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

export default Login;
