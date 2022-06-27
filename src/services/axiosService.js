import APIRequest from '../utils/config/axios.config'

export function getJoke() {
    return APIRequest.get('/jokes/random')
}