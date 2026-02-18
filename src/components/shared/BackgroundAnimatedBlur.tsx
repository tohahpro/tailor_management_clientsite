"use client";

const BackgroundAnimatedBlur = () => {
    return (
        <div className="absolute inset-0 pointer-events-none blur-[30px] opacity-20 animate-diagonalBlur">
            <style jsx>{`
        @keyframes diagonalBlur {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }

        .animate-diagonalBlur {
          /* Demo colors for animation visibility */
          background: linear-gradient(
            135deg,
            #ffffff, 
            #252222, 
            #9c8f8f 
          );
          background-size: 300% 300%;
          animation: diagonalBlur 6s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default BackgroundAnimatedBlur;
