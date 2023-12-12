import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
const PRODUCT_API_BASE_URL = "http://localhost:5656";

export function BookAppointment() {
    const [slots, setSlots] = useState('');
    const [doctor, setDoctor] = useState(null);
    const [appdate, setAppdate] = useState('');
    const [patientData, setPatientData] = useState(null);
    const [description, setDescription] = useState('');
    const [outputmodel, setOutputmodel] = useState(null);
    const [fetchslot, setFetchslots] = useState(false);
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const storedDoctors = localStorage.getItem("doctors");
        const storedPatientData = localStorage.getItem("patientData");
        if (storedDoctors) {
            const doctorsData = JSON.parse(storedDoctors);
            setDoctor(doctorsData);
        }
        if (storedPatientData) {
            const patientData = JSON.parse(storedPatientData);
            setPatientData(patientData);
        }
    }, []);

    const fetchAvailability = () => {
        if (patientData === null) {
            navigate('/login');
        }
        

        if (appdate.trim() === "") {
            console.log("Appoinement date cannot be empty");
            toast.error("Please Choose Appointment Date", { position: "top-center", autoClose: 1500, });
            return;
        }
        if(doctor!==null){
        axios.get(PRODUCT_API_BASE_URL + '/getslotsOfDoctorPerDate/' + doctor.doctorId + '/' + appdate)
            .then((res) => {
                console.log(res.data);
                setSlots(5 - res.data);
                setFetchslots(true);
            })
            .catch((err) => {
                console.log(err.response.data.errorMessage);
            });
        }
    };

    const handleBooking = () => {
        const appointmentData = {
            description: description,
            appointmentDate: appdate,
            patientId: patientData.patientId,
            doctorId: doctor.doctorId
        };

        if (description.trim() === "") {
            console.log("Description cannot be empty");
            toast.error("Please Fill Description", { position: "top-center", autoClose: 1500, });
            return;
        }
        Swal.fire({
            title: 'Confirm Booking',
            text: 'Are you sure you want to book the appointment?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(PRODUCT_API_BASE_URL + '/addappointment', appointmentData)
                    .then((res) => {
                        setOutputmodel(res.data);
                        console.log(res.data);
                        toast.success("Appointment booked successfully!", { position: "top-center", autoClose: 3000 });
                        // Handle the success case
                    })
                    .catch((err) => {
                        if (err.response && err.response.data && err.response.data.errorMessage) {
                            console.log(err.response.data.errorMessage);
                        } else {
                            console.log('An error occurred while booking the appointment.');
                        }
                        // console.log(err.response.data);
                    });

                // Clear the description field
                setDescription('');
            }
        });
    };

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'patient-invoice'
    });

    return (
        <div>
            <div style={{ backgroundImage: 'url(./img/background.webp)', minHeight: '100vh' }}>
                <h2 style={{ textAlign: 'center', paddingTop: '40px' }}>Book Appointment</h2>
                <div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '70v', marginTop: '20px' }}>
                        {patientData && doctor && (
                            <div>
                                <form style={{ backgroundColor: "#f5f5f5", padding: '20px', width: '600px', maxWidth: '100%' }}>
                                    <div className="form-group" style={{ marginBottom: '20px' }}>
                                        <label style={{ fontWeight: 'bold' }}>Doctor ID:</label>
                                        <div>
                                            <input style={{ width: '90%', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }} value={doctor.doctorId} readOnly />
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ marginBottom: '20px' }}>
                                        <label style={{ fontWeight: 'bold' }}>Doctor Name:</label>
                                        <div>
                                            <input style={{ width: '90%', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }} value={doctor.doctorName} readOnly />
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ marginBottom: '20px' }}>
                                        <label style={{ fontWeight: 'bold' }}>Doctor Fees:</label>
                                        <div>
                                            <input style={{ width: '90%', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }} value={doctor.fees} readOnly />
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ marginBottom: '20px' }}>
                                        <label style={{ fontWeight: 'bold' }}>Doctor Specification:</label>
                                        <div>
                                            <input style={{ width: '90%', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }} value={doctor.specification} readOnly />
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ marginBottom: '20px' }}>
                                        <label style={{ fontWeight: 'bold' }}>Patient ID:</label>
                                        <div>
                                            <input style={{ width: '90%', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }} value={patientData.patientId} readOnly />
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ marginBottom: '20px' }}>
                                        <label style={{ fontWeight: 'bold' }}>Patient Name:</label>
                                        <div>
                                            <input style={{ width: '90%', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }} value={patientData.patientName} readOnly />
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ marginBottom: '20px' }}>
                                        <label style={{ fontWeight: 'bold' }}>Patient Age:</label>
                                        <div>
                                            <input style={{ width: '90%', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }} value={patientData.patientAge} readOnly />
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ marginBottom: '20px' }}>
                                        <label style={{ fontWeight: 'bold' }}>Patient Email:</label>
                                        <div>
                                            <input style={{ width: '90%', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }} value={patientData.patientEmail} readOnly />
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ marginBottom: '20px' }}>
                                        <label style={{ fontWeight: 'bold' }}>Phone Number:</label>
                                        <div>
                                            <input style={{ width: '90%', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }} value={patientData.phoneNumber} readOnly />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label style={{ fontWeight: 'bold' }}>Address:</label>
                                        <div>
                                            <input style={{ width: '90%', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }} value={patientData.patientAddress} readOnly />
                                        </div>
                                        <div>
                                            <small className="form-text text-muted" style={{ fontStyle: 'italic', color: '#888' }}>Entered data is read-only, cannot be changed.</small>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ backgroundColor: "#f5f5f5", padding: '20px', width: '600px', maxWidth: '100%' }}>
                            <label style={{ fontWeight: 'bold' }}>Appointment Date:</label>
                            <div>
                                <input style={{ width: '50%', padding: '5px', borderRadius: '4px' }}
                                    min={new Date().toISOString().split('T')[0]} max={new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0]} type="date" value={appdate} onChange={(e) => setAppdate(e.target.value)} required />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <small className="form-text text-muted" style={{ fontStyle: 'italic', color: '#888' }}>Choose Your Desired Date...</small>
                            </div>
                            <div>
                                <button style={{ fontWeight: 'bold', borderRadius: '5px', backgroundColor: '#005ce6', color: '#fff', border: 'none', padding: '5px 8px', cursor: 'pointer', marginBottom: '20px' }} onClick={fetchAvailability}>Check Slots</button>
                            </div>
                            <div>
                                <h4 style={{ marginBottom: '20px' }}>Slots Left: {slots}</h4>
                                {slots > 0 ? (
                                    <div>
                                        <label style={{ fontWeight: 'bold' }}>Description:</label>
                                        <textarea style={{ padding: '8px', borderRadius: '4px', width: '100%' }}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        ></textarea>
                                        {description.trim().length === 0 && (
                                            <p style={{ color: "red", fontStyle: 'italic', fontSize: 'small' }}>Description cannot be null*</p>
                                        )}
                                        <button style={{ fontWeight: 'bold', borderRadius: '5px', backgroundColor: '#258e25', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', marginBottom: '20px' }}
                                            onClick={handleBooking}>Book Appointment</button>
                                    </div>
                                ) : null}
                                {(slots === 0 && fetchslot) ? (
                                    <h5 style={{ color: 'red' }}>No slots available for {doctor.doctorName} for selected date. Please choose another date.</h5>
                                ) : null}
                                {outputmodel?.bookigStatus === "Booked" && (
                                    <button style={{ borderRadius: '5px', padding: '5px 8px', cursor: 'pointer'}} onClick={() => setModal(true)}>Generate Invoice</button>
                                )}
                            </div>
                        </div>
                    </div>

                    <Modal size="lg" isOpen={modal} toggle={() => setModal(!modal)} ref={componentRef}>
                        <ModalHeader>
                            <div>
                                <h2>Booking Details</h2>
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <div>
                                {outputmodel && (
                                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px', backgroundColor: '#f2f2f2' }}>Appoinement ID</th>
                                                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px' }}>{outputmodel.bookingId}</td>
                                            </tr>
                                            <tr>
                                                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px', backgroundColor: '#f2f2f2' }}>Doctor ID</th>
                                                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px' }}>{doctor.doctorId}</td>
                                            </tr>
                                            <tr>
                                                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px', backgroundColor: '#f2f2f2' }}>Doctor Name</th>
                                                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px' }}>{doctor.doctorName}</td>
                                            </tr>
                                            <tr>
                                                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px', backgroundColor: '#f2f2f2' }}>Doctor Specification</th>
                                                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px' }}>{doctor.specification}</td>
                                            </tr>
                                            <tr>
                                                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px', backgroundColor: '#f2f2f2' }}>Patient ID</th>
                                                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px' }}>{patientData.patientId}</td>
                                            </tr>
                                            <tr>
                                                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px', backgroundColor: '#f2f2f2' }}>Patient Name</th>
                                                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px' }}>{outputmodel.patientName}</td>
                                            </tr>
                                            <tr>
                                                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px', backgroundColor: '#f2f2f2' }}>Booking Amount</th>
                                                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px' }}>{outputmodel.bookingAmount}</td>
                                            </tr>
                                            <tr>
                                                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px', backgroundColor: '#f2f2f2' }}>Appointment Date</th>
                                                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px' }}>{outputmodel.appointmentDate}</td>
                                            </tr>
                                            <tr>
                                                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px', backgroundColor: '#f2f2f2' }}>Booking Date</th>
                                                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px' }}>{outputmodel.bookingDate}</td>
                                            </tr>
                                            <tr>
                                                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px', backgroundColor: '#f2f2f2' }}>Booking Status</th>
                                                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px' }}>{outputmodel.bookigStatus}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )}
                            </div>
                            <div>
                                <button onClick={handlePrint} style={{ marginTop: '8px', borderRadius: '5px', backgroundColor: '#258e25', color: '#fff' }}>Print Receipt</button>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
