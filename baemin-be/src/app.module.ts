import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { MenuModule } from './menu/menu.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { PaymentModule } from './payment/payment.module';
import { DeliveryModule } from './delivery/delivery.module';
@Module({
  imports: [PrismaModule, UsersModule, MenuModule, OrdersModule, AuthModule, RestaurantModule, PaymentModule, DeliveryModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
