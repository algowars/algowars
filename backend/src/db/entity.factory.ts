// Define a generic interface for an entity factory
export interface EntityFactory<Entity> {
  // Method to create an entity, accepting any number of arguments
  create(...args: any): Entity | Promise<Entity>; // Returns either an Entity or a Promise resolving to an Entity
}
