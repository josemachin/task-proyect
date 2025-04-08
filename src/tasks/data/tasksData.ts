import { Types } from 'mongoose';

export const tasksData = [
  {
    _id: new Types.ObjectId("67f3e47283defc541e8ff7b9"),
    status: "completed",
    price: 33.7,
    originalPath: "/Users/josemanuelmachinlorenzo/Documents/verde.png",
    images: [
      new Types.ObjectId("67f3e47283defc541e8ff7c0"),
      new Types.ObjectId("67f3e47283defc541e8ff7be"),
      new Types.ObjectId("67f3e47283defc541e8ff7bc")
    ],
    createdAt: new Date("2025-04-07T14:42:58.173Z"),
    updatedAt: new Date("2025-04-07T14:42:58.223Z")
  },
  {
    _id: new Types.ObjectId("67f3e48b83defc541e8ff7c3"),
    status: "completed",
    price: 15.34,
    originalPath: "/Users/josemanuelmachinlorenzo/Documents/zalamanca mala.png",
    images: [
      new Types.ObjectId("67f3e48b83defc541e8ff7c8"),
      new Types.ObjectId("67f3e48b83defc541e8ff7c6")
    ],
    createdAt: new Date("2025-04-07T14:43:23.665Z"),
    updatedAt: new Date("2025-04-07T14:43:23.720Z")
  },
  {
    _id: new Types.ObjectId("67f3e4e383defc541e8ff7f1"),
    status: "pending",
    price: 45.00,
    originalPath: "/Users/josemanuelmachinlorenzo/Documents/task1.pdf",
    images: [
      new Types.ObjectId("67f3e4e383defc541e8ff7f2"),
      new Types.ObjectId("67f3e4e383defc541e8ff7f3")
    ],
    createdAt: new Date("2025-05-01T12:00:00.000Z"),
    updatedAt: new Date("2025-05-01T12:00:10.000Z")
  },
  {
    _id: new Types.ObjectId("67f3e4e383defc541e8ff7f4"),
    status: "completed",
    price: 29.99,
    originalPath: "/Users/josemanuelmachinlorenzo/Documents/task2.jpg",
    images: [
      new Types.ObjectId("67f3e4e383defc541e8ff7f5")
    ],
    createdAt: new Date("2025-05-02T14:22:30.000Z"),
    updatedAt: new Date("2025-05-02T14:23:15.000Z")
  },
  {
    _id: new Types.ObjectId("67f3e4e383defc541e8ff7f6"),
    status: "failed",
    price: 60.50,
    originalPath: "/Users/josemanuelmachinlorenzo/Documents/task3.docx",
    images: [],
    createdAt: new Date("2025-05-03T16:45:58.000Z"),
    updatedAt: new Date("2025-05-03T16:46:10.000Z")
  },
  {
    _id: new Types.ObjectId("67f3e4e383defc541e8ff7f7"),
    status: "completed",
    price: 75.20,
    originalPath: "/Users/josemanuelmachinlorenzo/Documents/task4.bmp",
    images: [
      new Types.ObjectId("67f3e4e383defc541e8ff7f8"),
      new Types.ObjectId("67f3e4e383defc541e8ff7f9")
    ],
    createdAt: new Date("2025-05-04T18:35:00.000Z"),
    updatedAt: new Date("2025-05-04T18:36:10.000Z")
  },{
    _id: new Types.ObjectId("67f3e4e383defc541e8ff8f9"),
    status: "completed",
    price: 50.55,
    originalPath: "/Users/josemanuelmachinlorenzo/Documents/task5.jpg",
    images: [
      new Types.ObjectId("67f3e4e383defc541e8ff8fa"),
      new Types.ObjectId("67f3e4e383defc541e8ff8fb"),
      new Types.ObjectId("67f3e4e383defc541e8ff8fc")
    ],
    createdAt: new Date("2025-05-05T20:12:00.000Z"),
    updatedAt: new Date("2025-05-05T20:13:30.000Z")
  }
];


