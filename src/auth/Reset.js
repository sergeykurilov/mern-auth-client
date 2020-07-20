import React, { useState , useEffect} from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import jwt from 'jsonwebtoken';

const Reset = ({ match }) => { //props.match from React router DOM
    const [values, setValues] = useState({
        name: '',
        token: '',
        newPassword: '',
        buttonText: 'Reset password'
    })

    useEffect(() => {
        let token = match.params.token
        let {name} = jwt.decode(token)
        if(token){
            setValues({...values, name, token})
        }
    },[])

    const {name, token, newPassword , buttonText}= values; 

    const handleChange = event => {
        setValues({ ...values, newPassword: event.target.value });
    };
    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/reset-password`,
            data: { newPassword, resetPasswordLink: token }
        })
            .then(response => {
                console.log('RESET PASSWORD SUCCESS', response);
                setValues({ ...values,  buttonText: 'Done' });
                // save the response(user, token) localstorage/cookie
                toast.success(response.data.message);
            })
            .catch(error => {
                console.log('FORGOT PASSWORD ERROR', error.response.data);
                toast.error(error.response.data.error);
                setValues({ ...values, buttonText: 'Reset password' });
            });
    };
  
  
    const passwordResetForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange} value={newPassword} type="password" className="form-control" placeholder="Type new password" required/>
            </div>
            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
            </div>
        </form>
    )

    return(
      
    <Layout>
        <ToastContainer />
      <div className="col-d-6 offset-md-3">
      <h1 className="p-5">Hey {name} , Type your new password</h1>
        {passwordResetForm()}
      </div>
    </Layout>
    );
};

export default Reset;
