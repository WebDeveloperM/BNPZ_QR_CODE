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
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]

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
        program_with_license_and_systemic = ProgramSerializer(Program.objects.filter(license_type='license', type='systemic'), many=True).data
        program_with_license_and_additional = ProgramSerializer(Program.objects.filter(license_type='license', type='additional'), many=True).data
        program_with_no_license_and_systemic = ProgramSerializer(Program.objects.filter(license_type='no-license', type='systemic'), many=True).data
        program_with_no_license_and_additional = ProgramSerializer(Program.objects.filter(license_type='no-license', type='additional'), many=True).data


        print(program_with_license_and_systemic)
        print(program_with_license_and_additional)
        print(program_with_no_license_and_systemic)
        print(program_with_no_license_and_additional)
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
            'program_with_license_and_systemic': program_with_license_and_systemic,
            'program_with_license_and_additional':program_with_license_and_additional,
            'program_with_no_license_and_systemic':program_with_no_license_and_systemic,
            'program_with_no_license_and_additional':program_with_no_license_and_additional
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
        all_compyuters_with_printer = Compyuter.objects.filter(isActive=True, printer__isnull=False).distinct().count()
        all_compyuters_with_scaner = Compyuter.objects.filter(isActive=True, scaner__isnull=False).distinct().count()

        all_compyuters_with_webcam = Compyuter.objects.filter(isActive=True,
                                                              type_webcamera__isnull=False).distinct().count()
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


def get_or_create_model(model, field_name, value):
    if not value:
        return None
    obj, created = model.objects.get_or_create(**{field_name: value})
    return obj


# class GetTexnologyFromAgent(APIView):
#     permission_classes = [AllowAny]
#
#     def post(self, request, *args, **kwargs):
#         data = request.data
#         print(request.data)
#         ip_address = data.get("ipadresss")
#
#         if not ip_address:
#             return Response({"error": "IP manzil yetkazilmadi"}, status=400)
#
#         comp, created = Compyuter.objects.get_or_create(ipadresss=ip_address, defaults={
#             "user": data.get("user", ""),
#             "type_compyuter": self.get_or_none(TypeCompyuter, name=data.get("type_compyuter")),
#             "motherboard": self.get_or_none(Motherboard, name=data.get("motherboard")),
#             "motherboard_model": self.get_or_none(MotherboardModel, name=data.get("motherboard_model")),
#             "CPU": self.get_or_none(CPU, name=data.get("CPU")),
#             "generation": self.get_or_none(Generation, name=data.get("generation")),
#             "frequency": self.get_or_none(Frequency, name=data.get("frequency")),
#             "HDD": self.get_or_none(HDD, name=data.get("HDD (ST3500312CS)")),
#             "SSD": self.get_or_none(SSD, name=data.get("SSD (TEAML5Lite3D120G)")),
#             "disk_type": self.get_or_none(DiskType, name=data.get("disk_type")),
#             "RAM_type": self.get_or_none(RAMType, name=data.get("RAM_type")),
#             "RAMSize": self.get_or_none(RAMSize, name=data.get("RAMSize")),
#             "GPU": self.get_or_none(GPU, name=data.get("GPU")),
#             "mac_adress": data.get("mac_adress", ""),
#             "model_webcam": self.get_or_none(ModelWebCamera, name=data.get("model_webcam")),
#         })
#
#         # Agar kompyuter mavjud bo‘lsa, uni yangilaymiz
#         if not created:
#             comp.user = data.get("user", comp.user)
#             comp.type_compyuter = self.get_or_none(TypeCompyuter, name=data.get("type_compyuter")) or comp.type_compyuter
#             comp.motherboard = self.get_or_none(Motherboard, name=data.get("motherboard")) or comp.motherboard
#             comp.motherboard_model = self.get_or_none(MotherboardModel, name=data.get("motherboard_model")) or comp.motherboard_model
#             comp.CPU = self.get_or_none(CPU, name=data.get("CPU")) or comp.CPU
#             comp.generation = self.get_or_none(Generation, name=data.get("generation")) or comp.generation
#             comp.frequency = self.get_or_none(Frequency, name=data.get("frequency")) or comp.frequency
#             comp.HDD = self.get_or_none(HDD, name=data.get("HDD")) or comp.HDD
#             comp.SSD = self.get_or_none(SSD, name=data.get("SSD")) or comp.SSD
#             comp.disk_type = self.get_or_none(DiskType, name=data.get("disk_type")) or comp.disk_type
#             comp.RAM_type = self.get_or_none(RAMType, name=data.get("RAM_type")) or comp.RAM_type
#             comp.RAMSize = self.get_or_none(RAMSize, name=data.get("RAMSize")) or comp.RAMSize
#             comp.GPU = self.get_or_none(GPU, name=data.get("GPU")) or comp.GPU
#             comp.mac_adress = data.get("mac_adress", comp.mac_adress)
#             comp.model_webcam = self.get_or_none(ModelWebCamera, name=data.get("model_webcam")) or comp.model_webcam
#             comp.save()
#
#         # ManyToMany maydonlarini to'ldirish
#         self.update_many_to_many(comp.printer, Printer, data.get("printer"))
#         self.update_many_to_many(comp.scaner, Scaner, data.get("scaner"))
#         self.update_many_to_many(comp.type_webcamera, TypeWebCamera, data.get("type_webcamera"))
#         self.update_many_to_many(comp.type_monitor, Monitor, data.get("type_monitor"))
#
#         return Response({"message": "Compyuter ma'lumotlari yangilandi" if not created else "Yangi Compyuter yaratildi"})
#
#     @staticmethod
#     def get_or_none(model, name):
#         """ Model bo‘yicha obyektni olish yoki None qaytarish """
#         if not name:
#             return None
#         return model.objects.filter(name=name).first()
#
#     @staticmethod
#     def update_many_to_many(field, model, names):
#         """ ManyToManyField yangilash uchun yordamchi funksiya """
#         if names:
#             field.set(model.objects.filter(name__in=names.split(", ")))

