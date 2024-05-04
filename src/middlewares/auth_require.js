import {
    redirect,
    Navigate
  } from "react-router-dom";

const AuthRequired = ({children})=>{
    const user = localStorage.getItem('user')
        return !user ? <Navigate to={'/login'} /> : children 
}


export default AuthRequired