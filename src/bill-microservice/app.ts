import express, { Application, Request, Response } from 'express';
import { FacturaController } from './application/controllers/factura.controller';
import { FacturaService } from './domain/services/factura.service';
import { UserMicroserviceService } from './infrastructure/external-services/user-microservice.service';
import { createInterface } from 'readline';

const app: Application = express();
const port = process.env.PORT || 3001;

// Configura middleware y enrutadores
app.use(express.json());

// Configura dependencias
const userMicroserviceService = new UserMicroserviceService();
const facturaService = new FacturaService(userMicroserviceService)
const facturaController = new FacturaController(facturaService);

// Configura la interfaz de línea de comandos para leer el CI desde la consola
/*const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});*/

// Rutas
app.post('/bill', async (req: Request, res: Response) => {
  /*try {
      // Cierra la interfaz readline después de recibir la solicitud POST
      // Obtiene el CI desde la consola
      const ci: number = await new Promise<number>((resolve) => {
        rl.question('Ingrese el número de CI: ', (ciInput) => {
          // Procesa el número de CI (podrías realizar la conversión si es necesario)
          const ciNumber: number = parseInt(ciInput, 10);
          resolve(ciNumber);
        });
      });
      rl.close();
      // Crea la factura a partir del CI
      const factura = await facturaController.crearFactura(ci,res);

      // Responde con la factura creada
      res.json(factura);
  } catch (error:any) {
    // Maneja los errores
    console.error('Error al procesar la solicitud:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }*/
  try {
    // Asumiendo que el JSON se proporciona en el cuerpo de la solicitud
    const data = req.body;

    // Puedes hacer operaciones adicionales con el JSON según tus necesidades

    // Llama al controlador para crear la factura
    const response = await facturaController.crearFactura(data,res);

    res.json(response);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Microservicio Bill escuchando en el puerto ${port}`);
});

