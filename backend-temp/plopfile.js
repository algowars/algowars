import { domainGenerator } from "./generators/domain/index.js";

export default function (
  /*
   * @type import('plop').NodePlopAPI
   */
  plop,
) {
  plop.setGenerator("domain", domainGenerator);
}
