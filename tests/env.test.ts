import { afterEach, describe, expect, it, vi } from "vitest";

describe("environment config", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("allows the app to build without a DATABASE_URL", async () => {
    vi.stubEnv("DATABASE_URL", "");
    vi.stubEnv("NODE_ENV", "production");

    const { env } = await import("../src/lib/env");

    expect(env.DATABASE_URL).toBe("");
    expect(env.NODE_ENV).toBe("production");
  });
});
