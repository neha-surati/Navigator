import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function Form() {
  let [data, setData] = useState({});
  let [hobby, setHobby] = useState([]);
  let [error, setError] = useState({});
  let navigate = useNavigate();

  let handleInput = (e) => {
    let { name, value } = e.target;
    let newHobby = [...hobby];
    if (name === "hobby") {
      if (e.target.checked) {
        newHobby.push(value);
      } else {
        let pos = newHobby.findIndex((v) => value === v);
        newHobby.splice(pos, 1);
      }
    }
    setHobby(newHobby);
    setData({ ...data, [name]: name === "hobby" ? newHobby : value });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    if (!validationForm()) return;
    fetch('http://localhost:3000/user', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(() => {
      toast.success("Data Added.");
    }).catch((err) => {
      console.log(err);
    });
    setTimeout(() => {
      navigate('/userRecode');
    }, 500);
  };

  let validationForm = () => {
    let tempErrors = {};
    if (!data.username) tempErrors.username = "Username is required.";
    if (!data.email) tempErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(data.email)) tempErrors.email = "Invalid email format.";
    if (!data.password) tempErrors.password = "Password is required.";
    if (!data.gender) tempErrors.gender = "Gender is required.";
    if (!hobby.length) tempErrors.hobby = "At least one hobby is required.";
    if (!data.city) tempErrors.city = "City is required.";
    if (!data.address) tempErrors.address = "Address is required.";
    setError(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  return (
    <div className="form-container">
      <form method="post" onSubmit={handleSubmit}>
        <h2 className="form-title">Add User Data</h2>
        <Link to="/userRecode" className="view-record-link">View Record</Link>

        <div className="form-group">
          <label>UserName</label>
          <input type="text" name="username" onChange={handleInput} />
          {error.username && <span className="error-message">{error.username}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="text" name="email" onChange={handleInput} />
          {error.email && <span className="error-message">{error.email}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" onChange={handleInput} />
          {error.password && <span className="error-message">{error.password}</span>}
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="gender-options">
            <input type="radio" name="gender" value="male" onChange={handleInput} /> Male
            <input type="radio" name="gender" value="female" onChange={handleInput} /> Female
          </div>
          {error.gender && <span className="error-message">{error.gender}</span>}
        </div>

        <div className="form-group">
          <label>Hobby</label>
          <div className="hobby-options">
            <input type="checkbox" name="hobby" value="Dance" onChange={handleInput} /> Dance
            <input type="checkbox" name="hobby" value="Writing" onChange={handleInput} /> Writing
          </div>
          {error.hobby && <span className="error-message">{error.hobby}</span>}
        </div>

        <div className="form-group">
          <label>City</label>
          <select name="city" onChange={handleInput}>
            <option value="" disabled selected>--select-city--</option>
            <option value="surat">Surat</option>
            <option value="pune">Pune</option>
          </select>
          {error.city && <span className="error-message">{error.city}</span>}
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea name="address" onChange={handleInput}></textarea>
          {error.address && <span className="error-message">{error.address}</span>}
        </div>

        <div className="form-group">
          <input type="submit" value="Add Record" className="submit-btn" />
        </div>
      </form>

      <ToastContainer       
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Form;
