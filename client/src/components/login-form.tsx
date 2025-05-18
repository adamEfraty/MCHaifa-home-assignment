import { Form, Formik } from "formik";
import { RenderField } from "./render-field";

// custom Formik form generator
export function FormGenerator({
  handleSubmit,
  validationSchema,
  initialValues,
  headerChildren = [],
  formData,
  footerChildren = [],
}: any) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex-center main-log-form">
          {headerChildren[0]?.()}
          <div className="form-body">
            {headerChildren[1]?.()}
            <section className="form-data">
              {headerChildren[2]?.()}
              {formData.map((data: any, idx: number) =>
                idx < formData.length - 1 ? (
                  <RenderField
                    name={data.name}
                    label={data.label}
                    placeholder={data.placeholder}
                    type={data.type}
                    dataArr={data.dataArr}
                  />
                ) : null
              )}
            </section>
            {footerChildren[0]?.()}
          </div>
          <button type="submit" disabled={isSubmitting}>
            {formData.at(-1).buttonText}
          </button>
          {footerChildren[1]?.()}
        </Form>
      )}
    </Formik>
  );
}