import React, { useState } from 'react';
import Papa from 'papaparse';
import { commerceService } from '../../api/commerceService';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const onFileChange = (e) => {
    const f = e.target.files[0];
    // --- VALIDACIÓN DE EXTENSIÓN ---
    const fileName = f.name;
    const fileExtension = fileName.split('.').pop().toLowerCase();

    if (fileExtension !== 'csv') {
      alert("❌ Error: Solo se permiten archivos con extensión .csv");
      e.target.value = ""; // Limpia el input para que no quede el archivo inválido
      setFile(null);
      setPreview([]);
      return;
    }

    // --- OPCIONAL: VALIDAR QUE EMPIECE CON 'commerce_' ---
    if (!fileName.startsWith('commerce_')) {
      alert("❌ Error: El archivo debe comenzar con 'commerce_' (ej: commerce_15012024.csv)");
      e.target.value = "";
      setFile(null);
      return;
    }

    if (f) {
      setFile(f);
      Papa.parse(f, {
        header: true, skipEmptyLines: true, delimiter: ";",
        complete: (p) => setPreview(p.data.slice(-10)) // Últimos 10
      });
    }
  };

  const handleSend = async () => {
    const ok = await commerceService.upload(file);
    if (ok) { alert("Subido con éxito"); setShowModal(false); }
  };

  return (
    <div className="card m-3 p-3 shadow-sm">
      <h5>1. Cargar Archivo (.csv)</h5>
      <input type="file" className="form-control mb-2" accept=".csv" onChange={onFileChange} />
      <button className="btn btn-primary" onClick={() => setShowModal(true)} disabled={!file}>
        Previsualizar y Enviar
      </button>

      {showModal && (
        <div className="modal d-block" style={{background:'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">Confirmar Datos (Últimos 10)</div>
              <div className="modal-body overflow-auto" style={{maxHeight:'400px'}}>
                <table className="table table-sm small">
                  <thead><tr>{Object.keys(preview[0] || {}).map(k => <th key={k}>{k}</th>)}</tr></thead>
                  <tbody>{preview.map((r, i) => <tr key={i}>{Object.values(r).map((v, j) => <td key={j}>{v}</td>)}</tr>)}</tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button className="btn btn-success" onClick={handleSend}>Confirmar Subida</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default FileUpload;