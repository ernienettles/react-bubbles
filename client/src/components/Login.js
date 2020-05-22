import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const Login = () => {
  
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  
  const history = useHistory();

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
		axiosWithAuth()
			.post('/api/login', values)
			.then(res => {
        console.log(res.data.payload)
				localStorage.setItem('token', res.data.payload);
				history.push('/protected');
			})
			.catch((error) => {
				console.log('Post error ', error);
      })
    };
  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>Username</label>
          <div>
            <input
              name="username"
              type="username"
              onChange={handleChange}
              value={values.username}
            />
          </div>
        </div>
        <div>
          <label>Password</label>
          <div>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              value={values.password}
            />
          </div>
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};
export default Login;