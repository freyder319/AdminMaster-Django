from django.db import models

# Create your models here.

class Proveedor(models.Model):
    id_proveedor = models.AutoField(primary_key=True) 
    nombre_proveedor = models.CharField(max_length=50)
    apellido_proveedor = models.CharField(max_length=50)
    telefono_proveedor = models.CharField(max_length=15)
    correo_proveedor = models.CharField(max_length=255)
    estado_proveedor = models.CharField(max_length=20)

    def __str__(self):
        return self.nombre_proveedor