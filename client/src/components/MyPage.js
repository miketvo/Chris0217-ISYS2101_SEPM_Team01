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
    const [allergen, setAllergen] = useState('')
    const [unpIngredients, setUnpIngredients] = useState('')
  
    const [editMode, setEditMode] = useState(false);


    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
            const response = await axios.get(MYPAGE_URL);
            const { username, userData } = response.data;

            setUsername(username);
            setUserData(userData);

            if(userData) {
                console.log('--------------------------');
                console.log('username:', username);
                console.log('User Data:', userData);
                console.log("age:", userData[0].age);
                console.log("sex:", userData[0].sex);
                console.log("height:", userData[0].height);
                console.log("weight:", userData[0].weight);
                console.log("allergen:", userData[0].allergen);
                console.log("unpIngredients:", userData[0].unpreferred_ingredients);
                console.log('--------------------------');
                
                setAge(userData[0].age);
                setSex(userData[0].sex);
                setHeight(userData[0].height);
                setWeight(userData[0].weight);
                setAllergen(userData[0].allergen);
                setUnpIngredients(userData[0].unpreferred_ingredients)
            }

        } catch (error) {
            console.error('Error fetching user info:', error);
        }
      };
  
      fetchUserInfo();
    }, []);

    const handleMode = async (e) => {
      e.preventDefault();
      if (editMode) {
        setAge(userData[0].age);
        setSex(userData[0].sex);
        setHeight(userData[0].height);
        setWeight(userData[0].weight);
        setAllergen(userData[0].allergen);
        setUnpIngredients(userData[0].unpreferred_ingredients)
        setEditMode(false);
      } else {
        setEditMode(true)
      }
    };

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
            alert("Your information is updated!");
            setEditMode(false)
        } catch (err) {
            alert("Update failed to proceed.")
            handleMode();
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
                src={require("../images/user_picture.png")}
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
                  type="number"
                  id="age"
                  name="age"
                  value={age}
                  onChange={(e)=>setAge(e.target.value)}
                  readOnly={editMode ? false: true}
                />
                <label htmlFor="sex">Sex</label>
                
                {editMode 
                  ? 
                  <select name="sex" id="sex" value={sex} onChange={(e)=>setSex(e.target.value)}>
                    <option selected hidden>Select to change</option>
                    <option value="F">Female</option>
                    <option value="M">Male</option>
                  </select> 
                  : 
                  <input
                  type="text"
                  id="name"
                  name="name"
                  value={sex}
                  readOnly
                />
                }
              </div>
            </div>
            <br></br>
            <div class="forms">
              <div class="hw">
                <div>
                  <label htmlFor="height">Height (cm)</label>
                  <input
                    type="number"
                    step="0.01"
                    id="height"
                    name="height"
                    value={height}
                    onChange={(e)=>setHeight(e.target.value)}
                    readOnly={editMode ? false: true}
                  />
                </div>
                <br></br>
                <div>
                  <label htmlFor="weight">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.01"
                    id="weight"
                    name="weight"
                    value={weight}
                    onChange={(e)=>setWeight(e.target.value)}
                    readOnly={editMode ? false: true}
                  />
                </div>
              </div>
              <div class="divBmi">
                <div>
                  <label htmlFor="bmi">BMI</label>
                  <input
                    type="number"
                    step="0.01"
                    id="bmi"
                    name="bmi"
                    value={(weight/((height/100)^2)).toFixed(2)}
                    onChange={(e)=>setWeight(e.target.value)}                  
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div class="divBmiImg">
              <img
                  src={require("../images/BMIscale.png")}
                  className="bmi"
                  alt="BMI_scale"
                />
            </div>
          </div>
          <div class="condition">
            <h2>Condition</h2>
            <label for="allergen">Allergens</label>
            <input
                  type="text"
                  id="name"
                  name="name"
                  value={allergen}
                  readOnly
                />
            {editMode 
              ? 
              <select name="allergen" id="allergen" /*onChange={(e)=>setAllergens(e.target.value)*/>
                <option selected hidden >Select to change</option>
                <option value="apple">Apple-free</option>
                <option value="cranberry">Cranberry-free</option>
                <option value="peach">Peach-free</option>
                <option value="peanut">Peanut-free</option>
                <option value="raison">Raison-free</option>
              </select>
              : 
              false
            }
            <label for="unpreferred">Unpreferred Ingredients</label>
            <input
                  type="text"
                  id="name"
                  name="name"
                  value={unpIngredients}
                  readOnly
                />
            {editMode 
              ? 
              <select name="unpreferred" id="unpreferred" /*onChange={(e)=>setIngredients(e.target.value)*/>
                <option selected hidden>Select to change</option>
                <option value="apple">Apple-free</option>
                <option value="cranberry">Cranberry-free</option>
                <option value="peach">Peach-free</option>
                <option value="peanut">Peanut-free</option>
                <option value="raison">Raison-free</option>
              </select>
              : 
              false
            }
          </div>
        </div>
        <div class="buttons" >
          <button type="changeMode" onClick={handleMode}>{editMode ? 'Cancel' : 'Edit'}</button>
          <button type="submit" disabled={editMode ? false: true}>Save</button>
        </div>
      </form>
    </section>
  );
}

export default MyPage;