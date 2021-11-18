const notes = require("../data/notes-data");

function list(req, res){
    res.json({ data: notes})
}


module.exports = {

    list, 
}