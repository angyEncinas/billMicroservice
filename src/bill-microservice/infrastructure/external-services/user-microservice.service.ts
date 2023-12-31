import axios from 'axios';

export class UserMicroserviceService {
  async obtenerUsuarioPorId(ci: number): Promise<any> {
    try {
      const response = await axios.get(`http://localhost:3000/api/user/${ci}`);
      return response.data;
    } catch (error:any) {
      throw new Error(`Error al obtener el usuario del servicio externo: ${error.message}`);
    }
  }
}
