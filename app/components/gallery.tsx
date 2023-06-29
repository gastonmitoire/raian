import React from "react";

import { Image } from "@prisma/client";

export function Gallery({ images }: { images: Image[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image) => (
        <div key={image.id} className="relative">
          <img
            src={image.url}
            alt={image.filename}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
