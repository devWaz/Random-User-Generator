import {  useState , useEffect } from "react";

const Main = () => {
    const [user , setUser] = useState();
    const [isLoading , setIsLoading] = useState(true);
    const [errorMessage , setErrorMessage] = useState(null);

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
          <div className="message">
          { isLoading && <div className="whileLoading">Loading....</div> }
          { errorMessage && <div className="whileLoading">{ errorMessage }</div> }
          </div>
             <div className="profile">  
              {user &&  
              <div className="profile-card">
                  <div className="next">
                    <h2>{user.name.first} {user.name.last}</h2>
                    <button onClick={fetchUser}>New User</button>
                  </div>

                  <div className="details">
                      <img src={user.picture.large} alt="Avatar"/> 
                      <div className="detailsContainer">
                        <div className="personal">
                          <h2>Personal Details</h2>
                          <p>First Name: {user.name.first}</p>
                          <p>Last Name: {user.name.last}</p>
                          <p>Age: {user.dob.age}</p>
                          <p>Email: {user.email}</p>
                        </div> 
                        <div className="personal">
                          <h2>Other Details</h2>
                          <p>Phone No: {user.phone}</p>
                          <p>Username: {user.login.username}</p>
                          <p>City: {user.location.city}</p>
                          <p>State: {user.location.state}</p>
                          <p>Country: {user.location.country}</p>
                        </div>
                      </div>
                  </div>    
                 </div> }   
            </div>
        </div>
    );
 }

 export default Main;

