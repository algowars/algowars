import { render } from "@testing-library/react";
import { ProtectedRoute } from "./protected-route";

const TestComponent = () => {
  return <h1>TESTING</h1>;
};
describe("ProtectedRoute", () => {
  test("should be defined", () => {
    render(<ProtectedRoute component={TestComponent} />);
  });
});
