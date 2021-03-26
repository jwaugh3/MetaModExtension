export const verifyToken = async (apiURL, token) => {
    let verificationStatus = new Promise((resolve, reject)=>{
        fetch(apiURL + '/api/verifyJWT/' + token)
        .then((data)=>{
            data.json()
            .then((res)=>{
                resolve(res)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    })

    return verificationStatus
}

export const getChannel = async (apiURL, token) => {
    let getChannel = new Promise((resolve, reject)=>{
        fetch(apiURL + '/api/getChannel/' + token)
        .then((data)=>{
            data.json()
            .then((res)=>{
                resolve(res)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    })

    return getChannel
}

export const updateChannel = async (apiURL, token, settings) => {
    let updatedSettings = new Promise((resolve, reject)=>{
        fetch(apiURL + '/api/updateChannel/' + token, {
            method: 'POST',
            body: JSON.stringify({
                settings
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then((data)=>{
            data.json()
            .then((res)=>{
                resolve(res)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    })

    return updatedSettings
}