import FileUpload from "./Components/FileUpload/FileUpload.jsx";
import ProcessData from "./Components/ProcessData/ProcessData.jsx";
import QuarantineList from "./Components/QuarantineList/QuarantineList.jsx";

function App() {
  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Gestión de Comercios</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <FileUpload />
          <ProcessData />
          <QuarantineList />
        </div>
      </div>
    </div>
  );
}
export default App;