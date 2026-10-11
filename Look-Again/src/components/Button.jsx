
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  icon: Icon = ArrowUpRight,
  showIcon = true,
  disabled = false,
  loading = false,
  className = "",
}) {
  const sizes = {
    sm: {
      button: "min-h-10 pl-4 pr-1.5 text-sm",
      icon: "h-7 w-7",
      glyph: 14,
    },
    md: {
      button: "min-h-12 pl-5 pr-1.5 text-sm",
      icon: "h-9 w-9",
      glyph: 16,
    },
    lg: {
      button: "min-h-14 pl-6 pr-1.5 text-base",
      icon: "h-11 w-11",
      glyph: 19,
    },
  };

  const styles = {
    primary:
      "bg-[#f0f0df] text-[#17271b] border-[#f0f0df] hover:bg-[#b7cc99] hover:border-[#b7cc99]",
    secondary:
      "bg-transparent text-[#e3e8d3] border-[#dce5c9]/30 hover:bg-[#dce5c9]/10",
    dark:
      "bg-[#17271b] text-[#f0f0df] border-[#49604a] hover:bg-[#263c2b]",
  };

  const currentSize = sizes[size] || sizes.md;
  const currentStyle = styles[variant] || styles.primary;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { y: -1 } : undefined}
      whileTap={!disabled && !loading ? { scale: 0.985 } : undefined}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={`
        group inline-flex items-center justify-between gap-6
        rounded-[6px] border-2 font-medium
        transition-colors duration-200
        disabled:cursor-not-allowed disabled:opacity-50
        ${currentSize.button}
        ${currentStyle}
        ${className}
      `}
    >
      <span className="py-2">
        {loading ? "Please wait..." : children}
      </span>

      {showIcon && (
        <span
          className={`
            flex shrink-0 items-center justify-center
            rounded-[6px] transition-colors duration-200
            ${
              variant === "primary"
                ? "bg-[#b7cc99] text-[#123126] group-hover:bg-[#17271b] group-hover:text-[#b7cc99]"
                : "bg-[#b7cc99]/15 text-[#b7cc99] group-hover:bg-[#b7cc99]/25"
            }
            ${currentSize.icon}
          `}
        >
          <Icon size={currentSize.glyph} strokeWidth={1.8} />
        </span>
      )}
    </motion.button>
  );
}

export default Button;
