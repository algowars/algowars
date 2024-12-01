export interface EntityDomainFactory<IDomain, IEntity> {
  create(options: any): IDomain;
  createFromEntity(entity: IEntity): IDomain;
  createEntityFromDomain(domain: IDomain): IEntity;
}
