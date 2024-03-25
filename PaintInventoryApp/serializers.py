from rest_framework import serializers
from .models import PaintInventory


class PaintInventorySerializer(serializers.ModelSerializer):
    color_name = serializers.CharField(source='color.name', read_only=True)

    class Meta:
        model = PaintInventory
        fields = ['pk', 'color', 'quantity', 'status', 'color_name']