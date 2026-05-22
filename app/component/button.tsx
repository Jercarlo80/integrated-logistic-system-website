import { ReactNode } from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  styleButton: string;
  styleText?: string;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export default function Button({
  text,
  onClick,
  styleButton,
  styleText = "",
  disabled = false,
  icon,
  iconPosition = "left",
}: ButtonProps) {
  return (
    <button
      className={`flex items-center justify-center gap-2 ${styleButton}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && iconPosition === "left" && <span>{icon}</span>}
      <span className={styleText}>{text}</span>
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </button>
  );
}
