import React, { useState } from "react";
import PropTypes from "prop-types";
import { Power } from "./gauges/power";
import { Button, Form } from "react-bootstrap";
import { SCALE_COLORS, TRUTH_STRING } from "../constants";
import RetroVideo from "../assets/retro.mp4";

const Popup = (props) => {
  const [truthiness, setTruthiness] = useState(-1);
  const [phrase, setPhrase] = useState("");
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

  function enterKeyPressed(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      console.log("Enter key is pressed");
      test_web_app();
    }
  }

  return (
    <div id="popup" className="py-3 text-center my-auto">
      <video autoPlay muted loop id="myVideo">
        <source src={RetroVideo} type="video/mp4" />
      </video>

      {truthiness === -1 ? (
        <h1 className="question mb-5">FakeNews Detector</h1>
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
          <p className="truth-float">{`${
            Math.round(truthiness * 10000) / 100
          }%`}</p>
        </>
      )}
      <Form>
        <Form.Control
          className="phrase-input mx-auto my-4"
          id="phrase-input"
          size="lg"
          placeholder="Enter phrase"
          type="text"
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          maxLength={50 * 10} // max 50 words
          onKeyDown={enterKeyPressed}
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
