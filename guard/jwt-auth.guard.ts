import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    
    if (!authHeader) return false;
    
    const token = authHeader.split(' ')[1];
    if (!token) return false;

    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      return true;
    } catch {
      return false;
    }
  }
}
