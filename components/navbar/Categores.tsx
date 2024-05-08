'use client'

import {TbBeach, TbMountain, TbPool} from 'react-icons/tb'
import {GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill} from 'react-icons/gi'
import {MdOutlineVilla} from 'react-icons/md'
import {FaSkiing} from 'react-icons/fa'
import {BsSnow} from 'react-icons/bs'
import {IoDiamond} from 'react-icons/io5'

import Container from "../Container"
import CategoryBox from './CategoryBox'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property close to the beach'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property close to the Windmill'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is modern'
    },
    {
        label: 'CountrySide',
        icon: TbMountain,
        description: 'This property is CountySide'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This property is close to the pool'
    },
    {
        label: 'Island',
        icon: GiIsland,
        description: 'This property close to the beach'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property close to the lake'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property close to the beach'
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'This property close to castles'
    },
    { 
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property close to the camping'
    },{
        label: 'Arctic',
        icon: BsSnow,
        description: 'This property close to the beach'
    },
    {
        label: 'cave',
        icon: GiCaveEntrance,
        description: 'This property close to the beach'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This property close to the beach'
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: 'This property close to the beach'
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'This property close to the beach'
    },
]
                      

const Categories = () => {
  const params = useSearchParams()
  const category = params?.get('category');
  const pathname = usePathname()
  const isMainPage = pathname === '/'
   if(!isMainPage){
    return null
   }
    return ( 
        <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {
            categories.map((item) => (
               <CategoryBox
                 key={item.label}
                 label={item.label}
                 selected={category === item.label}
                 icon={item.icon}
               />
            ))
        }
        </div>

        </Container>
     );
}
 
export default Categories