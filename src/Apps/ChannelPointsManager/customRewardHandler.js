const { createCustomReward, getCustomReward, updateCustomReward, getRewardSettings, createRewardSettings } = require('../../api/channelPointsManagerApi')


export const getCustomRewardHandler = async (apiEndpoint, channel, createReward, setCustomSettings) => {
    await getCustomReward(apiEndpoint, channel).then((existingRewards)=>{
        
        if(existingRewards !== 'error'){

            if(existingRewards[0].data.length !== 0 || existingRewards[1].length !== 0){
                for(let x=0; x < 2; x++){
                    existingRewards[x].data.forEach((existingReward) => {

                        let reward = {
                            rewardName: existingReward.title,
                            rewardID: existingReward.id,
                            cost: existingReward.cost,
                            description: existingReward.prompt,
                            //color picker
                            backgroundColor: existingReward.background_color,
                            colorSelect: ['#05A1E5', '#8B35D8', '#00FF7F', '#FF0811', '#353435', '#73C2E4', '#B78BDD', '#71F1B1', '#F17579', '#8B8B8B'],
                            displayPicker: false,
                            showCustomizer: false,
                            viewerInputRequired: existingReward.is_user_input_required,
                            addRedemption: !existingReward.should_redemptions_skip_request_queue,
                            cooldown: existingReward.global_cooldown_setting.is_enabled,
                            redemptionCooldownTimeLabel: 'minutes',
                            redemptionCooldownTime: existingReward.global_cooldown_setting.global_cooldown_seconds/60,
                            redemptionPerStream: existingReward.max_per_stream_setting.max_per_stream,
                            redemptionPerUser: existingReward.max_per_user_per_stream_setting.max_per_user_per_stream,
                            isEnabled: existingReward.is_enabled,
                            isManageable: x === 0 ? true : false
                        }

                        createReward(reward)
                    });
                }
            }  
        }
    })
    
    return true
}

export const createRewardOnTwitch = async (apiEndpoint, channel, setNewRewardID, customRewards, deleteFailedReward, setChannelPointAlert, badgeNum) => {
// console.log(customRewards)
    let formData = customRewards[badgeNum]

    let cooldownTime = formData.redemptionCooldownTime * 60
    
    let backgroundColor = formData.backgroundColor.toUpperCase()
    
    let rewardDataSend = {
        title: formData.rewardName,
        prompt: formData.description,
        cost: formData.cost,
        is_enabled: formData.isEnabled,
        background_color: backgroundColor,
        is_user_input_required: formData.viewerInputRequired,
        is_global_cooldown_enabled: formData.cooldown,
        global_cooldown_seconds: cooldownTime,
        should_redemptions_skip_request_queue: !formData.addRedemption
    }

    if(formData.redemptionPerStream !== ''){
        rewardDataSend.is_max_per_stream_enabled = true
        rewardDataSend.max_per_stream = formData.redemptionPerStream
    } else {
        rewardDataSend.is_max_per_stream_enabled = false
    }
    // console.log(formData)
    if(formData.redemptionPerUser !== ''){
        rewardDataSend.is_max_per_user_per_stream_enabled = true
        rewardDataSend.max_per_user_per_stream = formData.redemptionPerUser
    } else {
        rewardDataSend.is_max_per_user_per_stream_enabled = false
    }


// console.log(rewardDataSend)
    //create object with metamod settings only
    let standardKeys = [
        'rewardType',
        'rewardName', 
        'rewardID',
        'cost',
        'description',
        'backgroundColor',
        'colorSelect',
        'displayPicker',
        'showCustomizer',
        'viewerInputRequired',
        'addRedemption',
        'cooldown',
        'redemptionCooldownTimeLabel',
        'redemptionCooldownTime',
        'redemptionPerStream',
        'redemptionPerUser',
        'isEnabled',
        'isManageable'
    ]

    let customSettings = {}
    let embedSettings = {}

    for(var key in customRewards[badgeNum]){
        if(!standardKeys.includes(key)){
            embedSettings[key] = customRewards[badgeNum][key]
        }
        else if(key === 'rewardID' || key === 'rewardType'){
            customSettings[key] = customRewards[badgeNum][key]
        }
    }
    let stringifiedEmbed = JSON.stringify(embedSettings)
    customSettings.settings = stringifiedEmbed


    if(formData.rewardID === ''){
        //create
        await createCustomReward(apiEndpoint, channel, rewardDataSend, customSettings).then((data)=>{
            let resData = data.response

            if(resData.message === 'CREATE_CUSTOM_REWARD_DUPLICATE_REWARD'){
                //if error occurs when attempting create a duplicate reward
                deleteFailedReward()
                setChannelPointAlert('Making a duplicate reward? ...Not on my watch ')
                setTimeout(()=>{
                    setChannelPointAlert('')
                }, 6000)
                return
            } else if(resData.error){
                //if error occurs when attempting create a duplicate reward
                deleteFailedReward()
                setChannelPointAlert('Umm.. there was an issue with that reward ')
                setTimeout(()=>{
                    setChannelPointAlert('')
                }, 6000)
                return
            } else {
                
                setNewRewardID({rewardID: resData.id})
                
            }
        })
    } else {

        let updatedStatus = await updateCustomReward(apiEndpoint, channel, formData.rewardID, rewardDataSend, customSettings)

        if(updatedStatus.twitchStatus.error){
            setChannelPointAlert('Umm.. there was an issue with that reward ')
            setTimeout(()=>{
                setChannelPointAlert('')
            }, 6000)
        }
        return updatedStatus
    }
}