/**
 * Created by YK on 2017/11/17.
 */
const utils = require("./utils");
const path = require("path");
let files = utils.getAllFiles(path.join(__dirname,"../www"),"js");
let entry = utils.getEntry(files,[path.join(__dirname,"../www")+'/']);

module.exports = {
    entry
};