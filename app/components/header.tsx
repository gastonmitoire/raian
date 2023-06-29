import React from "react";

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
  transparent?: boolean;
  colorClass?: string;
}

export function Header({
  title,
  children,
  transparent,
  colorClass,
}: HeaderProps) {
  return (
    <header
      className={`w-full h-24 flex items-center justify-center ${
        transparent ? "bg-transparent" : "bg-white"
      }`}
    >
      <div className="container mx-auto">
        <h1
          className={`text-4xl font-bold ${
            colorClass ? colorClass : "text-neutral-900"
          }`}
        >
          {title}
        </h1>
        {children}
      </div>
    </header>
  );
}
