"""
Input validation and sanitization utilities.
"""
import re
import html
from typing import Any, Dict, Optional
from fastapi import HTTPException, status


class InputValidator:
    """Input validation and sanitization utilities."""
    
    # Regex patterns for validation
    EMAIL_PATTERN = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
    USERNAME_PATTERN = re.compile(r'^[a-zA-Z0-9_-]{3,20}$')
    SAFE_STRING_PATTERN = re.compile(r'^[a-zA-Z0-9\s\-_.,!?()]+$')
    
    # Maximum lengths
    MAX_EMAIL_LENGTH = 254
    MAX_USERNAME_LENGTH = 20
    MAX_FULL_NAME_LENGTH = 100
    MAX_DESCRIPTION_LENGTH = 1000
    MAX_QUERY_LENGTH = 500
    
    @staticmethod
    def validate_email(email: str) -> str:
        """Validate and sanitize email address."""
        if not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email is required"
            )
        
        email = email.strip().lower()
        
        if len(email) > InputValidator.MAX_EMAIL_LENGTH:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email address too long"
            )
        
        if not InputValidator.EMAIL_PATTERN.match(email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid email format"
            )
        
        return email
    
    @staticmethod
    def validate_username(username: str) -> str:
        """Validate and sanitize username."""
        if not username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username is required"
            )
        
        username = username.strip()
        
        if len(username) > InputValidator.MAX_USERNAME_LENGTH:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username too long"
            )
        
        if not InputValidator.USERNAME_PATTERN.match(username):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username can only contain letters, numbers, hyphens, and underscores"
            )
        
        return username
    
    @staticmethod
    def validate_password(password: str) -> str:
        """Validate password strength."""
        if not password:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password is required"
            )
        
        if len(password) < 8:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password must be at least 8 characters long"
            )
        
        if len(password) > 128:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password too long"
            )
        
        # Check for at least one number and one letter
        if not re.search(r'[0-9]', password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password must contain at least one number"
            )
        
        if not re.search(r'[a-zA-Z]', password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password must contain at least one letter"
            )
        
        return password
    
    @staticmethod
    def sanitize_string(text: str, max_length: int = None, allow_html: bool = False) -> str:
        """Sanitize string input."""
        if not text:
            return ""
        
        # Strip whitespace
        text = text.strip()
        
        # Check length
        if max_length and len(text) > max_length:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Input too long. Maximum length is {max_length} characters"
            )
        
        # HTML escape if not allowing HTML
        if not allow_html:
            text = html.escape(text)
        
        # Remove null bytes and other control characters
        text = ''.join(char for char in text if ord(char) >= 32 or char in '\n\r\t')
        
        return text
    
    @staticmethod
    def validate_full_name(full_name: str) -> str:
        """Validate and sanitize full name."""
        full_name = InputValidator.sanitize_string(
            full_name, 
            max_length=InputValidator.MAX_FULL_NAME_LENGTH
        )
        
        if not full_name:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Full name is required"
            )
        
        # Check for reasonable name pattern
        if not re.match(r'^[a-zA-Z\s\-\'\.]{2,}$', full_name):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Full name contains invalid characters"
            )
        
        return full_name
    
    @staticmethod
    def validate_description(description: str) -> str:
        """Validate and sanitize description text."""
        return InputValidator.sanitize_string(
            description,
            max_length=InputValidator.MAX_DESCRIPTION_LENGTH
        )
    
    @staticmethod
    def validate_query(query: str) -> str:
        """Validate and sanitize search query."""
        query = InputValidator.sanitize_string(
            query,
            max_length=InputValidator.MAX_QUERY_LENGTH
        )
        
        if not query:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Query cannot be empty"
            )
        
        return query
    
    @staticmethod
    def validate_positive_integer(value: Any, field_name: str = "value") -> int:
        """Validate positive integer."""
        try:
            value = int(value)
        except (ValueError, TypeError):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"{field_name} must be a valid integer"
            )
        
        if value <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"{field_name} must be positive"
            )
        
        return value
    
    @staticmethod
    def validate_difficulty_level(level: Any) -> str:
        """Validate difficulty level."""
        valid_levels = ["beginner", "intermediate", "advanced"]
        
        if level not in valid_levels:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Difficulty must be one of: {', '.join(valid_levels)}"
            )
        
        return level


class SQLSafetyChecker:
    """Check for potential SQL injection patterns."""
    
    # Dangerous SQL keywords and patterns
    DANGEROUS_PATTERNS = [
        r'\bunion\b', r'\bselect\b', r'\binsert\b', r'\bupdate\b', r'\bdelete\b',
        r'\bdrop\b', r'\bcreate\b', r'\balter\b', r'\bexec\b', r'\bexecute\b',
        r'--', r'/\*', r'\*/', r';', r'\bor\b.*=.*\bor\b', r'\band\b.*=.*\band\b'
    ]
    
    @staticmethod
    def check_sql_injection(text: str) -> bool:
        """Check if text contains potential SQL injection patterns."""
        if not text:
            return True
        
        text_lower = text.lower()
        
        for pattern in SQLSafetyChecker.DANGEROUS_PATTERNS:
            if re.search(pattern, text_lower):
                return False
        
        return True
    
    @staticmethod
    def validate_safe_input(text: str, field_name: str = "input") -> str:
        """Validate input is safe from SQL injection."""
        if not SQLSafetyChecker.check_sql_injection(text):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid characters detected in {field_name}"
            )
        
        return text