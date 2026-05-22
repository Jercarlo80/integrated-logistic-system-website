"use client";

import { FaMagnifyingGlass } from "react-icons/fa6";

type SearchBarProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  width?: string; 
  className?: string;
};

export default function SearchBar({
  value,
  onChange,
  placeholder = "Cari data...",
  width = "md:w-[420px] w-full",
  className = "",
}: SearchBarProps) {
  return (
    <div
      className={`
        relative 
        ${width}
        min-w-0
        ${className}
      `}
    >
      <FaMagnifyingGlass
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="
          w-full h-10
          pl-10 pr-4
          text-sm text-gray-800
          bg-white
          border-2 border-[#328E6E]
          rounded-lg
          outline-none
          focus:ring-2 focus:ring-[#328E6E]/30
          transition
        "
      />
    </div>
  );
}
