const multer = require('multer') 
const {uuid} = require('uuidv4')
const path = require('path')

const storage = multer.diskStorage({
    destination: 'uploads/proyect_pictures',
    filename:(req, file, cb)=>{
        cb(null, uuid() + path.extname(file.originalname))
    }
})

const upload_Pyp = multer({
    storage: storage,
    fileFilter: (req, file, cb)=>{
        if(file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg"){
            cb(null, true)
        }else{
            cb(null, false)
            return cb(new Error("Solo .png .jpg o jpeg son permitidos"))
        }
    }
})

module.exports = upload_Pyp