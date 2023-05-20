import React, { useState, useEffect } from 'react';
import './MyPage.css';
import axios from '../api/axios';

const MYPAGE_URL = '/mypage';

function MyPage() {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
  
    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
            const response = await axios.get(MYPAGE_URL);
            const { username, userData } = response.data;

            setUsername(username);
            setUserData(userData);

            if(userData) {
                setAge(userData[0].age);
                setSex(userData[0].sex);
                setHeight(userData[0].height);
                setWeight(userData[0].weight);
      
                console.log('--------------------------');
                console.log('username:', username);
                console.log('User Data:', userData);
                console.log("age:", userData[0].age);
                console.log("sex:", userData[0].sex);
                console.log("height:", userData[0].height);
                console.log("weight:", userData[0].weight);
                console.log('--------------------------');
            }

        } catch (error) {
            console.error('Error fetching user info:', error);
        }
      };
  
      fetchUserInfo();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                MYPAGE_URL,
                JSON.stringify({ age, sex, height, weight }),
                {
                headers: { 'Content-Type': 'application/json' },
                }
            );
            // 업데이트 성공 시 필요한 작업 수행
        
        } catch (err) {
            // 업데이트 실패 시 필요한 작업 수행
        }
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
                  value={username}
                  readOnly
                />
                <label htmlFor="email">Age</label>
                <input
                  type="integer"
                  id="age"
                  name="age"
                  value={age}
                  onChange={(e)=>setAge(e.target.value)}

                />
                <label htmlFor="sex">Sex</label>
                <select name="sex" id="sex" value={sex} onChange={(e)=>setSex(e.target.value)}>
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
              value={height}
              onChange={(e)=>setHeight(e.target.value)}

            />
            <label htmlFor="weight">Weight</label>
            <input
              type="float"
              id="weight"
              name="weight"
              value={weight}
              onChange={(e)=>setWeight(e.target.value)}

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

          <button type="submit">Save</button>
        </div>
      </form>
    </section>
  );
}

export default MyPage;