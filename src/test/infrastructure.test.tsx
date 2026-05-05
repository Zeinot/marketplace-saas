import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/utils";
import { Button } from "@/components/ui/button";

describe("Test Infrastructure", () => {
  it("renders a shadcn Button", () => {
    render(<Button>Hello</Button>);
    expect(screen.getByRole("button", { name: "Hello" })).toBeInTheDocument();
  });

  it("has working user-event", async () => {
    const { userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();
    let clicked = false;
    render(<Button onClick={() => { clicked = true; }}>Click me</Button>);
    await user.click(screen.getByRole("button", { name: "Click me" }));
    expect(clicked).toBe(true);
  });
});
