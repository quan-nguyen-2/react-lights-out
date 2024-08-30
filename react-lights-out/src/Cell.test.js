import React from "react";
import Cell from "./Cell";
import { render } from "@testing-library/react";

test("It renders without crashing", function () {
    // Cell is a <td>, included relevent table tags to ensure no errors when rendering a <td>
    render(<table><tbody><tr><Cell /></tr></tbody></table>);
})

test("it matches snapshot", function () {
    // Cell is a <td>, included relevent table tags to ensure no errors when rendering a <td>
    const { asFragment } = render(<table><tbody><tr><Cell /></tr></tbody></table>);
    expect(asFragment()).toMatchSnapshot();
});