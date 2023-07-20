import { SpeechToTextRequest } from "sonix-speech-recognition/lib/types.js";
import { Document } from "../../document.js";
import { BaseDocumentLoader } from "../base.js";
export declare class SonixAudioTranscriptionLoader extends BaseDocumentLoader {
  private readonly sonixSpeechRecognitionService;
  private readonly speechToTextRequest;
  constructor({
    sonixAuthKey,
    request: speechToTextRequest,
  }: {
    sonixAuthKey: string;
    request: SpeechToTextRequest;
  });
  load(): Promise<Document[]>;
}
