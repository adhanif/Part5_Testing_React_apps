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

test("new Blog the event handler like button is clicked twice 5.15", async () => {
  const blog = {
    title: "Test Title",
    auther: "Tester",
    url: "https://example.com",
    likes: 0,
  };

  const addLike = jest.fn();
  const user = userEvent.setup();
  const { container } = render(<UserBlog addLike={addLike} blog={blog} />);

  const button = container.querySelector(".showDetail");
  await user.click(button);
  const likeButton = container.querySelector(".likeButton");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(addLike.mock.calls).toHaveLength(2);
});

test("form calls the event handler it received as props 5.16", async () => {
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
