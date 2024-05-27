import axios from "axios"

export const getFilms = (name = "avengers") => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "LOAD"
            })

            const { data } = await axios.get(`http://www.omdbapi.com/?s=${name}&apikey=7758efd5`).then(data => data)

            dispatch({
                type: "SUCCESS",
                payload: data.Search
            })

        } catch (error) {
            dispatch({
                type: "ERROR",
                payload: "XETA BASH VERDI",
            });
        }
    }
}