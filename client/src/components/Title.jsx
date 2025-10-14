import React from 'react'

const Title = ({ title1, title2, titleStyles, title2Styles, paragraph, paragraphStyles }) => {
  return (
    <div className={titleStyles}>
      <h4 className='text-solid capitalize'>{title1}</h4>
      <div className='flex flex-col xl:flex-row xl:justify-between'>
        <h1 className={`${title2Styles} capitalize`}>{title2}</h1>
        <p className={`${paragraphStyles} max-w-lg xl:place-self-end xl:relative xl:bottom-3`}>{paragraph ? paragraph : "Find reliable car with transparent pricing, verified inspections, flexible pickup and delivery options, and 24/7 customer support for a smooth rental or buying experience."}</p>
      </div>
    </div>
  )
}

export default Title
