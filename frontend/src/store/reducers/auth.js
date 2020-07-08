import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'


// helper object
const initialState = {
    token: null,
    error:null,
    loading:false
}


// reducers that return new state
//actions from actions/auth.js
const authStart = (state, action) => {
    return updateObject(state, {
        error:null,
        loading:true
    })
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token:action.token,
        error:null,
        loading:false
    })
}

const authFail = (state, action) => {
    return updateObject(state,{
        error:action.error,
        loading:false
    })
}

const authLogout = (state,action) => {
    return updateObject(state,{
        token:null,
        loading:false
    })
}