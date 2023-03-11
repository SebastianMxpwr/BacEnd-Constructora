const multer = require('multer') 
const {uuid} = require('uuidv4')
const path = require('path')

const storage = multer.diskStorage({
    destination: 'uploads/archivos',
    filename:(req, file, cb)=>{
        cb(null, file.originalname)
    }
})

const upload_Ar= multer({storage: storage})

module.exports = upload_Ar