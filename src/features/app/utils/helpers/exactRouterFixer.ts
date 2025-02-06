export const exactRouteFixer = (path: string, isExact: boolean) => {
    if (isExact) return path
    return (path += '/*')
}
