require('../pug/index.pug')

'use strict'

/* LIBS */

import * as React from "react"
import * as ReactDOM from "react-dom"

import { App } from "./containers/App"

/* EXEC */

ReactDOM.render(
    <App  />,
    document.getElementById("precos-mount-point")
)