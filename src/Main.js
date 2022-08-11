import { useState, useEffect } from "react";

const Main = () => {
    const [user , setUser] = useState([]);

    const getUser = () => {
        fetch('https://randomuser.me/api/')
        .then(res => res.json())
        .then(data => {
        setUser(data.results[0]);
        })
    }

    useEffect(()=>{getUser()}, [])

    console.log(user);
    return (
        <div className="main">
            <div>
                <div className="profile-card">
                    {/* <p>First Name: {user.name.first}</p>
                    <p>Last Name: {user.name.last}</p>
                    <p>Location: {user.location.city}, {user.location.state}</p> */}
                </div>
                <button onClick={getUser}>click</button>
            </div>
        </div>
    );
}

export default Main;

