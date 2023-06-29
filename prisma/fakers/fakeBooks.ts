export const fakeBooksData = () => [
  {
    title: "Criaturas Celestes",
    description:
      "Seres extra galácticos aterrizan en una chacra y entablan amistad con una familia de campesinos. Sobrevienen increíbles situaciones.",
    type: "novela",
    publicationDate: new Date("1996-01-01"),
    cover:
      "http://hugomitoire.com/mediafiles/portada_libros/image857_4UoPay5.png",
    secondaryImage:
      "http://4.bp.blogspot.com/-HZcfKBH2oX8/TaoW_Z7o4zI/AAAAAAAABAs/XCo1Oi2dsKw/s1600/C3+llegan+las+criaturas.jpg",
    genre: {
      create: {
        name: "Fantasia y ciencia ficcion",
        nameSlug: "fantasia-y-ciencia-ficcion",
        ageRange: "+9",
      },
    },
  },
  {
    title: "Cuentos de terror para Franco VIII",
    description: "Cuentos de terror, misterio y situaciones paranormales.",
    type: "cuento",
    publicationDate: new Date("1996-01-01"),
    cover: "http://hugomitoire.com/mediafiles/portada_libros/image1081.png",
    secondaryImage:
      "https://4.bp.blogspot.com/-GXrsM6D4Euc/Wl9GbwwRz4I/AAAAAAAABqE/XKEUVIplLnUsiDVqH2y5Mx04qtdGhqjpQCLcBGAs/s1600/El%2Bgallo.jpg",
    genre: {
      create: {
        name: "Terrror, misterio y situaciones paranormales",
        nameSlug: "terrror-misterio-y-situaciones-paranormales",
        ageRange: "+12",
      },
    },
  },
  {
    title: "La Chancha con ruleros",
    description:
      "Este libro-album pertenece a la Colección CURIOSA VIDA ANIMAL. Relata la afligida existencia de una chancha que quería tener el pelo enrulado.",
    type: "cuento",
    publicationDate: new Date("1996-01-01"),
    cover: "http://hugomitoire.com/mediafiles/portada_libros/image927.png",
    secondaryImage:
      "https://4.bp.blogspot.com/-S66uYEW2LjU/Wk1--I66qZI/AAAAAAAABkk/XgXis8zWNPcJF0KUUuU7dCmmQWuoozJewCPcBGAYYCw/s1600/chancha%2Bpag%2B012%2By%2B13.jpg",
    genre: {
      create: {
        name: "Vida animal y humor",
        nameSlug: "vida-animal-y-humor",
        ageRange: "+5",
      },
    },
  },
];
