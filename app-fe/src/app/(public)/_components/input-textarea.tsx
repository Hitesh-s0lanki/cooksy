"use client";

import {
  AIInput,
  AIInputButton,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
  AIInputTools,
} from "@/components/ui/kibo-ui/ai/input";
import { GlobeIcon, MicIcon } from "lucide-react";
import { type FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { generateUUID } from "@/lib/utils";

const InputTextArea = () => {
  const router = useRouter();

  const [text, setText] = useState<string>("");
  const [status, setStatus] = useState<
    "submitted" | "streaming" | "ready" | "error"
  >("ready");
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!text) {
      return;
    }
    const chat_id = generateUUID();
    router.push(`/chat?chatId=${chat_id}&text=${text}`);
    setStatus("ready");
  };
  return (
    <AIInput onSubmit={handleSubmit}>
      <AIInputTextarea onChange={(e) => setText(e.target.value)} value={text} />
      <AIInputToolbar>
        <AIInputTools>
          <AIInputButton>
            <MicIcon size={16} />
          </AIInputButton>
          <AIInputButton>
            <GlobeIcon size={16} />
            <span>Search</span>
          </AIInputButton>
        </AIInputTools>
        <AIInputSubmit disabled={!text} status={status} />
      </AIInputToolbar>
    </AIInput>
  );
};
export default InputTextArea;
