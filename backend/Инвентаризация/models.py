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
    name = models.CharField(max_length=255, default="Нет", verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Диск  HDD '
        verbose_name_plural = '1.7 Диск  HDD'


class SSD(models.Model):
    name = models.CharField(max_length=255, default="Нет", verbose_name='Название')

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
    type_compyuter = models.ForeignKey(TypeCompyuter, on_delete=models.CASCADE, verbose_name='Тип орг.техники')
    motherboard = models.ForeignKey(Motherboard, on_delete=models.CASCADE, verbose_name='Производитель МП')
    motherboard_model = models.ForeignKey(MotherboardModel, on_delete=models.CASCADE, verbose_name='Модель МП')
    CPU = models.ForeignKey(CPU, on_delete=models.CASCADE, verbose_name='Процессор')
    generation = models.ForeignKey(Generation, on_delete=models.CASCADE, verbose_name='Поколение процессора')
    frequency = models.ForeignKey(Frequency, on_delete=models.CASCADE, verbose_name='Частота процессора')
    HDD = models.ForeignKey(HDD, on_delete=models.CASCADE, verbose_name='Диск  HDD')
    SSD = models.ForeignKey(SSD, on_delete=models.CASCADE, verbose_name='Диск  SSD')
    disk_type = models.ForeignKey(DiskType, on_delete=models.CASCADE, default="Нет", verbose_name='Тип диска')
    RAM_type = models.ForeignKey(RAMType, on_delete=models.CASCADE, default="Нет", verbose_name='Тип оперативки')
    RAMSize = models.ForeignKey(RAMSize, on_delete=models.CASCADE, verbose_name='Размер оперативной памяти')
    GPU = models.ForeignKey(GPU, on_delete=models.CASCADE, verbose_name='Видеокарта', null=True, blank=True,
                            default='Нет')
    ipadresss = models.CharField(max_length=255, verbose_name='IPv4 адрес', null=True, blank=True)
    mac_adress = models.CharField(max_length=255, verbose_name='Физический(MAC) адрес', null=True, blank=True)
    printer = models.ManyToManyField(Printer, blank=True, verbose_name='Принтеры', related_name="printer")
    scaner = models.ManyToManyField(Scaner, blank=True, verbose_name='Сканеры', related_name="scaner")
    type_webcamera = models.ManyToManyField(TypeWebCamera, blank=True, related_name="typeCamera",
                                            verbose_name='Тип вебкамера')
    model_webcam = models.ForeignKey(ModelWebCamera, on_delete=models.CASCADE, default="Нет",
                                     verbose_name='Модель вебкамеры', null=True, blank=True)
    type_monitor = models.ManyToManyField(Monitor, blank=True, related_name="typeMonitor", verbose_name='Тип Монитора')

    qr_image = models.ImageField(upload_to='qr_codes/', verbose_name='QR-код', null=True, blank=True)
    signature = models.ImageField(upload_to='signature/', verbose_name='Подпись', null=True, blank=True)
    joinDate = models.DateTimeField(auto_now=True, null=False, verbose_name="Дате")
    addedUser = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Сотрудник")
    updatedUser = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True,
                                    related_name="updated_computers", verbose_name="Изменил")
    updatedAt = models.DateTimeField(auto_now=True, verbose_name="Дата изменения")

    slug = models.SlugField(unique=True, blank=True)
    isActive = models.BooleanField(default=True)

    def __str__(self):
        return self.user

    def generate_qr(self):
        """Генерация QR-кода на основе поля id."""
        if self.slug and not self.qr_image:  # Проверяем, существует ли id
            qr = qrcode.QRCode(
                version=1,
                error_correction=qrcode.constants.ERROR_CORRECT_L,
                box_size=10,
                border=4,
            )
            qr.add_data(f"https://back.bnpz.uz/{str(self.slug)}")
            qr.make(fit=True)

            # Создание изображения QR-кода
            img = qr.make_image(fill_color="black", back_color="white")
            buffer = BytesIO()
            img.save(buffer, format="PNG")
            buffer.seek(0)

            # Сохранение изображения в поле qr_image
            file_name = f"qr_code_{self.slug}.png"
            self.qr_image.save(file_name, ContentFile(buffer.read()), save=False)

            return buffer.getvalue()  # Возвращаем QR-код как байтовый объект
        return None

    def save(self, *args, **kwargs):

        user = CurrentUserMiddleware.get_current_user()  # Hozirgi foydalanuvchini olish
        print(user, "222222222222222222")
        if user and user.is_authenticated:
            self.updatedUser = user  # O‘zgartirgan foydalanuvchini qo‘shish
        super().save(*args, **kwargs)

        # Если объект еще не сохранен (нет id), сохраняем его сначала
        if not self.pk:  # Проверяем, есть ли первичный ключ
            super().save(*args, **kwargs)  # Сохраняем объект для получения id

        # Генерируем QR-код только после получения id
        if not self.qr_image:  # Проверяем, не существует ли уже QR-кода
            self.generate_qr()  # Генерация QR-кода
            super().save(update_fields=["qr_image"])  # Сохраняем только поле qr_image

        if not self.slug:
            self.slug = slugify(f"{self.seal_number}-{self.joinDate}")
            super().save(*args, **kwargs)
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Компьютеры '
        verbose_name_plural = 'Компьютеры'
