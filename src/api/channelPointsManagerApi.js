export const createCustomReward = async (apiURL, channel, customReward, customSettings) => {

    let rewardData = new Promise((resolve, reject)=>{
        fetch(apiURL + '/channelPointsManager/createCustomRewards/', {
            method: 'POST',
            body: JSON.stringify({
                channel,
                data: customReward,
                settings: customSettings
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

    return rewardData
}

export const deleteCustomReward = async (apiURL, channel, id) => {

    let rewardData = new Promise((resolve, reject)=>{
        fetch(apiURL + '/channelPointsManager/deleteCustomReward/', {
            method: 'POST',
            body: JSON.stringify({
                channel,
                id,
                data: {
                    
                }
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

    return rewardData
}

export const getCustomReward = async (apiURL, channel) => {

    let rewards =[]
    let manageable = [true, false]

    for(let i=0; i < 2; i++){
        
        var check = await new Promise((resolve, reject)=>{
            fetch(apiURL + '/channelPointsManager/getCustomReward/' + channel + '/' + manageable[i])
            .then((data)=>{
                data.json()
                .then((res)=>{
                    rewards.push(res)
                    resolve(res)
                })
            })
            .catch((error)=>{
                reject(error)
                console.log(error)
            })
        })

        if(check.error){
            return 'error'
        }
    }


    if(rewards[0].length !== 0 && rewards[1].length !== 0){
        for(let x=0; x < rewards[0].data.length; x++){
            for(let y=0; y < rewards[1].data.length; y++){
                if(rewards[0].data[x].id === rewards[1].data[y].id){
                    rewards[1].data.splice(y, 1)
                }
            }
        }
    }
console.log(rewards)
    return rewards
}

export const updateCustomReward = async (apiURL, channel, rewardID, updatedData, customSettings) => {

    let rewardData = new Promise((resolve, reject)=>{
        fetch(apiURL + '/channelPointsManager/updateCustomReward', {
            method: 'POST',
            body: JSON.stringify({
                channel,
                rewardID,
                data: updatedData,
                settings: customSettings
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

    return rewardData
}

export const getRewardSettings = async (apiURL, channel, customRewards, setCustomSettings) => {
        
    var rewardSettings = await new Promise((resolve, reject)=>{
        fetch(apiURL + '/channelPointsManager/getRewardSettings/' + channel)
        .then((data)=>{
            data.json()
            .then((res)=>{
                resolve(res)
            })
        })
        .catch((error)=>{
            reject(error)
            console.log(error)
        })
    })

    //set stored custom settings to the respective reward
    rewardSettings.custom_rewards.forEach((reward)=>{

        let settings = JSON.parse(reward.reward_settings)
        if(reward.reward_type === 'giveaway' || reward.reward_type === 'vip'){
            console.log(reward)
            let setBadgeNum = customRewards.findIndex(x => x.rewardID === reward.reward_id)
            console.log(setBadgeNum)
            setCustomSettings(setBadgeNum, 'rewardType', reward.reward_type)
            for(let key in settings){
                setCustomSettings(setBadgeNum, key, settings[key])
            }
        }
        if(reward.reward_type === 'custom'){
            let setBadgeNum = customRewards.findIndex(x => x.rewardID === reward.reward_id)
            setCustomSettings(setBadgeNum, 'rewardType', reward.reward_type)
        }
    })

    return rewardSettings
}

export const getRewardEntries = async (apiURL, channel, rewardID) => {

        
    var rewardEntries = await new Promise((resolve, reject)=>{
        fetch(apiURL + '/channelPointsManager/getRewardEntries/' + channel + '/' + rewardID)
        .then((data)=>{
            data.json()
            .then((res)=>{
                resolve(res)
            })
        })
        .catch((error)=>{
            reject(error)
            console.log(error)
        })
    })

    return rewardEntries
}


export const getWinners = async (apiURL, channel, rewardID) => {

        
    var rewardWinners = await new Promise((resolve, reject)=>{
        fetch(apiURL + '/channelPointsManager/getWinners/' + channel + '/' + rewardID)
        .then((data)=>{
            data.json()
            .then((res)=>{
                resolve(res)
            })
        })
        .catch((error)=>{
            reject(error)
            console.log(error)
        })
    })

    return rewardWinners
}

export const rerollWinner = async (apiURL, channel, rewardID, user) => {

        
    var rerolledWinners = await new Promise((resolve, reject)=>{
        fetch(apiURL + '/channelPointsManager/reroll/' + channel + '/' + rewardID + '/' + user)
        .then((data)=>{
            data.json()
            .then((res)=>{
                resolve(res)
            })
        })
        .catch((error)=>{
            reject(error)
            console.log(error)
        })
    })

    return rerolledWinners
}

export const getMods = async (apiURL, channel) => {

        
    var mods = await new Promise((resolve, reject)=>{
        fetch(apiURL + '/channelPointsManager/getMods/' + channel)
        .then((data)=>{
            data.json()
            .then((res)=>{
                resolve(res)
            })
        })
        .catch((error)=>{
            reject(error)
            console.log(error)
        })
    })

    return mods
}