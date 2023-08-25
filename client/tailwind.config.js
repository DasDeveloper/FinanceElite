/** @type {import('tailwindcss').Config} */
import {backgroundColor} from "./src/theme"
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    spacing: {
      px: '1px',
      0: '0',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      11: '2.75rem',
      12: '3rem',
      14: '3.5rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      44: '11rem',
      48: '12rem',
      52: '13rem',
      56: '14rem',
      60: '15rem',
      64: '16rem',
      68: '17rem',
      70: '17.4rem',
      72: '18rem',
      80: '20rem',
      96: '24rem',
      100:'26rem',
      104:'28rem',
      106:'30rem',
      108:'32rem',
      110:'34rem',
      112:'36rem',
      114:'38rem',
      116:'40rem',
      118:'42rem',
      120:'44rem',
      'neg-50%':'-50%',
      '10vh':'10vh',
      '20vh':'20vh',
      '90vh':'90vh',
      '100vh':'100vh',
      '20%':'20%',
      '30%':'30%',
      '40%': '40%',
      '50%': '50%',
      '60%': '60%',
      '65%': '65%',
      '70%': '70%',
      '80%':'80%',
      '90%': '90%',
      '95%':'95%',
      '100%':'100%',
      '101%':'101%'
      
    },
    //https://colorswall.com/palette/57221
    colors:backgroundColor,
    
    // #a31b47 #ec8dab #0c141c #56809b #c6c6ce #374e67
    
    
    
    extend: {
      zIndex: {
        '1000': '1000',
        '1200':'1200'
      }
    },
  },
  plugins: [
  ],
}