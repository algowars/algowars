import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { testSetupService } from "../services/test-setup.service";
import CodeEditor from "@/components/code-editor/code-editor";

const TestSetupList = () => {
  const [page] = useState<number>(1);
  const [size] = useState<number>(25);
  const [timestamp] = useState<Date>(new Date());

  const { getAccessTokenSilently } = useAuth0();

  const { data } = useQuery({
    queryKey: ["test-setup-list", page, size, timestamp],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();

      return testSetupService.getPageable(accessToken, page, size, timestamp);
    },
  });
  return data?.results ? (
    <ul>
      {data.results.map((setup) => (
        <li key={setup.id}>
          <h5>{setup.id}</h5>
          <CodeEditor
            code={setup.header}
            changeCode={() => {}}
            className="border rounded h-64 overflow-y-auto"
          />
        </li>
      ))}
    </ul>
  ) : null;
};

export default TestSetupList;
