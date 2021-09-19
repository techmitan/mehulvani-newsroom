import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TinyEditor({ editorRef, value }) {
  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={value}
        apiKey="k7525t39xgl8ftq26fmv8uxvg3jcatjofnhlc820qnxpa7r8"
        init={{
          height: 350,
          menubar: false,
          plugins: [
            "advlist lists link charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic underline backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist | " +
            "removeformat ",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
        }}
      />
    </>
  );
}
