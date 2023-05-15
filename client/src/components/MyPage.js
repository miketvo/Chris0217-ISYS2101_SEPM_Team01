import React, { useState, useEffect } from 'react';
import './MyPage.css'
// import { ReactSession }  from 'react-client-session';

function MyPage() {
  const [formData, setFormData] = useState({
    // username: ReactSession.get("user"),
    username: sessionStorage.getItem("name"),
    age: '',
    sex:'',
    height: '',
    weight: '',
  });

  // useEffect(() => {
  //   fetch('')
  //     .then(res => res.json())
  //     .then(data => {
  //       setFormData({
  //         username: data.username,
  //         name: data.name,
  //         age: data.age,
  //         sex: data.sex,
  //         height: data.height,
  //         weight: data.weight
  //       });
  //     })
  //     .catch(error => console.log(error));
  // }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch('', {  
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div class="forms">
          <div class="general">
            <h2>General Information</h2>
            <div class="next">
              <img
                src={require("../images/user_picture.jpg")}
                className="userPic"
                alt="UserPic"
              />
              <div class="formInNext">
                <label htmlFor="name">ID</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.username}
                  onChange={handleChange}
                  readOnly
                />
                <label htmlFor="email">Age</label>
                <input
                  type="integer"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
                <label htmlFor="sex">Sex</label>
                <select name="sex" id="sex">
                  <option value="choose">Choose</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>
            </div>
            <label htmlFor="height">Height</label>
            <input
              type="float"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
            />
            <label htmlFor="weight">Weight</label>
            <input
              type="float"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
          <div class="condition">
            <h2>Condition</h2>
            <label for="allergen">Allergens</label>
            <select name="allergen" id="allergen">
              <option value="choose">Choose</option>
              <option value="apple">Apple-free</option>
              <option value="cranberry">Cranberry-free</option>
              <option value="peach">Peach-free</option>
              <option value="peanut">Peanut-free</option>
              <option value="raison">Raison-free</option>
            </select>
            <label for="unpreferred">Unpreferred Ingredients</label>
            <select name="unpreferred" id="unpreferred">
              <option value="choose">Choose</option>
              <option value="apple">Apple-free</option>
              <option value="cranberry">Cranberry-free</option>
              <option value="peach">Peach-free</option>
              <option value="peanut">Peanut-free</option>
              <option value="raison">Raison-free</option>
            </select>
          </div>
        </div>
        <div class="buttons" >
          <button type="submit">Edit</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </section>
  );
}

export default MyPage;