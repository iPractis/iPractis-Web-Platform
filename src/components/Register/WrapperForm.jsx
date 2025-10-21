import SectionHeader from "../Shared/SectionHeader";
import Form from "./Form";

// Icons
import { SparkleIcon, UserAddCircleIcon } from "../Icons";

const WrapperForm = () => {
  return (
    <>
      {/* Heading Title */}
      <SectionHeader
        descriptionText="Create an account to begin your journey with iPractis."
        titleText="Welcome on iPractis!"
        titleIcon={
          <div 
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              padding: '14px',
              gap: '10px',
              opacity: 1,
              backgroundColor: 'white'
            }}
            className="flex items-center justify-center"
          >
            <SparkleIcon />
          </div>
        }
        wrapperSectionHeaderClassName={
          "bg-[#F8F7F5] rounded-[32px] p-8 -ml-1.5"
        }
        titleClassName="MT-SB-1"
        descriptionClassName="mt-0.5"
      />

      {/* Sign Up Section */}
      <div className="sm:px-8 sm:mt-[50px] mt-8">
        <SectionHeader
          descriptionText="Enter your details to create a secure account."
          wrapperSectionHeaderClassName={"px-0 -ml-1.5"}
          titleText="Create an account using ID"
          titleIcon={
            <div 
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '16px',
                padding: '14px',
                gap: '10px',
                opacity: 1,
                backgroundColor: '#F8F7F5'
              }}
              className="flex items-center justify-center"
            >
              <UserAddCircleIcon />
            </div>
          }
          descriptionClassName="mt-0.5"
          titleClassName="MT-SB-1"
        />

        {/* Sign up form inputs */}
        <Form />
      </div>
    </>
  );
};

export default WrapperForm;
