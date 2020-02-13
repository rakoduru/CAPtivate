// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
}
export const getJobdata = () => {
  const jobdata = sessionStorage.getItem('value');
  if (jobdata) return JSON.parse(jobdata);
  else return null;
}


export const getUserid = () => {
  const userid1 = sessionStorage.getItem('userid');
  if (userid1) return JSON.parse(userid1);
  else return null;
}

export const getUsername = () => {
  const userName = sessionStorage.getItem('username');
  if (userName) return userName;
  else return null;
}

export const getJobid = () => {
  const jobid1 = sessionStorage.getItem('jobid');
  if (jobid1) return jobid1;
  else return null;
}

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('token') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
}
/*export const getDate = () => {
  const date = sessionStorage.getItem('date');
  if (date) return date;
  else return null;
}
export const getLocation = () => {
  const location = sessionStorage.getItem('location');
  if (location) return location;
  else return null;
}
export const getTemp = () => {
  const temp = sessionStorage.getItem('temp');
  if (temp) return temp;
  else return null;
}*/
// set the token and user from the session storage
export const setUserSession = (token, user, userid) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', JSON.stringify(user));
}
/*export const setJobSession = (date, id, temp) => {
  sessionStorage.setItem('date', date);
  sessionStorage.setItem('loaction', JSON.stringify(id));
  sessionStorage.setItem('temp', temp);
}*/
export const setJobSession = (value) => {
  sessionStorage.setItem('value', JSON.stringify(value));
}

export const setUsername = (username) => {
  sessionStorage.setItem('username', username);
  //sessionStorage.setItem('user', JSON.stringify(user));
  //sessionStorage.setItem('userid', userid);
}
export const setJobid = (id) => {
  sessionStorage.setItem('jobid', id);
  //sessionStorage.setItem('user', JSON.stringify(user));
  //sessionStorage.setItem('userid', userid);
}
