import { CatalogDataSource } from './catalog'
import { IdentityDataSource } from './identity'
import { LogisticsDataSource } from './logistics'
import { OMSDataSource } from './oms'
import { ProfileDataSource } from './profile'
import { SessionDataSource } from './session'

export const dataSources = () => ({
  catalog: new CatalogDataSource(),
  identity: new IdentityDataSource(),
  logistics: new LogisticsDataSource(),
  oms: new OMSDataSource(),
  profile: new ProfileDataSource(undefined, { metrics }),
  session: new SessionDataSource(),
})
