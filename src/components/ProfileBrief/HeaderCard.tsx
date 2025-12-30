import Image from 'next/image'
import React from 'react'

function HeaderCard({ title, subtitle, image, invertImage }) {
  return (
    <div className="flex items-center gap-4 p-4  rounded-lg  w-fit">
      {image && (
        <Image
          src={image}
          width={50}
          height={50}
          alt="card-icon"
          className={`shadow-md rounded-xl object-cover filter h-16 w-16 ${invertImage ? 'invert' : ''}`}
        />
      )}
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <h3 className="text-sm text-gray-600">{subtitle}</h3>
      </div>
    </div>
  )
}

export default HeaderCard
