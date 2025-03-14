# Generated by Django 4.2 on 2025-03-11 04:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Инвентаризация', '0012_compyuter_bg_image_alter_compyuter_printer_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Program',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('license', models.CharField(choices=[('license', 'Лицензированный'), ('no-license', 'Не лицензированный')], max_length=255, verbose_name='Лицензии')),
                ('license_pdf', models.FileField(upload_to='', verbose_name='Лицензии PDF')),
                ('license_date', models.DateField(verbose_name='Лицензии Дате')),
                ('type', models.CharField(choices=[('systemic', 'Системная'), ('additional', 'Дополнительные')], max_length=255, verbose_name='Тип программы')),
                ('title', models.CharField(max_length=255, verbose_name='Название программы')),
                ('version', models.CharField(max_length=255, verbose_name='Версия программы')),
            ],
            options={
                'verbose_name': 'Программа ',
                'verbose_name_plural': 'Программа',
            },
        ),
        migrations.AddField(
            model_name='compyuter',
            name='program',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='Инвентаризация.program', verbose_name='Программы'),
        ),
    ]
