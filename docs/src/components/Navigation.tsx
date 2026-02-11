import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'

import { navigation } from '@/lib/navigation'

interface NavItem {
  title: string
  href?: string
  links?: NavItem[]
  collapsed?: boolean
}

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}) {
  let pathname = usePathname()
  let isActive = href === pathname

  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        'block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full',
        isActive
          ? 'font-semibold text-sky-500 before:bg-sky-500'
          : 'text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300',
      )}
    >
      {children}
    </Link>
  )
}

function NavItem({
  item,
  onLinkClick,
}: {
  item: NavItem
  onLinkClick?: React.MouseEventHandler<HTMLAnchorElement>
}) {
  let [isExpanded, setIsExpanded] = useState(!item.collapsed)

  if (item.links) {
    return (
      <li className="relative">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-between pl-3.5 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
        >
          {item.title}
          <ChevronRight
            className={clsx(
              'h-4 w-4 transition-transform',
              isExpanded && 'rotate-90',
            )}
          />
        </button>
        {isExpanded && (
          <ul
            role="list"
            className="mt-2 ml-4 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-800"
          >
            {item.links.map((link) => (
              <NavItem
                key={link.href || link.title}
                item={link}
                onLinkClick={onLinkClick}
              />
            ))}
          </ul>
        )}
      </li>
    )
  }

  if (item.href) {
    return (
      <li className="relative">
        <NavLink href={item.href} onClick={onLinkClick}>
          {item.title}
        </NavLink>
      </li>
    )
  }

  return null
}

export function Navigation({
  className,
  onLinkClick,
}: {
  className?: string
  onLinkClick?: React.MouseEventHandler<HTMLAnchorElement>
}) {
  return (
    <nav className={clsx('text-base lg:text-sm', className)}>
      <ul role="list" className="space-y-9">
        {navigation.map((section) => (
          <li key={section.title}>
            <h2 className="font-display font-medium text-slate-900 dark:text-white">
              {section.title}
            </h2>
            <ul
              role="list"
              className="mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-800"
            >
              {section.links.map((link) => (
                <NavItem
                  key={link.href || link.title}
                  item={link}
                  onLinkClick={onLinkClick}
                />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}
