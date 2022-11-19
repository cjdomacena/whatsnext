const MovieLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="my-24 container mx-auto w-full px-6 relative">
      {children}
    </div>
  );
};

export default MovieLayout;
