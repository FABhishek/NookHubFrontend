import Logo from './logo'
import Nav from './Nav'

export default function Header() {
    return (
      <>
        <header className="bg-zinc-800 sticky top-0 z-[20] flex-wrap mx-auto flex w-full items-center justify-between p-5">
          <Logo/>
          <Nav/>
        </header>
      </>
    )
}
  