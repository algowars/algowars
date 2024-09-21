import { render } from "@testing-library/react";
import { ProtectedRoute } from "./protected-route";

describe("ProtectedRoute", () => {
    test("should be defined", () => {
        render(<ProtectedRoute />)
    })
})