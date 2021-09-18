import { useMemo } from "react";
import { baseAPI } from "../../config";

import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import 'react-quill/dist/quill.snow.css'; // ES6



Quill.register("modules/imageUploader", ImageUploader);

const Editor = ({ editorRef, value, onChange }) => {
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
        defaultValue={value}
        onChange={onChange}
      ></ReactQuill>
    </>
  );
};

export default Editor;
