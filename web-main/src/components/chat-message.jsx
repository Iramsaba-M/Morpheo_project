import { Logo } from "@/components/logo";
import {
  ChartScatter,
  Volume2,
  ThumbsUp,
  ThumbsDown,
  Copy,
} from "lucide-react";
import { useGraph } from "@/contexts/graph-provider";

export const ChatMessage = ({ message }) => {
  const { loadGraph } = useGraph();

  const formatText = (text) => {
    const formattedText = text
      .replace(/\d+\.\s\*\*(.*?)\*\*/g, "<li><strong>$1</strong>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Wrap numbered list items with <ol> tags
    if (formattedText.match(/<li>/)) {
      return `<ol>${formattedText}</ol>`;
    }

    return formattedText;
  };

  const handleGraphClick = async (event) => {
    event.preventDefault();

    loadGraph(message.dataReferenceId);
  };

  if (message.source === "assistant") {
    return (
      <div className="flex flex-row items-start gap-3 pr-8 self-stretch">
        <Logo />
        <div className="flex flex-col gap-2">
          <div className="w-full flex flex-col rounded-3xl bg-morpheo-30 rounded-tl-sm border-0 p-5 text-sm">
            <div
              dangerouslySetInnerHTML={{
                __html: formatText(message.message),
              }}
            />
            {message.options && message.options.length > 0 && (
              <ul className="mt-2 list-none space-y-2">
                {message.options.map((item) => (
                  <li key={item.text} className="flex flex-col">
                    <span className="font-bold">{item.text}</span>
                    <span className="text-gray-600">{item.subtext}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-row gap-1">
            <button className="w-7 h-7 inline-flex border-morpheo-30 ring-2 ring-morpheo-30 items-center justify-center p-2 rounded-md">
              <Volume2 />
            </button>
            <button className="w-7 h-7 inline-flex border-morpheo-30 ring-2 ring-morpheo-30 items-center justify-center p-2 rounded-md">
              <Copy />
            </button>
            <button className="h-7 inline-flex border-morpheo-30 ring-2 ring-morpheo-30 items-center justify-center p-2 rounded-md">
              <ThumbsUp className="w-3 h-3" />
              <span className="pl-2 text-xs text-muted-foreground">Yes</span>
            </button>
            <button className="h-7 inline-flex border-morpheo-30 ring-2 ring-morpheo-30 items-center justify-center p-2 rounded-md">
              <ThumbsDown className="w-3 h-3" />
              <span className="pl-2 text-xs text-muted-foreground">No</span>
            </button>
            {message.dataReferenceId && (
              <button
                className="w-7 h-7 inline-flex border-morpheo-30 ring-2 ring-morpheo-30 items-center justify-center p-2 rounded-md"
                onClick={handleGraphClick}
              >
                <ChartScatter />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  } else if (message.source === "thinking") {
    return (
      <div className="flex flex-row items-start gap-3 pr-8 self-stretch">
        <Logo />
        <div className="flex flex-row rounded-3xl bg-morpheo-30 rounded-tl-sm border-0 p-5 text-sm">
          <span className="pr-2">Thinking...</span>
          <img
            src="/images/morpheo-logo-spinnable.svg"
            className="animate-spin h-5 w-5 text-gray-500"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex gap-3 pl-8 items-end justify-end">
        <div className="flex text-white rounded-3xl bg-primary rounded-tr-sm border-0 p-5">
          <p className="text-sm">{message.message}</p>
        </div>
      </div>
    );
  }
};
