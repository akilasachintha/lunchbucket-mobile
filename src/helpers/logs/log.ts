export enum LogType {
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
    SUCCESS = 'success',
    DEBUG = 'debug',
}

export function log(type: string, layer: string, method: string, message: any, fileName: string): void {
    const timestamp = new Date().toLocaleDateString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }) + ' | ' + new Date().toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });

    let logColor: string;

    // Set the color based on the log type
    switch (type) {
        case LogType.ERROR:
            logColor = '\x1b[31m'; // Red color
            break;
        case LogType.WARNING:
            logColor = '\x1b[33m'; // Yellow color
            break;
        case LogType.INFO:
            logColor = '\x1b[36m'; // Cyan color
            break;
        case LogType.SUCCESS:
            logColor = '\x1b[32m'; // Green color
            break;
        case LogType.DEBUG:
            logColor = '\x1b[34m'; // Blue color
            break;
        default:
            logColor = '\x1b[0m'; // Reset color
    }

    // Log the message with the color, timestamp, fileName, type, layer, and method
    console.log(`${logColor}${timestamp} :: ${logColor}${fileName} :: ${type} :: ${layer} :: ${method} :: ${JSON.stringify(message, null, 2)}\x1b[0m`);
}
