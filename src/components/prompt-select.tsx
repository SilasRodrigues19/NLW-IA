import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components";
import { api } from "@/lib/axios";

interface Prompt {
  id: string;
  title: string;
  template: string;
}

interface PromptSelectProps {
  onPromptSelected: (template: string) => void;
}

export const PromptSelect = (props: PromptSelectProps) => {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null);

  useEffect(() => {
    api.get('/prompts').then((response) => {
      setPrompts(response.data);
    });
  }, []);

  const handlePromptSelected = (promptId: string) => {
    const selectedPrompt = prompts?.find((prompt) => prompt.id === promptId);

    if (!selectedPrompt) {
      return;
    } 

    props.onPromptSelected(selectedPrompt.template);

  }

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger className='focus:ring-2 focus:ring-indigo-500 focus-visible:ring-indigo-700 focus-visible:ring-2 focus-visible:ring-offset-2'>
        <SelectValue placeholder='Select a Prompt' />
      </SelectTrigger>
      <SelectContent>
        {prompts?.map((prompt) => {
          return (
            <SelectItem key={prompt.id} value={prompt.id}>
              {prompt.title}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};