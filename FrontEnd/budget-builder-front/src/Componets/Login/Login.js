import React, {useState, props} from 'react';
import "./Login.css";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import API_BASE_URL from '../../Utilities/Constants';

const Login = props => {
    const initialFormData = Object.freeze({
        username: "",
        password: ""
    });

    const [formData, setFormData] = useState(initialFormData);
    const [warning, setWarning] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const postToCreate = {
            username: formData.username,
            password: formData.password
        };

        const url = `${API_BASE_URL}/login`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postToCreate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
                if(responseFromServer === "Username or password was incorrect"){
                    setWarning(responseFromServer)}
                else{
                    setToken(responseFromServer)
                    props.setToken(responseFromServer)}
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    };
    function setToken(userToken){
        sessionStorage.setItem('accessToken', userToken.accessToken)
        sessionStorage.setItem('refreshToken', userToken.refreshToken)
    }
    return (
       <div className="container">
        <div className="header">
            <div className="text"> 
            Log in
            </div>
        </div>
        <form className="inputs">
            <div className="input">
                <div className="login_icon"> <PersonIcon/></div>
                <input value={formData.username} type="text" name="username" id="" placeholder='Username' onChange={handleChange}/>
            </div>
            <div className="input">
                <div className="login_icon"><LockIcon/></div>
                <input value={formData.password} type="password" name="password" id="" placeholder='Password'  onChange={handleChange}/>
            </div>
            <div className="submit-container">
                <button on onClick={handleSubmit} className="submit">
                    Log in
                </button>
            </div>
        </form>
       </div>
    )
}

export default Login