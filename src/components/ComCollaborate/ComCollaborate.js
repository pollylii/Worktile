import React from 'react'
import banner from '@/images/imgs/banner.png'

export default function BannerContent() {
    return (
        <div>
            <div className='BannerContent'>
                <img alt='BannerContent' src={banner} style={{
                    width: 'auato', height: 'auto', maxWidth: '100%',
                    maxHeight: '100%'
                }} />
            </div>
        </div>
    )
}
