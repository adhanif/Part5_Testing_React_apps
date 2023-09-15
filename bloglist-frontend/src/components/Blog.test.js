import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserBlog from "./UserBlog";
import NewBlog from "./NewBlog";

test("component displaying a blog renders", () => {
  const blog = {
    title: "Test Title",
    auther: "Tester",
  };

  const { container } = render(<UserBlog blog={blog} />);
  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("Test Title");
});

test("clicking the button that shows blog's URL and number of likes", async () => {
  const blog = {
    title: "Test Title",
    author: "Tester",
    url: "https://example.com",
    likes: 42,
    user: {
      name: "User Name",
    },
  };

  const mockHandler = jest.fn();

  const { container } = render(<UserBlog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("show");
  await user.click(button);

  const details = container.querySelector(".blog-details");
  expect(details).not.toBeNull();

  expect(details).toHaveTextContent("https://example.com");
  expect(details).toHaveTextContent("likes 42");
});

test("should first", async () => {
  const addBlog = jest.fn();

  const client = userEvent.setup();

  const { container } = render(<NewBlog addBlog={addBlog} />);

  const titleInput = container.querySelector("#title");
  const authorInput = container.querySelector("#author");
  const urlInput = container.querySelector("#url");
  const createButton = screen.getByText("create");

  await client.type(titleInput, "testing title");
  await client.type(authorInput, "testing author");
  await client.type(urlInput, "www.test.com");
  await client.click(createButton);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe("testing title");
  expect(addBlog.mock.calls[0][0].author).toBe("testing author");
  expect(addBlog.mock.calls[0][0].url).toBe("www.test.com");
});
