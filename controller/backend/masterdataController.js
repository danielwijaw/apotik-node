const Usermodel = require("../../model/User")
const EncryptionLib = require("../../library/encryption")

module.exports = {
    gudangcreate: function(req, res) {
        res.send(req.body)
    }
}