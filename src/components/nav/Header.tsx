import { getMegaMenuData } from './nav-data'
import { HeaderClient } from './HeaderClient'
import { BRAND } from '@/brand/tokens'

/** Server component: fetches menu data from Payload and hands it to the client shell. */
export async function Header() {
  const menu = await getMegaMenuData()
  return <HeaderClient menu={menu} brandName={BRAND.logoText} />
}
