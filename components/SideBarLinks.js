import { AiOutlineShop } from 'react-icons/ai'
import { RiUser3Line } from 'react-icons/ri'
import { CiShoppingCart } from 'react-icons/ci'
import { GiConcreteBag, GiOpeningShell, GiWoodBeam } from 'react-icons/gi'
import SideBarLink from './SideBarLink'
import { MdAdminPanelSettings, MdConstruction } from 'react-icons/md'
import { BsBricks } from 'react-icons/bs'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import { navState } from '../atoms/navHandler'
import { useRouter } from 'next/navigation'

function SideBarLinks() {
  const [openSideBar, setOpenSideBar] = useRecoilState(navState);
  const router = useRouter()
  const closeNav = (path) => {
    setOpenSideBar(false)
    router.push(`${path}`)
  }
  return (
    <div className='px-[10px] py-[6px] pb-8 text-gray-500 capitalize text-md h-full overflow-y-scroll'>
        <div className='flex justify-between '>
            <button className='rounded-md border-2 border-gray-400 py-2 w-[47%]' onClick={closeNav.bind(this, '/login')} >
              Login
            </button>
            <button className='rounded-md border-2 border-gray-400 py-2 w-[47%]' onClick={closeNav.bind(this, '/signup')}>
              Sign Up
              </button>
        </div>
        <hr className='h-[1px] w-full mt-4 mb-2 bg-gray-500 '/>


        <SideBarLink Icon={RiUser3Line} title={'my account'} path={'/'}/>
        <SideBarLink Icon={AiOutlineShop} title={'orders'} path={'/checkout'}/>
        <SideBarLink Icon={CiShoppingCart} title={'cart'} path={'/cart'}/>
        <SideBarLink Icon={GiWoodBeam} title={'woods'} path={'/'}/>
        <SideBarLink Icon={MdConstruction} title={'metals'} path={'/'}/>
        <SideBarLink Icon={GiConcreteBag} title={'cement'} path={'/'}/>
        <SideBarLink Icon={GiOpeningShell} title={'stones'} path={'/'}/>
        <SideBarLink Icon={BsBricks} title={'bricks'} path={'/'}/>
        <SideBarLink Icon={MdAdminPanelSettings} title={'add product'} path={'/admin/add-product'}/>
        <SideBarLink Icon={BsBricks} title={'admin products'} path={'/'}/>
    </div>
  )
}

export default SideBarLinks