
let baseUrl =  window.location.port == 8080 ? 'https://localhost:8082' : '',
    opt = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

export const setBaseUrl = function (url) {
    baseUrl = url
}
export const getBaseUrl = function(){
    return baseUrl
}

export const get = function (url) {
    return fetch(baseUrl + url).then(res => res.json())
}

export const post = function (url,data, options = {}) {
    let opti = Object.assign({
        method:'POST'
    },opt,{
        body: data ? JSON.stringify(data):null
    },options)
    return fetch(baseUrl + url,opti).then(res => res.json())
}



export default {
    get:get,
    post:post
}