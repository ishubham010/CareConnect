import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const PRODUCT_API_BASE_URL = "http://localhost:5656";

export function ViewDoctors() {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecification, setSelectedSpecification] = useState('');
    const navigate = useNavigate();


    const patientData = JSON.parse(localStorage.getItem('patientData'));

    useEffect(() => {
        if (patientData === null) {
            navigate('/login');
        }
    }, []
    );

    useEffect(() => {
        const fetchDoctors = () => {
            axios.get(PRODUCT_API_BASE_URL + '/getalldoctor')
                .then((res) => {
                    const doctorsData = res.data;
                    console.log(res.data);
                    setDoctors(doctorsData);
                })
        };
        fetchDoctors();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSpecificationChange = (e) => {
        setSelectedSpecification(e.target.value);
    };

    const storeDoctorData = (doctor) => {
        localStorage.setItem('doctors', JSON.stringify(doctor));
    };

    const filteredDoctors = doctors.filter((doctor) => {
        const doctorName = doctor.doctorName.toLowerCase();
        const specification = doctor.specification.toLowerCase();
        return (
            doctorName.includes(searchTerm.toLowerCase()) &&
            (selectedSpecification === '' || specification === selectedSpecification.toLowerCase())
        );
    });

    const allSpecifications = [...new Set(doctors.map((doctor) => doctor.specification))];

    return (
        <div>
            <div style={{ backgroundImage: 'url(./img/background.webp)', minHeight: '100vh' }}>
                <h2 className="text-center" style={{ padding: "50px 0px" }}>Our Top Practitioners Ready to Serve You 24/7</h2>
                <div style={{ marginTop: "30px", borderRadius: "7px", paddingTop: "3px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)", width: "1200px", margin: "0 auto", backgroundColor: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <FaSearch style={{ marginRight: '10px' }} />
                            <input
                                type="text"
                                placeholder="Search by Doctor Name"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                        <div>
                            <select value={selectedSpecification} onChange={handleSpecificationChange}>
                                <option value="">All Specifications</option>
                                {allSpecifications.map((specification) => (
                                    <option key={specification} value={specification}>{specification}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mt-5">
                        <table className="table table-striped table-sm">
                            <thead className="thead-light">
                                <tr>
                                    <th style={{ paddingLeft: '40px' }}>Doctor ID</th>
                                    <th>Doctor Name</th>
                                    <th>Specification</th>
                                    <th>Doctor Fees</th>
                                    <th>Book Appointment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDoctors.map((doctor) =>
                                    <tr key={doctor.doctorId}>
                                        <td style={{ paddingLeft: '70px' }}>{doctor.doctorId}</td>
                                        <td>{doctor.doctorName}</td>
                                        <td>{doctor.specification}</td>
                                        <td>{doctor.fees}</td>
                                        <td>
                                            <Button onClick={() =>{ storeDoctorData(doctor);navigate("/bookappointment")}}>
                                                Check Availability
                                            </Button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
