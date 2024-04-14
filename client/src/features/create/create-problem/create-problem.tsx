import CreateProblemMetadata from "./create-problem-metadata/create-problem-metadata";
import CreateProblemQuestion from "./create-problem-question/create-problem-question";
import CreateProblemSetup from "./create-problem-setup/create-problem-setup";

const CreateProblem = () => {
  return (
    <div className="p-5">
      <section className="grid grid-cols-12 gap-x-5 gap-y-6">
        <div className="col-span-6">
          <h4 className="font-semibold mb-3">Metadata</h4>
          <CreateProblemMetadata />
        </div>
        <div className="col-span-6">
          <h4 className="font-semibold mb-3">Question</h4>
          <CreateProblemQuestion />
        </div>
        <div className="col-span-6">
          <h4 className="font-semibold mb-3">Problem Setup</h4>
          <CreateProblemSetup />
        </div>
        <div className="col-span-6">
          <h4 className="font-semibold mb-3">Tests</h4>
        </div>
      </section>
      <section></section>
    </div>
  );
};

export default CreateProblem;
