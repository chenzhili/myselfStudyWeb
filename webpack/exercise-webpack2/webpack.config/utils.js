/**
 * Created by YK on 2017/11/16.
 */
const fs = require('fs');
const path = require("path");
// 递归遍历文件夹，获取入口文件
function getAllFiles(dirRoot, type){
    let filterReg = new RegExp('.'+type+'$');
    function getAllFileFromDir(root) {
        let res = [], files = fs.readdirSync(root);
        files.forEach((file) => {
            let pathname = root+'/'+file,
                state = fs.statSync(pathname);
            if (!state.isDirectory()) {
                // 过滤相对应的文件
                filterReg.test(pathname) && res.push(pathname);
            }else{
                res = res.concat(getAllFileFromDir(pathname))
            }
        });
        return res;
    }
    return getAllFileFromDir(dirRoot)
}

function getEntry(files, replaces){
    let entry = {};
    for (let i = 0; i < files.length; i++) {
        let filename = files[i];
        replaces.map((replace) => {
            filename = filename.replace(replace, '')
        });
        entry[filename] = files[i]
    }
    return entry
}
module.exports = {
    getAllFiles,
    getEntry
};