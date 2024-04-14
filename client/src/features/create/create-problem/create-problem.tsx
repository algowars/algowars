import CreateProblemMetadata from "./create-problem-metadata/create-problem-metadata";
import CreateProblemQuestion from "./create-problem-question/create-problem-question";
import CreateProblemSetup from "./create-problem-setup/create-problem-setup";

const CreateProblem = () => {
  return (
    <div className="p-5">
      <section className="grid grid-cols-12 gap-5">
        <div className="col-span-6">
          <CreateProblemMetadata />
        </div>
        <div className="col-span-6">
          <CreateProblemQuestion />
        </div>
        <div className="col-span-12">
          <CreateProblemSetup />
        </div>
      </section>
      <section></section>
    </div>
  );
};

export default CreateProblem;
