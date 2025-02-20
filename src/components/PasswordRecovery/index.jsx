import HeadingTitle from "./HeadingTitle";
import Form from "./Form";

export const PasswordRecovery = () => {
  return (
    <section className="container-page-v8 my-8 sm:px-0 px-8">
      {/* Request password changes */}
      <HeadingTitle />

      {/* Form email */}
      <Form />
    </section>
  );
};
