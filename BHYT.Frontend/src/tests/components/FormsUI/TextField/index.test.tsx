import { Formik, Form } from "formik";
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TextField from "../../../../components/FormsUI/TextField";

test("TextField mounts properly", () => {
  render(
    <Formik
      initialValues={{}}
      onSubmit={() => {
        console.log("here");
      }}
    >
      <Form>
        <TextField name="Test" options={[]} />
      </Form>
    </Formik>
  );
  expect(screen.getByTestId("text")).toBeInTheDocument();
});
