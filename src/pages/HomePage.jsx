import Shell from '../components/Shell';
import { PrimaryButton, SecondaryButton } from '../components/Buttons';

export default function HomePage({ onStart, onOpenGallery }) {
  return (
    <Shell className="home-shell">
      <section className="hero-card reveal">
        <div className="hero-copy">
          <p className="eyebrow">Chinese Being Type Indicator</p>
          <h1 className="hero-brand">CBTI</h1>
          <p className="hero-subtitle">东方人格原型测试</p>
          <p className="hero-description">
            比起解释你是谁，我们更想让你认出自己。CBTI 以五行、阴阳与能量承载为基础，构建
            20 种东方人格原型。
          </p>
        </div>

        <div className="hero-orbit">
          <div className="orbit-ring orbit-ring-one" />
          <div className="orbit-ring orbit-ring-two" />
          <div className="orbit-core">
            <span>五行</span>
            <span>阴阳</span>
            <span>强弱</span>
          </div>
        </div>

        <div className="hero-actions">
          <PrimaryButton onClick={onStart}>开始测试</PrimaryButton>
          <SecondaryButton onClick={onOpenGallery}>查看 20 型原型</SecondaryButton>
        </div>
      </section>
    </Shell>
  );
}
