import React, { useState } from 'react';
import { commerceService } from '../../api/commerceService';

const ProcessData = () => {
  const [date, setDate] = useState('');

  const handleProcess = async () => {
    const res = await commerceService.processValidation(date);
    alert(`Procesados: ${res.registros_quarantine} errores encontrados.`);
  };

  return (
    <div className="card m-3 p-3 shadow-sm">
      <h5>2. Procesar Validación</h5>
      <input type="date" className="form-control mb-2" onChange={(e) => setDate(e.target.value)} />
      <button className="btn btn-info text-white" onClick={handleProcess} disabled={!date}>Ejecutar Proceso</button>
    </div>
  );
};
export default ProcessData;