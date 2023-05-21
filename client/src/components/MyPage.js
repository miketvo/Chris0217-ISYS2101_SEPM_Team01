import React, { useState, useEffect } from 'react';
import Select from 'react-select';
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
    const [allergen, setAllergen] = useState([])
    const [unpIngredients, setUnpIngredients] = useState([])

    const [editMode, setEditMode] = useState(false);

    const [selectedIngredients, setSelectedIngredients] = useState();
    const [selectedAllergens, setSelectedAllergens] = useState();

    const [allIngredients, setAllIngredients] = useState(null);
    useEffect(() => {
      axios.get("http://localhost:3500/api/allIngredients")
      .then((response)=>{
        setAllIngredients(response.data.map(ing => ({value:ing, label:ing})))
      })
    }, [])

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
                setAllergen(JSON.parse(userData[0].allergen));
                setUnpIngredients(JSON.parse(userData[0].unpreferred_ingredients));
                setSelectedAllergens((JSON.parse(userData[0].allergen).map(allergy => ({value:allergy, label:allergy}))));
                setSelectedIngredients((JSON.parse(userData[0].unpreferred_ingredients).map(ing => ({value:ing, label:ing}))));
            }

        } catch (error) {
            console.error('Error fetching user info:', error);
        }
      };
  
      fetchUserInfo();
    }, []);


    function handleIngredientsSelect(data) {
      setSelectedIngredients(data);
      const newIngredients = data.map(o => o.value);
      setUnpIngredients(newIngredients);
    }
    
    const allAllergens = [{ value: 'Alcohol-Free', label: "Alcohol" }, { value: 'Celery-Free', label: "Celery" }, { value: 'Crustcean-Free', label: "Crustcean" },{ value: 'Dairy-Free', label: "Dairy" }, { value: 'Egg-Free', label: "Egg" }, { value: 'Fish-Free', label: "Fish" }, { value: 'FODMAP-Free', label: "FODMAP" }, { value: 'Gluten-Free', label: "Gluten" }, { value: 'Lupine-Free', label: "Lupine" }, { value: 'Mollusk-Free', label: "Mollusk" }, { value: 'Mustard-Free', label: "Mustard" }, { value: 'Peanut-Free', label: "Peanut" }, { value: 'Pork-Free', label: "Pork" }, { value: 'Red-Meat-Free', label: "Red-Meat" }, { value: 'Sesame-Free', label: "Sesame" }, { value: 'Shellfish-Free', label: "Shellfish" }, { value: 'Soy-Free', label: "Soy" }, { value: 'Sulfite-Free', label: "Sulfite" }, { value: 'Tree-Nut-Free', label: "Tree-Nut" }, { value: 'Wheat-Free', label: "Wheat" }];
    
    function handleAllergensSelect(data) {
      setSelectedAllergens(data);
      const newAllergens = data.map(o => o.value);
      setAllergen(newAllergens);
    }



    const handleMode = async (e) => {
      e.preventDefault();
      if (editMode) {
        setEditMode(false);
        setAge(userData[0].age);
        setSex(userData[0].sex);
        setHeight(userData[0].height);
        setWeight(userData[0].weight);
        setAllergen(JSON.parse(userData[0].allergen));
        setUnpIngredients(JSON.parse(userData[0].unpreferred_ingredients));
        setSelectedAllergens((allergen.map(allergy => ({value:allergy, label:allergy}))));
        setSelectedIngredients((unpIngredients.map(ingredient => ({value:ingredient, label:ingredient}))));
      } else {
        setEditMode(true)
      }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                MYPAGE_URL,
                JSON.stringify({ age, sex, height, weight, allergen, unpIngredients }),
                {
                headers: { 'Content-Type': 'application/json' },
                }
            );
            alert("Your information is updated!");
            setSelectedAllergens();
            setSelectedIngredients();
            setEditMode(false)
        } catch (err) {
            alert("Update failed to proceed.")
            handleMode();
        }
    };


  return (
      <section class="mypage_section">
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
              {allergen===null||allergen.length===0
                ? 
                <input class="loopInput" type="text" id="name" name="name" value="" readOnly/> 
                :
                allergen.map(allergy => <input class="loopInput" type="text" id="name" name="name" value={allergy} readOnly/>)
              }
              {editMode 
                ? 
                <div class="dropdown-container">
                  <Select 
                    placeholder="Select to change" 
                    options={allAllergens}
                    value={selectedAllergens}
                    onChange={handleAllergensSelect}
                    isSearchable 
                    isMulti
                  />
                </div>
                : 
                false
              }
              <label for="unpreferred">Unpreferred Ingredients</label>
              {unpIngredients===null||unpIngredients.length===0
                ? 
                <input class="loopInput" type="text" id="name" name="name" value="" readOnly/> 
                :
                unpIngredients.map(ingredient => <input class="loopInput" type="text" id="name" name="name" value={ingredient} readOnly/>)
              }
              {editMode 
                ? 
                <div class="dropdown-container">
                  <Select 
                    placeholder="Select to change" 
                    options={allIngredients}
                    value={selectedIngredients}
                    onChange={handleIngredientsSelect}
                    isSearchable 
                    isMulti
                  />
                </div>
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