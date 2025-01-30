from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework import status
from .models import *
from .serializers import *

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class TexnologyApiView(APIView):
    def get(request, *args, **kwargs):
            departament = DepartmentSerializer(Department.objects.all(), many=True).data
            warehouse_manager = WarehouseManagerSerializer(WarehouseManager.objects.all(), many=True).data
            type_compyuter = TypeCompyuterSerializer(TypeCompyuter.objects.all(), many=True).data
            motherboard = MotherboardModelSerializer(Motherboard.objects.all(), many=True).data
            motherboard_model = MotherboardModelSerializer(MotherboardModel.objects.all(), many=True).data
            cpu = CPUSerializer(CPU.objects.all(), many=True).data
            generation = GenerationSerializer(Generation.objects.all(), many=True).data
            frequency = FrequencySerializer(Frequency.objects.all(), many=True).data
            frequency = HDDSerializer(HDD.objects.all(), many=True).data
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
            diaganal_monitor = MonitorDiaganalSerializer(MonitorDiaganal.objects.all(), many=True).data

            data = {
                 'departament' : departament,
                 'warehouse_manager' : warehouse_manager,
                 'type_compyuter' : type_compyuter,
                 'motherboard' : motherboard,
                 'motherboard_model' : motherboard_model,
                 'cpu' : cpu,
                 'generation' : generation,
                 'frequency' : frequency,
                 'ssd' : ssd,
                 'disk_type' : disk_type,
                 'ram_type' : ram_type,
                 'ram_size' : ram_size,
                 'gpu' : gpu,
                 'printer' : printer,
                 'scaner' : scaner,
                 'type_webcamera' : type_webcamera,
                 'model_webcam' : model_webcam,
                 'type_monitor' : type_monitor,
                 'diaganal_monitor' : diaganal_monitor,
            }
            
            return Response(data)
    

class CoreApiView(APIView):
    def get(request, *args, **kwargs):
            compyuters = Compyuter.objects.all()
            serializer = CompyuterSerializer(compyuters, many=True)
            return Response(serializer.data)
    

class CompDetailApiView(APIView):
    def get(request, *args, **kwargs):
            print(request)
            print(args, 11111)
            print(kwargs, 22222222)
            slug = kwargs.get('slug')

            if not slug:
                return Response({"error": "Slug not found"}, status=status.HTTP_400_BAD_REQUEST)
            try:
                compyuter = Compyuter.objects.get(slug=slug)
                
            except:
                return Response({"error": "Slug bo'yicha ma'lumot topilmadi"}, status=status.HTTP_404_NOT_FOUND)



            print(compyuter, "55555555555")
            serializer = CompyuterSerializer(compyuter)
            return Response(serializer.data)


