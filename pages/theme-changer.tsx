import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { GetServerSideProps } from "next";

import {
  Card,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios";

import { Layout } from "../components/layouts";

const ThemeChanger: FC = (props) => {
  console.log({ props });

  const [currentTheme, setCurrentTheme] = useState("dark");

  const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = event.target.value;
    console.log({ selectedTheme });

    setCurrentTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    Cookies.set("theme", selectedTheme);
  };

  const onClick = async () => {
    const { data } = await axios.get("/api/hello");
    console.log({ data });
  };

  useEffect(() => {
    console.log(localStorage.getItem("theme"));
    console.log(Cookies.get("theme"));
  }, []);

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Tema</FormLabel>
            <RadioGroup value={currentTheme} onChange={onThemeChange}>
              <FormControlLabel
                value='light'
                control={<Radio />}
                label='Light'
              />
              <FormControlLabel value='dark' control={<Radio />} label='Dark' />
              <FormControlLabel
                value='custom'
                control={<Radio />}
                label='Custom'
              />
            </RadioGroup>
          </FormControl>
          <Button onClick={onClick}>Solicitud</Button>
        </CardContent>
      </Card>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { theme = "light", name = "No name" } = req.cookies;

  return {
    props: {
      theme: theme,
      name: name,
    },
  };
};

export default ThemeChanger;
