import React, {useState, useContext, useEffect} from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { Link } from 'react-router-dom';
 const Login = (props) => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext;
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    useEffect(()=>{
        if(isAuthenticated){
            props.history.push('/');
        }
        if(error === 'invalid credentials' || error === 'invalid password'){
            setAlert(error, 'danger');
            clearErrors();
        }
    },[error, isAuthenticated, props.history]);


    const onChange = e =>{
        setUser({...user, [e.target.name]: e.target.value});
    };

    const onSubmit = e=>{
        e.preventDefault();
        //console.log('logged in');
        if(email === ''){
            setAlert('please enter email', 'danger');
        } else if(password ===''){
            setAlert('please enter password', 'danger')
        } else {
            login({email, password});
        }
    };

    const { email, password} = user;
    return (
        <div className="form-container">
            <h1>Account<span className="text-primary"> Login</span></h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                   <label htmlFor="email">Email</label>
                   <input type="email" name="email" value={email} onChange={onChange}/>
                </div>
                <div className="form-group">
                   <label htmlFor="password">Password</label>
                   <input type="password" name="password" value={password} onChange={onChange}/>
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block"/>
            </form>
            <p>Don't have an account? Register <Link to='/register'>here</Link></p>
        </div>
    )
}


export default Login;