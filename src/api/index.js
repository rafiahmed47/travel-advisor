import axios from "axios";

const URL = 'https://travel-advisor.p.rapidapi.com/hotels/list-in-boundary';
export const getPlaceData = async (sw, ne) => {
    try {
        const { data: { data } } = await axios.get(URL, {
            params: {
                bl_latitude: sw?.lat,
                bl_longitude: sw?.lng,
                tr_longitude: ne?.lng,
                tr_latitude: ne?.lat
            },
            headers: {
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                'x-rapidapi-key': '9b2168359amshd157f76b63bf86cp1d91a7jsn3415b366fb72'
            }
        });
        return data;
    } catch (error) {
        console.log(error)
    }
}