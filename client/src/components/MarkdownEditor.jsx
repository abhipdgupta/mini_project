import React, { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

import styles from "../css/markdownEditor.module.css";

export const MarkdownEditor = () => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles.markdown_editor_wrapper}>
      <div className={styles.writing_board}>
        <h1>Markdown</h1>
        <textarea
          name="markdown_content"
          id="markdown_content"
          value={input}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className={styles.preview_board}>
        <h1>Preview</h1>
        <div className={styles.preview}>
          <ReactMarkdown  remarkPlugins={[remarkGfm]} >{input}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
