import React, {useContext, useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
const Register = (props) => {
    const { setAlert } = useContext(AlertContext);
    const { register, error, clearErrors, isAuthenticated} = useContext(AuthContext);

    useEffect(()=>{
        if(isAuthenticated){
            props.history.push('/');
        }

        if(error === 'User already exists'){
            setAlert(error, 'danger');
            clearErrors();
        }
    }, [error, isAuthenticated, props.history]);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const onChange = e =>{
        setUser({...user, [e.target.name]: e.target.value});
    };

    const onSubmit = e =>{
        e.preventDefault();
        //console.log('Register submit');
        if(name === '' || email === '' || password === ''){
            setAlert('please enter all fields', 'danger');
        } else if(password !== password2){
            setAlert('passwords do not match', 'danger');
        } else {
           console.log('Register submit'); 
            register({
                name, email, password
            });
        }
    }

    const {name, email, password, password2} = user;
    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Register</span>
                </h1>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={name} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={email} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={password} onChange={onChange}  minLength="6"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password2">Confirm password</label>
                        <input type="password" name="password2" value={password2} onChange={onChange}  minLength="6"/>
                    </div>
                    <input type="submit" value="Register" className="btn btn-primary btn-block"/>
                </form>
                <p>Already have an account? Login <Link to='/login'>here</Link></p>
        </div>
    )
}

export default Register;
