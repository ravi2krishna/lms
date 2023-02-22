export const courses = [
  {
    _id: "6319a6b002e2093fe8b0d795",
    title: "AWS",
    description:
      "Amazon Web Services (AWS) is a secure cloud services platform, offering compute power, database storage, content delivery, and other functionality to help businesses scale and grow.",
    imageURL: "assets/images/awscourse.jpg",
    courseId: "62b9ab59db52bf307ce11854",
    id: "6319a6b002e2093fe8b0d795",
    status: "started",
    progressId: "6319a6cf02e2093fe8b0d7b0",
  },
  {
    _id: "62b9ae1991f3d7312ce8cf2c",
    title: "Power BI",
    description:
      "Power BI is a business analytics service by Microsoft. It is a data and analytics reporting tool that helps organizations bring together disparate data sets into reporting dashboards. ",
    imageURL: "assets/images/powerbi.jpg",
    courseId: "62b9ab59db52bf307ce11854",
    id: "62b9ae1991f3d7312ce8cf2c",
    status: "started",
    progressId: "6319a6cf02e2093fe8b0d7b0",
  },
];

export const courseData = {
  id: 12,
  title: "Javascript Basics",
  description: "Learn basics of the worlds most used language for web.",
  pictrue:
    "https://1.bp.blogspot.com/-pdqcVeIQp64/XDX7TzdRdcI/AAAAAAAAM8E/ZmGuB6caZqIGmEflGHcj3zgXJJrmqRLdgCLcBGAs/w1200-h630-p-k-no-nu/Free%2BCourses%2Bto%2Blearn%2BJavaScript.jpg",
  liveLink: "https://zoom.us",
  modules: [
    {
      id: 1,
      title: "Datatypes",
      topics: [
        {
          id: 1,
          title: "Objects",
          videoLink: null,
          assignments: [
            {
              extenalLinks: ["https://en.wikipedia.org/wiki/Tic-tac-toe"],
              files: [
                "https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc",
              ],
              title: "Datatypes Excercises",
              id: 1,
            },
          ],
          resources: [
            {
              id: 1,
              extenalLinks: ["https://en.wikipedia.org/wiki/Tic-tac-toe"],
              files: [
                "https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc",
              ],
              title: "Data types reference",
            },
          ],
        },
      ],
    },
  ],
  projects: [
    {
      id: 1,
      title: "Create tic tac toe game",
      description:
        "Use the skills learned in datatypes lecture to create 3x3 tic tac toe game.",
      files: [
        "https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc",
      ],
      extenalLinks: ["https://en.wikipedia.org/wiki/Tic-tac-toe"],
    },
  ],
};
