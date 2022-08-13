import {  useState } from "react";
import { useEffect } from "react";


const Main = () => {
    const [user , setUser] = useState({});
    const [isLoading , setIsLoading] = useState(true);
    const [errorMessage , setErrorMessage] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    // const [age, setAge] = useState("");
    // const [location, setlocation] = useState("");

    const fetchUser = () => {
      fetch('https://randomuser.me/api')
      .then(res =>{ 
        if (!res.ok){
          throw Error("Could not fetch data");
          }
        return res.json();
      })
      .then(data => {
      setUser(data.results[0]);
      setFirstName(data.results[0].name.first);
      setLastName(data.results[0].name.last);
      setIsLoading(false);
      setErrorMessage(null);
      })
      .catch(
        err => {
          setIsLoading(false)
          setErrorMessage(err.message)
      }
      )
    }

  useEffect(fetchUser, []);


console.log(user);
console.log(isLoading);
console.log(errorMessage);
    return (
        <div className="main">
             <div className="profile">
              { isLoading && <div>Loading....</div> }
              { errorMessage && <div>{ errorMessage }</div> }
              {user &&  
              <div className="profile-card">
                      {/* <img src={user.picture.medium} alt=""/> */}
                      <div>
                        <p>First Name: {firstName}</p>
                        <p>Last Name: {lastName}</p>
                        {/* <p>Location: {user.location.city}, {user.location.state}</p> */}
                      </div>
                 </div> }
            </div>

              <button onClick={fetchUser}>New User</button>
        </div>
    );
 }

 export default Main;

