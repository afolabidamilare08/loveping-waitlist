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
                        text-sm font-normal bg-[#0F2F26] border-[0.5px] border-primary/10 text-white
                    `}
                >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border-[0.5px] border-primary/10">
                        {toast.type === "error" ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="#48D962"
                                viewBox="0 0 256 256"
                            >
                                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                                </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="#48D962"
                                viewBox="0 0 256 256"
                            >
                                <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                            </svg>
                        )}
                    </div>
                    {toast.message}
                </div>
            ))}
        </div>
    )
}

export default Toaster;
