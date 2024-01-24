import { Badge } from "@/components/ui/badge";
import Markdown from "react-markdown";

const ProblemInfo = () => {
  const question = `Given an integer \`n\`, return _a string array_ \`answer\` _(**1-indexed**) where_:

  *   \`answer[i] == "FizzBuzz"\` if \`i\` is divisible by \`3\` and \`5\`.
  *   \`answer[i] == "Fizz"\` if \`i\` is divisible by \`3\`.
  *   \`answer[i] == "Buzz"\` if \`i\` is divisible by \`5\`.
  *   \`answer[i] == i\` (as a string) if none of the above conditions are true.
  
  **Example 1:**
  
  **Input:** n = 3
  **Output:** \["1","2","Fizz"\]
  
  **Example 2:**
  
  **Input:** n = 5
  **Output:** \["1","2","Fizz","4","Buzz"\]
  
  **Example 3:**
  
  **Input:** n = 15
  **Output:** \["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"\]
  
  **Constraints:**
  
  *   \`1 <= n <= 104\``;

  return (
    <div className="p-5 flex flex-col gap-5 h-full overflow-y-scroll">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">198. House Robber</h2>
        <ul className="flex gap-3">
          <li>
            <Badge variant="secondary">Medium</Badge>
          </li>
          <li>
            <Badge variant="secondary">Topics</Badge>
          </li>
          <li>
            <Badge variant="secondary">Companies</Badge>
          </li>
        </ul>
      </div>
      <div>
        <Markdown
          components={{
            code(props) {
              const { children } = props;
              return (
                <code className="px-1.5 border border-gray-700 bg-gray-800 rounded inline-block">
                  {children}
                </code>
              );
            },
            p: ({ children }) => <p className="mb-3">{children}</p>,
            ul: ({ children }) => (
              <ul className="list-disc ml-5 mb-4">{children}</ul>
            ),
            li: ({ children }) => <li className="mb-4">{children}</li>,
            strong: ({ children }) => (
              <strong className="font-bold text-white">{children}</strong>
            ),
          }}
        >
          {question}
        </Markdown>
      </div>
    </div>
  );
};

export default ProblemInfo;
