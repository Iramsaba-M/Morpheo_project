export const Logo = () => {
  return (
    <div
      className="w-10 min-w-10 h-10 flex border-primary border-2 bg-accent rounded-full items-center justify-center box-border"
      style={{
        backgroundImage: "url(/morpheo-small.svg)",
        backgroundSize: "50%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};
