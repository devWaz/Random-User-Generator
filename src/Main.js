import {  useState } from "react";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";


const Main = () => {
    const [user , setUser] = useState({});
    const [isLoading , setIsLoading] = useState(true);
    const [errorMessage , setErrorMessage] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [avatar, setAvatar] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const fetchUser = () => {
      fetch('https://randomuser.me/api')
      .then(res =>{ 
        if (!res.ok){
          throw Error("Could not fetch data");
          }
        return res.json();
      })
      .then(data => {
      setIsLoading(false);
      setErrorMessage(null);
      setUser(data.results[0]);
      setFirstName(data.results[0].name.first);
      setLastName(data.results[0].name.last);
      setAvatar(data.results[0].picture.large)
      setAge(data.results[0].dob.age)
      setCity(data.results[0].location.city)
      setState(data.results[0].location.state)
      })
      .catch(
        err => {
          setIsLoading(false)
          setErrorMessage(err.message)
      }
      )
    }

  useEffect(fetchUser, []);


    return (
        <div className="main">
          <h1>Random User Generator</h1>
          { isLoading && <div className="whileLoading">Loading....</div> }
          { errorMessage && <div className="whileLoading">{ errorMessage }</div> }
          <Fade>
             <div className="profile">  
              {user &&  
              <div className="profile-card">
                      <img src={avatar} alt="Avatar"/> 
                      <div>
                        <p>First Name: {firstName}</p>
                        <p>Last Name: {lastName}</p>
                        <p>Age: {age}</p>
                        <p>City: {city}</p>
                        <p>State: {state}</p>
                      </div>     
                 </div> }   
            </div>
            </Fade>
              <button onClick={fetchUser}>New User</button>
        </div>
    );
 }

 export default Main;

