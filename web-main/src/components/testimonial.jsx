import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const sampleQuote = {
  name: "Sarah Thompson",
  role: "Lead Data Scientist at Lorem Ipsum",
  avatar: "/sample-avatar.webp",
  quote:
    "Lorem ipsum dolor sit amet consectetur. Feugiat integer condimentum viverra natoque ante erat. Quam habitasse consectetur sed arcu eget.",
};

function Testimonial({ quote = sampleQuote }) {
  return (
    <>
      <span className="text-white">“{quote.quote}”</span>
      <div className="flex flex-row pt-6 gap-3">
        <Avatar className="h-12 w-12 rounded-lg">
          <AvatarImage src={quote.avatar} alt={quote.name} />
          <AvatarFallback className="rounded-lg">M</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-white text-left leading-tight">
          <span className="truncate text-xl font-semibold">{quote.name}</span>
          <span className="truncate text-md">{quote.role}</span>
        </div>
      </div>
    </>
  );
}

export default Testimonial;
