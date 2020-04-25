import React from "react";
import { Redirect } from "react-router-dom";

//* Extract the `context` property from props in the function's parameters
export default ({ context }) => {
  //* In the body of the function, call the signOut() action passed down through context
  context.actions.signOut();

  return <Redirect to="/" />;
};
