import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from "../config/configuration";
import { SequelizeModule } from '@nestjs/sequelize';
import sequelizeConfig from "../config/sequelize.config";

@Module({
  imports: [
      SequelizeModule.forRoot(sequelizeConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
