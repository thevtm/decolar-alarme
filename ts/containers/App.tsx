'use strict'

/* LIBS */
import * as React from 'react'

import { Form } from '../components/Form'
import { Preco, PrecoProps } from '../components/Preco'

/* EXEC */

export interface AppProps { }
interface AppState {
  precos: PrecoProps[]
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    
    this.state = {
      precos: new Array<PrecoProps>()
    }
  }

  addPreco(url, urlData) {
    this.setState((state) => ({
      precos: this.state.precos.concat([{ url: url, urlData: urlData }])
    }))
  }

  renderPrecos() {
    const { precos } = this.state

    return precos.map(p => {
      const { url, urlData } = p
      
      return (
        <div key={urlData} className='row'>
          <Preco url={url} urlData={urlData} />
        </div>
      )
    })
  }

  render() {
    return (
      <div className='container'>

        <div className='row'>
          <Form onAdicionar={(url, urlData) => this.addPreco(url, urlData)} />
        </div>
        
        {this.renderPrecos()}
        
      </div>
    )
  }
}