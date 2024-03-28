import axios from 'axios';
import React from 'react';
import { useState ,createContext } from 'react';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


const AuthContext = createContext(null)


export const AuthProvider = ({children}) => {
    // const navigate = useNavigate()
const[user, setUser]= useState(null)
const [role,setRole]=useState('')
const[status,setStatus]=useState(false)

const login  = (username,password) =>{
    axios
      .post("https://aiwebsite-backend.onrender.com/login", { username, password,status })
      .then((result) => {
        // console.log(result?.data,"data4545");
        if (result.data.message === "Success" && result.data.data.status === true ) {
            // console.log(result.data.data,'kkkkkkkkk')
          localStorage.setItem('user',JSON.stringify(result.data?.data))
          localStorage.setItem('token',JSON.stringify(result?.data.token))
          setUser(result.data.token)
          setRole(result.data.data.role)
        // navigate('redirectPath', {  replace : true })
        }
       else if (result.data === "Username or password is incorrect") {
          alert("Please check your credentials and try again");
        } else {
          alert("Enter a Valid Username or You're Not Authorized User");
        }
      });

}
const logout=() =>{
    localStorage.clear();
    setUser(null)
    setRole(null)
}
return (<AuthContext.Provider value={{user,login,logout,role}}>
    {children}
</AuthContext.Provider>
)
}
export const useAuth =() =>{
    return useContext(AuthContext);
}