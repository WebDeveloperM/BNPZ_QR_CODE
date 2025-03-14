# Generated by Django 4.2 on 2025-02-12 04:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Инвентаризация', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='compyuter',
            name='updatedAt',
            field=models.DateTimeField(auto_now=True, verbose_name='Дата изменения'),
        ),
        migrations.AddField(
            model_name='compyuter',
            name='updatedUser',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='updated_computers', to=settings.AUTH_USER_MODEL, verbose_name='Изменил'),
        ),
    ]
