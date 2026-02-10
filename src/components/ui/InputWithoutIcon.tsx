
import { Eye, EyeOff } from "lucide-react"
import { useState, forwardRef } from "react";

const InputWithoutIcon = forwardRef<HTMLInputElement, InputWithoutIconProps>(({ label, type, error, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  }
  return (
    <div className="space-y-2">
      {label && <label htmlFor={props.id} className="text-sm text-muted font-medium font-space">{label}</label>}
      <div className="relative mt-1">
        <input ref={ref} {...props} type={type === "password" ? (showPassword ? "text" : "password") : type} className={`h-11 w-full rounded-lg px-4 text-sm border border-line focus:border-primary focus:ring-4 focus:ring-primary/10 read-only:opacity-60 read-only:focus:ring-0 read-only:focus:border-line ${props.className}`} />

        {type === "password" && (
          <div onClick={togglePassword} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted cursor-pointer">
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
    </div>
  )
})

InputWithoutIcon.displayName = 'InputWithoutIcon'

export default InputWithoutIcon