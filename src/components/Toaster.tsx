import { useEffect, useState } from "react"
import { subscribe, type ToastItem } from "./toast"

const Toaster = () => {
    const [toasts, setToasts] = useState<ToastItem[]>([])

    useEffect(() => subscribe(setToasts), [])

    return (
        <div className="fixed top-5 right-5 z-50 space-y-3">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`
                        toast-enter
                        flex items-center gap-3 rounded-lg px-4 py-3
                        text-sm font-medium
                        ${toast.type === "success"
                            ? "bg-secondary border-[0.5px] border-primary/10 text-white"
                            : "bg-secondary border-[0.5px] border-primary/10 text-white"
                        }
                    `}
                >
                    <span className="text-lg">
                        {toast.type === "success" ? "✓" : "✕"}
                    </span>
                    {toast.message}
                </div>
            ))}
        </div>
    )
}

export default Toaster;
