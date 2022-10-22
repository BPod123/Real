import logo from "./logo.svg";
import "./App.css";
// import "./external_css/tailwinds";
import Popup from "./components/Popup";


function App() {
  return (
    <div className="App d-flex justify-content-center" id="app">
      <Popup />
    </div>
  );
}

export default App;
