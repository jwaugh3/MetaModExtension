
const discordRankFormDefault = {
    rewardType: 'discordRank',
    rewardName: '+1 Discord Rank',
    rewardID: '',
    cost: '200000',
    description: 'Level up in discord to become more powerful!',
    //color picker
    backgroundColor: "#7082E1",
    colorSelect: ['#05A1E5', '#8B35D8', '#00FF7F', '#FF0811', '#353435', '#73C2E4', '#B78BDD', '#71F1B1', '#F17579', '#8B8B8B'],
    displayPicker: false,
    showCustomizer: false,
    viewerInputRequired: false,
    addRedemption: true,
    cooldown: false,
    redemptionCooldownTimeLabel: 'seconds',
    redemptionCooldownTime: 0,
    redemptionPerStream: '',
    redemptionPerUser: '',
    isEnabled: true,
    isManageable: true,
    //custom settings
    rankNames: ['Rank - Bronze', 'Rank - Silver', 'Rank -Gold', 'Rank - Platinum'],
    rankColors: ['#FFB18E', '#D6D6D6', '#FFD28E', '#72D0E3'],
    rankIDs: ['1', '2', '3', '4'],
    serverName: '',
    serverID: '',
    ownerLogin: '',
    ownerID: '',
    discriminator: ''
}

module.exports = discordRankFormDefault