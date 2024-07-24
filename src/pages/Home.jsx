import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    // const currentUser = useSelector((state) => state.auth.user);
    // useEffect(() => {
    //     if (currentUser) {
    //         navigate('/');
    //     }
    // }, [currentUser, navigate])

    return (
        <div className="flex w-full justify-content-center">
            <div  style={{margin: '0 auto', minHeight: '500px', minWidth:'500px', justifyContent: 'center', alignItems: 'center', display:'flex'}}>
                home page
            </div>
        </div>
    )
}