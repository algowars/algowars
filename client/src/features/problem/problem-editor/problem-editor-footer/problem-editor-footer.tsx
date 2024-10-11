import { Button } from "@/components/ui/button";

export const ProblemEditorFooter = () => {
  return (
    <footer className="flex items-center px-5 pb-5">
      <ul className="flex items-center gap-5 ml-auto">
        <li>
          <Button variant="secondary" className="w-28">
            Run
          </Button>
        </li>
        <li>
          <Button className="w-28">Submit</Button>
        </li>
      </ul>
    </footer>
  );
};
