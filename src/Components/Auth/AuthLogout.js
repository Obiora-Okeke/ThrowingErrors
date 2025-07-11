import Parse from "parse";
import { useNavigate } from "react-router-dom";


const AuthLogout = () => {

  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate("/");
  };

  Parse.User.logOut();

  return(
    <div>
      <p>You have been logged out</p> <button onClick={goBackHandler}>Go Home</button>
    </div>
  );
};

export default AuthLogout;