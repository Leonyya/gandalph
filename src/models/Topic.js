function Topic() {
    this.topicName = ''
    this.messages = []
}
/* Getters and setters */

Topic.prototype.getTopic = function () { 
    return this.topicName 
}
Topic.prototype.setTopic = function (name) {
    this.topicName = name
}
Topic.prototype.getMessage = function (name) {

}
Topic.prototype.setMessage = function (name) {

}

module.exports = Topic