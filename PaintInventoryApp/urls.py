from django.urls import path
from .views import *

urlpatterns = [
    path('view_paint_inventory/', ViewPaintInventory.as_view(), name='view_paint_inventory'),
    path('update_paint_inventory/<int:pk>/', UpdatePaintInventory.as_view(), name='update_paint_inventory'),
    path('api/token/', LoginView.as_view(), name='token_obtain_pair'),
    path('logout/',LogoutView.as_view(),name='logout'),
    path('view_user_details/',UserDetails.as_view(),name='view_user_details')
]
