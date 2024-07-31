import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assests/assets";
import './MainPage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { UserContext } from "./UserContext";
import { Link } from 'react-router-dom';
import TaskPage from "./TaskPage";

const MainPage = () => {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [tasks, setTasks] = useState([]);
    const { token } = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:5001/profile', {
            credentials: 'include',
        })
        .then(response => response.json())
        .then(userInfo => {
            setUserInfo(userInfo);
        })
        .catch(error => {
            console.error('Error Fetching profile', error);
        });
    }, [setUserInfo]);

    useEffect(() => {
        fetch('http://localhost:5001/tasks', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Tasks:", data);
            if (Array.isArray(data)) {
                setTasks(data);
            } else {
                console.error('Unexpected data format:', data);
                setTasks([]);
            }
        })
        .catch(error => {
            console.error('Error Fetching tasks', error);
        });
    }, [token]);

    const handleLogout = () => {
        fetch('http://localhost:5001/logout', {
            credentials: 'include',
            method: 'POST',
        })
        .then(() => setUserInfo(null))
        .catch(error => {
            console.error('Error logging out', error);
        });
    };

    const groupedTasks = {
        'To Do': tasks.filter(task => task.status === 'To Do'),
        'In Progress': tasks.filter(task => task.status === 'In Progress'),
        'Under Review': tasks.filter(task => task.status === 'Under Review'),
        'Finished': tasks.filter(task => task.status === 'Finished'),
    };

    return (
        <div className="full">
            <div className="dashboard">
                <div className="half-dash">
                    <div className="top-content">
                        <div className="image-name">
                            <img src={assets.user_icon} id="img1" alt="User" />
                            <span>{userInfo ? userInfo.userName : ''}</span>
                        </div>
                    </div>
                    <div className="icons">
                        <div className="icon">
                            <img src={assets.bell_icon} id="icon1" alt="Bell" />
                            <img src={assets.frame_icon} id="icon2" alt="Frame" />
                            <img src={assets.arrow_icon} id="icon3" alt="Arrow" />
                            <Link to="/login">
                                <button onClick={handleLogout}>Logout</button>
                            </Link>
                        </div>
                    </div>
                    <div className="navbar">
                        <div className="sidebar">
                            <div className="home">
                                <img src={assets.home_icon} id="home" alt="Home" />
                                <span>Home</span>
                            </div>
                            <div className="board">
                                <img src={assets.board_icon} id="board" alt="Board" />
                                <span>Board</span>
                            </div>
                            <div className="setting">
                                <img src={assets.setting_icon} id="setting" alt="Settings" />
                                <span>Settings</span>
                            </div>
                            <div className="teams">
                                <img src={assets.team_icon} id="team" alt="Teams" />
                                <span>Teams</span>
                            </div>
                            <div className="analytics">
                                <img src={assets.analytics_icon} id="analytics" alt="Analytics" />
                                <span>Analytics</span>
                            </div>
                        </div>
                    </div>
                    <div className="new-task">
                        <Link to="/editor">
                            <h3>Create new task</h3>
                        </Link>
                        <span><img src={assets.plus_icon} alt="Plus" /></span>
                    </div>
                    <div className="last">
                        <img src={assets.down_icon} alt="Download" />
                        <span>Download the app <br />Get the full experience</span>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="top-level">
                    <div className="msg">
                        <h3>Hello, {userInfo ? userInfo.userName : ''}</h3>
                        <h4><span>Help & feedback <img src={assets.question_icon} alt="Help" /></span></h4>
                    </div>
                </div>
                <div className="second-level">
                    <div className="three-box">
                        <div className="box1">
                            <img src={assets.img1_icon} alt="Tag" />
                            <div className="wrapper">
                                <h4>Introducing tags</h4>
                                <h5>Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.</h5>
                            </div>
                        </div>
                        <div className="box2">
                            <img src={assets.img2_icon} alt="Share" />
                            <div className="wrapper">
                                <h4>Share Notes Instantly</h4>
                                <h5>Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.</h5>
                            </div>
                        </div>
                        <div className="box3">
                            <img src={assets.img3_icon} alt="Access" />
                            <div className="wrapper">
                                <h4>Access Anywhere</h4>
                                <h5>Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.</h5>
                            </div>
                        </div>
                    </div>
                    <div className="third-level">
                        <div className="search">
                            <input type="text" placeholder="Search" />
                            <span><img src={assets.search_icon} alt="Search" /></span>
                        </div>
                        <div className="mid-level">
                            <div className="calender">
                                <h3>Calendar view <span><img src={assets.calendar_icon} alt="Calendar" /></span></h3>
                            </div>
                            <div className="automation">
                                <h3>Automation <span><img src={assets.auto_icon} alt="Automation" /></span></h3>
                            </div>
                            <div className="filter">
                                <h3>Filter <span><img src={assets.filter_icon} alt="Filter" /></span></h3>
                            </div>
                            <div className="share">
                                <h3>Share <span><img src={assets.share_icon} alt="Share" /></span></h3>
                            </div>
                            <div className="btnnn">
                                <Link to="/editor">
                                    <h3>Create new <span><img src={assets.plus_icon} alt="Plus" /></span></h3>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="final-level">
                        <div className="task-list">
                            <div className="task-column">
                                <h4>To Do</h4>
                                {groupedTasks['To Do'].map(task => (
                                    <TaskPage key={task._id} task={task} />
                                ))}
                                <div className="add-task">
                                    <Link to={'/editor'}>
                                        <a href="Editor.jsx">Add new<img src={assets.cross_icon} /></a>
                                    </Link>
                                </div>
                            </div>
                            <div className="task-column">
                                <h4>In Progress</h4>
                                {groupedTasks['In Progress'].map(task => (
                                    <TaskPage key={task._id} task={task} />
                                ))}
                                <div className="add-task">
                                    <Link to={'/editor'}>
                                        <a href="Editor.jsx">Add new<img src={assets.cross_icon} /></a>
                                    </Link>
                                </div>
                            </div>
                            <div className="task-column">
                                <h4>Under Review</h4>
                                {groupedTasks['Under Review'].map(task => (
                                    <TaskPage key={task._id} task={task} />
                                ))}
                                <div className="add-task">
                                    <Link to={'/editor'}>
                                        <a href="Editor.jsx">Add new<img src={assets.cross_icon} /></a>
                                    </Link>
                                </div>
                            </div>
                            <div className="task-column">
                                <h4>Finished</h4>
                                {groupedTasks['Finished'].map(task => (
                                    <TaskPage key={task._id} task={task} />
                                ))}
                                <div className="add-task">
                                    <Link to={'/editor'}>
                                        <a href="Editor.jsx">Add new<img src={assets.cross_icon} /></a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
