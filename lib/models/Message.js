module.exports = function Message() {
    this.rawcontent = ''
}

Message.prototype.setRawContent = function(raw) {
    this.rawcontent = raw
}
Message.prototype.getRawContent = function() {
    return this.rawcontent
}