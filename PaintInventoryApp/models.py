from django.db import models


# Create your models here.
class PaintColor(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class PaintInventory(models.Model):
    color = models.ForeignKey(PaintColor, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0)
    status_choices = [
        ('AVAILABLE', 'Available'),
        ('RUNNING_LOW', 'Running Low'),
        ('OUT_OF_STOCK', 'Out of Stock'),
    ]
    status = models.CharField(max_length=20, choices=status_choices, default='AVAILABLE')

    def __str__(self):
        return f"{self.color.name} - {self.quantity} ({self.status})"
