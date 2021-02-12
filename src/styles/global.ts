import { createGlobalStyle, css } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    /* work-sans-regular - latin */
    @font-face {
      font-family: 'Work Sans';
      font-style: normal;
      font-weight: 400;
      src: local(''),
          url('/fonts/work-sans-v9-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
          url('/fonts/work-sans-v9-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }
    /* work-sans-500 - latin */
    @font-face {
      font-family: 'Work Sans';
      font-style: normal;
      font-weight: 500;
      src: local(''),
          url('/fonts/work-sans-v9-latin-500.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
          url('/fonts/work-sans-v9-latin-500.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }
    /* work-sans-600 - latin */
    @font-face {
      font-family: 'Work Sans';
      font-style: normal;
      font-weight: 600;
      src: local(''),
          url('/fonts/work-sans-v9-latin-600.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
          url('/fonts/work-sans-v9-latin-600.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }
    
`

export default GlobalStyles
