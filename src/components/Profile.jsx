import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Profile() {

    const navigate = useNavigate();

    const patient = JSON.parse(localStorage.getItem('patientData'));

    const handleScheduleAppointment = () => {
        navigate('/viewdoctors');
    };

    const handleViewAppointment = () => {
        navigate('/viewappointment');
    };

    useEffect(() => {
        if (patient === null) {
            navigate('/login');
        }
    },
    );

    return (
        <div style={{ backgroundImage: 'url(./img/background.webp)', minHeight: '85vh' }}>
            {patient &&
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '60%', height: '500px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.5)', marginTop: '4%', borderRadius: '20px', background: 'white' }}>
                        <div>
                            <h2 style={{ textAlign: 'center', marginTop: '10px' }}>Care Connect Profile</h2>
                        </div>

                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '17%', marginLeft: '10%', marginTop: '4%' }}>
                                <img src="./img/profile.png" alt="Profile" style={{ width: '20vh', height: '20vh', marginTop: '20px', marginLeft: '3px', marginBottom: '30px', border: '1px solid black', borderRadius: '5px', paddingTop: '10px', paddingBottom: '10px' }} />
                                <div>
                                    <span style={{ border: '1px solid black', marginLeft: '6px', padding: '5px 10px', fontSize: '17px', borderRadius: '5px' }}><span style={{ fontWeight: 'bold', paddingRight: '10px' }}>Patient ID :</span>{patient.patientId}</span>
                                </div>
                            </div>
                            <div style={{ flex: '1', marginRight: '20%' }}>
                                <table style={{ float: 'right', marginTop: '50px', fontSize: '20px' }}>
                                    <tbody>
                                        <tr>
                                            <th style={{ paddingRight: '20px', paddingBottom: '20px' }}>Patient Name :</th>
                                            <td style={{ paddingBottom: '20px' }}>{patient.patientName}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ paddingRight: '10px', paddingBottom: '20px' }}>Email :</th>
                                            <td style={{ paddingBottom: '20px' }}>{patient.patientEmail}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ paddingRight: '10px', paddingBottom: '20px' }}>Age :</th>
                                            <td style={{ paddingBottom: '20px' }}>{patient.patientAge}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ paddingRight: '10px', paddingBottom: '20px' }}>Phone No. :</th>
                                            <td style={{ paddingBottom: '20px' }}>{patient.phoneNumber}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ paddingRight: '10px', paddingBottom: '20px' }}>Address :</th>
                                            <td style={{ paddingBottom: '20px' }}>{patient.patientAddress}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div >
                            <Button onClick={handleScheduleAppointment} style={{ marginLeft: '25%', marginTop: '40px', marginRight: '12%', padding: '5px 10px' }}>Schedule Appointment</Button>
                            <Button onClick={handleViewAppointment} style={{ padding: '5px 10px', marginTop: '40px' }}>View Appointment</Button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
