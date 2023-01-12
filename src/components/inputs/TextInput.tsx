import { forwardRef, type HTMLAttributes } from "react";

export interface TextInputProps extends Partial<HTMLAttributes<HTMLInputElement>> {
    name: string;
    label: string;
    error?: string;
    type?: "text" | "number" | "password";
    wrapperClassName?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    (
        {
            name,
            label,
            error,
            type,
            wrapperClassName = "",
            className = "",
            ...rest
        }: TextInputProps,
        ref,
    ) => (
        <div
            className={`flex flex-col w-[10.5rem] ${
                error ? "text-red-500" : "text-inherit"
            } ${wrapperClassName}`}
        >
            <label className="text-xs whitespace-nowrap hidden" htmlFor={name}>
                {label}
            </label>
            <input
                className={`py-2 pl-4 pr-10 rounded appearance-none border-[1px] bg-transparent ${
                    error ? "border-red-500" : "border-[#c3cdd5]"
                } ${className}`}
                id={name}
                ref={ref}
                type={type}
                name={name}
                placeholder={label}
                {...rest}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    ),
);