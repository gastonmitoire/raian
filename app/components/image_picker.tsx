import React from "react";

import { Image } from "@prisma/client";

interface ImagePickerProps {
  images: Image[];
  name: string;
  selectedImage?: Image["url"];
  onSelectImage: (image: Image) => void;
}

export function ImagePicker({
  images,
  name,
  selectedImage,
  onSelectImage,
}: ImagePickerProps) {
  return (
    <fieldset className="grid grid-cols-4 gap-3">
      {images.map((image) => (
        <div key={image.id} className="flex">
          <label>
            <input
              className="mr-2"
              type="radio"
              name={name}
              id={`${name}-${image.filename}`}
              value={image.url}
              defaultChecked={selectedImage === image.url}
            />
            <img className="w-20 h-20 object-cover" src={image.url} alt="" />
          </label>
        </div>
      ))}
    </fieldset>
  );
}
