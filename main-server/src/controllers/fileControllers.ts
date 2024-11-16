import { UploadedFile } from 'express-fileupload';
import { Request, Response } from 'express';
import axios from 'axios';
import FormData from 'form-data';

class FileController {
  public async uploadFile(req: Request, res: Response) {
    try {
      // Obtener el archivo PDF del req.files
      const pdfFile = req.files?.['fileInput'] as UploadedFile;

      const formData = new FormData();
      formData.append('file', pdfFile.data, pdfFile.name);
  
      // Enviar el archivo PDF al servidor FastAPI
      const response = await axios.post('http://localhost:3001/upload_pdf', formData, {
        headers: {
          ...formData.getHeaders(),
        }
      });
  
      // Pasar la respuesta del servidor FastAPI de vuelta al cliente
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al subir el archivo PDF');
    }
  }
}

export default new FileController();