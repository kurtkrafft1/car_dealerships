const baseURL = 'http://localhost:8088'
const apiManager = {
    getCarData: () => {
       return fetch (`${baseURL}/cars`)
        .then(r=>r.json())
    }
}
export default apiManager;