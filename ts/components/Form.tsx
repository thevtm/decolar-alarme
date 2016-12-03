'use strict'

/* LIBS */
import * as React from 'react'
import { getDecolarDataURL } from 'decolar-scraper'
/* EXEC */

export enum DecolarURLValid { GOOD = 0, BAD = 1, NULL = 2 }
export interface FormProps { onAdicionar: (url: string, dataURL: string) => void }
export interface FormState { decolarURL: string, decolarDataURL: string | null,
  decolarURLValid: DecolarURLValid }


export class Form extends React.Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props)
    
    this.state = { decolarURL: '', decolarDataURL: null,
      decolarURLValid: DecolarURLValid.NULL } as FormState

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    
  }

  handleChange(event: any) {
    const url = event.target.value as string
    let newState: FormState = { decolarURL: url, decolarDataURL: null,
      decolarURLValid: DecolarURLValid.NULL }

    try { 
      // 1. Verifica se a URL é nula
      if (url == null || url === '') {
        newState.decolarURLValid = DecolarURLValid.NULL
      }

      // 2. Obtem a urlData
      else {
        const urlData = getDecolarDataURL(url)
        newState.decolarDataURL = urlData
        newState.decolarURLValid = DecolarURLValid.GOOD
      }
    } catch (err) {
      // 3. Url invalida
      newState.decolarURLValid = DecolarURLValid.BAD
    }

    this.setState(newState)
  }

  handleSubmit(event: any) {
    event.preventDefault()

    const { decolarURL, decolarDataURL, decolarURLValid } = this.state
    const { onAdicionar } = this.props

    if (decolarURLValid === DecolarURLValid.GOOD) {
      onAdicionar(decolarURL, decolarDataURL!)

      const newState: FormState = { decolarURL: '', decolarDataURL: null,
        decolarURLValid: DecolarURLValid.NULL }
      this.setState(newState)
    }
  }

  render() {
    const { decolarURLValid } = this.state
    const style_fix = { right: '40px' }

    const FEEDBACK_CLASSES = {}
    FEEDBACK_CLASSES[ DecolarURLValid.GOOD ] = 'glyphicon-ok'
    FEEDBACK_CLASSES[ DecolarURLValid.BAD ] = 'glyphicon-remove'
    FEEDBACK_CLASSES[ DecolarURLValid.NULL ] = ''

    const feedbackClass = `form-control-feedback glyphicon ${ FEEDBACK_CLASSES[decolarURLValid] }`

    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-group has-feedback has-success has-error'>
        
          <div className='input-group'>
            <input className='form-control' type='text' placeholder='Cole a URL da Decolar aqui...'
              value={this.state.decolarURL} onChange={this.handleChange} />

            <span className='input-group-btn'>
              <button className='btn btn-default' type='submit'>
                <span className='glyphicon glyphicon-plane' aria-hidden='true' />
              </button>
            </span>
          </div>

          <span className={feedbackClass} style={style_fix}></span>
        </div>
      </form>
    )
  }
}