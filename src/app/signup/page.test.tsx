import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/test/utils";
import userEvent from "@testing-library/user-event";
import { SignupForm } from "@/components/auth/signup-form";

vi.mock("@/lib/auth-client", async () => {
  const actual = await vi.importActual("@/lib/auth-client");
  return {
    ...actual,
    signUp: { email: vi.fn() },
  };
});

describe("Signup Form", () => {
  it("renders signup form", () => {
    render(<SignupForm />);
    expect(screen.getByText(/get started/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument();
  });

  it("has link to login page", () => {
    render(<SignupForm />);
    const link = screen.getByRole("link", { name: /log in/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/login");
  });

  it("allows typing in form fields", async () => {
    const user = userEvent.setup();
    render(<SignupForm />);

    const nameInput = screen.getByLabelText(/full name/i);
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
