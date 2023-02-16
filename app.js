require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRouter = require("./route/userRouter");
const courseRouter = require("./route/courseRouter");
const authRouter = require("./route/authRouter");
const enrolRouter = require("./route/enrolRouter");
const questionRouter = require("./route/questionRouter");
// const hireInstructRouter = require("./route/hiredInstructRouter");
// const studySpaceRouter = require("./route/studyspaceRouter");
// const announcementRouter = require("./route/announcementRouter");

// const manageRouter = require("./route/manageRouter");
// const getRouter = require("./route/getRouter");
const answerRouter = require("./route/answerRouter");
const path = require("path");
const globalErrorHanddler = require("./middlewares/errorHanddler");
const notFound = require("./route/notFound");
const AppError = require("./utils/AppError");
const CatchAsync = require("./utils/CatchAsync");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const app = express();

//Secure the Header
// app.use(helmet());
app.use(cors());
//Limit the requsts from the same IP's....protections against {DDOS & brute forse attacts}
const Limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, Please try again in an hour",
});
app.use("/", Limiter);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.static(path.join(__dirname, "public")));
//Data Sanitization against NoSQL query injections
app.use(mongoSanitize());

//Data Sanitizations aganist XSS attacs
app.use(xss());

// Prevent Parameter Polution

app.use(
  hpp({
    whitelist: ["price"],
  })
);

app.get("/pp", (req, res) => {
  res.status(200).render("users");
});
// app.get("/ss", (req, res) => {
//   res.status(200).render("studyspace");
// });
// app.use(getRouter);
app.use(authRouter);
app.use(questionRouter);
app.use(answerRouter);
app.use(courseRouter);
// app.use(manageRouter);
// app.use(hireInstructRouter);
app.use(enrolRouter);
// app.use(studySpaceRouter);
// app.use(announcementRouter);
app.use(userRouter);

app.use(notFound);

app.use(globalErrorHanddler);

const start = CatchAsync(async (uri, port) => {
  mongoose.set("strictQuery", true);
  await mongoose
    .connect(uri)
    .then(console.log("Database connected Successfully!"));
  app.listen(port, console.log(`server running on port: ${port}`));
});

start(process.env.MONGO, process.env.PORT);
