import React, { useState } from 'react';
import { commerceService } from '../../api/commerceService';

const QuarantineList = () => {
  const [errors, setErrors] = useState([]);
  const [open, setOpen] = useState(false);

  const loadErrors = async () => {
    const data = await commerceService.getQuarentine();
    setErrors(data.slice(-10)); // Los últimos 10 con errores
    setOpen(true);
  };

  return (
    <div className="card m-3 p-3 shadow-sm">
      <h5>3. Reporte de Errores</h5>
      <button className="btn btn-danger" onClick={loadErrors}>Actualizar y Ver Cuarentena</button>

      {open && (
        <div className="modal d-block" style={{background:'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">Últimos 10 Errores</div>
              <div className="modal-body p-0">
                <table className="table table-striped mb-0">
                  <thead className="table-dark">
                    <tr><th>Fecha</th><th>Comercio</th><th>Documento</th><th>Motivo</th></tr>
                  </thead>
                  <tbody>
                    {errors.map((e, i) => (
                      <tr key={i}><td>{e.pc_processdate}</td><td>{e.pc_nomcomred}</td><td>{e.pc_numdoc}</td><td className="text-danger">{e.motivo}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setOpen(false)}>Cerrar</button></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default QuarantineList;