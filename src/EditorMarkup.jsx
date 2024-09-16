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
        <button onClick={handleToolbarClick} value="bold" aria-label="Bold">
          Bold
        </button>
        <button onClick={handleToolbarClick} value="italic" aria-label="Italic">
          Italic
        </button>
        <button
          onClick={handleToolbarClick}
          value="underline"
          aria-label="Underline"
        >
          Underline
        </button>
        <button
          onClick={handleToolbarClick}
          value="justifyLeft"
          aria-label="Align Left"
        >
          Align Left
        </button>
        <button
          onClick={handleToolbarClick}
          value="justifyCenter"
          aria-label="Align Center"
        >
          Align Center
        </button>
        <button
          onClick={handleToolbarClick}
          value="justifyRight"
          aria-label="Align Right"
        >
          Align Right
        </button>
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
