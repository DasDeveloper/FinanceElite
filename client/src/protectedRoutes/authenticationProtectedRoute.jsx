import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { SessionAPIContext } from "../contexts/SessionAPIContext";

const AuthenticatedProtectedRoute = ({children}) => {
  
    const navigate = useNavigate();
    const sessionInfo = useContext(SessionAPIContext)

    if(sessionInfo){
        navigate('/dashboard')
        return;
    }
    return children;
}

export default AuthenticatedProtectedRoute