import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignupPage.css';

const SignupPage=()=>{

    const [userName,setUserName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!userName || !email || !password){
            alert('Please Provide User Details to Signup')
        }
        try{
            const response=await fetch('http://localhost:5001/signup',{
                method:'POST',
                body:JSON.stringify({userName,email,password}),
                headers:{'Content-Type':'application/json'},
            });
            if(response.ok){
                alert('User Registered Successfully!!!!')
            }else{
                throw new Error('Network response was not ok')
            }
        }catch(err){
            console.error('Error While Signing Up',err);
            alert('Registration Failed');
        }
    }
    return(
        <form className='body' onSubmit={handleSubmit}>
            <div className='container'>
            <div className='header'> <h1>Welcome to<span> WorkFlo!</span></h1></div>
            <div className='input-layout'>
                <input type='text' id="name" placeholder='Full name'
                value={userName} onChange={(e)=>setUserName(e.target.value)}/>
                <input type='email' id="email" placeholder='Your email'
                value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type='password' id="password" placeholder='Password'
                value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className='btn' type='submit'>Sign up</button>
            </div>
                
                
                <div className='account-exist'>
                    <h3>Already have an account?</h3><span><Link to={'/login'}><a href='#'>Log in</a></Link></span>
                </div>
                
                </div>
            </form>
    )
}

export default SignupPage