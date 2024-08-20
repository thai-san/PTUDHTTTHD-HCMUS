import { Formik, Form } from "formik";
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Checkbox from "../../../../components/FormsUI/Checkbox";

test("Checkbox mounts properly", () => {
  render(
    <Formik
      initialValues={{}}
      onSubmit={() => {
        console.log("here");
      }}
    >
      <Form>
        <Checkbox name={undefined} label="Test" legend={undefined} />
      </Form>
    </Formik>
  );
  expect(screen.getByText("Test")).toBeInTheDocument();
});
