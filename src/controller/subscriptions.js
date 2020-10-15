const topics = require('')
function Subscriptions(aedesInstance, list) {
    this.list = list
    this.topics = []
}

Subscriptions.prototype.getTopicNames = function() {
    let names = []
    for(topic of this.topics) {
        names.push(topic.getTopic)
    }
    return names
}

Subscriptions.prototype.autoload = function() {
    
}