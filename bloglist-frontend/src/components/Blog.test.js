import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UserBlog from "./UserBlog";

test("component displaying a blog renders", () => {
  const blog = {
    title: "Test Title",
    auther: "Tester",
  };

  const { container } = render(<UserBlog blog={blog} />);

  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("Test Title");
  //   const element = screen.getByText("Test Title");
  //   expect(element).toBeDefined();
});
