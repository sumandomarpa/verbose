import React, { Fragment } from 'react'
import { ThemeProvider } from 'styled-components'

import { theme } from '../styles/GlobalStyles'
import Routes from '../routes'

export default () => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <Routes />
    </Fragment>
  </ThemeProvider>
)
