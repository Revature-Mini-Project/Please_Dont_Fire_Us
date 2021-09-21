import useSound from "use-sound";
import React from "react";
import { Alert } from "reactstrap";
// sounds
import success from "../../sounds/success.mp3";
import failure from "../../sounds/failure.mp3";

/**
 *  created by Mat Terry
 *  Resources:
 *      reactstrap: https://reactstrap.github.io/components/alerts/
 * @returns
 */
export const Success = () => {
  return (
    <div>
      <Alert color="success">Congratulations! You're a winner!!</Alert>
    </div>
  );
};

/**
 *  created by Mat Terry
 *  Resources:
 *      reactstrap: https://reactstrap.github.io/components/alerts/
 * @returns
 */
export const Failure = () => {
  return (
    <div>
      <Alert color="danger">Oh no! You're a failure!</Alert>
    </div>
  );
};
