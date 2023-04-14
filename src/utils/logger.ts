import {green,redBright} from "chalk"; 

 class Logger {


    constructor(){}
    
    info(text: string) {
        console.log(`[${green('INFO')}]: ${text}`,);
        return;
    }

    error(status: number, message: string) {
        console.error(`[${redBright('STATUS')}]: ${status} | ${message}`)
    }
}

export default new Logger();