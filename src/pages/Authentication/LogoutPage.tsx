import { Link } from "react-router-dom";

const LogoutPage = () => {
    return (
        <div className="container mt-4 text-center rml">
            <h2>Logout successful</h2>
            <Link to="/Insight">Go To Home</Link>
        </div>
    );
};

export default LogoutPage;
