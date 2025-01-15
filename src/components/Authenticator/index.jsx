import SectionHeader from "../Globals/SectionHeader";
import { SparkleIcon } from "../Icons";
import { Suspense } from "react";
import Form from "./Form";

export const Authenticator = () => {
  return (
    <section className="container-page-v8 sm:px-0 px-8">
      <div className="sm:my-8 my-4 rounded-[32px]">
        {/* Login with verification code */}
        <Suspense>
          <Form />
        </Suspense>
      </div>
    </section>
  );
};
