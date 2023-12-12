import { Link, useNavigate } from "react-router-dom";
import { ImHome } from "react-icons/im";
import { IoMdLogIn } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";

export function Navbar() {

    const navigate = useNavigate();

    const handleLogut = () => {
        localStorage.removeItem('patientData');
        localStorage.removeItem('doctors');
        navigate('/');
    }

    const patient = JSON.parse(localStorage.getItem('patientData'));

    return (
        <>
            <nav className="navbar navbar-expand-lg sticky-top" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand">
                        <img src="./img/cclogo.png" alt="Logo" width="150" height="25" className="d-inline-block align-text-top" style={{ marginLeft: '20px' }} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {patient ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link active" style={{ marginRight: '20px', transition: 'color 0.3s', fontWeight: 'bold' }} aria-current="page" to="/patientdashboard">
                                            Hi, {patient.patientName}!
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" style={{ marginRight: '20px', transition: 'color 0.3s', fontWeight: 'bold' }} aria-current="page" to="/profile">
                                            <BsFillPeopleFill size={18} style={{marginBottom:'4px', marginRight:'5px'}}/>Profile
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <button onClick={handleLogut} className="nav-link active" style={{ marginRight: '20px', transition: 'color 0.3s', fontWeight: 'bold' }} aria-current="page">
                                            <BiLogOutCircle size={18} style={{marginBottom:'4px', marginRight:'5px'}}/>Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link active" style={{ marginRight: '25px', transition: 'color 0.3s', fontWeight: 'bold' }} aria-current="page" to="/" >
                                            <ImHome size={15} style={{marginBottom:'6px', marginRight:'5px'}}/>Home
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" style={{ marginRight: '20px', transition: 'color 0.3s', fontWeight: 'bold' }} aria-current="page" to="/login">
                                            <IoMdLogIn size={18} style={{marginBottom:'4px', marginRight:'5px'}}/>Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" style={{ marginRight: '20px', transition: 'color 0.3s', fontWeight: 'bold' }} aria-current="page" to="/register">
                                            <BsFillPersonPlusFill size={18} style={{marginBottom:'4px', marginRight:'5px'}}/>Register
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}