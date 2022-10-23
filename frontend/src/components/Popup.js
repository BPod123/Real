import React, { useState } from "react";
import PropTypes from "prop-types";
import { Power } from "./gauges/power";
import { Button, Form } from "react-bootstrap";
import { SCALE_COLORS, TRUTH_STRING } from "../constants";

const Popup = (props) => {
  const [truthiness, setTruthiness] = useState(-1);
  const [phrase, setPhrase] = useState("DEFAULT");
  const truthColor = SCALE_COLORS[Math.floor(truthiness * SCALE_COLORS.length)];

  // function test() {
  //   /* eslint-disable no-undef */
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //     const activeTabId = tabs[0].id;
  //     chrome.scripting.executeScript({
  //       target: { tabId: activeTabId },
  //       function: () => {
  //         const highlightedText = window.getSelection().toString();

  //         const data = {
  //           phrase: highlightedText,
  //         };
  //         if (data !== "") {
  //           const Url = "http://localhost:8000/header";

  //           const otherParam = {
  //             headers: {
  //               "content-type": "application/json; charset=UTF-8",
  //             },
  //             body: JSON.stringify(data),
  //             method: "POST",
  //           };

  //           console.log(data, Url, otherParam);

  //           fetch(Url, otherParam)
  //             .then((data) => data.json())
  //             .then((res) => {
  //               console.log(res);
  //               setTruthiness(0.5);
  //             });
  //         } else {
  //           alert("The search query cannot be empty");
  //         }
  //       },
  //     });
  //   });
  // }

  function test_web_app() {
    const highlightedText = phrase;

    const data = {
      phrase: highlightedText,
    };
    if (data !== "") {
      const Url = "http://localhost:8000/header";

      const otherParam = {
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
        method: "POST",
      };

      console.log(data, Url, otherParam);

      fetch(Url, otherParam)
        .then((data) => data.json())
        .then((res) => {
          console.log(res);
          setTruthiness(res["Truthiness"]);
        });
    } else {
      alert("The search query cannot be empty");
    }
  }

  return (
    <div id="popup" className="py-3 text-center my-auto">
      {truthiness === -1 ? (
        <h1 className="question">FakeNews Detector</h1>
      ) : (
        <>
          <p className="opening mb-2">This phrase is likely</p>
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
          className="phrase-input mx-auto my-4"
          id="phrase-input"
          size="lg"
          placeholder="Enter phrase"
          type="text"
          onBlur={(e) => setPhrase(e.target.value)}
          maxLength={50 * 10} // max 50 words
        />
      </Form>
      <Button className="submit" onClick={test_web_app}>
        Evaluate
      </Button>
    </div>
  );
};

Popup.propTypes = {};

export default Popup;
