import { render } from "@testing-library/react";
import { Navbar } from "./navbar";

describe("Navbar", () => {
    test("should be defined", () => {
        render(<Navbar />)
    })
})