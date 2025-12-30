import BottomContent from "./BottomContent";
import HeadingTitle from "./HeadingTitle";
import Form from "./Form";

// React imports
import { Suspense } from "react";

export const Authenticator = () => {
  return (
    <section className="container-page-v8 sm:px-0 px-8">
      <div className="sm:my-8 my-4 rounded-[32px]">
        {/* Heading title */}
        <HeadingTitle />

        {/* Login with verification code */}
        <Suspense>
          <Form />
        </Suspense>

        {/* Other options (Contact support) and texts... */}
        <BottomContent />
      </div>
    </section>
  );
};
