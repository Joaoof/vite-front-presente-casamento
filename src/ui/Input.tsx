import * as React from "react"
import { cn } from "../libs/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                // Layout e dimensões
                "flex h-10 w-full rounded-md",

                // Borda e fundo (modo claro)
                "border border-slate-200 bg-white",

                // Espaçamento interno e tipografia
                "px-3 py-2 text-sm",

                // Input de arquivo (file input)
                "file:border-0 file:bg-transparent file:text-sm file:font-medium",

                // Placeholder (modo claro)
                "placeholder:text-slate-300",

                // Foco visível
                "ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2",

                // Estado desabilitado
                "disabled:cursor-not-allowed disabled:opacity-50",

                // Dark mode
                "dark:bg-custom-header placeholder:text-slate-400",

                // Classe externa customizada
                className,
            )}

            ref={ref}
            {...props}
        />
    )
})
Input.displayName = "Input"

export { Input }
