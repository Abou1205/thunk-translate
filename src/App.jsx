import React from "react";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "./redux/actions/translateAction";
import Select from "react-select";
import Loader from "./components/Loader";
import { setAnswer } from "./redux/slices/translateSlice";

const App = () => {
  const dispatch = useDispatch();

  const languageSlice = useSelector((store) => store.languageSlice);
  const translateSlice = useSelector((store) => store.translateSlice);

  const [text, setText] = useState();

  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });

  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });

  // get data from api and import to store
  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  // ! The top-level code here was causing calculations to be repeated every time the component rendered. To prevent unnecessary calculations that could potentially slow down the project, we addressed this issue by using useMemo.
  const data = useMemo(
    () =>
      languageSlice.languages.map((i) => ({
        value: i.code,
        label: i.name,
      })),
    [languageSlice.languages]
  );

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    // text area swap
    setText(translateSlice.answer)

    // text area swap 
    dispatch(setAnswer(text))
  };

  return (
    <div id="main-page">
      <div className="container">
        <h1>GlobalLingo</h1>
        {/* top */}
        <div className="top">
          <Select
            value={sourceLang}
            onChange={setSourceLang}
            className="select"
            options={data}
            isLoading={languageSlice.isLoading}
            isDisabled={languageSlice.isLoading}
          />
          <button onClick={handleSwap}>Swap</button>
          <Select
            value={targetLang}
            onChange={setTargetLang}
            className="select"
            options={data}
            isLoading={languageSlice.isLoading}
            isDisabled={languageSlice.isLoading}
          />
        </div>
        {/* middle */}
        <div className="middle">
          <div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div>
            <textarea disabled value={translateSlice.answer} />
            {translateSlice.isLoading && (
              <div className="wrapper">
                <Loader />
              </div>
            )}
          </div>
        </div>

        {/* bottom */}
        <div className="bottom">
          <button
            onClick={() =>
              dispatch(translateText({ text, sourceLang, targetLang }))
            }
          >
            Translate
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
