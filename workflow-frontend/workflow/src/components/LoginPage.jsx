import React, { useContext, useState } from "react";
import './LoginPage.css';
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage=()=>{

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [redirect,setRedirect]=useState(false);
    const {setUserInfo}=useContext(UserContext);
    const {setToken}=useContext(UserContext);

    const handleLogin=async(e)=>{
        e.preventDefault();

        if(!email || !password){
            alert('Please provide user credentials')
        }
        try{
            const response=await fetch('http://localhost:5001/login',{
                method:'POST',
                body:JSON.stringify({email,password}),
                headers:{'Content-Type':'application/json'},
                credentials:'include',

            })
            if(!response.ok){
                throw new Error('Network response was not ok')
            }else if(response.ok){
                response.json()
                .then(userInfo=>{
                    setUserInfo(userInfo);
                    setToken(userInfo.token);
                    setRedirect(true)
                })
            }
            console.log('Login Successful')
        }catch(err){
            console.error('Error while Logging In',err);
            alert('Login Failed')
        }
    }
    if(redirect){
        return <Navigate to={'/main'}/>
    }
    return(
        <form className="body" onSubmit={handleLogin}>
        <div className="login-container">
            <div className="heading"><h1>Welcome to <span>WorkFlo!</span></h1></div>
            <div className="login-input">
                <input type="text" id="useremail"placeholder="Your email"
                value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" id="userpassword" placeholder="Password"
                value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className="button" type="submit">Login</button>
            </div>
            <div className="below-text">
                <h3>Don't have an account? <span>Create a<Link to={'/signup'}><a href="Signup.jsx"> new account</a></Link></span></h3>

            </div>
      

        </div>
        </form>
    )
}
export default LoginPage