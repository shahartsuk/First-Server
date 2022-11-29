import express, { application } from "express";

import * as dotenv from "dotenv";

import { courses } from "./database/bamba.js";

dotenv.config();

//const { token } = process.env;

//require(`dotenv`).config();

const App = express();
App.use(express.json());

// "/" endpoint => http://localhost:3000
App.get("/", function (req, res) {
  res.send("Hello World");
});

// "/api/courses" endpoint => http://localhost:3000/api/courses
App.get("/api/courses", function (req, res) {
  res.send(courses);
});

// "/api/courses/number of id" endpoint => http://localhost:3000/api/courses
App.get("/api/courses/:id", function (req, res) {
  let id = parseInt(req.params.id);
  let course = courses.find((c) => c.id === id);
  res.send(course);
});

// "/api/addCourses" endpoint => http://localhost:3000/api/courses
App.post("/api/addCourses", function (req, res) {
  let courseTitle = req.body.title;
  let newCourse = {
    id: courses.length + 1,
    title: courseTitle,
  };
  console.log(courseTitle);
  courses.push(newCourse);
  res.send(courses);
});

App.listen(process.env.PORT);
