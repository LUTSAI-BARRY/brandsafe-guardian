#!/usr/bin/env python
"""
Test script for BrandSafe Django API
Run this to test all API endpoints
"""

import requests
import json
import os
import sys

# Add the project root to the path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'brandsafe_backend.settings')

import django
django.setup()

from api.models import UserProfile

BASE_URL = "http://localhost:8000/api"

def test_health():
    """Test health check endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/health/")
        print(f"✅ Health Check: {response.status_code} - {response.json()}")
        return True
    except Exception as e:
        print(f"❌ Health Check Failed: {e}")
        return False

def test_registration():
    """Test user registration"""
    data = {
        "username": "testuser",
        "password": "testpass123!",
        "password_confirm": "testpass123!",
        "email": "test@brandsafe.com",
        "first_name": "Test",
        "last_name": "User",
        "role": "influencer",
        "organization": "Test Company"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/register/", json=data)
        print(f"✅ Registration: {response.status_code}")
        if response.status_code == 201:
            result = response.json()
            print(f"   User created: {result['user']['username']}")
            print(f"   Access token received: {result['tokens']['access'][:50]}...")
            return result['tokens']
        else:
            print(f"   Error: {response.json()}")
            return None
    except Exception as e:
        print(f"❌ Registration Failed: {e}")
        return None

def test_login():
    """Test user login"""
    data = {
        "username": "testuser",
        "password": "testpass123!"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/login/", json=data)
        print(f"✅ Login: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"   Login successful for: {result['user']['username']}")
            return result['tokens']
        else:
            print(f"   Error: {response.json()}")
            return None
    except Exception as e:
        print(f"❌ Login Failed: {e}")
        return None

def test_content_moderation(tokens):
    """Test content moderation endpoint"""
    headers = {
        'Authorization': f'Bearer {tokens["access"]}',
        'Content-Type': 'application/json'
    }
    
    # Test safe content
    data = {
        "input_type": "text",
        "input_value": "This is a safe message about my brand."
    }
    
    try:
        response = requests.post(f"{BASE_URL}/moderate/", json=data, headers=headers)
        print(f"✅ Content Moderation (Safe): {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"   Result: {result['result']} ({result['confidence_score']})")
        
        # Test unsafe content
        data = {
            "input_type": "text",
            "input_value": "This is a fake scam trying to steal your money!"
        }
        
        response = requests.post(f"{BASE_URL}/moderate/", json=data, headers=headers)
        print(f"✅ Content Moderation (Unsafe): {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"   Result: {result['result']} ({result['confidence_score']})")
            print(f"   Flags: {result['flags_detected']}")
        
        return True
    except Exception as e:
        print(f"❌ Content Moderation Failed: {e}")
        return False

def test_dashboard(tokens):
    """Test dashboard endpoint"""
    headers = {
        'Authorization': f'Bearer {tokens["access"]}',
    }
    
    try:
        response = requests.get(f"{BASE_URL}/dashboard/", headers=headers)
        print(f"✅ Dashboard: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"   Total checks: {result['total_checks']}")
            print(f"   Safety rate: {result['safety_rate']}%")
        return True
    except Exception as e:
        print(f"❌ Dashboard Failed: {e}")
        return False

def run_tests():
    """Run all API tests"""
    print("🚀 Starting BrandSafe API Tests...\n")
    
    # Test health check
    if not test_health():
        print("❌ Server not running. Start with: python manage.py runserver 8000")
        return
    
    print()
    
    # Clean up existing test user
    try:
        UserProfile.objects.filter(username="testuser").delete()
    except:
        pass
    
    # Test registration
    tokens = test_registration()
    if not tokens:
        return
    
    print()
    
    # Test login (should also work)
    login_tokens = test_login()
    
    print()
    
    # Test content moderation
    test_content_moderation(tokens)
    
    print()
    
    # Test dashboard
    test_dashboard(tokens)
    
    print("\n✅ All tests completed!")

if __name__ == "__main__":
    run_tests()