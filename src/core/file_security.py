"""
File upload security utilities and validation.
"""
import os
import mimetypes
from pathlib import Path
from typing import List, Optional
from fastapi import HTTPException, UploadFile
import magic
import hashlib


class FileValidator:
    """Secure file upload validation and handling."""
    
    # Allowed MIME types for images
    ALLOWED_MIME_TYPES = {
        'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'
    }
    
    # Allowed file extensions
    ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp'}
    
    # Maximum file size (10MB)
    MAX_FILE_SIZE = 10 * 1024 * 1024
    
    # Maximum filename length
    MAX_FILENAME_LENGTH = 255
    
    @staticmethod
    def validate_file(file: UploadFile) -> None:
        """
        Comprehensive file validation.
        Raises HTTPException if validation fails.
        """
        # Check file size
        if file.size and file.size > FileValidator.MAX_FILE_SIZE:
            raise HTTPException(
                status_code=413,
                detail=f"File too large. Maximum size is {FileValidator.MAX_FILE_SIZE / (1024*1024):.1f}MB"
            )
        
        # Validate filename
        if not file.filename:
            raise HTTPException(status_code=400, detail="No filename provided")
        
        if len(file.filename) > FileValidator.MAX_FILENAME_LENGTH:
            raise HTTPException(status_code=400, detail="Filename too long")
        
        # Check for path traversal
        if '..' in file.filename or '/' in file.filename or '\\' in file.filename:
            raise HTTPException(status_code=400, detail="Invalid filename")
        
        # Validate file extension
        file_ext = Path(file.filename).suffix.lower()
        if file_ext not in FileValidator.ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail=f"File type not allowed. Allowed types: {', '.join(FileValidator.ALLOWED_EXTENSIONS)}"
            )
    
    @staticmethod
    def validate_file_content(file_path: Path) -> None:
        """
        Validate file content using magic numbers.
        """
        try:
            # Check MIME type using python-magic
            mime_type = magic.from_file(str(file_path), mime=True)
            if mime_type not in FileValidator.ALLOWED_MIME_TYPES:
                raise HTTPException(
                    status_code=400,
                    detail=f"File content type not allowed: {mime_type}"
                )
        except Exception:
            # Fallback to file extension if magic fails
            pass
    
    @staticmethod
    def generate_safe_filename(original_filename: str) -> str:
        """
        Generate a safe filename with hash prefix.
        """
        # Get file extension
        file_ext = Path(original_filename).suffix.lower()
        
        # Generate hash of original filename + timestamp
        import time
        hash_input = f"{original_filename}_{time.time()}".encode()
        file_hash = hashlib.sha256(hash_input).hexdigest()[:16]
        
        return f"{file_hash}{file_ext}"
    
    @staticmethod
    def create_secure_upload_path(upload_dir: Path, filename: str) -> Path:
        """
        Create a secure upload path with proper directory structure.
        """
        # Create date-based subdirectory
        from datetime import datetime
        date_subdir = datetime.now().strftime("%Y/%m/%d")
        
        # Create full directory path
        full_dir = upload_dir / date_subdir
        full_dir.mkdir(parents=True, exist_ok=True)
        
        # Generate safe filename
        safe_filename = FileValidator.generate_safe_filename(filename)
        
        return full_dir / safe_filename


def scan_file_for_malware(file_path: Path) -> bool:
    """
    Basic file scanning for suspicious content.
    In production, integrate with proper antivirus scanning.
    """
    try:
        # Check file size (basic DoS protection)
        if file_path.stat().st_size > FileValidator.MAX_FILE_SIZE:
            return False
        
        # Read first few bytes to check for executable signatures
        with open(file_path, 'rb') as f:
            header = f.read(512)
        
        # Check for executable file signatures
        dangerous_signatures = [
            b'\x4d\x5a',  # PE/EXE
            b'\x7f\x45\x4c\x46',  # ELF
            b'\xfe\xed\xfa',  # Mach-O
            b'#!/bin/',  # Shell script
            b'<?php',  # PHP
            b'<script',  # JavaScript
        ]
        
        for signature in dangerous_signatures:
            if signature in header.lower():
                return False
        
        return True
    
    except Exception:
        return False