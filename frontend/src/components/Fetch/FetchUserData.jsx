import { useContext, useEffect } from "react";
import { UserDataContext } from "../Context/Context";

const FetchUserData = () => {
    
    const { setUserData } = useContext(UserDataContext);

    useEffect(() => {
        const fetchRequest = async (apiKey) => {
            const fetchResponse = await fetch(apiKey);
            const result = await fetchResponse.json();
            setUserData(result);
        }
        fetchRequest("http://localhost:3001/api/userData");
    }, []);
}
 
export default FetchUserData;