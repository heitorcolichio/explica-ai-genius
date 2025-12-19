import { useState, useEffect } from "react";

export function Logo() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm" 
          : ""
      }`}
    >
      <span 
        className={`font-bold tracking-tight transition-all duration-300 ${
          isScrolled ? "text-xs" : "text-lg"
        }`}
      >
        ExplicaAí
      </span>
    </div>
  );
}
