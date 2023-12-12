import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import { useReactToPrint } from 'react-to-print';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
const PRODUCT_API_BASE_URL = "http://localhost:5656";

export function ViewAppointment() {
    const [appointment, setAppointment] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [modal, setModal] = useState(false);
    const [searchBookingId, setSearchBookingId] = useState("");
    const [filteredAppointment, setFilteredAppointment] = useState([]);
    const [cancelOutputModel, setCancelOutputModel] = useState(null);
    const [refundAmount, setRefundAmount] = useState("");
    const navigate = useNavigate();

    const storedPatientData = localStorage.getItem("patientData");
    const patientData = storedPatientData ? JSON.parse(storedPatientData) : null;
    const patientId = patientData ? patientData.patientId : null;
    const [status,setStatus]=useState(false);

    console.log(cancelOutputModel);

    useEffect(() => {
        if (patientData === null) {
            navigate('/login');
        }
    }, []
    );

    useEffect(() => {
        const fetchAppointment = () => {
            axios
                .get(PRODUCT_API_BASE_URL + "/getappointmentbypatientid/" + patientId)
                .then((res) => {
                    setAppointment(res.data);
                    setFilteredAppointment(res.data);
                    console.log(res.data);
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        };

        fetchAppointment();
    }, [status]);

    const handleViewDetails = (bookingId) => {
        // Find the appointment with the selected booking ID from the fetched appointments

        const selectedAppointment = appointment.find((app) => app.bookingId === bookingId);
        setSelectedAppointment(selectedAppointment);
        if (selectedAppointment.bookigStatus === "Cancelled") {
            axios.get(PRODUCT_API_BASE_URL + "/getcanceldetailsbybookingid/" + bookingId)
                .then((res) => {
                    setRefundAmount(res.data.refundAmount);
                })
        }
        setModal(true);
    };

    const handleCancelBooking = (bookingId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this appointment!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(PRODUCT_API_BASE_URL + "/cancelappointmentbyid/" + bookingId)
                    .then((res) => {
                        setCancelOutputModel(res.data)
                        console.log(res.data);
                        console.log(bookingId);
                        setStatus(!status);
                    })
                    .catch((err) => {
                        console.log(err.response.data.erroMessage);
                        toast.error("Current date surpasses appointment date", { position: "top-center", autoClose: 3000 });
                    });
            }
        });
    };


    const handleSearch = () => {
        const filtered = appointment.filter((app) => app.bookingId.toString() === searchBookingId);
        setFilteredAppointment(filtered);
    };

    const handleClearSearch = () => {
        setSearchBookingId("");
        setFilteredAppointment(appointment);
    };

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'patient-invoice'
    });

    return (
        <div>
            <div style={{ backgroundImage: 'url(./img/background.webp)', minHeight: '85vh' }}>
                <div>
                    <h2 style={{ textAlign: 'center', paddingTop: '40px' }}>Appointment List</h2>
                </div>
                <div style={{ marginTop: '10px' }}>
                    <input style={{ borderRadius: '5px', marginLeft: '15px' }} type="text" value={searchBookingId} onChange={(e) => setSearchBookingId(e.target.value)} placeholder="Search by Booking ID" />
                    <button style={{ padding: '5px 10px', borderRadius: '5px', background: '#258e25', color: '#fff', border: 'none', cursor: 'pointer', marginLeft: '10px' }} onClick={handleSearch}>Search</button>
                    <button style={{ padding: '5px 10px', borderRadius: '5px', background: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer', marginLeft: '10px' }} onClick={handleClearSearch}>Clear</button>
                </div>
                {filteredAppointment.map((app) => (
                    <div key={app.bookingId}>
                        <div style={{ marginTop: '20px', marginLeft: '100px', marginRight: '100px', marginBottom: '20px' }}>
                            <div className="card">
                                <h5 className="card-header">Appointment ID: {app.bookingId}</h5>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5 className="card-title">Patient Name: {app.patientName}</h5>
                                            <p className="card-text">Appointment Date: {app.appointmentDate}</p>
                                            <p className="card-text">Booking Date: {app.bookingDate}</p>
                                            <button onClick={() => handleViewDetails(app.bookingId)} className="btn btn-primary">View Details</button>
                                            {app.bookigStatus === 'Booked' && app.cancelStatus === true && (
                                                <button style={{ marginLeft: '10px' }} onClick={() => handleCancelBooking(app.bookingId)} className="btn btn-danger">Cancel Booking</button>
                                            )}
                                            {app.bookigStatus === 'Booked' && app.cancelStatus === false && (
                                                <button style={{ marginLeft: '10px' }} onClick={() => handleCancelBooking(app.bookingId)} className="btn btn-danger" disabled>Cancel Booking</button>
                                            )}
                                        </div>
                                        <div className="col-md-1 d-flex align-items-center justify-content-center">
                                            {app.bookigStatus === 'Cancelled' && (
                                                <img src="./img/cancelled.png" alt="CancelledLogo" style={{ height: '130px' }} />
                                            )}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <Modal size="lg" isOpen={modal} toggle={() => setModal(!modal)} ref={componentRef}>
                    <ModalHeader>
                        <div>
                            <h2>Booking Details</h2>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            {selectedAppointment && (
                                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px', backgroundColor: '#f2f2f2' }}>Appointment ID</th>
                                            <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px' }}>{selectedAppointment.bookingId}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px', backgroundColor: '#f2f2f2' }}>Doctor ID</th>
                                            <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px' }}>{selectedAppointment.doctorId}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px', backgroundColor: '#f2f2f2' }}>Doctor Name</th>
                                            <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px' }}>{selectedAppointment.doctorName}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px', backgroundColor: '#f2f2f2' }}>Doctor Specification</th>
                                            <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px' }}>{selectedAppointment.specification}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px', backgroundColor: '#f2f2f2' }}>Patient ID</th>
                                            <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px' }}>{selectedAppointment.patientId}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px', backgroundColor: '#f2f2f2' }}>Patient Name</th>
                                            <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px' }}>{selectedAppointment.patientName}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px', backgroundColor: '#f2f2f2' }}>Booking Amount</th>
                                            <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px' }}>{selectedAppointment.bookingAmount}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px', backgroundColor: '#f2f2f2' }}>Appointment Date</th>
                                            <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px' }}>{selectedAppointment.appointmentDate}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px', backgroundColor: '#f2f2f2' }}>Booking Date</th>
                                            <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px' }}>{selectedAppointment.bookingDate}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px', backgroundColor: '#f2f2f2' }}>Booking Status</th>
                                            <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px' }}>{selectedAppointment.bookigStatus}</td>
                                        </tr>
                                        {selectedAppointment.bookigStatus === 'Cancelled' && (
                                            <tr>
                                                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px', backgroundColor: '#f2f2f2' }}>Refund Amount</th>
                                                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '5px' }}>{refundAmount}</td>
                                            </tr>)}

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
            <ToastContainer />
        </div>
    );
}
