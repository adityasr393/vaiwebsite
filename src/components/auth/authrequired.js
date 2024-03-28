import React from 'react';

import { Navigate,useLocation,Outlet } from 'react-router-dom'
import { useAuth } from './useauth'

export default function RequireAuth({children}) {
    const auth = useAuth()
    const location =useLocation()
    const user = JSON.parse(localStorage.getItem('token'));
    if(auth.user === null && user === null){
        return <Navigate to={'/login'} state ={{path :location.pathname}}/>
    }

  return children

// return(
//     auth?.role?.find(role => children?.includes(role))
    
//     ? <Outlet/>
//     :auth?.user
//     ?<Navigate to="/dashboard" state={{from :location}} replace />
    
//     :<Navigate to = "/login" state={{from:location}} replace />
// );
// console.log(auth?.role,auth.user,'kk');
// return (
//     Array.isArray(auth?.role) && auth?.role.find(role => children?.includes(role))
//       ? <Outlet />
//       : auth?.user
//         ? children
//         : <Navigate to="/login" state={{ from: location }} replace />
//   );

}