from django.db import models

# Create your models here.
class Clientes(models.Model):
    idcliente = models.AutoField(primary_key=True)
    clienteNom= models.CharField(max_length=50)
    clienteApel = models.CharField(max_length=50)
    clienteTel = models.CharField(max_length=10)
    clienteCor= models.CharField(max_length=100)
    clienteEst= models.CharField(max_length=20)
    def __str__(self):
        return f"{self.clienteNom} (${self.clienteApel})"
    