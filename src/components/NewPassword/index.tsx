import HeadingTitle from "./HeadingTitle";
import Form from "./Form";

// React imports
import { Suspense } from "react";

export const NewPassword = () => {
  return (
    <section className="container-page-v8 my-8 sm:px-0 px-8">
      {/* Make a new password */}
      <HeadingTitle />

      {/* Form passwords */}
      <Suspense>
        <Form />
      </Suspense>
    </section>
  );
};
