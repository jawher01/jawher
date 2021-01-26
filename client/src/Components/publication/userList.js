import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import {  deleteUser, getAllUsers } from "../../js/actions/user"
import { useEffect } from 'react';
import { Spinner } from "react-bootstrap"
import User from "./user"
import Navbar from "../NavBar"


const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.userReducer.compte);
    
    const loadUser = useSelector(state => state.userReducer.loadUser);
    useEffect(() => {
        dispatch(getAllUsers());
    }, []);
    return (
        <div >
            <div style={{marginBottom:"5%"}}>
            <Navbar />
            </div>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
                   
                    {loadUser ? <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                    </Spinner> : users.map(el => <User key={el._id} user={el} />)}
                  
                
            </div>
        </div>
    )
}

export default UserList;
