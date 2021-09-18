import React, { useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import { baseAPI } from "../../config";

import ImageUploader from "quill-image-uploader";

Quill.register("modules/imageUploader", ImageUploader);

const Editor = ({ editorRef }) => {
  let modules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
      [{ color: [] }],
    ],
    imageUploader: {
      upload: (file) => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("image", file);

          fetch(`${baseAPI}/api/media`, {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              resolve(data.url);
            })
            .catch((error) => {
              reject("Upload failed");
              console.error("Error:", error);
            });
        });
      },
    },
  }));

  return (
    <>
      <ReactQuill
        theme="snow"
        modules={modules}
        ref={editorRef}
      >
        <div className="my-editing-area" />
      </ReactQuill>
    </>
  );
};

export default Editor;
