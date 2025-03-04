from django.db import models
from io import BytesIO
from django.core.files.base import ContentFile
import qrcode
from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify
from crum import get_current_user

from Инвентаризация.middleware import CurrentUserMiddleware


class Department(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название цеха')
    boss_fullName = models.CharField(max_length=255, verbose_name='Руководитель цеха')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Цех '
        verbose_name_plural = 'Цех'


class WarehouseManager(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Зав. склада '
        verbose_name_plural = '1.1 Зав. склада'


class TypeCompyuter(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Тип орг.техники '
        verbose_name_plural = '1.1 Тип орг.техники'


class Motherboard(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Производитель МП '
        verbose_name_plural = '1.2 Производитель МП'


class MotherboardModel(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Модель МП '
        verbose_name_plural = '1.3 Модель МП'


class CPU(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Процессор '
        verbose_name_plural = '1.4 Процессор'


class Generation(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Поколение процессора '
        verbose_name_plural = '1.5 Поколение процессора'


class Frequency(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Частота процессора '
        verbose_name_plural = '1.6 Частота процессора'


class HDD(models.Model):
    name = models.CharField(max_length=255, default=None, verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Диск  HDD '
        verbose_name_plural = '1.7 Диск  HDD'


class SSD(models.Model):
    name = models.CharField(max_length=255, default=None, verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Диск  SSD '
        verbose_name_plural = '1.8 Диск  SSD'


class RAMSize(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Размер оперативной памяти '
        verbose_name_plural = '1.9 Размер оперативной памяти'


class GPU(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Видеокарта '
        verbose_name_plural = '2 Видеокарта'


class Printer(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Принтер '
        verbose_name_plural = '2.1 Принтер'


class Scaner(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Сканер '
        verbose_name_plural = '2.2 Сканер'


class TypeWebCamera(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Тип вебкамера '
        verbose_name_plural = '2.3 Тип вебкамера'


class ModelWebCamera(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Модель вебкамеры '
        verbose_name_plural = '2.4 Модель вебкамеры'


class Monitor(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Монитор '
        verbose_name_plural = '2.5 Монитор'


class DiskType(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Тип диска '
        verbose_name_plural = '2.5 Тип диска'


class RAMType(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Тип оперативки '
        verbose_name_plural = '2.5 Тип оперативки'


class Compyuter(models.Model):
    seal_number = models.CharField(max_length=255, verbose_name='Номер пломбы')
    departament = models.ForeignKey('Department', on_delete=models.CASCADE)
    user = models.CharField(max_length=255, verbose_name='Пользователь')
    warehouse_manager = models.ForeignKey(WarehouseManager, on_delete=models.CASCADE, verbose_name='Зав. склада')
    type_compyuter = models.ForeignKey(TypeCompyuter, on_delete=models.CASCADE, verbose_name='Тип орг.техники',
                                       default=None)
    motherboard = models.ForeignKey(Motherboard, on_delete=models.CASCADE, verbose_name='Производитель МП',
                                    default=None)
    motherboard_model = models.ForeignKey(MotherboardModel, on_delete=models.CASCADE, verbose_name='Модель МП',
                                          default=None)
    CPU = models.ForeignKey(CPU, on_delete=models.CASCADE, verbose_name='Процессор', default=None)
    generation = models.ForeignKey(Generation, on_delete=models.CASCADE, verbose_name='Поколение процессора',
                                   default=None)
    frequency = models.ForeignKey(Frequency, on_delete=models.CASCADE, verbose_name='Частота процессора', default=None)
    HDD = models.ForeignKey(HDD, on_delete=models.CASCADE, verbose_name='Диск  HDD')
    SSD = models.ForeignKey(SSD, on_delete=models.CASCADE, verbose_name='Диск  SSD')
    disk_type = models.ForeignKey(DiskType, on_delete=models.CASCADE, verbose_name='Тип диска')
    RAM_type = models.ForeignKey(RAMType, on_delete=models.CASCADE, verbose_name='Тип оперативки', default=None)
    RAMSize = models.ForeignKey(RAMSize, on_delete=models.CASCADE, verbose_name='Размер оперативной памяти',
                                default=None)
    GPU = models.ForeignKey(GPU, on_delete=models.CASCADE, verbose_name='Видеокарта', default=None)
    ipadresss = models.CharField(max_length=255, verbose_name='IPv4 адрес', default=None)
    mac_adress = models.CharField(max_length=255, verbose_name='Физический(MAC) адрес', default=None)
    printer = models.ManyToManyField(Printer, verbose_name='Принтеры', related_name="printer")
    scaner = models.ManyToManyField(Scaner, verbose_name='Сканеры', related_name="scaner")
    type_webcamera = models.ManyToManyField(TypeWebCamera, related_name="typeCamera",
                                            verbose_name='Тип вебкамера')
    model_webcam = models.ForeignKey(ModelWebCamera, on_delete=models.CASCADE, verbose_name='Модель вебкамеры')
    type_monitor = models.ManyToManyField(Monitor, related_name="typeMonitor", verbose_name='Тип Монитора',
                                          default=None)
    qr_image = models.ImageField(upload_to='qr_codes/', verbose_name='QR-код', )
    signature = models.ImageField(upload_to='signature/')
    joinDate = models.DateTimeField(auto_now=True, null=False, verbose_name="Дате")
    addedUser = models.ForeignKey(User, on_delete=models.SET_NULL, verbose_name="Сотрудник", null=True)
    updatedUser = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="updated_computers",
                                    verbose_name="Изменил", null=True)
    updatedAt = models.DateTimeField(auto_now=True, verbose_name="Дата изменения")

    slug = models.SlugField(unique=True, blank=True)
    isActive = models.BooleanField(default=True)

    def __str__(self):
        return self.user

    def save(self, *args, **kwargs):
        user = CurrentUserMiddleware.get_current_user()  # Hozirgi foydalanuvchini olish
        if user and user.is_authenticated:
            self.updatedUser = user  # O‘zgartirgan foydalanuvchini qo‘shish

        # Slug va QR kodni yaratishdan oldin saqlash
        if not self.slug:  # Agar `id` bo‘lmasa, birinchi marta saqlash
            # Slug maydonini yangilash
            if not self.slug:
                self.slug = slugify(f"computer-{self.seal_number}")

            super().save(*args, **kwargs)  # Birinchi marta saqlash

    #
    #     # Generatsiya qilgan QR kodini saqlash
    #     if not self.qr_image:
    #         self.generate_qr()
    #         super().save(update_fields=["qr_image"])  # Faqat `qr_image`ni yangilash
    #
    #     # Oxirgi saqlash: agar boshqa o‘zgarishlar bo‘lsa
    #     super().save(*args, **kwargs)  # Faqat oxirgi safar saqlanadi

    def save(self, *args, **kwargs):
        user = CurrentUserMiddleware.get_current_user()  # Hozirgi foydalanuvchini olish
        if user and user.is_authenticated:
            self.updatedUser = user

        if not self.slug:  # Agar slug yo'q bo'lsa, yaratilsin
            self.slug = slugify(f"computers-{self.seal_number}")

        if not self.qr_image:  # Agar qr_image mavjud bo'lmasa, yaratilsin
            self.generate_qr()

        super().save(*args, **kwargs)  # Oxirgi saqlash

    def generate_qr(self):
        """QR-kodni yaratish va uni rasm sifatida saqlash."""
        if self.seal_number:  # Slug mavjud bo'lsa, QR-kodni yaratish
            qr = qrcode.QRCode(
                version=1,
                error_correction=qrcode.constants.ERROR_CORRECT_L,
                box_size=10,
                border=4,
            )
            qr.add_data(f"http://192.168.2.72:5173/view-computer/{self.slug}")
            qr.make(fit=True)

            # QR-kodni rasmga aylantirish
            img = qr.make_image(fill_color="black", back_color="white")
            buffer = BytesIO()
            img.save(buffer, format="PNG")
            buffer.seek(0)

            # Rasmni saqlash
            file_name = f"qr_code_{self.slug}.png"
            self.qr_image.save(file_name, ContentFile(buffer.read()), save=False)

    class Meta:
        verbose_name = 'Компьютеры '
        verbose_name_plural = 'Компьютеры'


from rest_framework import serializers, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes


class ComputerAgent(models.Model):
    username = models.CharField(max_length=100)
    ip_address = models.GenericIPAddressField()
    mac_address = models.CharField(max_length=17)
    cpu_info = models.CharField(max_length=255)
    ram_size = models.CharField(max_length=50)
    hdd_size = models.CharField(max_length=50)
    ssd_size = models.CharField(max_length=50, blank=True, null=True)
    gpu_info = models.CharField(max_length=255, blank=True, null=True)
    printer_info = models.CharField(max_length=255, blank=True, null=True)
    scanner_info = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} - {self.ip_address}"


class ComputerAgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComputerAgent
        fields = '__all__'


class ComputerViewSet(viewsets.ModelViewSet):
    queryset = ComputerAgent.objects.all()
    serializer_class = ComputerAgentSerializer


from rest_framework.permissions import AllowAny


@api_view(['POST'])
@permission_classes([AllowAny])  # Barcha foydalanuvchilar uchun ruxsat berish
def register_computer(request):
    mac_address = request.data.get("mac_address")  # MAC orqali tekshiramiz
    if not mac_address:
        return Response({"error": "MAC address required"}, status=400)

    computer, created = ComputerAgent.objects.update_or_create(
        mac_address=mac_address,  # Unikal maydon
        defaults=request.data  # Barcha maydonlarni yangilash
    )

    message = "Computer registered successfully" if created else "Computer updated successfully"
    return Response({"message": message}, status=201 if created else 200)
