
const giveawayFormDefault = {
    rewardType: 'giveaway',
    rewardName: 'Giveaway - ',
    rewardID: '',
    cost: '',
    description: '',
    //color picker
    backgroundColor: "#05A1E5",
    colorSelect: ['#05A1E5', '#8B35D8', '#00FF7F', '#FF0811', '#353435', '#73C2E4', '#B78BDD', '#71F1B1', '#F17579', '#8B8B8B'],
    displayPicker: false,
    showCustomizer: false,
    viewerInputRequired: false,
    addRedemption: false,
    cooldown: false,
    redemptionCooldownTimeLabel: 'seconds',
    redemptionCooldownTime: 0,
    redemptionPerStream: '',
    redemptionPerUser: '',
    isEnabled: true,
    isManageable: true,
    //custom settings
    // endGiveaway: 'Manually',
    // endAt: new Date(),
    monetaryPrize: false,
    winnerCount: 1,
    completed: false
}

module.exports = giveawayFormDefault