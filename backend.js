// below is the schema for getStudentDirectory ()
// {
//   "records": [
//     {
//       "id": string, // ex: "rec1kdysrRiUUgQ5F"
//       "createdTime": string, // ex: "2024-11-14T01:38:47.000Z"
//       "fields": {
//         "FavoritePart": string,
//         "ImageAlt": string, // alt text for img
//         "IOT": string, // url
//         "LinkedIn": string, // URL link to linkedin profile
//         "Bio": string, // Bio
//         "WebApp": string, // webapp URL link
//         "AboutMe": string, // aboutMe URL Link
//         "Name": string, // ex: "John Doe"
//         "Image": [
//           {
//             "id": string, // ex: "attQV525TEPtjPE4g"
//             "width": int, // ex: 2048
//             "height": int, // ex: 1365
//             "url": string, // src-url for img
//             "filename": string, // ex: Oussama 1.jpg
//             "size": int, // ex: 1119159
//             "type": string, // ex: "image/jpeg"
//             "thumbnails": {
//               "small": {
//                 "url": string, // src-url for small thumbnails
//                 "width": number, // ex: 54
//                 "height": number, // ex: 36
//               },
//               "large": {
//                 "url": string,
//                 "width": number, // ex: 758
//                 "height": number, // ex: 512
//               },
//               "full": {
//                 "url": string,
//                 "width": number, // ex: 2048
//                 "height": number, // ex: 1365
//               }
//             }
//           }
//         ]
//       }
//     },
//     ...
//    ]
//}

// this is the schema for getPictureDirectory ()
// {
//   "records": [
//     {
//       "id": string,
//       "createdTime": string,
//       "fields": {
//         "ImgName": string,
//         "Image": [
//           {
//             "id": string,
//             "width": number,
//             "height": number,
//             "url": string,
//             "filename": string,
//             "size": number,
//             "type": string, // ex: "image/png"
//             "thumbnails": {
//               "small": {
//                 "url": string,
//                 "width": number,
//                 "height": number
//               },
//               "large": {
//                 "url": string,
//                 "width": number,
//                 "height": number
//               },
//               "full": {
//                 "url": string,
//                 "width": number,
//                 "height": number
//               }
//             }
//           }
//         ]
//       }
//     },
//    ...,
//   ]
// }


