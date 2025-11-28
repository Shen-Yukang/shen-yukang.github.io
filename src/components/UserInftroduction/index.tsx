import { getPDFUrlByKey } from '@/utlis/dynamicResourceModules'
import './index.css'

const HeroInroductionAcdemic = () =>{
  console.log('PDF URL = ', getPDFUrlByKey("phD_CV_Yukang"));

return (
      <header className="hero" >
        {/* 左侧头像 */}
        <div className="hero-photo">
          <img src="yukang.jpg" alt="Yukang Shen" />
        </div>

        {/* 右侧文字块 */}
        <div className="hero-text">
          <h1 className="name">Yukang Shen</h1>

          <p className="hero-title">
            Graduate Research Assistant · M.S. Software Engineering,  
            Kennesaw State University
          </p>

          <p className="hero-desc">
            I work on synthetic data engines, medical perception, and  
            embodied AI systems. My research focuses on  
            <strong>synthetic-to-real transfer</strong>,  
            <strong>safe injection perception</strong>, and  
            <strong> data-centric VLA systems</strong> for AR-guided  
            medical assistance.
          </p>

          {/* 链接区域 */}
          <div className="hero-links">
            <a href="mailto:shenyukang99@gmail.com">Email</a>
            <span>·</span>
            <a href="https://github.com/Shen-Yukang" target="_blank">GitHub</a>
            <span>·</span>
            <a href={getPDFUrlByKey("phD_CV_Yukang")} target="_blank" rel="noreferrer">
            Full CV (PDF)
            </a>
          </div>
        </div>
      </header>
)
}

export default HeroInroductionAcdemic