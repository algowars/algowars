export interface EntityDomainFactory<IDomain> {
  create(options: any): IDomain;
}
