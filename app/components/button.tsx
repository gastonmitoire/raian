import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "@remix-run/react";
import { motion } from "framer-motion";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "danger";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  disableAnimation?: boolean;
  isLink?: boolean;
  to?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  size = "medium",
  color = "primary",
  icon,
  iconPosition = "left",
  className,
  disableAnimation = false,
  isLink = false,
  to,
  onClick,
}) => {
  const buttonSizeClasses = {
    small: "px-2 py-1 text-xs rounded-sm",
    medium: "px-4 py-2 text-sm rounded-sm",
    large: "px-6 py-3 text-lg rounded-sm",
  };

  const buttonColorClasses = {
    primary: "bg-primary hover:bg-primary-dark text-neutral-900",
    secondary: "bg-secondary hover:bg-secondary-light text-neutral-900",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
    info: "bg-blue-500 hover:bg-blue-600 text-white",
    light: "bg-gray-200 hover:bg-gray-300 text-gray-700",
    dark: "bg-gray-700 hover:bg-gray-800 text-white",
  };

  const iconClasses = {
    left: "mr-2",
    right: "ml-2",
  };

  const animation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    whileTap: { scale: 0.9 },
    whileHover: { scale: 1.05 },
  };

  return isLink ? (
    <Link to={to!} className={`${className}`}>
      <motion.button
        {...(disableAnimation ? {} : animation)}
        className={`flex items-center justify-center gap-2 ${buttonSizeClasses[size]} ${buttonColorClasses[color]}`}
      >
        {icon && iconPosition === "left" && (
          <span className={iconClasses.left}>{icon}</span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <span className={iconClasses.right}>{icon}</span>
        )}
      </motion.button>
    </Link>
  ) : (
    <motion.button
      onClick={onClick}
      {...(disableAnimation ? {} : animation)}
      className={`flex items-center justify-center gap-2 ${buttonSizeClasses[size]} ${buttonColorClasses[color]} ${className}`}
    >
      {icon && iconPosition === "left" && (
        <span className={iconClasses.left}>{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className={iconClasses.right}>{icon}</span>
      )}
    </motion.button>
  );
};
