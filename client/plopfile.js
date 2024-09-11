import { componentGenerator } from "./generators/component/index.js";
import { routeGenerator } from "./generators/route/index.js";

export default function (
  /*
   * @type import('plop').NodePlopAPI
   */
  plop
) {
  // create your generators here
  plop.setGenerator("route", routeGenerator);
  plop.setGenerator("component", componentGenerator);
}
