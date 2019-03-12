import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest'
import { forEachObjIndexed } from 'ramda'

interface RetryArgs {
  orderGroup: string
  instanceId: string
  workflowId: string
}

const withVtexProxyTo: Modifier = (opts: ModOpts, {vtex: {account}}: Context) => {
  const {headers} = opts
  headers.set('X-Vtex-Proxy-To', `https://${account}.vtexcommercestable.com.br`)
  return opts
}

export class SubscriptionsGroupDataSource extends OutboundDataSource<Context> {
  protected modifiers = [
    withLegacyUserAuth,
    withOutboundAuth,
    withVtexProxyTo,
  ]
  
  public retry = ({ orderGroup, instanceId, workflowId }: RetryArgs) => {
    return this.http.post(`${orderGroup}/instances/${instanceId}/workflow/${workflowId}/retry`)
  }

  get baseURL() {
    const { vtex: { account } } = this.context

    return `http://${account}.vtexcommercestable.com.br/api/rns/subscriptions-group`
  }

  // protected willSendRequest(request: RequestOptions) {
  //   const { cookies, vtex: { account, authToken } } = this.context
  //   const client = cookies.get('VtexIdclientAutCookie')

  //   forEachObjIndexed(
  //     (value: string, header) => request.headers.set(header, value),
  //     {
  //       'Cookie': `VtexIdClientAutCookie=${client}`,
  //       'Proxy-Authorization': authToken,
  //       'X-Vtex-Proxy-To': `https://${account}.vtexcommercestable.com.br`,
  //     }
  //   )
  // }
}
