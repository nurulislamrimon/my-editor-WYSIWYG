/* eslint-disable react/prop-types */
import "./editor.css";

function EditorMarkup({
  editorRef,
  handleToolbarClick,
  handleSetInputInState,
  handleImageUpload,
  handleImageClick,
  handleRemoveImage,
  selectedImage,
}) {
  return (
    <div className="es--editor-container">
      {/* Toolbar with formatting, alignment, and image upload */}
      <div className="toolbar">
        <div>
          <button onClick={handleToolbarClick} value="bold" aria-label="Bold">
            Bold
          </button>
          <button
            onClick={handleToolbarClick}
            value="italic"
            aria-label="Italic"
          >
            Italic
          </button>
          <button
            onClick={handleToolbarClick}
            value="underline"
            aria-label="Underline"
          >
            Underline
          </button>
        </div>
        <div>
          <button
            onClick={handleToolbarClick}
            value="justifyLeft"
            aria-label="Align Left"
            className="align align-left"
          ></button>
          <button
            onClick={handleToolbarClick}
            value="justifyCenter"
            aria-label="Align Center"
            className="align align-center"
          >
            {" "}
          </button>
          <button
            onClick={handleToolbarClick}
            value="justifyRight"
            aria-label="Align Right"
            className="align align-right"
          ></button>
        </div>
        <div>
          <input
            type="file"
            onChange={handleImageUpload}
            aria-label="Upload Image"
          />
          <button
            onClick={handleRemoveImage}
            disabled={!selectedImage}
            aria-label="Remove Image"
          >
            Remove Image
          </button>
        </div>
      </div>

      {/* The contentEditable div where users type */}
      <div
        ref={editorRef}
        onInput={handleSetInputInState}
        onClick={handleImageClick}
        contentEditable
        className="editor-content"
      />
    </div>
  );
}

export default EditorMarkup;
