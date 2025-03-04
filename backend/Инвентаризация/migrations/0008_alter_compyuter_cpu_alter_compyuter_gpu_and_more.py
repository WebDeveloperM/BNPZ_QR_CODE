# Generated by Django 4.2 on 2025-02-27 06:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Инвентаризация', '0007_alter_compyuter_gpu_alter_compyuter_addeduser_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='compyuter',
            name='CPU',
            field=models.ForeignKey(default='Нет', on_delete=django.db.models.deletion.CASCADE, to='Инвентаризация.cpu', verbose_name='Процессор'),
        ),
        migrations.AlterField(
            model_name='compyuter',
            name='GPU',
            field=models.ForeignKey(default='Нет', on_delete=django.db.models.deletion.CASCADE, to='Инвентаризация.gpu', verbose_name='Видеокарта'),
        ),
        migrations.AlterField(
            model_name='compyuter',
            name='HDD',
            field=models.ForeignKey(default='Нет', on_delete=django.db.models.deletion.CASCADE, to='Инвентаризация.hdd', verbose_name='Диск  HDD'),
        ),
        migrations.AlterField(
            model_name='compyuter',
            name='RAMSize',
            field=models.ForeignKey(default='Нет', on_delete=django.db.models.deletion.CASCADE, to='Инвентаризация.ramsize', verbose_name='Размер оперативной памяти'),
        ),
        migrations.AlterField(
            model_name='compyuter',
            name='RAM_type',
            field=models.ForeignKey(default='Нет', on_delete=django.db.models.deletion.CASCADE, to='Инвентаризация.ramtype', verbose_name='Тип оперативки'),
        ),
        migrations.AlterField(
            model_name='compyuter',
            name='SSD',
            field=models.ForeignKey(default='Нет', on_delete=django.db.models.deletion.CASCADE, to='Инвентаризация.ssd', verbose_name='Диск  SSD'),
        ),
        migrations.AlterField(
            model_name='compyuter',
            name='disk_type',
            field=models.ForeignKey(default='Нет', on_delete=django.db.models.deletion.CASCADE, to='Инвентаризация.disktype', verbose_name='Тип диска'),
        ),
        migrations.AlterField(
            model_name='compyuter',
            name='frequency',
            field=models.ForeignKey(default='Нет', on_delete=django.db.models.deletion.CASCADE, to='Инвентаризация.frequency', verbose_name='Частота процессора'),
        ),
        migrations.AlterField(
            model_name='compyuter',
            name='generation',
            field=models.ForeignKey(default='Нет', on_delete=django.db.models.deletion.CASCADE, to='Инвентаризация.generation', verbose_name='Поколение процессора'),
        ),
        migrations.AlterField(
            model_name='compyuter',
            name='ipadresss',
            field=models.CharField(default='Нет', max_length=255, verbose_name='IPv4 адрес'),
        ),
        migrations.AlterField(
            model_name='compyuter',
            name='mac_adress',
            field=models.CharField(default='Нет', max_length=255, verbose_name='Физический(MAC) адрес'),
        ),
        migrations.AlterField(
            model_name='compyuter',
            name='model_webcam',
            field=models.ForeignKey(default='Нет', on_delete=django.db.models.deletion.CASCADE, to='Инвентаризация.modelwebcamera', verbose_name='Модель вебкамеры'),
        ),
        migrations.AlterField(
            model_name='compyuter',
            name='motherboard',
            field=models.ForeignKey(default='Нет', on_delete=django.db.models.deletion.CASCADE, to='Инвентаризация.motherboard', verbose_name='Производитель МП'),
        ),
        migrations.AlterField(
            model_name='compyuter',
            name='motherboard_model',
            field=models.ForeignKey(default='Нет', on_delete=django.db.models.deletion.CASCADE, to='Инвентаризация.motherboardmodel', verbose_name='Модель МП'),
        ),
        migrations.AlterField(
            model_name='compyuter',
            name='printer',
            field=models.ManyToManyField(default='Нет', related_name='printer', to='Инвентаризация.printer', verbose_name='Принтеры'),
        ),
        migrations.AlterField(
            model_name='compyuter',
            name='scaner',
            field=models.ManyToManyField(default='Нет', related_name='scaner', to='Инвентаризация.scaner', verbose_name='Сканеры'),
        ),
        migrations.AlterField(
            model_name='compyuter',
            name='signature',
            field=models.ImageField(upload_to='signature/'),
        ),
        migrations.AlterField(
            model_name='compyuter',
            name='type_compyuter',
            field=models.ForeignKey(default='Нет', on_delete=django.db.models.deletion.CASCADE, to='Инвентаризация.typecompyuter', verbose_name='Тип орг.техники'),
        ),
        migrations.AlterField(
            model_name='compyuter',
            name='type_monitor',
            field=models.ManyToManyField(default='Нет', related_name='typeMonitor', to='Инвентаризация.monitor', verbose_name='Тип Монитора'),
        ),
        migrations.AlterField(
            model_name='compyuter',
            name='type_webcamera',
            field=models.ManyToManyField(default='Нет', related_name='typeCamera', to='Инвентаризация.typewebcamera', verbose_name='Тип вебкамера'),
        ),
        migrations.AlterField(
            model_name='compyuter',
            name='warehouse_manager',
            field=models.ForeignKey(default='Нет', on_delete=django.db.models.deletion.CASCADE, to='Инвентаризация.warehousemanager', verbose_name='Зав. склада'),
        ),
    ]
