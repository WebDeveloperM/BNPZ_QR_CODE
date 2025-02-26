from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework import status
from .models import *
from .serializers import *
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import render, redirect
from django.contrib import messages
from .utils import import_computers_from_excel
from django.shortcuts import get_object_or_404
from django.db.models import Count

class TexnologyApiView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, *args, **kwargs):
        departament = DepartmentSerializer(Department.objects.all(), many=True).data
        warehouse_manager = WarehouseManagerSerializer(WarehouseManager.objects.all(), many=True).data
        type_compyuter = TypeCompyuterSerializer(TypeCompyuter.objects.all(), many=True).data
        motherboard = MotherboardModelSerializer(Motherboard.objects.all(), many=True).data
        motherboard_model = MotherboardModelSerializer(MotherboardModel.objects.all(), many=True).data
        cpu = CPUSerializer(CPU.objects.all(), many=True).data
        generation = GenerationSerializer(Generation.objects.all(), many=True).data
        frequency = FrequencySerializer(Frequency.objects.all(), many=True).data
        hdd = HDDSerializer(HDD.objects.all(), many=True).data
        ssd = SSDSerializer(SSD.objects.all(), many=True).data
        disk_type = DiskTypeSerializer(DiskType.objects.all(), many=True).data
        ram_type = RAMTypeSerializer(RAMType.objects.all(), many=True).data
        ram_size = RAMSizeSerializer(RAMSize.objects.all(), many=True).data
        gpu = GPUSerializer(GPU.objects.all(), many=True).data
        printer = PrinterSerializer(Printer.objects.all(), many=True).data
        scaner = ScanerSerializer(Scaner.objects.all(), many=True).data
        type_webcamera = TypeWebCameraSerializer(TypeWebCamera.objects.all(), many=True).data
        model_webcam = ModelWebCameraSerializer(ModelWebCamera.objects.all(), many=True).data
        type_monitor = MonitorSerializer(Monitor.objects.all(), many=True).data

        data = {
            'departament': departament,
            'warehouse_manager': warehouse_manager,
            'type_compyuter': type_compyuter,
            'motherboard': motherboard,
            'motherboard_model': motherboard_model,
            'cpu': cpu,
            'generation': generation,
            'frequency': frequency,
            'hdd': hdd,
            'ssd': ssd,
            'disk_type': disk_type,
            'ram_type': ram_type,
            'ram_size': ram_size,
            'gpu': gpu,
            'printer': printer,
            'scaner': scaner,
            'type_webcamera': type_webcamera,
            'model_webcam': model_webcam,
            'type_monitor': type_monitor,

        }

        return Response(data)


class CoreApiView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, *args, **kwargs):
        compyuters = Compyuter.objects.all()
        serializer = CompyuterSerializer(compyuters, many=True)
        return Response(serializer.data)


