import logo from "./logo.svg";
import "./App.css";
import { main } from "./helper_functions/main";

function App() {
  function test() {
    /* eslint-disable no-undef */
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id;
      chrome.scripting.executeScript({
        target: { tabId: activeTabId },
        function: () => {
          main();
        },
      });
    });
  }

  return (
    <div className="App">
      <button onClick={test}>Send alert</button>
    </div>
  );
}

export default App;
