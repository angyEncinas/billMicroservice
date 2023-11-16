import { Request, Response } from 'express';
import { FacturaService } from '../../domain/services/factura.service';

export class FacturaController {
  private facturaService: FacturaService;

  constructor(facturaService: FacturaService) {
    this.facturaService = facturaService;
  }

  async crearFactura(req: number, res: Response): Promise<void> {
    try {
      const userCi = req;
      const factura = await this.facturaService.crearFactura(userCi);

      res.status(201).json(factura);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }
}