class CompDetailApiView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, *args, **kwargs):
        slug = kwargs.get('slug')

        if not slug:
            return Response({"error": "Slug not found"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            compyuter = Compyuter.objects.get(slug=slug)
            print(compyuter.isActive)
        except:
            return Response({"error": "Slug bo'yicha ma'lumot topilmadi"}, status=status.HTTP_404_NOT_FOUND)

        serializer = CompyuterSerializer(compyuter)
        return Response(serializer.data)


class CompDeleteApiView(APIView):
    @staticmethod
    def delete(request, *args, **kwargs):
        slug = kwargs.get('slug')

        if not slug:
            return Response({"error": "Slug not found"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            Compyuter.objects.get(slug=slug).delete()
        except:
            return Response({"error": "Slug bo'yicha ma'lumot topilmadi"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"message": "Deleted successfully"})


class InfoCompyuterApiView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, *args, **kwargs):
        all_compyuters = Compyuter.objects.filter(isActive=True).count()
        # all_compyuters_with_printer = Compyuter.objects.annotate(printer_count=Count('printer')).filter(printer_count__gt=0).count()
        # all_compyuters_with_scaner = Compyuter.objects.annotate(scaner_count=Count('scaner')).filter(scaner_count__gt=0).count()
        # all_compyuters_with_scaner = Compyuter.objects.annotate(type_webcamera_count=Count('type_webcamera')).filter(type_webcamera_count__gt=0).count()
        # all_compyuters_with_webcam = Compyuter.objects.annotate(model_webcam_count=Count('model_webcam')).filter(model_webcam_count__gt=0).count()
        # all_compyuters_with_scaner = Compyuter.objects.filter(scaner=True).count()

        all_compyuters_with_printer = Compyuter.objects.filter(isActive=True, printer__isnull=False).distinct().count()
        
        # Skaneri bor kompyuterlar soni (har bir kompyuter faqat bir marta hisoblanadi)
        all_compyuters_with_scaner = Compyuter.objects.filter(isActive=True, scaner__isnull=False).distinct().count()
        
        # Veb-kamerasi bor kompyuterlar soni (har bir kompyuter faqat bir marta hisoblanadi)
        all_compyuters_with_webcam = Compyuter.objects.filter(isActive=True, type_webcamera__isnull=False).distinct().count()

        # all_compyuters_with_webcam = Compyuter.objects.filter(type_webcamera__isnull=False).count()

    
        info = {
            "all_compyuters_count": all_compyuters,
            "all_compyuters_with_printer": all_compyuters_with_printer,
            "all_compyuters_with_scaner": all_compyuters_with_scaner,
            "all_compyuters_with_webcam": all_compyuters_with_webcam,
        }
        return Response(info)


class AddCompyuterApiView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def post(request, *args, **kwargs):
        print(request.user)

        request.data['addedUser'] = request.user.id
        print(request.data)
        serializer = AddCompyuterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FilterDataByIPApiView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def post(request, *args, **kwargs):
        # request'dan kelgan 'key' qiymatini olish
        key = request.data.get('key')
        
        # 'key' qiymatiga qarab filterlash
        if key == "Компьютеры":
            # Faol kompyuterlarni olish
            computers = Compyuter.objects.filter(isActive=True).distinct()
        
        elif key == "Принтеры":
            # Printeri bo'lgan kompyuterlarni olish va faqat bitta marta qaytarish
            computers = Compyuter.objects.filter(isActive=True, printer__isnull=False).distinct()
        
        elif key == "Сканеры":
            # Skaneri bo'lgan kompyuterlarni olish va faqat bitta marta qaytarish
            computers = Compyuter.objects.filter(isActive=True, scaner__isnull=False).distinct()
        
        elif key == "Веб-камеры":
            # Veb-kamerasi bo'lgan kompyuterlarni olish va faqat bitta marta qaytarish
            computers = Compyuter.objects.filter(isActive=True, type_webcamera__isnull=False).distinct()
        
        else:
            # Agar 'key'ning qiymati noto'g'ri bo'lsa, xato yoki bo'sh ro'yxat qaytarish
            return Response({"error": "Invalid key value"}, status=400)

        # Kompyuterlar ro'yxatini serializer orqali qaytarish
        serializer = CompyuterSerializer(computers, many=True)
        return Response(serializer.data)



class EditCompyuterApiView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def put(request, *args, **kwargs):
        instance = get_object_or_404(Compyuter, slug=kwargs.get('slug'))
        serializer = AddCompyuterSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetDataByIPApiView(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def get(request, *args, **kwargs):
        compyuter = get_object_or_404(Compyuter, ipadresss=kwargs.get('ip'))
        serializer = AddCompyuterSerializer(compyuter)
        return Response(serializer.data, status=status.HTTP_200_OK)


def upload_excel(request):
    if request.method == "POST" and request.FILES.get("file"):
        file = request.FILES["file"]
        try:
            import_computers_from_excel(file)
            messages.success(request, "✅ Excel ma'lumotlari yuklandi!")
        except Exception as e:
            messages.error(request, f"❌ Xatolik: {e}")
        return redirect("upload-excel")
    return render(request, "upload.html")
