import React, { Fragment } from "react";
import { Link , withRouter} from "react-router-dom";
import { isAuth , signout } from "../auth/helpers";


const Layout = ({children, match, history} ) =>{
   
   const isActive = path => {
       if(match.path === path){
           return {color: '#000'}
       }else{
           return {color: '#fff'}
       }
   }
   
    const nav = () => (
     <ul className="nav nav-tabs bg-primary">
         <li className="nav-item">
    <Link to="/" className="nav-link" style={isActive('/')}>Home</Link>
         </li>
        {!isAuth() && (
            <Fragment>
        <li className="nav-item">
             <Link to="/signup" className="nav-link" style={isActive('/signup')}>Signup</Link>
         </li>
         <li className="nav-item">
             <Link to="/signin" className="nav-link" style={isActive('/signin')}>Signin</Link>
         </li>
            </Fragment>
        )}
{isAuth() && isAuth().role === 'admin' && (
         <li className="nav-item">
              <Link to="/admin" className="nav-link" style={isActive('/admin')}>{isAuth().name}</Link>
         </li>
        )}

{isAuth() && isAuth().role === 'subscriber' && (
         <li className="nav-item">
              <Link to="/private" className="nav-link" style={isActive('/private')}>{isAuth().name}</Link>
         </li>
        )}


    {isAuth() && (
         <li className="nav-item">
            <span className="nav-link" style={{cursor: 'pointer', color: '#fff'}} onClick={()=>{
                signout(()=>{
                    history.push('/')
                })
            }}>Signout</span>
         </li>
        )}



     </ul>
    )

    return(
        <Fragment>
        {nav()}
            <div className="container">{children}</div>
        </Fragment>
    )
}

export default withRouter(Layout);