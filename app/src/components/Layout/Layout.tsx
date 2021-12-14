import NavigationBar from './NavigationBar'
import './Layout.css'

const Layout = (props: any) => {
  const { children } = props
  return (
    <>
      <NavigationBar />
      <main>
        <div className='container'>{children}</div>
      </main>
    </>
  )
}

export default Layout
