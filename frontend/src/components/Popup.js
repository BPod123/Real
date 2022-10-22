import React, { useState } from "react";
import PropTypes from "prop-types";
import { main } from "../helper_functions/main";
import { Power } from "./gauges/power";
import { SpeedTest } from "./gauges/speed-test";
import { Button, Form } from "react-bootstrap";
import { SCALE_COLORS, TRUTH_STRING } from "../constants";

const Popup = (props) => {
  const [truthiness, setTruthiness] = useState(0.1);
  const truthColor = SCALE_COLORS[Math.floor(truthiness * SCALE_COLORS.length)];

  function test() {
    /* eslint-disable no-undef */
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id;
      chrome.scripting.executeScript({
        target: { tabId: activeTabId },
        function: () => {
          main(setTruthiness);
          console.log("cat");
        },
      });
    });
  }

  function test2() {
    console.log(222);
    main()
  }

  return (
    <div id="popup" className="py-3 text-center">
      {truthiness === -1 ? (
        <h1 className="question">FakeNews Detector</h1>
      ) : (
        <>
          <p className="opening">This phrase is likely</p>
          <div
            className="verdict mx-auto p-2 m-1"
            style={{ backgroundColor: truthColor }}
          >
            <p>{TRUTH_STRING[Math.floor(truthiness * TRUTH_STRING.length)]}</p>
          </div>
          <div className="flex items-center justify-center">
            <Power value={truthiness * 100} />
          </div>
        </>
      )}
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
        Evaluate
      </Button>
    </div>
  );
};

Popup.propTypes = {};

export default Popup;