from django.db import transaction


class GetTexnologyFromAgent(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        print(data)
        mac_address = data.get("mac_adress")

        if not mac_address:
            return Response({"error": "MAC address is required"}, status=400)

        with transaction.atomic():  # Ma'lumotlarni yaxlit kiritish uchun
            comp, created = Compyuter.objects.get_or_create(mac_adress=mac_address, defaults={})

            # Simple fields
            comp.user = data.get("user", comp.user)
            comp.ipadresss = data.get("ipadresss", comp.ipadresss)

            # ForeignKey fields (dynamic creation if not exists)
            fk_fields = {
                "type_compyuter": TypeCompyuter,
                "motherboard": Motherboard,
                "motherboard_model": MotherboardModel,
                "CPU": CPU,
                "generation": Generation,
                "frequency": Frequency,
                "SSD": SSD,
                "disk_type": DiskType,
                "RAM_type": RAMType,
                "RAMSize": RAMSize,
                "GPU": GPU,
                "model_webcam": ModelWebCamera,
            }

            for field, model in fk_fields.items():
                value = data.get(field)
                if value:
                    obj, _ = model.objects.get_or_create(name=value)
                    setattr(comp, field, obj)

            # ManyToMany fields (clear and add new)
            m2m_fields = {
                "printer": Printer,
                "scaner": Scaner,
                "type_webcamera": TypeWebCamera,
                "type_monitor": Monitor,
            }

            for field, model in m2m_fields.items():
                values = data.get(field, [])
                if isinstance(values, str):
                    values = [values]  # Convert single string to list

                if values:
                    objs = [model.objects.get_or_create(name=value)[0] for value in values]
                    getattr(comp, field).set(objs)

            comp.save()

        return Response({"message": "OK", "created": created})


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
