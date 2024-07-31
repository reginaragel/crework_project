import React, { useState,useEffect ,useContext} from "react";
import './EditPage.css';
import { assets } from "../assests/assets";
import { Navigate,useLocation,useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
const EditPage=()=>{
    const {state}=useLocation();
    const {id}=useParams();
    const [title, setTitle] = useState(state?.task?.title || '');
    const [status, setStatus] = useState(state?.task?.status || '');
    const [priority, setPriority] = useState(state?.task?.priority || '');
    const [deadline, setDeadline] = useState(state?.task?.deadline || '');
    const [description, setDescription] = useState(state?.task?.description || '');
    const [redirect, setRedirect] = useState(false);
    const { token } = useContext(UserContext);

    const handleUpdate=async(e)=>{
        e.preventDefault();
        const data={
            title,
            status,
            priority,
            deadline,
            description,
            id
        }

        console.log(data)
      
        try{

        const response=await fetch('http://localhost:5001/create',{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify(data),
            credentials:'include',
        })
        console.log(token)
        console.log(data)
        if(response.ok){
            setRedirect(true)
        }
    }
    catch(err){
      console.log(data)  
      console.log(err);
    }
    }
    if(redirect){
        return <Navigate to={'/main'}/>
    }
    return(
        <form className="editor" onSubmit={handleUpdate}>
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
            <button id='btn1' type="submit">Update task</button>
        </div>
    </form>
    )
}

export default EditPage