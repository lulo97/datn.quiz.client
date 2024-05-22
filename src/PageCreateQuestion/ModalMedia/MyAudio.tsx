import { BACKEND_URL } from "@/Utils";
import { CreateQuestionProps } from "../Utils";
import { useState, useEffect } from "react";

//https://stackoverflow.com/questions/40885776/reactjs-not-rendering-html-audio-correctly-after-first-render

export function MyAudio(props: CreateQuestionProps) {
    const { state } = props;
    const API_URL = BACKEND_URL + "public/Audio/DummyAudio.ogg";
    const [audioSrc, setAudioSrc] = useState<string>(API_URL);

    useEffect(() => {
        if (state.AudioFile) {
            const objectUrl = URL.createObjectURL(state.AudioFile);
            setAudioSrc(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setAudioSrc(API_URL);
        }
    }, [state.AudioFile]);

    return (
        <div>
            <audio className="w-full" key={audioSrc} controls>
                <source src={audioSrc} />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}
