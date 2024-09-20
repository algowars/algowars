import { domainGenerator } from "./generators/domain";

export default function (
  /*
   * @type import('plop').NodePlopAPI
   */
  plop,
) {
  plop.setGenerator("domain", domainGenerator);
}
