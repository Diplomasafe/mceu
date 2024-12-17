import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { BadRequestException, HttpStatus, ShutdownSignal, ValidationPipe } from '@nestjs/common';
import { HttpMethod } from './shared/enums/http-methods.enum';
import { useContainer } from 'class-validator';
import { LOGGER } from './constants';
import { AppHttpExceptionFilter } from './app-http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    //Logger
    const logger = app.get(LOGGER);
    app.useLogger(logger);

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AppHttpExceptionFilter(logger, httpAdapter));

    const config = new DocumentBuilder()
        .setTitle('MCEU API')
        .setDescription('The MCEU API documentation')
        .setVersion('1.0')
        .addBearerAuth()
        .addServer(process.env.APP_URL)
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('documentation', app, document);

    app.use(cookieParser());
    app.use(compression());
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            stopAtFirstError: true,
            validationError: { target: false, value: false },
            exceptionFactory: (errors) => {
                const res = errors.reduce((acc, error) => {
                    return { ...acc, ...{ [error.property]: error.constraints[Object.keys(error.constraints)[0]] } }; // Merge the current object into the accumulator
                }, {});

                const errResponse = {
                    errors: res,
                    error: 'Bad Request',
                    statusCode: HttpStatus.BAD_REQUEST,
                };

                return new BadRequestException(errResponse);
            },
        }),
    );

    app.enableCors({
        origin: true,
        methods: Object.keys(HttpMethod).join(','),
        credentials: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    app.enableShutdownHooks([ShutdownSignal.SIGINT, ShutdownSignal.SIGTERM]);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    await app.listen(3000);
}

bootstrap();
