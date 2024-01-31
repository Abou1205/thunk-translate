import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../constant";

// thunk action
export const getLanguages = createAsyncThunk(
  "translate/getLanguages",
  async () => {
    // get data from api
    const res = await axios.request(options);

    // return data as action payload
    return res.data.data.languages;
  }
);

// translate action and import store
export const translateText = createAsyncThunk(
  "translate/text",
  async ({ text, sourceLang, targetLang }) => {
    // api settings
    const encodedParams = new URLSearchParams();
    encodedParams.set("source_language", sourceLang.value);
    encodedParams.set("target_language", targetLang.value);
    encodedParams.set("text", text);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "d52026df1dmsha23929640badcd7p19c58bjsn535c8fbb6a14",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: encodedParams,
    };

    // api request
    const res = await axios.request(options);

    // return action payload
    return res.data.data.translatedText
  }
);
