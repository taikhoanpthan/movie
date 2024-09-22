import { useNavigate } from "react-router-dom";
import "./index.scss";

function Navbar() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/'); // Navigate to home page
  };

  const handleDashboardClick = () => {
    navigate('/dashboard'); // Navigate to dashboard page
  };

  return (
    <div className="header">
      <div className="header__left" onClick={handleLogoClick}>
        <h1 style={{color:"red"}}>MY-MOVIE</h1>
      </div>
      <div className="header__right">
        <h1>Phim gần gũi cho mọi lứa tuổi</h1>
        <button onClick={handleDashboardClick}>Go to Dashboard</button>
      </div>
      
    </div>
  );
}

export default Navbar;
