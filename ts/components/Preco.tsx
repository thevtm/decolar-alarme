'use strict'

/* LIBS */
import * as React from 'react'
import { getJSON } from 'jquery'
import { DecolarData } from 'decolar-scraper'
import * as _ from 'lodash'

/* EXEC */

export interface PrecoProps { url: string, urlData: string }
interface PrecosStatePreco { preco: number, mask: string, datahora: Date }
interface PrecoState {
  inicializando: boolean,
  timerID?: number,
  partida?: string,
  chegada?: string,
  provedor?:string,
  precos: PrecosStatePreco[]
}

export class Preco extends React.Component<PrecoProps, PrecoState> {
  constructor (props: PrecoProps) {
    super(props)

    // 1. Define state inicial
    this.state = {
      inicializando: true,
      precos: new Array<PrecosStatePreco>()
    }
  }

  componentDidMount () {
    // 1. Obtem preco e atualiza state
    this.updateState()

    // 2. Repete a cada 30s
    const REPEAT_TIME = 30 * 1000
    const timerID = setInterval(this.updateState.bind(this), REPEAT_TIME)
    this.setState((state) => ({timerID: timerID}))
  }

  renderPrecos () {
    const { precos } = this.state

    return precos.map(p => {
      const { preco, mask, datahora } = p

      return (
        <div key={datahora.getTime()} className="row">
          <div className="pull-left">
            {datahora.toLocaleTimeString()}
          </div>

          <div className="pull-right">
            {`${mask} ${preco}`}
          </div>
        </div>
      )
    })
  }

  render () {
    const { inicializando } = this.state
    if (inicializando) {
      return (
        <div className="panel panel-default">
          <div className="panel-heading">
            Carregando...
          </div>
        </div>
      )
    }

    const { partida, chegada, provedor, precos } = this.state
    const preco = precos[0].preco
    const mask = precos[0].mask

    return (
      <div className="panel panel-default">
        <div className="panel-heading">

          <div className="panel-title pull-left">
            {provedor} | {partida} > {chegada}
          </div>

          <div className="panel-title pull-right">
            {`${mask} ${preco}`}
          </div>

          <div className="clearfix"></div>
        </div>
        <div className="panel-body">
          {this.renderPrecos()}
        </div>
      </div>
    )
  }


  updateState() {
    return getJSON(`https://vtm-cors-proxy.herokuapp.com/${this.props.urlData}`)
      .then((json: DecolarData) => {
        const precos = this.state.precos
        const data = json.result.data!
        const items = data.items
        const cities = data.cities
        const airlines = data.airlines
        const minItem = _.minBy(items, 'emissionPrice.total.fare.raw')

        const partida: string = cities[minItem.itinerariesBox.outboundLocations.departure.code]
        const chegada: string = cities[minItem.itinerariesBox.outboundLocations.arrival.code]
        const provedor: string = minItem.provider
        const preco: number = minItem.emissionPrice.total.fare.raw
        const mask:string = minItem.emissionPrice.total.fare.formatted.mask

        let newPrecos = precos.slice(0)
        newPrecos.unshift({ preco: preco, mask: mask, datahora: new Date()} as PrecosStatePreco)

        this.setState((state) => ({
          inicializando: false,
          partida: partida,
          chegada: chegada,
          provedor: provedor,
          precos: newPrecos
        }))
      }
    )
  }
}