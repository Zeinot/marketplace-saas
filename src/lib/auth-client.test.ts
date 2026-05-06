import { describe, it, expect } from "vitest";
import { authClient, signIn, signUp, signOut, useSession } from "./auth-client";

describe("Auth Client", () => {
  it("exports authClient", () => {
    expect(authClient).toBeDefined();
  });

  it("exports signIn function", () => {
    expect(signIn).toBeDefined();
    expect(typeof signIn).toBe("function");
  });

  it("exports signUp function", () => {
    expect(signUp).toBeDefined();
    expect(typeof signUp).toBe("function");
  });

  it("exports signOut function", () => {
    expect(signOut).toBeDefined();
    expect(typeof signOut).toBe("function");
  });

  it("exports useSession hook", () => {
    expect(useSession).toBeDefined();
    expect(typeof useSession).toBe("function");
  });
});
