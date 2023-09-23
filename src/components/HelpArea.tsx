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
} from '@/components';

export const HelpArea = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='inherit'
          size='sm'
          className='focus-visible:ring-foreground focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent'
        >
          <Info className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>Help</span>
        </Button>
      </SheetTrigger>

      <SheetContent className='select-none'>
        <ScrollArea className='h-full w-full rounded-md border border-transparent p-6'>
          <SheetHeader>
            <SheetTitle>Transcription Flow</SheetTitle>
            <SheetDescription>
              In this session we will explain how the transcription flow of the
              application.
            </SheetDescription>
          </SheetHeader>

          <Separator className='h-1 my-4' />

          <div className='flex items-center flex-col gap-2 space-y-2'>
            <Content
              title='Video Selection'
              icon={Video}
              className='bg-blue-500'
            />
            <span className='block text-sm text-muted-foreground italic leading-relaxed'>
              Choose the video you want to get the transcript if everything
              occurs well you will see a thumbnail preview of the video chosen.
            </span>

            <Content
              title='Keywords'
              icon={TextSelect}
              className='bg-blue-500'
            />
            <span className='block text-sm text-muted-foreground italic leading-relaxed'>
              Optionally you can add keywords separated by comma.
            </span>

            <Content title='Prompt' icon={MenuSquare} className='bg-blue-500' />
            <span className='block text-sm text-muted-foreground italic leading-relaxed'>
              Select an existing Input Prompt and adjust if necessary. The
              prompt contains the information that will be used for the AI to
              generate the text.
            </span>

            <Content
              title='Temperature'
              icon={Thermometer}
              className='bg-blue-500'
            />
            <span className='block text-sm text-muted-foreground italic leading-relaxed'>
              Scale from 0.1 to 1.0 that defines the "intelligence" of AI, as
              the higher the temperature the "smarter" the AI will be and also
              the more susceptible to errors.
            </span>

            <Content title='Execution' icon={Wand} className='bg-blue-500' />
            <span className='block text-sm text-muted-foreground italic leading-relaxed'>
              The chosen video will be converted from mp4 to mp3 and the API
              will generate entire audio transcription. This transcription is
              used later in the Prompt through the variable{' '}
              <code className='text-violet-400'>{'{transcription}'}</code>.
            </span>
          </div>
          <SheetFooter className='block my-2'>
            <SheetClose asChild>
              <Button
                type='submit'
                className='bg-indigo-500 hover:bg-indigo-400'
              >
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
