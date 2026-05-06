import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/test/utils";
import userEvent from "@testing-library/user-event";
import SignupPage from "./page";

vi.mock("@/lib/auth-client", async () => {
  const actual = await vi.importActual("@/lib/auth-client");
  return {
    ...actual,
    signUp: { email: vi.fn() },
  };
});

describe("Signup Page", () => {
  it("renders signup form", () => {
    render(<SignupPage />);
    expect(screen.getByText(/create an account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument();
  });

  it("has link to login page", () => {
    render(<SignupPage />);
    const link = screen.getByRole("link", { name: /log in/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/login");
  });

  it("allows typing in form fields", async () => {
    const user = userEvent.setup();
    render(<SignupPage />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(passwordInput, "securepassword");

    expect(nameInput).toHaveValue("John Doe");
    expect(emailInput).toHaveValue("john@example.com");
    expect(passwordInput).toHaveValue("securepassword");
  });
});
