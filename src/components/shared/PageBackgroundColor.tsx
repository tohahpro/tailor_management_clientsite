interface PageBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const PageBackground = ({ children, className }: PageBackgroundProps) => {
  return (
    <div
      className={`relative min-h-screen ${className}`}
    >
      {children}
    </div>
  );
};

export default PageBackground;
