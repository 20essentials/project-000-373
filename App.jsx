import React, { useEffect, useRef } from "react";
import { styled } from "@linaria/react";
import { createRoot } from "react-dom/client";

const GlobalStyle = styled.div`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue';
  }

  a {
    -webkit-tap-highlight-color: transparent;
  }

  html {
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: white transparent;
  }

  body {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    place-content: center;
    position: relative;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    background-image: url('assets/texture.svg');
    background-size: 50px;
    opacity: 0.1;
  }
`;

const ContainerLetters = styled.main`
  width: 220px;
  height: 220px;
  position: relative;
  background-color: #fff4;
  border-radius: 50%;
  transform: scale(0.8);
`;

const LetterStyled = styled.div`
  position: absolute;
  background-color: transparent;
  color: blue;
  font-weight: bold;
  text-transform: uppercase;
`;

const Letter = ({ content, style }) => {
  return <LetterStyled style={style}>{content}</LetterStyled>;
};

const App = () => {
  const lettersRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const message =
      "Code is magic where ideas become reality through pure logic";
    const n_letters = message.length;
    let angle = -Math.PI;
    const increase = (Math.PI * 2) / n_letters;
    const container = containerRef.current;
    lettersRef.current = message.split("").map((char, i) => {
      return {
        char,
        width: 150,
        height: 150,
        x: 0,
        y: 0,
        deg: 0,
      };
    });

    const update = () => {
      const rx = 100 * Math.cos(angle) + 110;
      const ry = 100 * Math.sin(angle) + 110;
      let a = angle;

      lettersRef.current = lettersRef.current.map((l) => {
        const x = 80 * Math.cos(a) + rx;
        const y = 80 * Math.sin(a) + ry;
        const deg = Math.atan2(y - ry, x - rx) * (180 / Math.PI) + 45;
        a += increase;
        return {
          ...l,
          x,
          y,
          deg,
        };
      });

      angle += 0.04;
      container?.forceUpdate?.(); // force render if needed
    };

    const interval = setInterval(update, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <GlobalStyle>
      <ContainerLetters ref={containerRef}>
        {lettersRef.current.map((l, i) => (
          <Letter
            key={i}
            content={l.char}
            style={{
              width: `${l.width}px`,
              height: `${l.height}px`,
              left: `${l.x - l.width / 2}px`,
              top: `${l.y - l.height / 2}px`,
              transform: `rotate(${l.deg}deg)`,
              position: "absolute",
            }}
          />
        ))}
      </ContainerLetters>
    </GlobalStyle>
  );
};

const rootElement = document.createElement("div");
document.body.appendChild(rootElement);

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
