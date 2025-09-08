import time
import random
from datetime import datetime, timedelta
from django.utils import timezone
from django.db.models import Count, Q
from django.contrib.auth import login
from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .models import UserProfile, ModerationLog
from .serializers import (
    UserRegistrationSerializer, UserLoginSerializer, UserProfileSerializer,
    ModerationRequestSerializer, ModerationLogSerializer, DashboardStatsSerializer
)


class UserRegistrationView(generics.CreateAPIView):
    """
    Register a new user account
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = (permissions.AllowAny,)
    
    @swagger_auto_schema(
        operation_description="Register a new user account",
        responses={
            201: openapi.Response('User created successfully', UserProfileSerializer),
            400: 'Validation errors'
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserProfileSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            },
            'message': 'User registered successfully'
        }, status=status.HTTP_201_CREATED)


class UserLoginView(APIView):
    """
    Login with username/password and receive JWT tokens
    """
    permission_classes = (permissions.AllowAny,)
    
    @swagger_auto_schema(
        operation_description="Login with username and password",
        request_body=UserLoginSerializer,
        responses={
            200: openapi.Response('Login successful', openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'user': openapi.Schema(type=openapi.TYPE_OBJECT),
                    'tokens': openapi.Schema(type=openapi.TYPE_OBJECT),
                    'message': openapi.Schema(type=openapi.TYPE_STRING),
                }
            )),
            400: 'Invalid credentials'
        }
    )
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = serializer.validated_data['user']
        login(request, user)
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserProfileSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            },
            'message': 'Login successful'
        })


class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    Get or update current user profile
    """
    serializer_class = UserProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    def get_object(self):
        return self.request.user
    
    @swagger_auto_schema(
        operation_description="Get current user profile",
        responses={200: UserProfileSerializer}
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    
    @swagger_auto_schema(
        operation_description="Update current user profile",
        request_body=UserProfileSerializer,
        responses={200: UserProfileSerializer}
    )
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)


