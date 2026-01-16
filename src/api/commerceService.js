const API_BASE_URL = 'http://localhost:5000/api/commerce';

export const commerceService = {
  // Asegúrate de que el nombre sea "upload"
  upload: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file); // El nombre 'file' debe coincidir con el IFormFile del controlador C#

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
        // No agregues Content-Type manual aquí, el navegador lo hace solo con FormData
      });

      return response.ok;
    } catch (error) {
      console.error("Error en commerceService.upload:", error);
      return false;
    }
  },

  processValidation: async (date) => {
    const response = await fetch(`${API_BASE_URL}/process-validation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ processDate: date }),
    });
    // console.log("Response status:", response.json());
    return await response.json();
  },

  getQuarentine: async () => {
    const response = await fetch(`${API_BASE_URL}/quarentine`);
    return await response.json();
  }
};