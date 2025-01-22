import { Suspense } from "react";
import Form from "./Form";

const BottomColumn = () => {
  return (
    <div className="sm:px-8 mt-[50px]">
      <Suspense>
        <Form />
      </Suspense>
    </div>
  );
};

export default BottomColumn;
