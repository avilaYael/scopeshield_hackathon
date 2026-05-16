# -*- coding: utf-8 -*-
"""
Script para probar la integración del backend de ScopeShield
"""
import requests
import json
import sys
import io

# Configurar encoding para Windows
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

API_URL = "http://localhost:8001"

def test_health():
    """Prueba el endpoint de health"""
    try:
        response = requests.get(f"{API_URL}/health")
        print(f"[OK] Health check: {response.status_code}")
        print(f"  Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"[FAIL] Health check failed: {e}")
        return False

def test_analyze_endpoint():
    """Prueba el endpoint de análisis"""
    try:
        payload = {
            "clientRequest": "Agrega login con Google y rediseña el dashboard",
            "repoContext": "React + Node.js app"
        }
        
        response = requests.post(
            f"{API_URL}/api/scope/analyze",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"\n[OK] Analyze endpoint: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"  Success: {data.get('success')}")
            print(f"  Risk Score: {data.get('data', {}).get('riskScore')}")
            print(f"  Impacted Areas: {len(data.get('data', {}).get('impactedAreas', []))}")
            print(f"  Hidden Scope Items: {len(data.get('data', {}).get('hiddenScope', []))}")
            return True
        else:
            print(f"  Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"[FAIL] Analyze endpoint failed: {e}")
        return False

if __name__ == "__main__":
    print("=" * 60)
    print("PRUEBA DE INTEGRACION BACKEND SCOPESHIELD")
    print("=" * 60)
    
    health_ok = test_health()
    analyze_ok = test_analyze_endpoint()
    
    print("\n" + "=" * 60)
    if health_ok and analyze_ok:
        print("[SUCCESS] TODAS LAS PRUEBAS PASARON")
    else:
        print("[ERROR] ALGUNAS PRUEBAS FALLARON")
    print("=" * 60)

# Made with Bob
