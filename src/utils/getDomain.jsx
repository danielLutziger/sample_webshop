import {isProduction} from "./isProduction.jsx";

export const getDomain = () => {
    const prodUrl = 'https://fastapi-service-431005198650.europe-west6.run.app'
    const devUrl = 'http://localhost:8080'

    return isProduction() ? prodUrl : devUrl
}
