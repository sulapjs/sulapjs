class UploadController {

    static uploadImage (req, res){
        if(req.file) {
            res.status(200).json({
                image: req.file.filename,
            })
        } else {
            const err = {
                status: 404,
                message: 'error upload image'
            }
            next(err)
        }

    }
}

module.exports = UploadController