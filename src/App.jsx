import { useEffect, useRef, useState } from "react";

function App() {
  const tags = { P: "p", H1: "h1", H2: "h2", H3: "h3", IMAGE: "img" };
  const [selectedTag, setSelectedTag] = useState(tags.P); // Default tag is 'p'
  const [editorData, setEditorData] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const editorRef = useRef(null);

  // handle selected text
  useEffect(() => {
    const editor = editorRef.current;

    const handleSelection = () => {
      const { selectionStart, selectionEnd, value } = editor;
      if (selectionStart !== selectionEnd) {
        setSelectedText(value.substring(selectionStart, selectionEnd));
      }
    };

    editor.addEventListener("select", handleSelection);

    // Cleanup listener on unmount
    return () => {
      editor.removeEventListener("select", handleSelection);
    };
  }, []);

  // Focus on the textarea when label is clicked
  const handleLabelClick = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed");
    }
  };

  return (
    <main>
      <div className="editor-container">
        <label
          htmlFor="es-editor"
          className="es-editor-header"
          onClick={handleLabelClick}
        >
          {Object.entries(tags).map(([k, v]) => (
            <button
              key={v}
              onClick={() => setSelectedTag(v)}
              className={selectedTag === v ? "selected" : ""}
            >
              {k}
            </button>
          ))}
        </label>
        <textarea
          ref={editorRef}
          name="es-editor"
          onKeyDown={handleKeyDown}
          id="es-editor"
        ></textarea>
        <div>
          <p>Selected Text: {selectedText}</p>
        </div>
      </div>
    </main>
  );
}

export default App;
