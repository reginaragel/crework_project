import React, { useState, useContext, useEffect } from "react";
import './Editor.css';
import { assets } from "../assests/assets";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";
import TaskPage from "./TaskPage";
const Editor = () => {
    const {state}=useLocation();
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState('');
    const [description, setDescription] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [tasks,setTasks]=useState([]);
    const { token } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
    if(!title || !status || !priority || !deadline || !description){
        alert('Provide Input ');
        return;
    }

        const data = {
            title,
            status,
            priority,
            deadline,
            description,
        }
        console.log(data)
        const response = await fetch('http://localhost:5001/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
            credentials: 'include',
        })
        if (response.ok) {
            alert('Task saved successfully')
            setRedirect(true)
        } else {
            console.error('Failed to create task', await response.json());
        }
    }
    useEffect(()=>{
        if (redirect) {
            fetchTasks();
        }
    },[redirect]);

    const fetchTasks=async()=>{
        const response=await fetch('http://localhost:5001/tasks',{
            method:'GET',
            headers:{
                'Authorization':`Bearer ${token}`
            },
            credentials:'include',
        })
        console.log(fetchTasks)
        if(response.ok){
            const data=await response.json();
            setTasks(data);
            console.log(data)
        }else{
            console.error('Failed to fetch tasks',await response.json())
        }
    }
    if(redirect){
        return(
            <div>
                <Navigate to={'/main'}/>
                <div className="task-list">
                    {
                        tasks.map(task=>(
                            <TaskPage key={task.id} task={task}/>
                        ))
                    }
                </div>
            </div>
        )
    }
    

    return (
        <form className="editor" onSubmit={handleSubmit}>
            <div className="main-box">
                <div className="main2-box">
                    <div className="top-tier">
                        <div className="symbol">
                            <img src={assets.wrong_icon} />
                            <img src={assets.expand_icon} />
                        </div>
                        <div className="activity">
                            <div className="sharing">
                                <h3>Share<span><img src={assets.share_icon} /></span></h3>
                            </div>
                            <div className="favorite">
                                <h3>Favorite<span><img src={assets.star_icon} /></span></h3>
                            </div>
                        </div>
                    </div>
                    <div className="second-tier">
                        <div className="title">
                            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="details">
                            <div className="status">
                                <img src={assets.status_icon} /><span>Status</span>
                            </div>
                            <div className="prior">
                                <img src={assets.prior_icon} /><span>Priority</span>
                            </div>
                            <div className="deadline">
                                <img src={assets.calendar_icon} /><span>Deadline</span>
                            </div>
                            <div className="description">
                                <img src={assets.pen_icon} /><span>Description</span>
                            </div>
                        </div>
                        <div className="property">
                            <img src={assets.newplus_icon} />
                            <span>Add custom property</span>
                        </div>
                        <div className="selector">
                            <div className="s1">
                                <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
                            </div>
                            <div className="s2">
                                <input type="text" value={priority} onChange={(e) => setPriority(e.target.value)} />
                            </div>
                            <div className="s3">
                                <input type="text" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                            </div>
                            <div className="s4">
                                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <button id='btn1' type="submit">Save task</button>
                
            </div>
        </form>
    )
}

export default Editor;
