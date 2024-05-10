import { createPortal } from "react-dom";
import Title from "../Typography/Title";
import { useEffect, useState } from "react";

export default function TitlePage({ children }) {
    const [domReady, setDomReady] = useState(false);

    useEffect(() => {
        setDomReady(true);
        console.log(document.getElementById("titlePage"));
    }, []);

    return domReady
        ? createPortal(
              <Title>{children}</Title>,
              document.getElementById("titlePage")
          )
        : null;
}
