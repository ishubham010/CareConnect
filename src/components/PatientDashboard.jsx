import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export function PatientDashboard() {
    const navigate = useNavigate();

    const patientData = JSON.parse(localStorage.getItem('patientData'));

    useEffect(() => {
        if (patientData === null) {
            navigate('/login');
        }
    }, []
    );



    return (
        <div style={{ backgroundImage: 'url(./img/background.webp)', minHeight: '85vh' }}>
            <React.Fragment>
                <h1 className="pt-3" style={{ textAlign: "center" }}>Welcome to Care Connect</h1>
                <div className="container text-center pt-5">
                    <div className="row ms-4">
                        <div className="col" style={{ marginLeft: '140px' }}>
                            <div className="card" style={{ width: "23rem", boxShadow: '0 3px 6px rgba(0, 0, 0, 0.5)' }}>
                                <img src="./img/appointment.jpg" className="card-img-top" alt="..." height="250px" />
                                <div className="card-body">
                                    <h5 className="card-title">Schedule Appointment</h5>
                                    <p className="card-text">Discover the world of outstanding healthcare professionals. Click to view our selection of excellent physicians.</p>
                                    <Link to="/viewdoctors" className="btn btn-primary">Book Appointment</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card" style={{ width: "23rem", boxShadow: '0 3px 6px rgba(0, 0, 0, 0.5)' }}>
                                <img src="./img/viewapp.avif" className="card-img-top" alt="..." height="250px" />
                                <div className="card-body">
                                    <h5 className="card-title">View Appointment</h5>
                                    <p className="card-text">One simple step can start your journey towards better health. View your appointment right away and enjoy the occasion!</p>
                                    <Link to="/viewappointment" className="btn btn-primary">View Appointment</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </div>
    )
}