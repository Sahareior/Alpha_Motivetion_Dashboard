import Quill from "quill";
import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import "quill/dist/quill.snow.css"; // ✅ Styling
import "./editor.css";

const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div")
      );
      const quill = new Quill(editorContainer, {
        theme: "snow",
      });

      // ✅ Expose quill instance
      if (typeof ref === "function") {
        ref(quill);
      } else if (ref) {
        ref.current = quill;
      }

      // ✅ Handle both Delta and HTML
      if (defaultValueRef.current) {
        if (typeof defaultValueRef.current === "string") {
          // HTML string → insert into editor
          quill.clipboard.dangerouslyPasteHTML(
            0,
            defaultValueRef.current
          );
        } else {
          // Assume Delta object
          quill.setContents(defaultValueRef.current);
        }
      }

      // Listeners
      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        if (typeof ref === "function") {
          ref(null);
        } else if (ref) {
          ref.current = null;
        }
        container.innerHTML = "";
      };
    }, [ref]);

    useEffect(() => {
      if (ref?.current) {
        ref.current.enable(!readOnly);
      }
    }, [readOnly, ref]);

    return <div ref={containerRef} style={{ height: "40vh" }} />;
  }
);

Editor.displayName = "Editor";

export default Editor;
