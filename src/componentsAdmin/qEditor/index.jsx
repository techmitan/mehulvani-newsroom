import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6

const Editor = ({ editorRef, value, onChange }) => {
  let modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link"],
      ["clean"],
      [{ color: [] }],
    ],
  };

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
