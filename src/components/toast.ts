type ToastType = "success" | "error" | "repeated";

export interface ToastItem {
    id: string
    message: string
    type: ToastType
}

let listeners: ((toasts: ToastItem[]) => void)[] = []
let toasts: ToastItem[] = []

const notify = () => listeners.forEach((l) => l(toasts))

export const toast = {
    success(message: string) {
        addToast(message, "success")
    },
    repeated(message: string) {
        addToast(message, "repeated")
    },
    error(message: string) {
        addToast(message, "error")
    },
}

function addToast(message: string, type: ToastType) {
    const id = crypto.randomUUID()

    toasts = [...toasts, { id, message, type }]
    notify()

    setTimeout(() => {
        toasts = toasts.filter((t) => t.id !== id)
        notify()
    }, 3000)
}

export function subscribe(listener: (toasts: ToastItem[]) => void) {
    listeners.push(listener)
    listener(toasts)

    return () => {
        listeners = listeners.filter((l) => l !== listener)
    }
}
