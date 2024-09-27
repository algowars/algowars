import { render } from "@testing-library/react";
import { LogoutButton } from "./logout-button";

describe("LogoutButton", () => {
    test("should be defined", () => {
        render(<LogoutButton />)
    })
})