import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    location: ''
  });
  const [foodOrder, setFoodOrder] = useState({
    userEmail: '',
    items: [
      {
        id: "65841bde488e724727dba539",
        img: "https://cdn.pixabay.com/photo/2019/11/04/12/16/rice-4601049__340.jpg",
        name: "Chicken Biryani",
        price: 170,
        qty: 1,
        size: "half"
      },
      // Add more items as needed
    ]
  });

  // Function to handle changes in the food order
  const handleChange = (property, value) => {
    setFoodOrder({
      ...foodOrder,
      [property]: value
    });
  };

  // Function to handle changes in the individual food item
  const handleItemChange = (index, property, value) => {
    const updatedItems = [...foodOrder.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [property]: value
    };
    setFoodOrder({
      ...foodOrder,
      items: updatedItems
    });
  };

  // Example of updating user email
  const handleUserEmailChange = (email) => {
    handleChange('userEmail', email);
  };

  // Example of updating the name of the first item
  const handleItemNameChange = (newName) => {
    handleItemChange(0, 'name', newName);
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.location
        })
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert("Enter Valid Credentials");
      }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value});
  };

  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
            <input type="text" className="form-control" name='location' value={credentials.location} onChange={onChange} />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
        </form>
      </div>
    </>
  );
}
