import { FC, useState } from "react"
import styles from './modal.module.css'
import axios from 'axios'

interface Props {
  showModalHandler: () => void
}

export const Modal:FC<Props> = ({ showModalHandler }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event:any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }
    const formData = new FormData();
    formData.append('fileInput', selectedFile);
    axios.post('http://localhost:3000/chat/upload_pdf', formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Carga el PDF con el que quieres que el chatbot te responda</h2>
        <div className={`${styles.input}`}>
          <label htmlFor="file-input">Seleccionar PDF</label>
          <input name="fileInput" type="file" id="file-input" onChange={handleFileUpload} />
        </div>
        <button onClick={handleUpload}>Cargar PDF</button>
        <button onClick={showModalHandler}>Cerrar</button>
      </div>
    </div>
  )
}
