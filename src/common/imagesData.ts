import { Types } from 'mongoose';

export const imagesData = [
  {
    _id: new Types.ObjectId("67f3e47283defc541e8ff7bc"),
    path: "/Users/josemanuelmachinlorenzo/workspace/image-processing-api/output/720/8e358ac881c51d27249bdc4f44904397.jpg",
    resolution: "720",
    md5: "8e358ac881c51d27249bdc4f44904397",
    task: new Types.ObjectId("67f3e47283defc541e8ff7b9")
  },
  {
    _id: new Types.ObjectId("67f3e47283defc541e8ff7be"),
    path: "/Users/josemanuelmachinlorenzo/workspace/image-processing-api/output/1024/8e358ac881c51d27249bdc4f44904397.jpg",
    resolution: "1024",
    md5: "8e358ac881c51d27249bdc4f44904397",
    task: new Types.ObjectId("67f3e47283defc541e8ff7b9")
  },
  {
    _id: new Types.ObjectId("67f3e48b83defc541e8ff7c6"),
    path: "/Users/josemanuelmachinlorenzo/workspace/image-processing-api/output/640/a2861a46b78d5ba2dea8cfd8b7103ecb.jpg",
    resolution: "640",
    md5: "a2861a46b78d5ba2dea8cfd8b7103ecb",
    task: new Types.ObjectId("67f3e48b83defc541e8ff7c3")
  },
  // Nuevas imágenes relacionadas con las nuevas tareas
  {
    _id: new Types.ObjectId("67f3e4e383defc541e8ff7f2"),
    path: "/Users/josemanuelmachinlorenzo/workspace/image-processing-api/output/320/123456789abcdef123456789abcdef12.jpg",
    resolution: "320",
    md5: "123456789abcdef123456789abcdef12",
    task: new Types.ObjectId("67f3e4e383defc541e8ff7f1")
  },
  {
    _id: new Types.ObjectId("67f3e4e383defc541e8ff7f3"),
    path: "/Users/josemanuelmachinlorenzo/workspace/image-processing-api/output/480/123456789abcdef123456789abcdef12.jpg",
    resolution: "480",
    md5: "123456789abcdef123456789abcdef12",
    task: new Types.ObjectId("67f3e4e383defc541e8ff7f1")
  },
  {
    _id: new Types.ObjectId("67f3e4e383defc541e8ff7f5"),
    path: "/Users/josemanuelmachinlorenzo/workspace/image-processing-api/output/1080/fedcba9876543210fedcba9876543210.jpg",
    resolution: "1080",
    md5: "fedcba9876543210fedcba9876543210",
    task: new Types.ObjectId("67f3e4e383defc541e8ff7f4")
  },
  {
    _id: new Types.ObjectId("67f3e4e383defc541e8ff7f8"),
    path: "/Users/josemanuelmachinlorenzo/workspace/image-processing-api/output/720/123abc456def789ghi123abc456def78.jpg",
    resolution: "720",
    md5: "123abc456def789ghi123abc456def78",
    task: new Types.ObjectId("67f3e4e383defc541e8ff7f7")
  },
  {
    _id: new Types.ObjectId("67f3e4e383defc541e8ff7fa"),
    path: "/Users/josemanuelmachinlorenzo/workspace/image-processing-api/output/1440/abcdefabcdefabcdefabcdefabcdefab.jpg",
    resolution: "1440",
    md5: "abcdefabcdefabcdefabcdefabcdefab",
    task: new Types.ObjectId("67f3e4e383defc541e8ff7f9")
  }
];