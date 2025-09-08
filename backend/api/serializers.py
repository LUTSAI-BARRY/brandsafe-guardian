from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from .models import UserProfile, ModerationLog


class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration
    """
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=UserProfile.objects.all())]
    )
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password]
    )
    password_confirm = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = UserProfile
        fields = (
            'username', 'password', 'password_confirm', 'email',
            'first_name', 'last_name', 'role', 'organization',
            'instagram_handle', 'twitter_handle', 'youtube_channel',
            'website', 'phone_number', 'bio'
        )
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
        }
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = UserProfile.objects.create_user(**validated_data)
        return user


class UserLoginSerializer(serializers.Serializer):
    """
    Serializer for user login
    """
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        
        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError(
                    'Unable to log in with provided credentials.'
                )
            if not user.is_active:
                raise serializers.ValidationError(
                    'User account is disabled.'
                )
            data['user'] = user
        else:
            raise serializers.ValidationError(
                'Must include "username" and "password".'
            )
        
        return data


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for user profile information
    """
    full_name = serializers.ReadOnlyField()
    is_admin = serializers.ReadOnlyField()
    is_influencer = serializers.ReadOnlyField()
    
    class Meta:
        model = UserProfile
        fields = (
            'id', 'username', 'email', 'first_name', 'last_name',
            'full_name', 'role', 'organization', 'instagram_handle',
            'twitter_handle', 'youtube_channel', 'website',
            'phone_number', 'bio', 'profile_picture', 'is_verified',
            'is_admin', 'is_influencer', 'date_joined', 'last_login'
        )
        read_only_fields = ('id', 'username', 'date_joined', 'last_login', 'is_verified')


class ModerationRequestSerializer(serializers.ModelSerializer):
    """
    Serializer for content moderation requests
    """
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    
    class Meta:
        model = ModerationLog
        fields = (
            'input_type', 'input_value', 'input_file', 'notes'
        )
    
    def validate(self, data):
        input_type = data.get('input_type')
        input_value = data.get('input_value')
        input_file = data.get('input_file')
        
        if input_type == 'image' and not input_file:
            raise serializers.ValidationError(
                "Image file is required for image moderation."
            )
        
        if input_type in ['text', 'url'] and not input_value:
            raise serializers.ValidationError(
                f"{input_type.title()} content is required for {input_type} moderation."
            )
        
        return data


class ModerationLogSerializer(serializers.ModelSerializer):
    """
    Serializer for moderation log responses
    """
    user = UserProfileSerializer(read_only=True)
    input_type_display = serializers.CharField(source='get_input_type_display', read_only=True)
    result_display = serializers.CharField(source='get_result_display', read_only=True)
    risk_level_display = serializers.CharField(source='get_risk_level_display', read_only=True)
    
    class Meta:
        model = ModerationLog
        fields = (
            'id', 'user', 'input_type', 'input_type_display',
            'input_value', 'input_file', 'result', 'result_display',
            'risk_level', 'risk_level_display', 'confidence_score',
            'flags_detected', 'processing_time_ms', 'notes',
            'created_at', 'updated_at'
        )


class DashboardStatsSerializer(serializers.Serializer):
    """
    Serializer for dashboard analytics
    """
    total_checks = serializers.IntegerField()
    safe_count = serializers.IntegerField()
    unsafe_count = serializers.IntegerField()
    pending_count = serializers.IntegerField()
    safety_rate = serializers.FloatField()
    checks_today = serializers.IntegerField()
    checks_this_week = serializers.IntegerField()
    checks_this_month = serializers.IntegerField()
    recent_logs = ModerationLogSerializer(many=True, read_only=True)
    risk_breakdown = serializers.DictField()
    type_breakdown = serializers.DictField()