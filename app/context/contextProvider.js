"use client"

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const dataContext = createContext();

export const DataProvider = ({ children }) =>{
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(()=>{
        const portfolioData = async()=>{
            if(!data){
                setLoading(true);
                const response = await axios.get('/api/portfolio');
                setData(response?.data?.success);
                setLoading(false);
            }
        }
        portfolioData();
    },[]);




    return (
        <dataContext.Provider value={{ data, loading, isLogin, setIsLogin, setData }}>
            {children}
        </dataContext.Provider>
    )
};

export const useData = () => useContext(dataContext);