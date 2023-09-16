import { Upload, Youtube } from "lucide-react";
import { Button, Label, Separator, Textarea } from "../components";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { getFFmpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { api } from "@/lib/axios";

type Status = 'waiting' | 'converting' | 'uploading' | 'generating' | 'finished';

const statusMessage = {
  converting: 'Convertendo...',
  uploading: 'Enviando...',
  generating: 'Transcrevendo...',
  finished: 'Finalizado!',
}

interface VideoInputFormProps {
  onVideoUploaded: (id: string) => void;
}

export const VideoInputForm = (props: VideoInputFormProps) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>('waiting');
  const promptInputRef = useRef<HTMLTextAreaElement>(null);

  const handleFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;

    if (!files) {
      return;
    }

    const selectedFile = files[0];

    setVideoFile(selectedFile);
    setStatus('waiting');
  };

  const convertVideoToAudio = async (video: File) => {
    console.log('Converted started.');

    const ffmpeg = await getFFmpeg();

    await ffmpeg.writeFile('input.mp4', await fetchFile(video));

    /* ffmpeg.on('log', log => {
      console.error(log);
    }) */

    ffmpeg.on('progress', (progress) => {
      console.log(`Convert progress ${Math.round(progress.progress * 100)}`);
    });

    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '20k',
      '-acodec',
      'libmp3lame',
      'output.mp3',
    ]);

    const data = await ffmpeg.readFile('output.mp3');

    const audioFileBlob = new Blob([data], { type: 'audio/mp3' });
    const audioFile = new File([audioFileBlob], 'audio.mp3', {
      type: 'audio/mpeg',
    });

    console.log('Converted finished.');

    return audioFile;
  };

  const handleUploadVideo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const prompt = promptInputRef.current?.value;

    if (!videoFile) {
      return;
    }

    setStatus('converting');

    const audioFile = await convertVideoToAudio(videoFile);

    const data = new FormData();

    data.append('file', audioFile);

    setStatus('uploading');

    const response = await api.post('/videos', data);

    const videoId = response.data.video.id;

    setStatus('generating');

    await api.post(`/videos/${videoId}/transcription`, {
      prompt,
    });

    setStatus('finished');

    props.onVideoUploaded(videoId);
  };

  const previewUrl = useMemo(() => {
    if (!videoFile) {
      return null;
    }

    return URL.createObjectURL(videoFile);
  }, [videoFile]);

  return (
    <form onSubmit={handleUploadVideo} className='space-y-6'>
      <label
        htmlFor='video'
        className='relative flex items-center justify-center flex-col gap-2 border border-dashed rounded-md aspect-video cursor-pointer text-muted-foreground text-sm hover:bg-primary/5'
      >
        {previewUrl ? (
          <video
            src={previewUrl}
            controls={false}
            className='absolute inset-0 pointer-events-none bg-cover'
          />
        ) : (
          <>
            <Youtube className='w-4 h-4' />
            Selecione um vídeo
          </>
        )}
      </label>
      <input
        type='file'
        id='video'
        accept='video/mp4'
        className='sr-only'
        onChange={handleFileSelected}
      />

      <Separator />

      <div className='space-y-2'>
        <Label htmlFor='transcription_prompt'>Prompt de transcrição</Label>
        <Textarea
          ref={promptInputRef}
          disabled={status !== 'waiting'}
          id='transcription_prompt'
          className='h-20 leading-relaxed resize-none disabled:cursor-not-allowed'
          placeholder='Inclua palavras-chave mencionadas no vídeo separadas por vírgula'
        />
      </div>

      <Button
        data-finished={status === 'finished'}
        disabled={status !== 'waiting'}
        type='submit'
        className='w-full data-[finished=true]:bg-emerald-400 disabled:cursor-not-allowed'
      >
        {status === 'waiting' ? (
          <>
            Carregar vídeo
            <Upload className='w-4 h-4 ml-2' />
          </>
        ) : (
          statusMessage[status]
        )}
      </Button>
    </form>
  );
};