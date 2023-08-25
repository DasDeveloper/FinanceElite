import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SessionAPIContext } from "../contexts/SessionAPIContext";

const ProtectedRoute = ({children}) => {

    const sessionInfo = useContext(SessionAPIContext);

    const navigate = useNavigate();

    if(!sessionInfo){
        navigate('/login')
        return;
    }
    return children;

   
    
    
}

export default ProtectedRoute


