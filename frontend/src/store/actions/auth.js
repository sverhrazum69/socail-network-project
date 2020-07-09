import * as actionTypes from './actionTypes';
import axios from 'axios'
//events that are called when appropriate action happens

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START

    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token:token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout = () => {
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('token')
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

//check if token expaired
export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },expirationTime * 3000)
    }
}


//make post request and get token
export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:8000/rest-auth/login/',{
            username: username,
            password: password
        })
        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600*3000);
            localStorage.setItem('token',token);
            localStorage.setItem('expirationDate',expirationDate);
            // call event success event
            dispatch(authSuccess(token));
            //check if token expired
            dispatch(checkAuthTimeout(3600));
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error));
        })
    }
}

//sign up
export const authSignup = (username, email,password1,password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:8000/rest-auth/registration/',{
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600*3000);
            localStorage.setItem('token',token);
            localStorage.setItem('expirationDate',expirationDate);
            // call event success event
            dispatch(authSuccess(token));
            //check if token expired
            dispatch(checkAuthTimeout(3600));
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error));
        })
    }
}


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined){
            dispatch(logout())
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else{
                dispatch(authSuccess(token))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 3000))
            }
        }
    }
}

