import React from 'react'
import './ComScen.scss'
import projectImg from '@/images/imgs/project.png'

export default function ComScen() {
    const bg = {
        backgroundImage: 'url(https://cdn.worktile.com/static/site/wt/img/common-cooperation-scene-bg.538508a.png)',
        boxSizing: 'border-box',
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        margin: '0 auto',
        padding: ' 80px 0',
        height: '900px',
    }
    return (
        <div className='ComScen clearfix' style={bg}>
            <div className='scen-wrapper'>
                <div className="scen-title">从目标到项目，覆盖企业常见协作场景</div>
                <div className="scen-desc">建设可视化工作流，让团队井然有序</div>
                <div className="scen-content">
                    <div className='scen-swiper-box'>
                        <div className='swiper-container'>
                            <ul className='scen-ul'>
                                <li>项目协同</li>
                                <li>知识沉淀</li>
                                <li>衡量绩效</li>
                                <li>沟通汇报</li>
                            </ul>
                            <div className='swiper-wrapper'>
                                <div className='swiper-slide' style={{height: '596px', marginBottom: '10px'}}>
                                    <img src={projectImg} alt="tt" className='scen-img'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
