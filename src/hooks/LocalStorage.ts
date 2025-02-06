export const LocalStorage = {
    get<T>(key: string): T | null {
        const item = localStorage.getItem(key);

        if (!item) return null;

        try {
            return JSON.parse(item);
        } catch (err) {
            return null;
        }
    },

    set(key: string, value: string | boolean): void {
        if (typeof value === 'boolean') {
            localStorage.setItem(key, JSON.stringify(value)); // сохраняем как boolean
        } else {
            localStorage.setItem(key, value); // сохраняем как string
        }
    },

    remove(key: string): void {
        localStorage.removeItem(key);
    },

    clear(): void {
        localStorage.clear();
    },
};
