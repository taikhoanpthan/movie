import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

function Navbar() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogoClick = () => {
    navigate("/"); // Navigate to home page
  };

  const handleDashboardClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setPassword(""); // Reset password field
    setError(""); // Reset error message
  };

  const handlePasswordSubmit = () => {
    if (password === "matkhau123") {
      navigate("/dashboard"); // Navigate to dashboard if password is correct
      handleCloseModal(); // Close modal after navigating
    } else {
      setError("Incorrect password! Please try again.");
    }
  };

  return (
    <div className="header">
      <div className="header__left" onClick={handleLogoClick}>
        <h1 style={{ color: "red" }}>MY-MOVIE</h1>
      </div>
      <div className="header__right">
        <h1>Phim gần gũi cho mọi lứa tuổi</h1>
        <button onClick={handleDashboardClick}>Go to Dashboard</button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Enter Password</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            {error && <p className="error">{error}</p>}
            <div className="modal-buttons">
              <button onClick={handlePasswordSubmit}>Submit</button>
              <button onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
