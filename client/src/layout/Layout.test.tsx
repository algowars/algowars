import { describe, expect, test } from "vitest";
import { screen } from "@testing-library/react";
import Layout from "./Layout";
import { renderWithProviders } from "../test/testUtils";

describe("Layout", () => {
  test("Should renderWithRouter the component", () => {
    renderWithProviders(
      <Layout>
        <h1>Test Header</h1>
      </Layout>
    );
  });

  test("Should renderWithRouter children", () => {
    renderWithProviders(
      <Layout>
        <h1>Test Header</h1>
      </Layout>
    );
    const headerElement = screen.queryByText("Test Header");
    expect(headerElement).not.to.be.null;
  });

  test("Should add bgColor", () => {
    const testBgColor = "bg-test-color";
    renderWithProviders(
      <Layout bgColor={testBgColor}>
        <div>Test Content</div>
      </Layout>
    );

    const header = screen.getByRole("banner");
    const main = screen.getByRole("main");

    expect(header.className).to.include(testBgColor);
    expect(main.className).to.include(testBgColor);
  });

  test("Should add mainClassName to main element", () => {
    const testMainClassName = "test-main-class";
    renderWithProviders(
      <Layout mainClassName={testMainClassName}>
        <div>Test Content</div>
      </Layout>
    );

    const main = screen.getByRole("main");
    expect(main.className).to.include(testMainClassName);
  });
});
