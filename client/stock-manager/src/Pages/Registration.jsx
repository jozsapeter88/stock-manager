import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function Registration() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('api/accounts/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          userName: name, // Assuming username is the same as the name for simplicity
          passWord: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        // Handle successful registration
        // You can also redirect the user to another page here
      } else {
        console.error('Error registering user:', response.statusText);
        // Handle registration error, display an error message, etc.
      }
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle registration error, display an error message, etc.
    }
  };

  return (
    <div className="d-flex align-items-center" style={{ height: '70vh' }}>
      <form className="m-auto" onSubmit={handleRegistration}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            id="name"
            placeholder="Enter name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button variant="primary" type="submit">
          Registration
        </Button>
      </form>
    </div>
  );
}
