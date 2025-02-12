from django.urls import path
from Инвентаризация.views import *

urlpatterns = [           
    path("all_compyuters/", CoreApiView.as_view()),           
    path("all_texnology/", TexnologyApiView.as_view()),           
    path("comp_detail/<slug:slug>", CompDetailApiView.as_view()), 
    path("comp_delete/<slug:slug>", CompDeleteApiView.as_view()), 
    path("info-comp/", InfoCompyuterApiView.as_view()),
    path("get-data/", upload_excel, name="upload-excel"),



]

