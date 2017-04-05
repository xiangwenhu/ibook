const fs = require('fs')
const archiver = require('archiver')

async function czip(sourDir, dest) {
    return new Promise((reslove, reject) => {

        var output = fs.createWriteStream(dest)
        var archive = archiver('zip', {
            zlib: { level: 2 }
        })
        // listen for all archive data to be written
        output.on('close', () => {
            reslove(dest)
        })
        // good practice to catch this error explicitly
        archive.on('error', (err) => {
            reject(err)
        })

        archive.pipe(output)
        archive.directory(sourDir)
        archive.finalize()
    })
}


module.exports = {
    zipFolder: czip
}
