import { LoginPatient } from './components/LoginPatient';
import { Home } from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookAppointment } from './components/BookAppointment';
import { RegisterPatient } from './components/RegisterPatient';
import { PatientDashboard } from './components/PatientDashboard';
import { ViewDoctors } from './components/ViewDoctors';
import { ViewAppointment } from './components/ViewAppointment';
import { Navbar } from './components/Navbar';
import { Profile } from './components/Profile';
import { Footer } from './components/Footer';


export function Header() {
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={<LoginPatient />}></Route>
                    <Route path="/register" element={<RegisterPatient />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="/patientdashboard" element={<PatientDashboard />}></Route>
                    <Route path="/viewdoctors" element={<ViewDoctors />}></Route>
                    <Route path="/bookappointment" element={<BookAppointment />}></Route>
                    <Route path="/viewappointment" element={<ViewAppointment />}></Route>
                </Routes>
                <Footer/>
            </Router>
        </div>
    )
}