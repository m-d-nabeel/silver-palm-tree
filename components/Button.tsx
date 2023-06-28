import Image from "next/image";
import { MouseEventHandler } from "react";

type Props = {
  type?: "button" | "submit";
  title: string;
  leftIcon?: string | null;
  rightIcon?: string | null;
  isSubmitting?: boolean;
  bgColor?: string | null;
  textColor?: string | null;
  handleClick?: MouseEventHandler;
};

export default function Button({
  type,
  title,
  leftIcon,
  rightIcon,
  isSubmitting,
  bgColor,
  textColor,
  handleClick,
}: Props) {
  return (
    <button
      type={type || "button"}
      disabled={isSubmitting}
      onClick={handleClick}
      className={`flexCenter gap-3 px-4 py-3 rounded-lg text-sm font-medium max-md:w-full
      ${isSubmitting ? "bg-black/50" : bgColor ? bgColor : "bg-primary-purple"}
      ${textColor ? textColor : "text-white"}`}
    >
      {leftIcon && <Image src={leftIcon} height={14} width={14} alt="left" />}
      {title}
      {rightIcon && (
        <Image src={rightIcon} height={14} width={14} alt="right" />
      )}
    </button>
  );
}
