export interface EntityFactory<Entity> {
  create(...args: any): Entity | Promise<Entity>;
}
