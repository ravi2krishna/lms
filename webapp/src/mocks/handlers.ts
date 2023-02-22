import { rest } from "msw";

// Mock Data
import { courseData, courses } from "./mock-data/courses";

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers = [
  rest.get(
    `${import.meta.env.VITE_API_URL}/student/courses`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(courses));
    }
  ),
  rest.get(
    `${import.meta.env.VITE_API_URL}/student/getCourse/:id`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(courseData));
    }
  ),
];
