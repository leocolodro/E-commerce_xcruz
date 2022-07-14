
const fs = require("fs")
const path = require("path")

const getAllFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
      arrayOfFiles.push(path.join(__dirname, dirPath, file))
    })

  return arrayOfFiles
}

module.exports = getAllFiles