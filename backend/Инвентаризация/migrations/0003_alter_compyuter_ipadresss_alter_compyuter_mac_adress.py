# Generated by Django 4.2 on 2025-02-12 05:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Инвентаризация', '0002_compyuter_updatedat_compyuter_updateduser'),
    ]

    operations = [
        migrations.AlterField(
            model_name='compyuter',
            name='ipadresss',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='IPv4 адрес'),
        ),
        migrations.AlterField(
            model_name='compyuter',
            name='mac_adress',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Физический(MAC) адрес'),
        ),
    ]
