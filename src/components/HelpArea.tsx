import {
  Info,
  MenuSquare,
  TextSelect,
  Thermometer,
  Video,
  Wand,
} from 'lucide-react';
import {
  AlertDialog as Content,
  Button,
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  ScrollArea,
} from '../components';

export const HelpArea = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='inherit' size='sm'>
          <Info className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>Help</span>
        </Button>
      </SheetTrigger>

      <SheetContent className='select-none'>
        <ScrollArea className='h-full w-full rounded-md border border-transparent p-6'>
          <SheetHeader>
            <SheetTitle>Fluxo de Transcrição</SheetTitle>
            <SheetDescription>
              Nessa sessão explicaremos como funciona o fluxo de transcrição da
              aplicação.
            </SheetDescription>
          </SheetHeader>

          <Separator className='h-1 my-4' />

          <div className='flex items-center flex-col gap-2 space-y-2'>
            <Content
              title='Seleção de vídeo'
              icon={Video}
              className='bg-blue-500'
            />
            <span className='block text-sm text-muted-foreground italic leading-relaxed'>
              Escolha o vídeo que deseja obter a transcrição, se tudo ocorrer
              bem você verá uma pré-visualização em miniatura do vídeo
              escolhido.
            </span>

            <Content
              title='Palavras Chave'
              icon={TextSelect}
              className='bg-blue-500'
            />
            <span className='block text-sm text-muted-foreground italic leading-relaxed'>
              Opcionalmente você pode adicionar palavras-chave separadas por
              vírgula.
            </span>

            <Content title='Prompt' icon={MenuSquare} className='bg-blue-500' />
            <span className='block text-sm text-muted-foreground italic leading-relaxed'>
              Selecione um Prompt de entrada já existente e ajuste se for
              necessário, o prompt contém as informações que serão utilizadas
              para a IA gerar o texto.
            </span>

            <Content
              title='Temperature'
              icon={Thermometer}
              className='bg-blue-500'
            />
            <span className='block text-sm text-muted-foreground italic leading-relaxed'>
              Escala de 0.1 à 1.0 que define a "inteligência" da IA, quanto
              maior a temperatura mais "inteligente" a IA será e também mais
              suscetível a erros.
            </span>

            <Content title='Executar' icon={Wand} className='bg-blue-500' />
            <span className='block text-sm text-muted-foreground italic leading-relaxed'>
              Essa etapa junta todas as etapas e faz a chamada para a API. O seu
              vídeo escolhido será convertido de mp4 para mp3 e a API irá gerar
              toda transcrição do áudio. Essa transcrição é usada posteriormente
              no Prompt através da variável{' '}
              <code className='text-violet-400'>{'{transcription}'}</code>.
            </span>
          </div>
          <SheetFooter className='block my-2'>
            <SheetClose asChild>
              <Button type='submit' className='bg-indigo-500 hover:bg-indigo-400'>Fechar</Button>
            </SheetClose>
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
