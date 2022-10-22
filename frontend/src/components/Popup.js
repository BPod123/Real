import React from "react";
import PropTypes from "prop-types";
import { main } from "../helper_functions/main";
import { Power } from "./gauges/power";
import { SpeedTest } from "./gauges/speed-test";
import { Button, Form } from "react-bootstrap";

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
    <div id="popup" className="py-2 text-center">
      <p className="opening">This phrase is probably</p>
      <div className="verdict mx-auto p-2 m-1">
        <p>FAKE NEWS</p>
      </div>
      <div className="flex items-center justify-center">
        <Power value={60} />
      </div>
      <Form>
        <Form.Control
          className="phrase-input mx-auto my-3"
          size="sm"
          placeholder="Enter phrase"  
          type="text"
          maxLength={50 * 10} // max 50 words
        />
      </Form>
      <Button className="submit" onClick={test}>
        Send alert
      </Button>
    </div>
  );
};

Popup.propTypes = {};

export default Popup;
