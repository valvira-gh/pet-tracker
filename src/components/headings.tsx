export const Heading1: React.FC<{ content: string }> = ({ content }) => {
  return (
    <h1 className="scroll-m-20 text-6xl font-bold tracking-tight lg:text-6xl">
      {content}
    </h1>
  );
};

export const Heading2: React.FC<{ content: string }> = ({ content }) => {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {content}
    </h2>
  );
};
