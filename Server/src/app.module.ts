import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AutoDescriptionModule } from './autodescription/autodescription.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({      
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_DATABASE'),
        entities: entities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ConfigModule.forRoot({isGlobal: true}),
    AutoDescriptionModule,
  ],
  controllers: [],
  providers: [AutoDescriptionModule],
})
export class AppModule {}
