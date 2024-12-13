import winston from 'winston'

const logger = winston.createLogger({
    level: 'http', // Уровень логирования для HTTP-запросов
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({ filename: 'logs/http.log' }) // Логи HTTP-запросов в файл
    ]
});

export default logger;