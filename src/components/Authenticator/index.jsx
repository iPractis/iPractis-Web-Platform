import SectionHeader from "../Globals/SectionHeader";
import { SparkleIcon } from "../Icons";
import { Suspense } from 'react'
import Form from "./Form";

export const Authenticator = () => {
  return (
    <section className="container-page-v3">
      <div className="mt-2.5 p-4 md:mb-[100px] rounded-[32px] bg-primary-color-P11">
        <article>
          <div className="p-4">
            {/* Heading Title */}
            <SectionHeader
              descriptionText="Sign in to continue your journey with iPractis."
              titleClassName="MT-SB-1"
              titleText="Welcome back"
              titleIcon={<SparkleIcon />}
            />
          </div>

          {/* Login with verification code */}
          <Suspense>
          <Form />
          </Suspense >
        </article>
      </div>
    </section>
  );
};
