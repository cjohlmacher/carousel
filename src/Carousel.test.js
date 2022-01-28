import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("renders carousel component", function() {
  render(<Carousel />);
});

it('displays carousel html', () => {
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it('goes forward on right arrow click', () => {
  const {getByTestId, getByText} = render(<Carousel />);
  const rightArrow = getByTestId('right-arrow');
  const imageCount = getByText('Image 1 of 3.');
  fireEvent.click(rightArrow);
  expect(imageCount).toHaveTextContent('Image 2 of 3.');
});

it('goes backward on right arrow click', () => {
  const {getByTestId, getByText} = render(<Carousel />);
  const rightArrow = getByTestId('right-arrow');
  fireEvent.click(rightArrow);
  const imageCount = getByText('Image 2 of 3.');
  const leftArrow = getByTestId('left-arrow');
  fireEvent.click(leftArrow);
  expect(imageCount).toHaveTextContent('Image 1 of 3.');
});

it('hides the left arrow on first image', () => {
  const {queryByTestId, getByTestId, getByText} = render(<Carousel />);
  const leftArrow = queryByTestId('left-arrow');
  const rightArrow = getByTestId('right-arrow');
  expect(leftArrow).not.toBeInTheDocument();
  expect(rightArrow).toBeInTheDocument();
});

it('hides the right arrow on last image', () => {
  const {queryByTestId, getByTestId, getByText} = render(<Carousel />);
  const rightArrow = getByTestId('right-arrow');
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);
  const leftArrow = queryByTestId('left-arrow');
  expect(leftArrow).toBeInTheDocument();
  expect(rightArrow).not.toBeInTheDocument();
});