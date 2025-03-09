"use client";

import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useData } from '../context/contextProvider';
import LoadingSpinner from '../effects/LoadingSpinner';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Qualification', href: '/qualification' },
  { name: 'Experience', href: '/experience' },
  { name: 'Contact', href: '/contact' },
];


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();  // Use usePathname to get the current pathname
  const router = useRouter();
  const { isLogin, setIsLogin } = useData();
  const [loading, setLoading] = useState(false);

  // Close the mobile menu when a menu item is clicked
  const handleMenuItemClick = () => {
    setMobileMenuOpen(false);
  };

  /* logout user */
  const logoutUser = async()=>{
    setLoading(true);
    const response = await axios.post('/api/logout');
    setMobileMenuOpen(false);
    if(response?.data){
      if(response.data.error){
        setIsLogin(true);
        toast.error(response.data.error);
        setLoading(false);
      }else if(response.data.success){
        setIsLogin(false)
        toast.success(response.data.success);
        setLoading(false)
        router.replace('/login');
      }
    }
  }

  if(loading) return <LoadingSpinner/>

  return (
    <header className="bg-gray-800 fixed top-0 left-0 right-0 z-50">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className='text-white font-bold text-2xl hover:text-indigo-600'>Portfolio</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm font-medium
                          ${pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
{
  isLogin ? <button type="button" onClick={logoutUser} className='rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 inline-flex items-center'>Log out<FiLogOut className='ml-2 text-lg' /></button>:
<Link href="/login" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
}        
        
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-black opacity-50" onClick={() => setMobileMenuOpen(false)} />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className='text-white font-bold text-2xl hover:text-indigo-600'>Portfolio</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-700
                                ${pathname === item.href ? 'bg-indigo-600' : ''}`}
                    onClick={handleMenuItemClick}  // Close the menu when a link is clicked
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                { isLogin ? 
                <button type="button" onClick={logoutUser} className='-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-gray-800'>Log out</button>:
                <Link
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-gray-800"
                  onClick={handleMenuItemClick}
                >
                  Log in
                </Link>
              }                
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
