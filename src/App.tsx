import { Github, Sparkles, XCircle, CloudMoon, CloudSun } from 'lucide-react';
import {
  Button,
  Separator,
  Textarea,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
  VideoInputForm,
  PromptSelect,
  AlertDialog,
  HelpArea
} from '@/components';
import { useState } from 'react';
import { useCompletion } from 'ai/react';
import { useTheme } from './components/theme-provider';

const apiURL = import.meta.env.VITE_BACKEND_URL;

export const App = () => {

  const [temperature, setTemperature] = useState(0.5);
  const [videoId, setVideoId] = useState<string | null >(null);
   const [uploadButtonClicked, setUploadButtonClicked] = useState(false);
   const { theme, setTheme } = useTheme();

   const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

   const handleClickButton = () => {
     setUploadButtonClicked(true);

     setTimeout(() => {
       setUploadButtonClicked(false);
     }, 5000);
   };

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: `${apiURL}/ai/complete`,
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-type': 'application/json',
    },
  });

  return (
    <main className='min-h-screen flex flex-col'>
      <div className='px-6 py-3 flex items-center justify-between border-b'>
        <h1 className='text-xl font-bold'>upload.ai</h1>

        <div className='flex items-center gap-1 md:gap-3'>
          <span className='text-sm text-muted-foreground hidden lg:block'>
            Developed by{' '}
            <a
              href='https://silasrodrigues.vercel.app'
              target='_blank'
              className='leading-relaxed hover:text-foreground'
            >
              Silas Rodrigues
            </a>
          </span>

          <Separator orientation='vertical' className='h-6 hidden lg:block' />

          <Button onClick={toggleTheme} variant='inherit' size='sm'>
            <CloudSun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
            <CloudMoon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
            <span className='sr-only'>Toggle theme</span>
          </Button>

          <Separator orientation='vertical' className='h-6' />

          <HelpArea />

          <Button variant='outline'>
            <Github className='w-4 h-4 mr-2' />
            <a href='https://github.com/SilasRodrigues19' target='_blank'>
              GitHub
            </a>
          </Button>
        </div>
      </div>
      <div className='flex-1 p-6 flex gap-6 flex-col-reverse items-center sm:items-stretch sm:flex-row'>
        <section className='flex flex-col flex-1 gap-4'>
          <div className='grid grid-rows-2 gap-4 flex-1'>
            <Textarea
              className='h-[26rem] resize-none p-4 leading-relaxed focus-visible:ring-2 focus-visible:ring-indigo-500'
              placeholder='Include the prompt for the AI...'
              value={input}
              onChange={handleInputChange}
            />
            <Textarea
              className='h-[26rem] resize-none p-4 leading-relaxed focus-visible:ring-2 focus-visible:ring-indigo-500'
              placeholder='AI Response...'
              readOnly
              value={completion}
            />
          </div>

          <p className='text-sm text-muted-foreground'>
            Remember: you can use the variable{' '}
            <code className='text-violet-400'>{'{transcription}'}</code> in your
            prompt to add video transcript content selected.
          </p>
        </section>

        <aside className='w-80 space-y-6'>
          <VideoInputForm onVideoUploaded={setVideoId} />

          <Separator />

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <Label>Prompt</Label>
              <PromptSelect onPromptSelected={setInput} />
            </div>

            <div className='space-y-2'>
              <Label>Model</Label>
              <Select disabled defaultValue='gpt3.5'>
                <SelectTrigger className='focus:ring-2 focus:ring-indigo-500'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='gpt3.5'>GPT 3.5-turbo 16k</SelectItem>
                  <SelectItem disabled value='gpt3.5'>
                    GPT 4
                  </SelectItem>
                </SelectContent>
              </Select>
              <span className='block text-sm text-muted-foreground italic'>
                GPT-4 available soon
              </span>
            </div>

            <Separator />

            <div className='space-y-4'>
              <Label>Temperature</Label>

              <Slider
                className='cursor-pointer'
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
              />

              <span className='block text-sm text-muted-foreground italic leading-relaxed'>
                Current temperature is {temperature.toFixed(1)}{' '}
              </span>

              <span className='block text-sm text-muted-foreground italic leading-relaxed'>
                Higher values increase response creativity but are more
                susceptible to errors.
              </span>
            </div>

            <Separator />

            <Button
              disabled={isLoading}
              type='submit'
              className='w-full bg-indigo-500 disabled:cursor-not-allowed hover:bg-indigo-400 focus-within:ring-2 focus-within:ring-indigo-400'
              onClick={handleClickButton}
            >
              Execute
              <Sparkles className='w-4 h-4 ml-2' />
            </Button>
            {uploadButtonClicked && !videoId && (
              <AlertDialog
                title='Upload the video and select the Prompt'
                icon={XCircle}
              />
            )}
          </form>
        </aside>
      </div>
    </main>
  );
}
