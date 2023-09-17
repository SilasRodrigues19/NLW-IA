import { Alert, AlertTitle } from "../components";

interface AlertDialogProps {
  icon: React.ElementType;
  title: string;
  className?: string;
}

export const AlertDialog = ({icon: Icon, title, className}: AlertDialogProps) => {
  return (
    <Alert
      className={
        className
          ? `${className} bg-transparent`
          : 'bg-rose-500 text-foreground pointer-events-none select-none'
      }
    >
      <AlertTitle className='flex items-center justify-center gap-3 w-full'>
        <Icon className='flex h-4 w-4' />
        {title}
      </AlertTitle>
    </Alert>
  );
}