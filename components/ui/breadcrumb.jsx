import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-sm">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight size={16} className="mx-2 text-gray-400" />}

          {index === items.length - 1 ? (
            <span className="text-gray-700 font-medium" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link href={item.href} className="text-gray-500 hover:text-[#1080b0]">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}

