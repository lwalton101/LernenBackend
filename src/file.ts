import {S3Client} from "@aws-sdk/client-s3";
import multerS3 from "multer-s3"
import multer from "multer";
import {StreamingBlobPayloadInputTypes} from "@smithy/types";
import {Upload} from "@aws-sdk/lib-storage";

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

export async function uploadFile(bucketName: string, objectKey: string, audioStream: StreamingBlobPayloadInputTypes, contentType: string): Promise<void> {
    try {
        // Use the Upload class from @aws-sdk/lib-storage for streaming upload
        const upload = new Upload({
            client: s3client,
            params: {
                Bucket: bucketName,
                Key: objectKey,
                Body: audioStream,
                ContentType: contentType,
            },
        });

        // Await the completion of the upload
        const s3Response = await upload.done();
        console.log("File uploaded successfully:", s3Response);
    } catch (error) {
        console.error("Error uploading to S3:", error);
    }
}