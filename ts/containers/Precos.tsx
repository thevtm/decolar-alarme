'use strict'

/* LIBS */
import * as React from "react"

import { Preco, PrecoProps } from '../components/Preco'

/* EXEC */

export interface PrecosProps { url: string }
interface PrecosState { url: string }

export class Precos extends React.Component<PrecosProps, {}> {
  constructor(props: PrecoProps) {
    super(props)
    
    this.state = INITIAL_STATE
  }
  render() {
    return <h1>Preco from {this.props.url}!</h1>
  }
}