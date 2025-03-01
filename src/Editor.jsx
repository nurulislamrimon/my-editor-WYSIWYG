import { useState, useRef, useEffect } from "react";
import EditorMarkup from "./EditorMarkup";

function Editor() {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  console.log(content);

  // prevent user from leaving page without saving
  useEffect(() => {
    window.addEventListener("beforeunload", function (event) {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave?";
    });
  });

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
    const command = event.target.value;
    if (command === "h1" || command === "h2" || command === "p") {
      document.execCommand(
        "formatBlock",
        false,
        command === "p" ? "p" : `<${command}>`
      );
    } else if (event.target.tagName === "BUTTON") {
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

  // handle key down to prevent image remove when pressing backspace
  const handleKeyDown = (event) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    if (event.key === "Backspace" && range) {
      if (range.collapsed) {
        const nodeBefore = range.startContainer.previousSibling;
        if (nodeBefore && nodeBefore.tagName === "IMG") {
          event.preventDefault();
        }
      }
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
      handleKeyDown={handleKeyDown}
    />
  );
}

export default Editor;
