const DefaultLoader: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      <div className="my-4 relative w-full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] grid-rows-1 h-[450px] gap-2">
        <div className=" w-full h-full bg-neutral-900 rounded-lg animate-pulse"></div>
        <div className=" w-full h-full bg-neutral-900 rounded-lg animate-pulse"></div>
        <div className=" w-full h-full bg-neutral-900 rounded-lg animate-pulse"></div>
        <div className=" w-full h-full bg-neutral-900 rounded-lg animate-pulse"></div>
        <div className=" w-full h-full bg-neutral-900 rounded-lg animate-pulse"></div>
        <div className=" w-full h-full bg-neutral-900 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default DefaultLoader;
