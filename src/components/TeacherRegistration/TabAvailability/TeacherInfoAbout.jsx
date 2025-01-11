const TeacherInfoAbout = () => {
  return (
    <article className="px-4">
      {/* FROM SM TO BOTTOM IS VISIBLE */}
      <ul className="sm:hidden flex items-center gap-2.5 mt-5">
        <li className="flex items-center gap-[5px]">
          <p className="ST-SB-2 text-primary-color-P1">English</p>

          <p className="ST-SB-1 py-[2px] px-1.5 rounded-md bg-primary-color-P1 text-primary-color-P12">
            Native
          </p>
        </li>

        <li className="flex items-center gap-[5px]">
          <p className="ST-SB-2 text-primary-color-P1">French</p>
          <p className="ST-1 py-[2px] px-1.5 rounded-md bg-quinary-color-VS10 text-primary-color-P1">
            Fluent C2
          </p>
        </li>

        <li className="flex items-center gap-[5px]">
          <p className="ST-SB-2 text-primary-color-P1">Spanish</p>
          <p className="ST-1 py-[2px] px-1.5 rounded-md bg-quaternary-color-A10 text-primary-color-P1">
            Medium B1
          </p>
        </li>
      </ul>

      <div className="py-4 mt-5">
        <h3 className="MT-SB-1 text-primary-color-P1 mb-2.5">About me</h3>
        <p className="ST-3 text-primary-color-P4 mb-[26px]">
          Hi everyone! My name is Irina and, as an English teacher, I'll be
          happy to help you to acquire and develop the necessary skills in
          speaking, listening, reading, and writing. I use different teaching
          techniques, taking into...
        </p>

        <div className="flex gap-4">
          <button
            type="button"
            className="btn btn-primary MT-SB-1 p-1.5 rounded-2xl h-12"
          >
            Teaches all levels
          </button>

          <button
            type="button"
            className="btn btn-primary MT-SB-1 p-1.5 rounded-2xl h-12"
          >
            Teaches all ages
          </button>
        </div>
      </div>

      <div className="py-4 mt-5">
        <h2 className="MT-SB-1 text-primary-color-P1 mb-5">
          Friendly and fun Native English Speaker teaching conversational
          English
        </h2>
        <p className="ST-3 text-primary-color-P4">
          Hi everyone! My name is Irina and, as an English teacher, I'll be
          happy to help you to acquire and develop the necessary skills in
          speaking, listening, reading, and writing. I use different teaching
          techniques, taking into...
        </p>
      </div>
    </article>
  );
};

export default TeacherInfoAbout;
