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
    <div id="popup">
      <div className="flex items-center justify-center">
        <Power value={60} />
      </div>
      <Form>
        <Form.Control size="sm" type="text" placeholder="Enter phrase" />
      </Form>
      <Button className="submit" onClick={test}>
        Send alert
      </Button>
    </div>
  );
};

Popup.propTypes = {};

export default Popup;
