import pandas as pd
from .models import Motherboard, CPU

def import_computers_from_excel(file_path):
    df = pd.read_excel(file_path)

    for _, row in df.iterrows():
        # Motherboard modeliga ma'lumotni yuklash (takrorlanish bo‘lmasligi uchun)
        motherboard, _ = Motherboard.objects.get_or_create(
            name=row["Производитель МП"]
        )

        # CPU modeliga ma'lumotni yuklash (takrorlanish bo‘lmasligi uchun)
        cpu, _ = CPU.objects.get_or_create(
            name=row["Процессор"]
        )

    print("✅ Excel ma'lumotlari bazaga yuklandi!")
