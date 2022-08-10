import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

export const AlertMessage = ({ alertMessage, setAlertMessage }) => {
  let { status, variant, body } = alertMessage;
  if (status) {
    return (
      <Alert
        variant={variant}
        onClick={() => {
          setAlertMessage({
            ...alertMessage,
            status: false,
          });
        }}
        dismissible
      >
        <Alert.Heading>{variant.toUpperCase()}</Alert.Heading>
        <p>{body}</p>
      </Alert>
    );
  }
};
