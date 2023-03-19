import { theme } from '@/styles/themeProvider'
import { ThemeProvider } from '@mui/material'
import LoginNftButton from './login_nft_button'

const Layout = ({ children }: any) => {
  return (
    <>

    <ThemeProvider theme={theme}>
      <LoginNftButton />
      <main>{children}</main>
    </ThemeProvider>
    </>
  )
}

export default Layout