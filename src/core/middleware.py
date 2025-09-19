"""
Rate limiting and security middleware for the FastAPI application.
"""
import time
from collections import defaultdict
from typing import Dict, Callable
from fastapi import Request, HTTPException, status
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
import ipaddress


class RateLimitMiddleware(BaseHTTPMiddleware):
    """
    Rate limiting middleware to prevent abuse and DoS attacks.
    """
    
    def __init__(
        self,
        app,
        calls_per_minute: int = 60,
        calls_per_hour: int = 1000,
        burst_limit: int = 10
    ):
        super().__init__(app)
        self.calls_per_minute = calls_per_minute
        self.calls_per_hour = calls_per_hour
        self.burst_limit = burst_limit
        
        # Track requests per IP
        self.minute_requests: Dict[str, list] = defaultdict(list)
        self.hour_requests: Dict[str, list] = defaultdict(list)
        self.burst_requests: Dict[str, list] = defaultdict(list)
    
    def get_client_ip(self, request: Request) -> str:
        """Extract client IP address."""
        # Check for forwarded headers (from reverse proxy)
        forwarded = request.headers.get("X-Forwarded-For")
        if forwarded:
            return forwarded.split(",")[0].strip()
        
        real_ip = request.headers.get("X-Real-IP")
        if real_ip:
            return real_ip
        
        # Fallback to direct connection
        return request.client.host if request.client else "unknown"
    
    def clean_old_requests(self, requests_list: list, time_window: int):
        """Remove requests older than time_window seconds."""
        current_time = time.time()
        return [req_time for req_time in requests_list if current_time - req_time < time_window]
    
    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        """Process request with rate limiting."""
        client_ip = self.get_client_ip(request)
        current_time = time.time()
        
        # Clean old requests
        self.minute_requests[client_ip] = self.clean_old_requests(
            self.minute_requests[client_ip], 60
        )
        self.hour_requests[client_ip] = self.clean_old_requests(
            self.hour_requests[client_ip], 3600
        )
        self.burst_requests[client_ip] = self.clean_old_requests(
            self.burst_requests[client_ip], 10
        )
        
        # Check burst limit (10 seconds)
        if len(self.burst_requests[client_ip]) >= self.burst_limit:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Too many requests in short time. Please slow down."
            )
        
        # Check minute limit
        if len(self.minute_requests[client_ip]) >= self.calls_per_minute:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"Rate limit exceeded: {self.calls_per_minute} requests per minute"
            )
        
        # Check hour limit
        if len(self.hour_requests[client_ip]) >= self.calls_per_hour:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"Rate limit exceeded: {self.calls_per_hour} requests per hour"
            )
        
        # Record this request
        self.minute_requests[client_ip].append(current_time)
        self.hour_requests[client_ip].append(current_time)
        self.burst_requests[client_ip].append(current_time)
        
        # Process request
        response = await call_next(request)
        
        # Add rate limit headers
        response.headers["X-RateLimit-Minute"] = str(self.calls_per_minute)
        response.headers["X-RateLimit-Hour"] = str(self.calls_per_hour)
        response.headers["X-RateLimit-Remaining-Minute"] = str(
            max(0, self.calls_per_minute - len(self.minute_requests[client_ip]))
        )
        response.headers["X-RateLimit-Remaining-Hour"] = str(
            max(0, self.calls_per_hour - len(self.hour_requests[client_ip]))
        )
        
        return response


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """
    Add security headers to all responses.
    """
    
    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        response = await call_next(request)
        
        # Security headers
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
        
        # Content Security Policy
        csp = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline'; "
            "style-src 'self' 'unsafe-inline'; "
            "img-src 'self' data: https:; "
            "connect-src 'self'; "
            "font-src 'self'; "
            "object-src 'none'; "
            "base-uri 'self'; "
            "form-action 'self'"
        )
        response.headers["Content-Security-Policy"] = csp
        
        # HSTS (only in production)
        if not request.url.hostname in ["localhost", "127.0.0.1"]:
            response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        
        return response


class IPWhitelistMiddleware(BaseHTTPMiddleware):
    """
    IP whitelist middleware for additional security.
    """
    
    def __init__(self, app, allowed_ips: list = None, enabled: bool = False):
        super().__init__(app)
        self.enabled = enabled
        self.allowed_ips = allowed_ips or []
        
        # Convert to ipaddress objects for validation
        self.allowed_networks = []
        for ip in self.allowed_ips:
            try:
                self.allowed_networks.append(ipaddress.ip_network(ip, strict=False))
            except ValueError:
                continue
    
    def is_ip_allowed(self, client_ip: str) -> bool:
        """Check if IP is in whitelist."""
        if not self.enabled or not self.allowed_networks:
            return True
        
        try:
            client_addr = ipaddress.ip_address(client_ip)
            return any(client_addr in network for network in self.allowed_networks)
        except ValueError:
            return False
    
    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        if not self.enabled:
            return await call_next(request)
        
        # Get client IP
        forwarded = request.headers.get("X-Forwarded-For")
        client_ip = forwarded.split(",")[0].strip() if forwarded else request.client.host
        
        if not self.is_ip_allowed(client_ip):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied from this IP address"
            )
        
        return await call_next(request)