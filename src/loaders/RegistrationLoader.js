import api from "../services/api";


const regisLoader = async () => {

    try {
        const res   = await api.get("/api/guest/config");
        const data = res.data;
    
        return data;
    } catch(err) {
        return null;
    }

    // console.log(res);

    

}


export default regisLoader;