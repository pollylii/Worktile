import React from 'react'
import BannerContentBg from '@/images/imgs/banner.png'

export default function BannerContent() {
    return (
        <div className='BannerContent'>
            <img alt='BannerContent' src={BannerContentBg} style={{
                width: 'auato', height: 'auto', maxWidth: '100%',
                maxHeight: '100%'
            }} />
        </div>
    )
}
