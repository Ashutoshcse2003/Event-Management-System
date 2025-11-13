import React from "react";
import { motion } from "framer-motion";

/**
 * Card Component
 *
 * A versatile card container with hover effects and animations
 */

const Card = ({
  children,
  variant = "default",
  hoverable = true,
  className = "",
  onClick,
  ...props
}) => {
  const baseStyles = `
    bg-white rounded-lg border border-neutral-200
    transition-all duration-300
  `;

  const variantStyles = {
    default: "p-6",
    compact: "p-4",
    spacious: "p-8",
  };

  const hoverStyles = hoverable
    ? "hover:shadow-lg hover:-translate-y-1 cursor-pointer"
    : "";

  const cardClasses = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${hoverStyles}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hoverable ? { y: -4 } : {}}
      className={cardClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * ProductCard Component
 *
 * Specialized card for displaying product information
 */
export const ProductCard = ({
  image,
  title,
  description,
  price,
  rating,
  onAddToCart,
  onClick,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className={`
        w-full max-w-[280px] bg-white rounded-xl border border-neutral-200
        overflow-hidden shadow-sm hover:shadow-xl
        transition-all duration-300 cursor-pointer
        ${className}
      `}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-48 bg-neutral-100 overflow-hidden group">
        <motion.img
          src={image || "https://via.placeholder.com/280x192"}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-1 truncate">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex items-center justify-between mb-3">
          <span className="font-heading font-bold text-xl text-gradient">
            ₹{price}
          </span>

          {rating && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 fill-warning" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span className="text-sm font-medium text-neutral-700">
                {rating}
              </span>
            </div>
          )}
        </div>

        {onAddToCart && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="w-full py-2 bg-gradient-to-r from-primary-500 to-secondary-400 text-white font-medium rounded-lg hover:shadow-md transition-all"
          >
            Add to Cart
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

/**
 * StatCard Component
 *
 * Card for displaying statistics with icon and count animation
 */
export const StatCard = ({
  icon,
  title,
  value,
  change,
  changeType = "positive",
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        p-6 bg-gradient-to-br from-primary-50 to-secondary-50
        rounded-xl border border-primary-100 shadow-sm
        ${className}
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-400 rounded-lg text-white">
          {icon}
        </div>

        {change && (
          <span
            className={`
            text-sm font-medium px-2 py-1 rounded-full
            ${
              changeType === "positive"
                ? "bg-success-light text-success-dark"
                : "bg-error-light text-error-dark"
            }
          `}
          >
            {changeType === "positive" ? "↑" : "↓"} {change}
          </span>
        )}
      </div>

      <h3 className="text-sm font-medium text-neutral-600 mb-1">{title}</h3>

      <p className="text-3xl font-bold text-gradient font-heading">{value}</p>
    </motion.div>
  );
};

export default Card;
