export const filters = {
    thousands(val) {
        try {
            return parseInt(val).toLocaleString()
        } catch (e) {
            return val
        }
    }
}

export const formatDate = (date: number) => {
    if (!date) return 'Date not valid'

    const parsedDate = new Date(date * 1000);

    const hours = parsedDate.getHours().toString().padStart(2, '0');
    const minutes = parsedDate.getMinutes().toString().padStart(2, '0');
    const day = parsedDate.getDate();

    const monthNames = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    const month = monthNames[parsedDate.getMonth()];

    return `${day} ${month} - ${hours}:${minutes}`;
}

export function getHeatColor(value) {
    if (value < 0 || value > 100) {
        throw new Error("Value must be between 0 and 100");
    }

    // Нормализуем значение в диапазоне от 0 до 1
    const normalizedValue = value / 100;

    // Рассчитываем цветовые компоненты в зависимости от нормализованного значения
    let r, g, b;

    if (normalizedValue <= 0.5) {
        // От синего (#0000FF) к зеленому (#00FF00)
        const ratio = normalizedValue * 2;
        r = 0;
        g = Math.floor(255 * ratio);
        b = Math.floor(255 * (1 - ratio));
    } else {
        // От зеленого (#00FF00) к красному (#FF0000)
        const ratio = (normalizedValue - 0.5) * 2;
        r = Math.floor(255 * ratio);
        g = Math.floor(255 * (1 - ratio));
        b = 0;
    }

    // Преобразование RGB значений в hex формат
    const hex = (r << 16) + (g << 8) + b;
    return `#${hex.toString(16).padStart(6, '0')}`;
}
