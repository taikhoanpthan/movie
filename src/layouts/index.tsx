import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      {/* <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img
          src="https://qph.cf2.quoracdn.net/main-qimg-423be0e0ab38d327137c89e58584e3c2"
          alt=""
          style={{ width: "600px", maxWidth: "100%", margin: "10px 0" }}
        />
        <img
          src="https://qph.cf2.quoracdn.net/main-qimg-8690f52d31a0feb0d90af7289fdc2000"
          alt=""
          style={{ width: "600px", maxWidth: "100%", margin: "10px 0" }}
        />
      </div> */}
    </div>
  );
}

export default Layout;
