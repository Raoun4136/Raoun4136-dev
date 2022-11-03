import Link from 'next/link'
import { NavContainer } from "./Nav.style"

const Nav = () => {
  return (
    <NavContainer>
      <Link href="/blog" >Blog</Link>
      <Link href="/dev" >WoowaCourse</Link>
      <Link href="/test" >Test</Link>
    </NavContainer>
  )
}
export default Nav