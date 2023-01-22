 class Logger {
    constructor(){}

    info(text: string) {
        console.log(`INFO: ${text}`);
        return;
    }

    error(status: number, message: string) {
        console.error(`STATUS: ${status} | ${message}`)
    }
}

export default new Logger();