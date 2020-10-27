import React, {useReducer} from 'react';
import authReducer from '../auth/authReducer';
import AuthContext from '../auth/authContext';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT, CLEAR_ERRORS
} from '../types';

const AuthState = props => {
    
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };
    const [state, dispatch] = useReducer(authReducer, initialState);

    //Load user
    const loadUser = async () => {
        //if(localStorage.token){
            setAuthToken(localStorage.token);
      //  }
        try{
            const url = 'http://localhost:5000/api/auth';
            const res = await axios.get(url);

            dispatch({ 
                type: USER_LOADED, 
                payload: res.data 
            });            
        } catch(err){
            dispatch({
                type: AUTH_ERROR
            })
        }
    };

    //Register user
    const register = async formData => {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }

        try{
            const url = 'http://localhost:5000/api/users';
            const res = await axios.post(url, formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });

            loadUser();
        } catch(err){
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        }
    };

    //Login user
    const login = async formData => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        try{
            const url = 'http://localhost:5000/api/auth';
            const res = await axios.post(url, formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });

            loadUser();
        }catch(err){
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            });
        }
    };

    //Logout user
    const logout = () => dispatch({ type: LOGOUT});
    //Clear Errors
    const clearErrors = () =>dispatch({ type: CLEAR_ERRORS });

    return(
        <AuthContext.Provider 
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            loadUser,
            register,
            login,
            logout,
            clearErrors
        }}>
            {props.children}
        </AuthContext.Provider>);        
};

export default AuthState;






