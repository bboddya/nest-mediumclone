import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TagModule } from '@app/tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@app/data-source';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), TagModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
