// src/app.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { CacheConfigModule } from './cache/cache.module';
import { LoggingModule } from './logging/logging.module';
import { EmployeesModule } from './employees/employees.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'database',
      autoLoadModels: true, // Automatically load models from the models directory
      synchronize: true, // Automatically sync database schema with defined models (not recommended for production)
      pool: {
        max: 10, // Maximum number of connections in the pool
        min: 0, // Minimum number of connections in the pool
        acquire: 30000, // Maximum time (in milliseconds) that a connection can be idle before being released
        idle: 10000, // Maximum time (in milliseconds) that a connection can be idle before being released
      },
    }),
    JwtModule.register({
      secret: 'your_secret_key', // Replace with your actual secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
    LoggingModule,
    CacheConfigModule,
    EmployeesModule,
  ],
})
export class AppModule {}
