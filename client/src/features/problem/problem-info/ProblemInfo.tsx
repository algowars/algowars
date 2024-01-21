import { Badge } from "@/components/ui/badge";
import Markdown from "react-markdown";

const ProblemInfo = () => {
  const question = `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

**Example 1:**

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

**Example 2:**

Input: nums = [3,2,4], target = 6
Output: [1,2]

**Example 3:**

Input: nums = [3,3], target = 6
Output: [0,1]

Constraints:

2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
Only one valid answer exists.

Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?`;

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