class ContentModerationView(APIView):
    """
    Submit content for moderation analysis
    """
    permission_classes = (permissions.IsAuthenticated,)
    
    @swagger_auto_schema(
        operation_description="Submit content for moderation",
        request_body=ModerationRequestSerializer,
        responses={
            200: ModerationLogSerializer,
            400: 'Invalid request data'
        }
    )
    def post(self, request):
        start_time = time.time()
        
        serializer = ModerationRequestSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        
        # Create moderation log entry
        moderation_log = ModerationLog.objects.create(
            user=request.user,
            ip_address=self._get_client_ip(request),
            user_agent=request.META.get('HTTP_USER_AGENT', ''),
            **serializer.validated_data
        )
        
        # Simulate content moderation (placeholder logic)
        result_data = self._moderate_content(moderation_log)
        
        # Update moderation log with results
        processing_time = int((time.time() - start_time) * 1000)
        moderation_log.result = result_data['result']
        moderation_log.risk_level = result_data['risk_level']
        moderation_log.confidence_score = result_data['confidence_score']
        moderation_log.flags_detected = result_data['flags_detected']
        moderation_log.processing_time_ms = processing_time
        moderation_log.save()
        
        return Response(ModerationLogSerializer(moderation_log).data)
    
    def _get_client_ip(self, request):
        """Get client IP address"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip
    
    def _moderate_content(self, moderation_log):
        """
        Placeholder content moderation logic
        In production, this would integrate with AI/ML services
        """
        input_type = moderation_log.input_type
        input_value = moderation_log.input_value.lower() if moderation_log.input_value else ""
        
        # Simulate processing delay
        time.sleep(random.uniform(0.1, 0.5))
        
        # Simple rule-based detection for demo
        unsafe_keywords = [
            'spam', 'scam', 'fake', 'counterfeit', 'pirated', 'stolen',
            'illegal', 'fraud', 'phishing', 'malware', 'virus'
        ]
        
        flags_detected = []
        risk_level = 'low'
        
        # Check for unsafe content
        for keyword in unsafe_keywords:
            if keyword in input_value:
                flags_detected.append(f"Contains '{keyword}'")
                risk_level = 'high'
        
        # Determine result based on flags
        if flags_detected:
            result = 'unsafe'
            confidence_score = random.uniform(0.7, 0.95)
        else:
            result = 'safe'
            confidence_score = random.uniform(0.85, 0.99)
            risk_level = 'low'
        
        # Add some randomness for demo purposes
        if random.random() < 0.1:  # 10% chance of unsafe even if no keywords
            result = 'unsafe'
            risk_level = random.choice(['medium', 'high'])
            flags_detected.append("Suspicious patterns detected")
            confidence_score = random.uniform(0.6, 0.8)
        
        return {
            'result': result,
            'risk_level': risk_level,
            'confidence_score': round(confidence_score, 3),
            'flags_detected': flags_detected
        }


class DashboardView(APIView):
    """
    Get dashboard analytics for the current user or admin aggregated stats
    """
    permission_classes = (permissions.IsAuthenticated,)
    
    @swagger_auto_schema(
        operation_description="Get user dashboard analytics",
        responses={200: DashboardStatsSerializer}
    )
    def get(self, request):
        user = request.user
        
        if user.is_admin:
            # Admin sees aggregated stats for all users
            stats = self._get_admin_stats()
        else:
            # Regular users see their own stats
            stats = self._get_user_stats(user)
        
        return Response(stats)
    
    def _get_user_stats(self, user):
        """Get statistics for a specific user"""
        now = timezone.now()
        today = now.date()
        week_ago = now - timedelta(days=7)
        month_ago = now - timedelta(days=30)
        
        # Base queryset for user's logs
        user_logs = user.moderation_logs.all()
        
        # Total counts
        total_checks = user_logs.count()
        safe_count = user_logs.filter(result='safe').count()
        unsafe_count = user_logs.filter(result='unsafe').count()
        pending_count = user_logs.filter(result='pending').count()
        
        # Time-based counts
        checks_today = user_logs.filter(created_at__date=today).count()
        checks_this_week = user_logs.filter(created_at__gte=week_ago).count()
        checks_this_month = user_logs.filter(created_at__gte=month_ago).count()
        
        # Calculate safety rate
        safety_rate = (safe_count / total_checks * 100) if total_checks > 0 else 0
        
        # Risk breakdown
        risk_breakdown = dict(
            user_logs.exclude(risk_level__isnull=True)
            .values('risk_level')
            .annotate(count=Count('id'))
            .values_list('risk_level', 'count')
        )
        
        # Type breakdown
        type_breakdown = dict(
            user_logs.values('input_type')
            .annotate(count=Count('id'))
            .values_list('input_type', 'count')
        )
        
        # Recent logs (last 10)
        recent_logs = user_logs[:10]
        
        return {
            'total_checks': total_checks,
            'safe_count': safe_count,
            'unsafe_count': unsafe_count,
            'pending_count': pending_count,
            'safety_rate': round(safety_rate, 2),
            'checks_today': checks_today,
            'checks_this_week': checks_this_week,
            'checks_this_month': checks_this_month,
            'recent_logs': ModerationLogSerializer(recent_logs, many=True).data,
            'risk_breakdown': risk_breakdown,
            'type_breakdown': type_breakdown,
        }
    
    def _get_admin_stats(self):
        """Get aggregated statistics for all users (admin view)"""
        now = timezone.now()
        today = now.date()
        week_ago = now - timedelta(days=7)
        month_ago = now - timedelta(days=30)
        
        # Base queryset for all logs
        all_logs = ModerationLog.objects.all()
        
        # Total counts
        total_checks = all_logs.count()
        safe_count = all_logs.filter(result='safe').count()
        unsafe_count = all_logs.filter(result='unsafe').count()
        pending_count = all_logs.filter(result='pending').count()
        
        # Time-based counts
        checks_today = all_logs.filter(created_at__date=today).count()
        checks_this_week = all_logs.filter(created_at__gte=week_ago).count()
        checks_this_month = all_logs.filter(created_at__gte=month_ago).count()
        
        # Calculate safety rate
        safety_rate = (safe_count / total_checks * 100) if total_checks > 0 else 0
        
        # Risk breakdown
        risk_breakdown = dict(
            all_logs.exclude(risk_level__isnull=True)
            .values('risk_level')
            .annotate(count=Count('id'))
            .values_list('risk_level', 'count')
        )
        
        # Type breakdown
        type_breakdown = dict(
            all_logs.values('input_type')
            .annotate(count=Count('id'))
            .values_list('input_type', 'count')
        )
        
        # Recent logs (last 10)
        recent_logs = all_logs[:10]
        
        return {
            'total_checks': total_checks,
            'safe_count': safe_count,
            'unsafe_count': unsafe_count,
            'pending_count': pending_count,
            'safety_rate': round(safety_rate, 2),
            'checks_today': checks_today,
            'checks_this_week': checks_this_week,
            'checks_this_month': checks_this_month,
            'recent_logs': ModerationLogSerializer(recent_logs, many=True).data,
            'risk_breakdown': risk_breakdown,
            'type_breakdown': type_breakdown,
        }


class ModerationHistoryView(generics.ListAPIView):
    """
    Get moderation history for the current user
    """
    serializer_class = ModerationLogSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    def get_queryset(self):
        return self.request.user.moderation_logs.all()
    
    @swagger_auto_schema(
        operation_description="Get user's moderation history",
        responses={200: ModerationLogSerializer(many=True)}
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def health_check(request):
    """
    Health check endpoint
    """
    return Response({
        'status': 'healthy',
        'timestamp': timezone.now(),
        'version': '1.0.0'
    })
