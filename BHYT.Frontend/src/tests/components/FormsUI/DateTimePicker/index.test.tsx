import { Formik, Form } from "formik";
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DateTimePicker from "../../../../components/FormsUI/DateTimePicker";

test("DateTimePicker mounts properly", () => {
  render(
    <Formik
      initialValues={{}}
      onSubmit={() => {
        console.log("here");
      }}
    >
      <Form>
        <DateTimePicker name="Test" />
      </Form>
    </Formik>
  );
  expect(screen.getByTestId("date")).toBeInTheDocument();
});
