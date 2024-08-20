import { Formik, Form } from "formik";
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Select from "../../../../components/FormsUI/Select";

test("Select mounts properly", () => {
  render(
    <Formik
      initialValues={{}}
      onSubmit={() => {
        console.log("here");
      }}
    >
      <Form>
        <Select name="Test" options={[]} />
      </Form>
    </Formik>
  );
  expect(screen.getByTestId("ArrowDropDownIcon")).toBeInTheDocument();
});
