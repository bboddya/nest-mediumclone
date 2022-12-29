import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// custom decorator for return user when authorization true
export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<ExpressRequestInterface>();

  // no user
  if (!request.user) return null;

  // key
  if (data) return request.user[data];

  // all user
  return request.user;
});
