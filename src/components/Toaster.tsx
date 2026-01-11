import { useEffect, useState } from "react"
import { subscribe, type ToastItem } from "./toast"
import { FiTrash2 } from "react-icons/fi"
import { FaCheck } from "react-icons/fa"

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
                        text-sm font-normal bg-[#0F2F26] border-[0.5px] border-primary/10 text-white
                    `}
                >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border-[0.5px] border-primary/10">
                        {toast.type === "success" ? (
                            <FaCheck className="size-4 text-primary" />
                        ) : (
                            <FiTrash2 className="size-4 text-primary" />
                        )}
                    </div>
                    {toast.message}
                </div>
            ))}
        </div>
    )
}

export default Toaster;
