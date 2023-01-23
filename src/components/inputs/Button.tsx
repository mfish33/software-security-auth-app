import { forwardRef, type HTMLAttributes } from "react";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
    type?: "button" | "submit" | "reset";
    disabled?: boolean
}

const variantMap: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-[hsl(280,100%,70%)]",
    secondary: "border border-white",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = "primary", className = "", children, type = "submit", disabled=false, ...rest }, ref) => (
        <button
            className={`px-5 py-2 shadow rounded-md text-white font-medium ${disabled ? "bg-gray-500" : variantMap[variant]} ${className}`}
            ref={ref}
            type={type}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    ),
);