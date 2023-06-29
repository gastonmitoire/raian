import { db } from "~/utils/db.server";

export const fakeUsers = [
  db.user.create({
    data: {
      username: "kody",
      // this is a hashed version of "twixrox"
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
      email: "kody@kody.com",
      profile: {
        create: {
          displayName: "Kody Smith",
          bio: "Hi, I'm Kody!",
          image: "https://example.com/avatar.jpg",
          firstName: "Kody",
          lastName: "Smith",
          dateOfBirth: new Date("1995-05-07T00:00:00.000Z"),
        },
      },
    },
  }),
  db.user.create({
    data: {
      username: "maco",
      // this is a hashed version of "twixrox"
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
      email: "elmaco0381@gmail.com",
      profile: {
        create: {
          displayName: "Maco",
          bio: "Hi, I'm Maco!",
          image:
            "https://3.bp.blogspot.com/-iYQrryWSwto/WjZWMkh6g4I/AAAAAAAABjo/BHha8VhFD6MRDB3ipyoAAe8HgM_oXAEtgCLcBGAs/s320/FB_IMG_15126431820236753.jpg",
          firstName: "Maco",
          lastName: "Pacheco",
          dateOfBirth: new Date("1976-05-07T00:00:00.000Z"),
        },
      },
    },
  }),
  db.user.create({
    data: {
      username: "edicionesdelapaz",
      // this is a hashed version of "twixrox"
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
      email: "edicionesdelapaz@gmail.com",
      profile: {
        create: {
          displayName: "Ediciones de la Paz",
          bio: "Hi, I'm Ediciones de la Paz!",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-tienda-media.chaco.gob.ar%2Fpub%2Fmedia%2Favatar%2FLOGO-30A_OS-LAPAZ-2020-AMARILLO_1.png&f=1&nofb=1&ipt=27b7af55c1a9dc7f3158466a03bdb09f0dcd15c7c52a8e217cff60f749415e22&ipo=images",
          firstName: "Ediciones",
          lastName: "de la Paz",
          dateOfBirth: new Date("1976-05-07T00:00:00.000Z"),
        },
      },
    },
  }),
];
