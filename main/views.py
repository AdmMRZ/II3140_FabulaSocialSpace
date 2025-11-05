import json
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from .services import AuthService, MenuService, OrderService, TenantService

@csrf_exempt
def auth_google(request):
    if request.method != "POST":
        return JsonResponse({"status": "error", "message": "method not allowed"}, status=405)
    try:
        body = json.loads(request.body)
        credential = body.get("credential")
        if not credential:
            return HttpResponseBadRequest("missing credential")
        user = AuthService.verify_google_token(credential)
        if not user:
            return JsonResponse({"status": "error", "message": "invalid token"}, status=400)
        return JsonResponse({"status": "success", "user": user})
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)

def menu_list(request):
    if request.method != "GET":
        return JsonResponse({"status": "error", "message": "method not allowed"}, status=405)
    data = MenuService.list_menus()
    return JsonResponse({"status": "success", "data": data})

@csrf_exempt
def order_create(request):
    if request.method != "POST":
        return JsonResponse({"status": "error", "message": "method not allowed"}, status=405)
    try:
        body = json.loads(request.body)
        table_number = body.get("table_number")
        items = body.get("items", [])
        result = OrderService.create_order(table_number, items)
        return JsonResponse({"status": "success", "message": "Order berhasil dibuat", "data": result})
    except ValueError as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=400)
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)

@csrf_exempt
def tenant_create(request):
    if request.method != "POST":
        return JsonResponse({"status": "error", "message": "method not allowed"}, status=405)
    try:
        body = json.loads(request.body)
        tr = TenantService.create_tenant_request(
            body.get("tenant_name"),
            body.get("contact"),
            body.get("type"),
            body.get("description", "")
        )
        return JsonResponse({"status": "success", "message": "Request tenant berhasil dikirim", "data": tr})
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)
