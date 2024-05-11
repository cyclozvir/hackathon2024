import { extendTheme } from '@chakra-ui/react'
import "@fontsource/montserrat/300.css"
import "@fontsource/montserrat"
import "@fontsource/montserrat/500.css"
import "@fontsource/montserrat/700.css"

const theme = extendTheme({
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
})

export default theme