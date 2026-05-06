import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/test/utils";
import NewLaunchPage from "./page";

vi.mock("@/lib/auth-client", () => ({
  useSession: () => ({ data: null }),
}));

describe("New Launch Page (unauthenticated)", () => {
  it("prompts login when not authenticated", () => {
    render(<NewLaunchPage />);
    expect(screen.getByText(/sign in required/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /log in/i })).toBeInTheDocument();
  });
});
