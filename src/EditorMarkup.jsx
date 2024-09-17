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
  handleKeyDown,
}) {
  return (
    <div className="es--editor-container">
      <div className="toolbar">
        {/* bold italic and underline */}
        <div>
          <button
            title="Bold"
            onClick={handleToolbarClick}
            value="bold"
            aria-label="Bold"
          >
            B
          </button>
          <button
            title="Italic"
            onClick={handleToolbarClick}
            value="italic"
            aria-label="Italic"
          >
            I
          </button>
          <button
            title="Underline"
            onClick={handleToolbarClick}
            value="underline"
            aria-label="Underline"
          >
            U
          </button>
        </div>

        {/* alignment */}
        <div>
          <button
            title="Align Left"
            onClick={handleToolbarClick}
            value="justifyLeft"
            aria-label="Align Left"
            className="align align-left"
          ></button>
          <button
            title="Align Center"
            onClick={handleToolbarClick}
            value="justifyCenter"
            aria-label="Align Center"
            className="align align-center"
          >
            {" "}
          </button>
          <button
            title="Align Right"
            onClick={handleToolbarClick}
            value="justifyRight"
            aria-label="Align Right"
            className="align align-right"
          ></button>
        </div>

        {/* tags */}
        <div>
          <button
            title="Add a Title"
            onClick={handleToolbarClick}
            value="h1"
            aria-label="Heading 1"
          >
            H1
          </button>
          <button
            title="Add a Subtitle"
            onClick={handleToolbarClick}
            value="h2"
            aria-label="Heading 2"
          >
            H2
          </button>
          <button
            title="Add a Paragraph"
            onClick={handleToolbarClick}
            value="p"
            aria-label="Paragraph"
          >
            P
          </button>
        </div>

        {/* image upload and remove*/}
        <div>
          <button title="Upload an Image">
            <label
              htmlFor="photo"
              style={{ fontSize: "26px", marginTop: "-3px", cursor: "pointer" }}
            >
              🖼️
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              id="photo"
              onChange={handleImageUpload}
              aria-label="Upload Image"
            />
          </button>
          <button
            title="Select an Image to remove!"
            onClick={handleRemoveImage}
            disabled={!selectedImage}
            aria-label="Remove Image"
          >
            ❌
          </button>
        </div>
      </div>

      {/* The contentEditable div where users type */}
      <div
        ref={editorRef}
        onInput={handleSetInputInState}
        onClick={handleImageClick}
        onKeyDown={handleKeyDown}
        contentEditable
        className="editor-content"
      />
    </div>
  );
}

export default EditorMarkup;
