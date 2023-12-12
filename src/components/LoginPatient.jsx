import axios from "axios";
import { useState } from "react"
import { Form } from 'react-bootstrap';
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
const PRODUCT_API_BASE_URL = "http://localhost:5656";

export function LoginPatient() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        axios.get(PRODUCT_API_BASE_URL + '/loginpatient/' + email + '/' + password)
            .then((res) => {
                console.log(res.data);
                localStorage.setItem('patientData', JSON.stringify(res.data));
                navigate('/patientdashboard');
            })
            .catch((err) => {
                console.log(err.response.data);
                toast.error(err.response.data.erroMessage, { position: "top-center", autoClose: 1500, });
            });
    };

    return (
        <div style={{ display: "flex", minHeight:'85vh' }}>
            <div style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', borderRadius: '10px', width: '320px', height: '380px', padding: '30px', marginTop: '8%', marginLeft: '20%', marginRight: 'auto' }}>
                <h3 className="text-center">Sign In</h3>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="primary" type="submit" style={{ background: "rgb(67, 185, 127" }}>
                            Login
                        </Button>
                    </div>
                    <div className="text-center mt-3">
                        <h6>New to Care Connect ? <Link to="/register">Register</Link></h6>
                    </div>
                    <ToastContainer />
                </Form>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10%', marginTop: '5%' }}>
                <div className="sign_img">
                    <img src="./img/login.png" alt="singinimg" style={{ maxWidth: 500 }}></img>
                </div>
            </div>
            {error && <p>{error}</p>}
        </div>
    )
}

