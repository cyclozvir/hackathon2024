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
  components: {
    Input: {
      baseStyle: {
        _focus: {
          borderColor: "green.400", // Change the color here
          boxShadow: "none",
        },
      },
    },
  },
})

export default theme