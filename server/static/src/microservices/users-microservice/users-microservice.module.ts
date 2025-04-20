import { Module } from '@nestjs/common';
import { UsersMicroserviceService } from './users-microservice.service';
import { UsersMicroserviceController } from './users-microservice.controller';

@Module({
  controllers: [UsersMicroserviceController],
  providers: [UsersMicroserviceService],
})
export class UsersMicroserviceModule {}
