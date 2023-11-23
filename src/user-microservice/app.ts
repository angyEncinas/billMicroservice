
import express, { Application, Request, Response } from 'express';

const app: Application = express();
const port = process.env.PORT || 3002;

const usuarios = [
  { name: 'TTTT', lastname: 'Usuario 1', mail: 'usuario1@example.com',ci: 124},
  { name: 'T55', lastname: 'Usuario 2', mail: 'usuario2@example.com',ci: 1256},

];

app.use(express.json());

app.get('/usuarios/:ci', (req: Request, res: Response) => {
  const userCi: number = parseInt(req.params.ci, 10);
  const usuario = usuarios.find((user) => user.ci === userCi);

  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

app.get('/usuarios', (req: Request, res: Response) => {
  res.json(usuarios);
});

app.listen(port, () => {
  console.log(`User Microservice is running at http://localhost:${port}`);
});
