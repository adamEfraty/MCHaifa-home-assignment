import { ErrorMessage, Field } from "formik";

export function RenderField({
  name,
  label = "",
  type = "text",
  placeholder = "",
  dataArr = null,
}: any) {
  return (
    <div className={`columned-flex ${name}-section form-section`}>
      <label htmlFor={name}>{label || `Your ${name}`}</label>
      {type === "select" ? (
        <Field name={name} as="select">
          <option value="">Select your instrument</option>
          {dataArr.map((data: any, idx: number) => (
            <option key={idx} value={data}>
              {data}
            </option>
          ))}
        </Field>
      ) : (
        <Field
          name={name}
          type={type}
          placeholder={placeholder || `Enter your ${name}`}
        />
      )}
      <ErrorMessage name={name} component="div" className="error-msg" />
    </div>
  );
}
