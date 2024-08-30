import React from "react";
import Board from "./Board";
import { render, fireEvent } from "@testing-library/react";

let board;

beforeAll(function () {
    board = <Board nrows={3} ncols={3} chanceLightStartsOn={0} />
});

test("it renders without crashing", function () {
    render(board);
})

test("it matches the snapshot", function () {
    const { asFragment } = render(board);
    expect(asFragment()).toMatchSnapshot();
})

test("clicking a light changes correct cells", function () {
    const { getByTestId } = render(board);
    const centerCell = getByTestId("1-1");
    const topCell = getByTestId("0-1");
    const botCell = getByTestId("2-1");
    const leftCell = getByTestId("1-0");
    const rightCell = getByTestId("1-2");

    // before clicking centerCell, all cells should not have class "Cell-lit"
    expect(centerCell).not.toHaveClass("Cell-lit");
    expect(topCell).not.toHaveClass("Cell-lit");
    expect(botCell).not.toHaveClass("Cell-lit");
    expect(leftCell).not.toHaveClass("Cell-lit");
    expect(rightCell).not.toHaveClass("Cell-lit");

    // click centerCell
    fireEvent.click(centerCell);

    // now all cells should have class "Cell-lit"
    expect(centerCell).toHaveClass("Cell-lit");
    expect(topCell).toHaveClass("Cell-lit");
    expect(botCell).toHaveClass("Cell-lit");
    expect(leftCell).toHaveClass("Cell-lit");
    expect(rightCell).toHaveClass("Cell-lit");
});

test("Winning a game causes the 'You Win' message to show + no board rendered", function () {
    const { queryByTestId, getByText } = render(<Board chanceLightStartsOn={1} />);
    expect(queryByTestId("Board")).not.toBeInTheDocument();
    expect(getByText("You Win!!! Congrats!!!")).toBeInTheDocument();
})