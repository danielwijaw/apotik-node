const Biodata = require("../../model/Biodata")
const EncryptionLib = require("../../library/encryption")

module.exports = {
    index: function(req, res) {
        Biodata.get(req.con, function(err, rows) {
            res.send(rows)
        })
    },

    store: function(req, res) {
        Biodata.create(req.con, req.body, function(err) {
            res.redirect("/biodata/frontend")
            return false;
            res.send("[{results => Created Success}]")
        })
    },

    edit: function(req, res) {
        Biodata.getById(req.con, req.params.id, function(err, rows) {
            // Encryptionkey
            console.log(EncryptionLib.encrypt(req.params.id))
            res.send(rows[0])
        })
    },

    update: function(req, res) {
        Biodata.update(req.con, req.body, req.params.id, function(err) {
            res.redirect("/biodata/frontend")
            return false;
            res.send("{results => Updated Success}")
        })
    },

    destroy: function(req, res) {
        Biodata.destroy(req.con, req.params.id, function(err) {
            res.redirect("/biodata/frontend")
            return false;
            res.send("{results => Deleted Data Success}")
        })
    }
}
