export const filters = {
    thousands(val) {
        try {
            return parseInt(val).toLocaleString()
        } catch (e) {
            return val
        }
    }
}
