import { create } from 'apisauce'

const api = create({
    baseURL: 'https://v3.football.api-sports.io/',
    headers: { 
        'x-rapidapi-host': 'https://v3.football.api-sports.io/',
        'x-rapidapi-key': 'db3d5e82d74850fe395306bc9eec577b'
    },
})

export default api;