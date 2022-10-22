import React from "react";
import PropTypes from "prop-types";
import { main } from "../helper_functions/main";
import { Power } from "./gauges/power";
import { SpeedTest } from "./gauges/speed-test";

const Popup = (props) => {
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
    <>
      <div className="p-4 flex items-center justify-center border-t md:border-l md:border-t-0">
        <Power value={60} />
      </div>
      <button onClick={test}>Send alert</button>
    </>
  );
};

Popup.propTypes = {};

export default Popup;
