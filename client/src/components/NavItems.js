export const Navitems = [
  {
    id: 1,
    title: "Home",
    path: "/",
  },
  //departments
  {
    id: 2,
    title: "Departments",
    path: "/department",
    dropdown: [
      {
        id: 21,
        title: "B.Tech",
        dropdown: [
          {
            id: 211,
            title: "Computer Science",
            path: "/department/computer-science-and-engineering",
          },
          {
            id: 212,
            title: "Mechanical Engineering",
            path: "/department/mechanical-engineering",
          },
          {
            id: 213,
            title: "Civil Engineering",
            path: "/department/civil-engineering",
          },
          {
            id: 214,
            title: "Electrical Engineering",
            path: "/department/electrical-engineering",
          },
          {
            id: 215,
            title: "Instrumentation Engineering",
            path: "/department/instrumentation-engineering",
          },
        ],
      },
      {
        id: 22,
        title: "Humanities",
        dropdown: [
          {
            id: 221,
            title: "Humanities",
            path: "/department/humanities",
          },
        ],
      },
      {
        id: 23,
        title: "Science",
        dropdown: [
          {
            id: 231,
            title: "Physics",
            path: "/department/physics",
          },
          {
            id: 232,
            title: "Chemistry",
            path: "/department/chemistry",
          },
          {
            id: 233,
            title: "Mathematics",
            path: "/department/mathematics",
          },
        ],
      },

      {
        id: 24,
        title: "Post Graduate",
        dropdown: [
          {
            id: 241,
            title: "MCA",
            path: "/department/mca",
          },
        ],
      },
    ],
  },
  //news-events
  {
    id: 3,
    title: "News",
    path: "/news-events",
  },
  {
    id: 4,
    title: "Notice",
    path: "/notice",
  },

  //Academics
  {
    id: 7,
    title: "Academics",
    path: "/academic",
    dropdown: [
      {
        id: 71,
        title: "Admission",
        path: "/academic/admission",
      },
      {
        id: 72,
        title: "Results",
        path: "#",
        dropdown:[
          {
            id:721,
            title:"2023",
            path: "/academic/result/2023",
          },
          {
            id:722,
            title:"2022",
            path: "/academic/result/2022",
          },
          {
            id:723,
            title:"2021",
            path: "/academic/result/2021",
          },
          {
            id:724,
            title:"2020",
            path: "/academic/result/2020",
          },
        ]
      },
    ],
  },

  //Facility
  {
    id: 9,
    title: "Facilty",
    path: "/facility",
    dropdown: [
      {
        id: 91,
        title: "Hostels",
        path: "/facility/hostel",
        dropdown: [
          {
            id: 911,
            title: "Hostel-1",
            path: "/facility/hostel/1",
          },
          {
            id: 912,
            title: "Hostel-2",
            path: "/facility/hostel/2",
          },
          {
            id: 913,
            title: "Hostel-3",
            path: "/facility/hostel/3",
          },
          {
            id: 914,
            title: "Hostel-4",
            path: "/facility/hostel/4",
          },
          {
            id: 915,
            title: "Hostel-5",
            path: "/facility/hostel/5",
          },
          {
            id: 916,
            title: "Hostel-6",
            path: "/facility/hostel/6",
          },
          {
            id: 917,
            title: "Hostel-7",
            path: "/facility/hostel/7",
          },
          {
            id: 918,
            title: "Hostel-8",
            path: "/facility/hostel/8",
          },
          {
            id: 919,
            title: "Hostel-9",
            path: "/facility/hostel/9",
          },
          {
            id: 910,
            title: "Hostel-10",
            path: "/facility/hostel/10",
          },
        ],
      },
      {
        id: 92,
        title: "Library",
        path: "/facility/library",
      },
      {
        id: 93,
        title: "NCC",
        path: "/facility/national-cadet-corps",
      },
      {
        id: 94,
        title: "Sports",
        path: "/facility/sports-cultural-facility",
      },
      {
        id: 95,
        title: "Guest House & Canteen",
        path: "/facility/guest-house-canteen",
      },
      {
        id: 96,
        title: "Bus Service",
        path: "/facility/bus-service",
      },
    ],
  },
  //clubs
  {
    id: 5,
    title: "Clubs",
    path: "/club",
    dropdown: [
      {
        id: 515,
        title: "ISTE",
        path: "/club/iste",
      },
      {
        id: 51,
        title: "Roboworld",
        path: "/club/roboworld",
      },
      {
        id: 52,
        title: "Avant Grade",
        path: "/club/avant-grade",
      },
      {
        id: 53,
        title: "Glug",
        path: "/club/glug",
      },
      {
        id: 54,
        title: "Quiz Forum",
        path: "/club/quiz-forum",
      },
      {
        id: 55,
        title: "Debate Forum",
        path: "/club/debate-forum",
      },
      {
        id: 56,
        title: "Fotokraft",
        path: "/club/fotokraft",
      },
      {
        id: 57,
        title: "Dhwany",
        path: "/club/dhwany",
      },
      {
        id: 58,
        title: "Literary",
        path: "/club/literary",
      },
      {
        id: 59,
        title: "Sagkathya",
        path: "/club/sagkathya",
      },
      {
        id: 510,
        title: "Mukta",
        path: "/club/mukta",
      },
      {
        id: 511,
        title: "GDSC",
        path: "/club/gdsc",
      },
      {
        id: 512,
        title: "D-Code",
        path: "/club/dcode",
      },
      {
        id: 513,
        title: "Strategica",
        path: "/club/strategica",
      },
      {
        id: 514,
        title: "Proyas",
        path: "/club/proyas",
      },
    ],
  },
  //signup
  {
    id: 8,
    title: "Signup",
    path: "/signup",
    dropdown: [
      {
        id: 81,
        title: "Student Signup",
        path: "/signup/student",
      },
      {
        id: 82,
        title: "Faculty Signup",
        path: "/signup/faculty",
      },
    ],
  },
  //contact
  {
    id:10,
    title:"T&P Cell",
    path:"/traning-and-placement-cell"
  },
  {
    id: 6,
    title: "Contact",
    path: "/contact",
  },
];
