from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UserProfile, ModerationLog, APIUsageLog


@admin.register(UserProfile)
class UserProfileAdmin(UserAdmin):
    """
    Admin interface for UserProfile model
    """
    list_display = ('username', 'email', 'full_name', 'role', 'organization', 'is_verified', 'date_joined')
    list_filter = ('role', 'is_verified', 'is_active', 'date_joined')
    search_fields = ('username', 'email', 'first_name', 'last_name', 'organization')
    readonly_fields = ('date_joined', 'last_login')
    
    fieldsets = UserAdmin.fieldsets + (
        ('BrandSafe Profile', {
            'fields': (
                'role', 'organization', 'bio', 'profile_picture', 'is_verified',
                'instagram_handle', 'twitter_handle', 'youtube_channel', 
                'website', 'phone_number'
            )
        }),
    )
    
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('BrandSafe Profile', {
            'fields': ('role', 'organization', 'first_name', 'last_name', 'email')
        }),
    )


@admin.register(ModerationLog)
class ModerationLogAdmin(admin.ModelAdmin):
    """
    Admin interface for ModerationLog model
    """
    list_display = ('user', 'input_type', 'result', 'risk_level', 'confidence_score', 'created_at')
    list_filter = ('input_type', 'result', 'risk_level', 'created_at')
    search_fields = ('user__username', 'user__email', 'input_value', 'notes')
    readonly_fields = ('created_at', 'updated_at', 'processing_time_ms', 'ip_address', 'user_agent')
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Content', {
            'fields': ('user', 'input_type', 'input_value', 'input_file', 'notes')
        }),
        ('Results', {
            'fields': ('result', 'risk_level', 'confidence_score', 'flags_detected')
        }),
        ('Metadata', {
            'fields': ('processing_time_ms', 'ip_address', 'user_agent', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(APIUsageLog)
class APIUsageLogAdmin(admin.ModelAdmin):
    """
    Admin interface for API usage tracking
    """
    list_display = ('user', 'endpoint', 'method', 'status_code', 'response_time_ms', 'created_at')
    list_filter = ('method', 'status_code', 'created_at')
    search_fields = ('user__username', 'endpoint')
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'
