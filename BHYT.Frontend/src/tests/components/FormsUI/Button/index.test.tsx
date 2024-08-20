import { Formik, Form } from "formik";
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from "../../../../components/FormsUI/Button";

test("Button mounts properly", () => {
  render(
    <Formik
      initialValues={{}}
      onSubmit={() => {
        console.log("here");
      }}
    >
      <Form>
        <Button>Thông tin cá nhân</Button>
      </Form>
    </Formik>
  );
  expect(screen.getByText("Thông tin cá nhân")).toBeInTheDocument();
});
