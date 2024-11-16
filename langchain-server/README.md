# Pasos para levantar el servidor 

Tras clonar el repositorio seguir los siguientes pasos:

1. crear el archivo `.env` con las variables del `.env.example`:
```
MODEL=
FILE_PATH="src/docs/file.pdf"
```
Dentro de `MODEL` colocar el nombre del modelo a utilizar

2. Crear un entorno virtual y acceder a el:
```bash
virtualenv venv
source venv/Scripts/activate
```

3. Instalar las dependencias:
```bash
pip install -r requirements.txt
```

4. Levantar el servidor en el puerto `3001`:
```bash
fastapi dev --port 3001 main.py
```