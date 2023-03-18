import LoginNftButton from './login_nft_button'

const Layout = ({ children }: any) => {
  return (
    <>
      <LoginNftButton />
      <main>{children}</main>
    </>
  )
}

export default Layout