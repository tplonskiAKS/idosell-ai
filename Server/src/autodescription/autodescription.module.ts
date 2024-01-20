import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsertService } from 'src/insert/insert.service';
import { ProductsService } from 'src/products/services/products.service';
import { Insert, RawProduct, RawProductIds } from 'src/typeorm/product.entity';
import { AutoDescriptionController } from './autodescription.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/typeorm';
import { Role } from 'src/typeorm/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/auth/controllers/auth.controller';
import { AuthService } from 'src/auth/services/auth.service';
import { UsersController } from 'src/users/controllers/users.controller';
import { UsersService } from 'src/users/services/users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Insert, RawProduct, User, Role, RawProductIds]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: () => ({
              secret: '123456',
              signOptions: { expiresIn: '4d' },
            }),
          }),
    ],
    controllers: [AutoDescriptionController, AuthController, UsersController],
    providers: [InsertService, ProductsService, AuthService, UsersService],
    exports: [InsertService, ProductsService, AuthService, UsersService],
})
export class AutoDescriptionModule { }
