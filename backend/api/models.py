from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import URLValidator
from django.utils import timezone


class UserProfile(AbstractUser):
    """
    Extended User model with BrandSafe-specific fields
    """
    USER_ROLES = [
        ('influencer', 'Influencer/Brand Owner'),
        ('admin', 'Admin'),
    ]
    
    role = models.CharField(
        max_length=20,
        choices=USER_ROLES,
        default='influencer',
        help_text="User role in the platform"
    )
    organization = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        help_text="Organization or company name"
    )
    instagram_handle = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Instagram username without @"
    )
    twitter_handle = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Twitter username without @"
    )
    youtube_channel = models.URLField(
        blank=True,
        null=True,
        help_text="YouTube channel URL"
    )
    website = models.URLField(
        blank=True,
        null=True,
        help_text="Personal or company website"
    )
    phone_number = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        help_text="Contact phone number"
    )
    bio = models.TextField(
        blank=True,
        null=True,
        max_length=500,
        help_text="Short bio or description"
    )
    profile_picture = models.ImageField(
        upload_to='profile_pictures/',
        blank=True,
        null=True,
        help_text="Profile picture"
    )
    is_verified = models.BooleanField(
        default=False,
        help_text="Whether the user account is verified"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip() or self.username
    
    @property
    def is_admin(self):
        return self.role == 'admin'
    
    @property
    def is_influencer(self):
        return self.role == 'influencer'


class ModerationLog(models.Model):
    """
    Log entry for content moderation requests
    """
    INPUT_TYPES = [
        ('text', 'Text Content'),
        ('image', 'Image File'),
        ('url', 'URL/Link'),
    ]
    
    RESULT_TYPES = [
        ('safe', 'Safe Content'),
        ('unsafe', 'Unsafe Content'),
        ('pending', 'Pending Review'),
        ('error', 'Processing Error'),
    ]
    
    RISK_LEVELS = [
        ('low', 'Low Risk'),
        ('medium', 'Medium Risk'),
        ('high', 'High Risk'),
        ('critical', 'Critical Risk'),
    ]
    
    user = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name='moderation_logs',
        help_text="User who submitted the content for moderation"
    )
    input_type = models.CharField(
        max_length=10,
        choices=INPUT_TYPES,
        help_text="Type of content submitted for moderation"
    )
    input_value = models.TextField(
        help_text="The actual content (text, URL, or file path)"
    )
    input_file = models.FileField(
        upload_to='moderation_uploads/',
        blank=True,
        null=True,
        help_text="Uploaded file for image moderation"
    )
    result = models.CharField(
        max_length=10,
        choices=RESULT_TYPES,
        default='pending',
        help_text="Moderation result"
    )
    risk_level = models.CharField(
        max_length=10,
        choices=RISK_LEVELS,
        blank=True,
        null=True,
        help_text="Risk level assessment"
    )
    confidence_score = models.FloatField(
        blank=True,
        null=True,
        help_text="AI confidence score (0.0 to 1.0)"
    )
    flags_detected = models.JSONField(
        default=list,
        blank=True,
        help_text="List of specific issues detected"
    )
    processing_time_ms = models.IntegerField(
        blank=True,
        null=True,
        help_text="Processing time in milliseconds"
    )
    ip_address = models.GenericIPAddressField(
        blank=True,
        null=True,
        help_text="IP address of the request"
    )
    user_agent = models.TextField(
        blank=True,
        null=True,
        help_text="User agent string from request"
    )
    notes = models.TextField(
        blank=True,
        null=True,
        help_text="Additional notes or context"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', '-created_at']),
            models.Index(fields=['result', '-created_at']),
            models.Index(fields=['input_type', '-created_at']),
        ]
    
    def __str__(self):
        return f"{self.user.username} - {self.get_input_type_display()} - {self.get_result_display()}"
    
    @property
    def is_safe(self):
        return self.result == 'safe'
    
    @property
    def is_unsafe(self):
        return self.result == 'unsafe'
    
    @property
    def is_pending(self):
        return self.result == 'pending'


class APIUsageLog(models.Model):
    """
    Track API usage for analytics and rate limiting
    """
    user = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name='api_usage_logs'
    )
    endpoint = models.CharField(max_length=100)
    method = models.CharField(max_length=10)
    status_code = models.IntegerField()
    response_time_ms = models.IntegerField()
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', '-created_at']),
            models.Index(fields=['endpoint', '-created_at']),
        ]
