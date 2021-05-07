/** @jsxImportSource theme-ui */

import React from "react";
import "./App.css";
import { ThemeProvider } from "theme-ui";
import Foo from "./components/Foo";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((config) => setData(config));
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  } else {
    return (
      <ThemeProvider theme={data.theme}>
        <p sx={{backgroundColor: 'primaryBackground'}}>
          <Foo text={data.title} />
        </p>
      </ThemeProvider>
    );
  }
}

export default App;
