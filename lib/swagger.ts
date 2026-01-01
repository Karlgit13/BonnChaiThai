import swaggerJsdoc from 'swagger-jsdoc';

export const getApiDocs = async () => {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Bonn Chai Thai API',
                version: '1.0',
                description: 'API documentation for Bonn Chai Thai Restaurant',
            },
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                        description: 'Enter your JWT token here. You can get one from the /api/auth/login endpoint.',
                    },
                },
            },
            security: [
                {
                    bearerAuth: [],
                },
            ],
        },
        apis: ['./app/api/**/*.ts'], // Path to the API docs
    };
    return swaggerJsdoc(options);
};
