# Generated by Django 4.2 on 2025-03-11 05:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Инвентаризация', '0014_alter_compyuter_program'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProgramLicense',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('license_pdf', models.FileField(upload_to='', verbose_name='Лицензии PDF')),
                ('begin_date', models.DateField(verbose_name='Дата начала лицензии')),
                ('finish_date', models.DateField(verbose_name='Дата окончания лицензии')),
            ],
        ),
        migrations.RemoveField(
            model_name='program',
            name='license',
        ),
        migrations.RemoveField(
            model_name='program',
            name='license_date',
        ),
        migrations.RemoveField(
            model_name='program',
            name='license_pdf',
        ),
        migrations.AddField(
            model_name='program',
            name='license_type',
            field=models.CharField(choices=[('license', 'Лицензированный'), ('no-license', 'Не лицензированный')], default=1, max_length=255, verbose_name='Cтатус лицензии'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='program',
            name='license_data',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='Инвентаризация.programlicense', verbose_name='Инфо лицензии'),
            preserve_default=False,
        ),
    ]
