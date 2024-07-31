import React, { useEffect, useState } from "react";
import './TaskPage.css';
import { assets } from "../assests/assets";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
const TaskPage=({task})=>{
    const {_id}=useParams();
    if (!task) return null;

    
   
    
    return(
        <Link to={`/task-edit/${task._id}`} className="edit" state={{task}}>
        <div className="grid-box" >
            <div className="square1">
                       
                <div className="mid">
                    <div className="mid-content">
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <h4>{task.priority}</h4>
                                <span><img src={assets.clock_icon}/><p>{task.deadline}</p></span>
                    </div>
                            <div className="time">
                                {/* <time>{formatISO9075(new Date(task.createdAt))}</time> */}
                                <h3>1 hr ago</h3>
                            </div>
                </div>
            </div>

        </div>
        </Link>
    )
}

export default TaskPage