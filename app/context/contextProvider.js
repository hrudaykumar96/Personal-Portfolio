"use client"

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const dataContext = createContext();

export const DataProvider = ({ children }) =>{
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const [theme, setTheme] = useState(null);

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

    useEffect(()=>{
        const themeData = async()=>{
            setLoading(true);
            const response = await axios.get('/api/gettoggletheme');
            setTheme(response?.data?.success);
            setLoading(false);
        };
        themeData();
    },[]);
    




    return (
        <dataContext.Provider value={{ data, loading, isLogin, setIsLogin, setData, theme, setTheme }}>
            {children}
        </dataContext.Provider>
    )
};

export const useData = () => useContext(dataContext);