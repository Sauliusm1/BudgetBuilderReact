import React, {useState, props} from 'react';
import API_BASE_URL from './Constants';
const Refresh = () => {
        const url = `${API_BASE_URL}/accesstoken`;
        const postToCreate = {
            refreshToken: sessionStorage.getItem('refreshToken')
        };
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postToCreate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                setToken(responseFromServer)
                }
            )
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    function setToken(userToken){
        sessionStorage.setItem('accessToken', userToken.accessToken)
        sessionStorage.setItem('refreshToken', userToken.refreshToken)
    }
    return (
        sessionStorage.getItem('accessToken')
    )
}

export default Refresh