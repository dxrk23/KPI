import axios from "axios";
import api_env from "../env/api_env";

const HOST = api_env.HOST;
const TOKEN = localStorage.getItem("token");

class KPIService {
    async calculateKPI(periodId, targetId) {
        return await axios.get(`${HOST}/api/kpi/${periodId}/${targetId}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        });
    }
}

export default KPIService;