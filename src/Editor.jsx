import { useState, useRef } from "react";
import EditorMarkup from "./EditorMarkup";

function Editor() {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // set input
  const handleSetInputInState = () => {
    setContent(editorRef.current.innerHTML);
  };
  // handle focus editor
  const focusEditor = () => {
    editorRef.current.focus();
  };

  // handle toolbar clicked
  const handleToolbarClick = (event) => {
    if (event.target.tagName === "BUTTON") {
      document.execCommand(event.target.value.toLowerCase());
      focusEditor();
    }
  };
  // handle insert image in markup
  const insertImageInMarkup = (imageUrl) => {
    const editor = editorRef.current;

    // Save the current selection and range
    const selection = window.getSelection();

    // Insert the image
    document.execCommand("insertImage", false, imageUrl);

    // Create a text node after the image to ensure you can type immediately after it
    const image =
      editor.getElementsByTagName("img")[
        editor.getElementsByTagName("img").length - 1
      ];

    if (image) {
      // Create a new text node and insert it after the image
      const textNode = document.createTextNode("\u00A0"); // Non-breaking space
      image.parentNode.insertBefore(textNode, image.nextSibling);

      // Move cursor to the newly created text node
      const newRange = document.createRange();
      newRange.setStart(textNode, 0); // Set cursor at the start of the text node
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }

    // Update content state
    handleSetInputInState();
  };
  // handle upload image in the server and insert
  const handleImageUpload = async (event) => {
    focusEditor();
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const imageURL = URL.createObjectURL(file);
    insertImageInMarkup(imageURL);
  };
  // handle clicked image to remove
  const handleImageClick = (event) => {
    if (event.target.tagName === "IMG") {
      setSelectedImage(event.target);
    } else {
      setSelectedImage(null);
    }
  };
  // handle remove image
  const handleRemoveImage = () => {
    if (selectedImage) {
      selectedImage.remove();
      setSelectedImage(null);
      handleSetInputInState();
    }
  };

  return (
    <EditorMarkup
      editorRef={editorRef}
      handleToolbarClick={handleToolbarClick}
      handleSetInputInState={handleSetInputInState}
      handleImageUpload={handleImageUpload}
      handleImageClick={handleImageClick}
      handleRemoveImage={handleRemoveImage}
      selectedImage={selectedImage}
    />
  );
}

export default Editor;
