
import axios from 'axios';

export default async function (data) : Promise<any> {
    try {
        const downloadRes = await axios.get(data);
        return downloadRes;
    } catch (e) {
        return e.response
    }
}