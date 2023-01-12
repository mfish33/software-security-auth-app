import { forwardRef, type HTMLAttributes } from "react";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
    type?: "button" | "submit" | "reset";
}

const variantMap: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-[hsl(280,100%,70%)]",
    secondary: "bg-cal-poly-gold",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = "primary", className = "", children, type = "submit", ...rest }, ref) => (
        <button
            className={`px-5 py-2 shadow rounded-md text-white font-medium ${variantMap[variant]} ${className}`}
            ref={ref}
            type={type}
            {...rest}
        >
            {children}
        </button>
    ),
);