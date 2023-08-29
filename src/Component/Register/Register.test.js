import React from "react";
import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect"; // Import jest-dom matchers
import Register from "./Register";

const TEST_IDS = {
  usernameInput: "username-input",
  passwordInput: "password-input",
  confirmPasswordInput: "confirm-password-input",
  signUpButton: "sign-up-button",
};

describe("Register component", () => {
  it("renders the registration form correctly", () => {
    render(<Register />);

    const usernameInput = screen.getByTestId(TEST_IDS.usernameInput);
    const passwordInput = screen.getByTestId(TEST_IDS.passwordInput);
    const confirmPasswordInput = screen.getByTestId(
      TEST_IDS.confirmPasswordInput
    );
    const signUpButton = screen.getByTestId(TEST_IDS.signUpButton);

    expect(usernameInput).toHaveAttribute("type", "text");
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(confirmPasswordInput).toHaveAttribute("type", "password");
    expect(signUpButton).toHaveAttribute("type", "submit");
    expect(signUpButton).toBeDisabled();
  });

  // it("validates input fields correctly", () => {
  //   const { getByTestId } = render(<Register />);

  //   const usernameInput = getByTestId("username-input");
  //   const passwordInput = getByTestId("password-input");
  //   const confirmPasswordInput = getByTestId("confirm-password-input");
  //   const signUpButton = getByTestId("sign-up-button");

  //   // Test invalid input
  //   fireEvent.change(usernameInput, { target: { value: "inv" } });
  //   fireEvent.change(passwordInput, { target: { value: "invalid123" } });
  //   fireEvent.change(confirmPasswordInput, { target: { value: "mismatched" } });

  //   fireEvent.click(signUpButton);

  //   // Test valid input
  //   fireEvent.change(usernameInput, { target: { value: "valid-username" } });
  //   fireEvent.change(passwordInput, { target: { value: "ValidPass123!" } });
  //   fireEvent.change(confirmPasswordInput, {
  //     target: { value: "ValidPass123!" },
  //   });

  //   fireEvent.click(signUpButton);
  // });
});
