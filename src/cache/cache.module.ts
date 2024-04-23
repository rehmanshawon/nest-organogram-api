// src/cache/cache.module.ts
import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore as unknown as CacheStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
  exports: [CacheModule],
})
export class CacheConfigModule {}
