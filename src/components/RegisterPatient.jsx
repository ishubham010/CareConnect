import { useState } from "react";
import axios from "axios";
import { Form } from 'react-bootstrap';
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const PRODUCT_API_BASE_URL = "http://localhost:5656";



export function RegisterPatient() {
    const [patientName, setPatientName] = useState('');
    const [patientEmail, setPatientEmail] = useState('');
    const [password, setPassword] = useState('');
    const [patientAge, setPatientAge] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [patientAddress, setPatientAddress] = useState('');
    const [error] = useState('');
    const navigate = useNavigate();

    let patient = {
        patientName: patientName,
        patientEmail: patientEmail,
        password: password,
        patientAge: patientAge,
        phoneNumber: phoneNumber,
        patientAddress: patientAddress
    }

    const handleRegistration = (e) => {
        e.preventDefault();

        axios.post(PRODUCT_API_BASE_URL + '/addpatient', patient)
            .then((res) => {
                console.log(res.data);
                toast.success('Registered Successfully', { position: "top-center", autoClose: 2500 });
                setTimeout(() => {
                    navigate('/login'); // Redirect to the login page after registration
                }, 3000);
            })
            .catch((err) => {
                console.log(err.response.data);
                toast.error(err.response.data.erroMessage, { position: "top-center", autoClose: 1500 })
                // setError(err.response.data.erroMessage)
            });
    };

    return (
        <div style={{ display: "flex", minHeight:'85vh' }}>

            <div style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', borderRadius: '10px', width: '350px', height: '500px', padding: '30px', marginTop: '5%', marginLeft: '20%', marginRight: 'auto' }}>
                <h3 className="text-center">Sign Up</h3>
                <Form onSubmit={handleRegistration}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="name" placeholder="Name" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="E-Mail" value={patientEmail} onChange={(e) => setPatientEmail(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="number" placeholder="Age" value={patientAge} onChange={(e) => setPatientAge(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="text" placeholder="Address" value={patientAddress} onChange={(e) => setPatientAddress(e.target.value)} required />
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="primary" type="submit" style={{ background: "rgb(67, 185, 127" }}>
                            Register
                        </Button>
                    </div>
                    <div className="text-center mt-3">
                        <h6 className="mt-3">Already have an account ? <Link to="/login">Login</Link></h6>
                    </div>
                    <ToastContainer />
                </Form>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10%', marginTop: '5%' }}>
                <div className="sign_img" >
                    <img src="./img/login.png" alt="singinimg" style={{ maxWidth: 500 }}></img>
                </div>
            </div>
            {error && <p>{error}</p>}
        </div>
    )

}