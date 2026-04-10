import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import {  setCurrentAddress, setCurrentCity, setCurrentState, setUserData } from '../redux/userSlice'
import { setAddress, setLocation } from '../redux/mapSlice'

function useGetCity() {
    const dispatch=useDispatch()
    const {userData}=useSelector(state=>state.user)
    const apiKey=import.meta.env.VITE_GEOAPIKEY
    useEffect(()=>{
        // load cached city immediately so shops show without waiting for geolocation
        const cachedCity=localStorage.getItem("currentCity")
        const cachedState=localStorage.getItem("currentState")
        const cachedAddress=localStorage.getItem("currentAddress")
        if(cachedCity) dispatch(setCurrentCity(cachedCity))
        if(cachedState) dispatch(setCurrentState(cachedState))
        if(cachedAddress) dispatch(setCurrentAddress(cachedAddress))

navigator.geolocation.getCurrentPosition(async (position)=>{
    const latitude=position.coords.latitude
    const longitude=position.coords.longitude
    dispatch(setLocation({lat:latitude,lon:longitude}))
    try {
    const result=await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`)
    const r=result?.data?.results[0]
    const city=r?.city||r?.county||r?.state
    const state=r?.state
    const address=r?.address_line2 || r?.address_line1
    dispatch(setCurrentCity(city))
    dispatch(setCurrentState(state))
    dispatch(setCurrentAddress(address))
    dispatch(setAddress(r?.address_line2))
    localStorage.setItem("currentCity",city)
    localStorage.setItem("currentState",state)
    localStorage.setItem("currentAddress",address)
    } catch(err){
        console.log("Geoapify error:",err)
    }
},async (err)=>{
    console.log("Geolocation error:",err.code, err.message)
    try {
        const result=await axios.get(`https://api.geoapify.com/v1/ipinfo?apiKey=${apiKey}`)
        const r=result?.data
        const city=r?.city?.name||r?.country?.name
        const state=r?.state?.name
        dispatch(setCurrentCity(city))
        dispatch(setCurrentState(state))
        localStorage.setItem("currentCity",city)
        localStorage.setItem("currentState",state)
    } catch(e){
        console.log("IP fallback error:",e)
    }
})
    },[userData])
}

export default useGetCity
