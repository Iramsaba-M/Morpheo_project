import LoginForm from "@/components/login-form";
import Testimonial from "@/components/testimonial";

const spQuote = {
  name: "Sandesh Patil",
  role: "CEO at Morpheo AI",
  avatar: "/avatar-sandesh.jpeg",
  quote:
    "We are poised to revolutionize the traditional data management landscape by harnessing AI to deliver a seamless business experience, empowering organizations to manage their data effortlessly — without the need for a dedicated data team.",
};

export const NotAuthenticated = () => {
  return (
    <>
      <div className="w-full min-h-screen">
        <div className="flex flex-1 flex-col gap-4 p-4 w-full">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <div className="rounded-xl min-h-full flex justify-center items-center">
              <LoginForm />
            </div>

            <div className="rounded-xl flex flex-col-reverse bg-gradient-to-tr from-morpheo-700 to-morpheo-500 min-h-screen p-12 gap-y-4">
              <div className="flex flex-col self-end">
                <Testimonial quote={spQuote} />
              </div>
              <div className="grow" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
