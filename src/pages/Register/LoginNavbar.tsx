import { Link } from "react-router-dom";
import { images } from "../..";
import Container from "../../Components/Shared/Container";

const LoginNavbar = () => {
  return (
    <div className="w-full bg-slate-200 shadow-6">
      <Container>
        <div className="flex justify-between items-center ">
          <Link to="/">
            <img className="w-[120px] h-[35px]" src={images.logo} alt="" />
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <button className="px-3 py-1 rounded-md bg-primary text-white font-medium">
                Sign-In
              </button>
            </Link>

            <Link to="/register">
              {" "}
              <button className="px-3 py-1 rounded-md bg-primary text-white font-medium">
                Sign-Up
              </button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginNavbar;
