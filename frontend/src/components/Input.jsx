import React, { forwardRef } from "react";
import { motion } from "framer-motion";

/**
 * Input Component
 *
 * A flexible input component with label, error states, and animations
 */

const Input = forwardRef(
  (
    {
      label,
      type = "text",
      placeholder,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled = false,
      required = false,
      className = "",
      containerClassName = "",
      ...props
    },
    ref
  ) => {
    const containerClasses = `
    ${fullWidth ? "w-full" : ""}
    ${containerClassName}
  `.trim();

    const inputClasses = `
    w-full h-11 px-4
    font-body text-base text-neutral-900
    bg-white border rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-1
    disabled:bg-neutral-100 disabled:cursor-not-allowed
    ${
      error
        ? "border-error focus:border-error focus:ring-error"
        : "border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
    }
    ${leftIcon ? "pl-10" : ""}
    ${rightIcon ? "pr-10" : ""}
    ${className}
  `
      .trim()
      .replace(/\s+/g, " ");

    return (
      <div className={containerClasses}>
        {label && (
          <label className="block mb-2 font-medium text-sm text-neutral-700">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {leftIcon}
            </div>
          )}

          <motion.input
            ref={ref}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClasses}
            whileFocus={{ scale: 1.01 }}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-error"
          >
            {error}
          </motion.p>
        )}

        {!error && helperText && (
          <p className="mt-1 text-sm text-neutral-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
