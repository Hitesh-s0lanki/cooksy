import Header from "@/components/header";
import Chat from "./_components/Chat";
import { loadSearchParams } from "@/modules/params";
import { SearchParams } from "nuqs/server";

type Props = {
  searchParams: Promise<SearchParams>;
};

const ChatPage = async ({ searchParams }: Props) => {
  const filterParams = await loadSearchParams(searchParams);

  return (
    <>
      <Header title={"Talk With AI"} />
      <div className="min-h-screen flex justify-center items-center flex-col pb-20 gap-4 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradient-bg-with-grid.png')] bg-cover relative">
        <Chat
          chatId={filterParams.chatId || ""}
          initialText={filterParams.text || ""}
        />
      </div>
    </>
  );
};

export default ChatPage;
