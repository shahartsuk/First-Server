import express, { application } from "express";

import * as dotenv from "dotenv";

import { courses } from "./database/bamba.js";

dotenv.config();

//const { token } = process.env;

//require(`dotenv`).config();

const App = express();
App.use(express.json());

// "/" endpoint => http://localhost:3000
App.get("/", (req, res) => {
  res.send("Hello World");
});

// "/api/courses" endpoint => http://localhost:3000/api/courses
App.get("/api/courses", (req, res) => {
  res.send(courses);
});

// "/api/courses/number of id" endpoint => http://localhost:3000/api/courses
App.get("/api/courses/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let course = courses.find((c) => c.id === id);
  res.send(course);
});

// "/api/addCourses" endpoint => http://localhost:3000/api/courses
App.post("/api/addCourses", (req, res) => {
  if (!req.body.title || req.body.title.length < 2) {
    res.status(400).send({ msg: "title is invalid" });
    return;
  }
  let courseTitle = req.body.title;
  let newCourse = {
    id: courses.length + 1,
    title: courseTitle,
  };
  console.log(courseTitle);
  courses.push(newCourse);
  res.send(courses);
});

App.delete("/api/courses/:id", (req, res) => {
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  let indexOf = courses.indexOf(course);
  courses.splice(indexOf, 1);
  res.send(courses);
});

App.listen(process.env.PORT);
