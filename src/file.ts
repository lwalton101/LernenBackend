import {S3Client} from "@aws-sdk/client-s3";
import multerS3 from "multer-s3"
import multer from "multer";

export const s3client = new S3Client([
    {
        region: "eu-west-1",
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
    }]);


export const pfpUpload = multer({
    storage: multerS3({
        s3: s3client,
        bucket: 'lernendata',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, `pfp/${file.originalname}`)
        },
    })
})