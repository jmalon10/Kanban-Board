import { useState, FormEvent, ChangeEvent } from "react";
import Auth from '../utils/auth';
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token);
      setErrorMessage(null); // Clear error message if login is successful
    } catch (err) {
      console.error('Failed to login', err);
      setErrorMessage('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        <label>Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username}
          onChange={handleChange}
        />

        <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password}
          onChange={handleChange}
        />
        
        <button type='submit'>Submit Form</button>
      </form>
    </div>
  )
};

export default Login;

