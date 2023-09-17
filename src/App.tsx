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
} from './components';
import { useState } from 'react';
import { useCompletion } from 'ai/react';
import { useTheme } from './components/theme-provider';

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
    isLoading
  } = useCompletion({
    api: 'http://localhost:3333/ai/complete',
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-type': 'application/json',
    },
  })

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='px-6 py-3 flex items-center justify-between border-b'>
        <h1 className='text-xl font-bold'>upload.ai</h1>

        <div className='flex items-center gap-3'>
          <span className='text-sm text-muted-foreground'>
            Desenvolvido por{' '}
            <a
              href='https://silasrodrigues.vercel.app'
              target='_blank'
              className='leading-relaxed hover:text-foreground'
            >
              Silas Rodrigues
            </a>
          </span>

          <Separator orientation='vertical' className='h-6' />

          <Button onClick={toggleTheme} variant='inherit' size='sm'>
            <CloudSun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
            <CloudMoon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
            <span className='sr-only'>Toggle theme</span>
          </Button>

          <Separator orientation='vertical' className='h-6' />

          <Button variant='outline'>
            <Github className='w-4 h-4 mr-2' />
            <a href='https://github.com/SilasRodrigues19' target='_blank'>
              GitHub
            </a>
          </Button>
        </div>
      </div>
      <main className='flex-1 p-6 flex gap-6'>
        <section className='flex flex-col flex-1 gap-4'>
          <div className='grid grid-rows-2 gap-4 flex-1'>
            <Textarea
              className='resize-none p-4 leading-relaxed'
              placeholder='Inclua o prompt para a IA...'
              value={input}
              onChange={handleInputChange}
            />
            <Textarea
              className='resize-none p-4 leading-relaxed'
              placeholder='Resultado gerado pela IA...'
              readOnly
              value={completion}
            />
          </div>

          <p className='text-sm text-muted-foreground'>
            Lembre-se: você pode utilizar a variável{' '}
            <code className='text-violet-400'>{'{transcription}'}</code> no seu
            prompt para adicionar o conteúdo da transcrição do vídeo
            selecionado.
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
              <Label>Modelo</Label>
              <Select disabled defaultValue='gpt3.5'>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='gpt3.5'>GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className='block text-sm text-muted-foreground italic'>
                Você poderá customizar essa opção em breve
              </span>
            </div>

            <Separator />

            <div className='space-y-4'>
              <Label>Temperatura</Label>

              <Slider
                className='cursor-pointer'
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
              />

              <span className='block text-sm text-muted-foreground italic leading-relaxed'>
                {temperature.toFixed(1)}{' '}
              </span>

              <span className='block text-sm text-muted-foreground italic leading-relaxed'>
                Valores mais altos tendem a deixar o resultado mais criativo e
                com possíveis erros.
              </span>
            </div>

            <Separator />

            <Button
              disabled={isLoading}
              type='submit'
              className='w-full disabled:cursor-not-allowed'
              onClick={handleClickButton}
            >
              Executar
              <Sparkles className='w-4 h-4 ml-2' />
            </Button>
            {uploadButtonClicked && !videoId && (
              <AlertDialog
                title='Carregue o vídeo e selecione o Prompt'
                icon={XCircle}
              />
            )}
          </form>
        </aside>
      </main>
    </div>
  );
}
