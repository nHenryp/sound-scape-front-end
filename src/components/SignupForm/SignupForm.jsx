import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService'

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password_confirmation: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()  
    try {
      const newUserResponse = await authService.signup(formData) 
      props.setUser(newUserResponse.user)
      navigate('/') 
    } catch (error) {
      updateMessage(error.message)
    }
  }


  const { username, password, password_confirmation } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === password_confirmation);
  };

  return (
    <main>
      <p>{message}</p>
      <div className='wrapper'>
        <div className='auth-form'>
        <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className='input-box'>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="name"
            value={username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className='input-box'>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className='input-box'>
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            type="password"
            id="confirm"
            value={password_confirmation}
            name="password_confirmation"
            onChange={handleChange}
          />
        </div>
        <div>
          <button disabled={isFormInvalid()}>Sign Up</button>
          <Link to="/">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
      </div>
      </div>
    </main>
  );
};

export default SignupForm;