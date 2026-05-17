import os
import sys
import traceback
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), 'backend', '.env'))

# Set the key manually for testing
if os.getenv("GEMINI_API_KEY"):
    os.environ["BOBSHELL_API_KEY"] = os.getenv("GEMINI_API_KEY")

from services.bob_service import analyze_with_bob

try:
    contract = analyze_with_bob("Quiero escanear cereales", "React Native")
    print("SUCCESS")
    print(contract.model_dump_json(indent=2))
except Exception as e:
    print(f"FAILED WITH ERROR: {e}")
    traceback.print_exc()
