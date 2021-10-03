import {useEffect,useState} from "react";

let loginURL = 'http://54.180.38.125:8000/login/'

export const useSignUp = (endpoint) => {
    loginURL+=endpoint
    fetch(loginURL, {
        method: 'POST',
        headers: {

        }
    })
}
