import React, {useState, props} from 'react';
import "./Login.css";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import API_BASE_URL from '../../Utilities/Constants';

const Register = props => {
    const initialFormData = Object.freeze({
        username: "",
        email: "",
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

        const url = `${API_BASE_URL}/register`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postToCreate)
        })
            .then(response => response.json())
            .then(responseFromServer => {//Look into responses
                console.log(responseFromServer);
                if(responseFromServer === "Username already taken"){
                    alert(responseFromServer)}
                else{
                    alert("Account created successfully, log in to continue")}
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    };
    return (
       <div className="container">
        <div className="header">
            <div className="text"> 
            Register
            </div>
        </div>
        <form className="inputs">
            <div className="input">
                <div className="login_icon"> <PersonIcon/></div>
                <input value={formData.username} type="text" name="username" id="" placeholder='Username' onChange={handleChange}/>
            </div>
            <div className="input">
                <div className="login_icon"><EmailIcon/></div>
                <input value={formData.email} type="email" name="email" id="" placeholder='Email'  onChange={handleChange}/>
            </div>
            <div className="input">
                <div className="login_icon"><LockIcon/></div>
                <input value={formData.password} type="password" name="password" id="" placeholder='Password'  onChange={handleChange}/>
            </div>
            <div className="submit-container">
                <button on onClick={handleSubmit} className="submit">
                    Register
                </button>
            </div>
        </form>
       </div>
    )
}

export default Register