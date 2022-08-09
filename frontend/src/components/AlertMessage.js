import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

export const AlertMessage = ({ alertMessage, handleHide }) => {
  let { status, variant, body } = alertMessage;
  if (status) {
    return (
      <Alert variant={variant} onClick={handleHide} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>{body}</p>
      </Alert>
    );
  }
};
