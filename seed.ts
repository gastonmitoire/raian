import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

import { fakeBooksData } from "./fakers/fakeBooks";
import { fakeCommentsData } from "./fakers/fakeComments";
import { fakeUsers } from "./fakers/fakeUsers";

async function seed() {
  const [kody, maco, edicionesDeLaPaz] = await Promise.all(fakeUsers);

  const chapterImages = [
    "http://2.bp.blogspot.com/-HjQOozN-l38/Tan37BbyupI/AAAAAAAAA-A/QO2DRZOB3Lc/s1600/poseida.jpg",
    "https://4.bp.blogspot.com/-HZcfKBH2oX8/TaoW_Z7o4zI/AAAAAAAABAs/XCo1Oi2dsKw/s1600/C3+llegan+las+criaturas.jpg",
    "http://1.bp.blogspot.com/-m2a2PM-CxF0/Tan2cb0sGGI/AAAAAAAAA9w/8epTxhzV2Zo/s1600/Luz+mala+ok.jpg",
    "http://3.bp.blogspot.com/-j-3shWubiz0/Tan4Fy8C1NI/AAAAAAAAA-I/AhDMLFqFHhA/s1600/tapa+3.jpg",
    "http://2.bp.blogspot.com/-pEVtoCJTctU/Tan4P1JloHI/AAAAAAAAA-g/W5YXCvZs3KU/s1600/extra%25C3%25B1o+en+la+ventana.jpg",
    "http://4.bp.blogspot.com/-opHZCbpNgt4/Tan4OUUXesI/AAAAAAAAA-c/Os5vYD70_bM/s1600/el+hombre+del+capote+negro.jpg",
  ];

  await Promise.all(
    fakeBooksData().map((book) => {
      const dataBook = { ...book };
      return db.book.create({
        data: {
          ...dataBook,
          chapters: {
            create: [
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 1,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 2,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 3,
                text: {
                  create: {
                    content:
                      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
                    image:
                      chapterImages[
                        Math.floor(Math.random() * chapterImages.length)
                      ],
                  },
                },
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 4,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 5,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 6,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 7,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 8,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 9,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 10,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 11,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 12,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 13,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 14,
              },
              {
                title: `Capitulo ${Math.floor(Math.random() * 100)}`,
                order: 15,
              },
            ],
          },
          comments: {
            create: fakeCommentsData().map((comment) => ({
              authorId: kody.id,
              ...comment,
            })),
          },
        },
      });
    })
  );
}

seed();
