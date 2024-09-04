import {
    PollyClient,
    SynthesizeSpeechCommand,
    SynthesizeSpeechCommandInput,
    SynthesizeSpeechCommandOutput
} from "@aws-sdk/client-polly";
import {uploadFile} from "./file";
import {Readable} from "stream";


export const pollyClient = new PollyClient([
    {
        region: "eu-west-1",
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
    }]);

export async function generateAudio(text: string) {
    const cmd = new SynthesizeSpeechCommand({
        OutputFormat: "mp3",
        Text: text,
        VoiceId: "Hans"
    });

    const pollyResponse = await pollyClient.send<SynthesizeSpeechCommandInput, SynthesizeSpeechCommandOutput>(cmd);
    const audioStream = pollyResponse.AudioStream;
    if (!audioStream) {
        return;
    }
    if (audioStream instanceof Readable) {
        await uploadFile("lernendata", text.slice(0, 15) + ".mp3", audioStream, "audio/mpeg");
        console.log("Generated Audio")
    }
}

