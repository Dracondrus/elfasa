export const LocalStorage = {
    get<T>(key: string): T | null {
        const item = localStorage.getItem(key)

        if (!item) return null

        try {
            return JSON.parse(item)
        } catch (err) {
            return null
        }
    },
    set(key: string, value: string | unknown): void {
        localStorage.setItem(key, JSON.stringify(value))
    },
    remove(key: string) {
        localStorage.removeItem(key)
    },
    clear() {
        localStorage.clear()
    },
}

