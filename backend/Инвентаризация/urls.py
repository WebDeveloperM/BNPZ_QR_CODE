from django.urls import path
from Инвентаризация.views import *

urlpatterns = [           
    path("all_compyuters/", CoreApiView.as_view()),           
    path("all_texnology/", TexnologyApiView.as_view()),           
    path('login/', LoginView.as_view(), name='login'),
    

]

