import React from "react";
import { motion } from "framer-motion";

/**
 * Button Component
 *
 * A versatile button component with multiple variants and states
 * Includes smooth animations and accessibility features
 */

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  // Base styles
  const baseStyles = `
    inline-flex items-center justify-center gap-2 
    font-medium rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  // Variant styles
  const variantStyles = {
    primary: `
      bg-gradient-to-r from-primary-500 to-secondary-400 
      text-white
      hover:shadow-lg hover:scale-[1.02]
      focus:ring-primary-500
      active:scale-[0.98]
    `,
    secondary: `
      bg-white text-neutral-700 
      border border-neutral-300
      hover:bg-neutral-50 hover:border-neutral-400
      focus:ring-primary-500
      active:bg-neutral-100
    `,
    ghost: `
      bg-transparent text-primary-500
      hover:bg-primary-50
      focus:ring-primary-500
      active:bg-primary-100
    `,
    danger: `
      bg-gradient-to-r from-error to-red-500
      text-white
      hover:shadow-lg hover:scale-[1.02]
      focus:ring-error
      active:scale-[0.98]
    `,
  };

  // Size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Width styles
  const widthStyle = fullWidth ? "w-full" : "";

  // Combine all styles
  const buttonClasses = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${widthStyle}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <motion.button
      whileHover={
        !disabled && !loading ? { scale: variant === "ghost" ? 1 : 1.02 } : {}
      }
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {!loading && leftIcon && <span>{leftIcon}</span>}

      <span>{children}</span>

      {!loading && rightIcon && <span>{rightIcon}</span>}
    </motion.button>
  );
};

export default Button;
