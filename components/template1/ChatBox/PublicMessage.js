import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import "./transitions.module.css";
import { CSSTransition } from "react-transition-group";
import { Card } from "@material-ui/core";

const Pin = styled(Card)`
  background-color: grey;
  margin: 1em 0;
  transition: opacity 1s;
  min-height: 150px;
  max-width: 800px;
  min-width: 300px;
  .question {
    padding: 1em;
    background-color: #181818;
    color: white;
    height: 20%;
  }
  .response {
    background-color: white;
    padding: 1em;
    color: #181818;
    min-height: inherit;
    white-space: pre-wrap;
  }
`;
const StyledMessage = styled.div`
  background-color: grey;
  margin: 1em 0;
  transition: opacity 1s;
  min-height: 150px;
  width: 90%;
  .question {
    padding: 1em;
    background-color: #181818;
    color: white;
    height: 20%;
  }
  .response {
    background-color: white;
    padding: 1em;
    color: #181818;
    min-height: inherit;
    white-space: pre-wrap;
  }
`;

const From = styled.span`
  color: #2bef83;
  font-weight: 800;
`;

export const PinnedMessage = (props) => {
  const { message } = props;
  const inner = message[0];
  const text = inner?.response;

  return (
    <Pin>
      <div className="question">
        <strong>Question: </strong>
        <br /> {inner?.message}
        <br />
        <From>From: {inner?.sender}</From>
      </div>

      <div className="response">
        <strong>Response: </strong> <br />
        {text}
      </div>
    </Pin>
  );
};

const PublicMessage = (props) => {
  const { message } = props;
  const inner = message[0];
  const text = inner?.response;
  if (inner !== undefined) {
    return (
      <StyledMessage>
        <div className="question">
          <strong>Question: </strong>
          <br /> {inner?.message}
          <br />
          <From>From: {inner?.sender}</From>
        </div>

        <div className="response">
          <strong>Response: </strong> <br />
          {text}
        </div>
      </StyledMessage>
    );
  } else {
    return <h1>No Featured Post Right Now</h1>;
  }
};

export default PublicMessage;
