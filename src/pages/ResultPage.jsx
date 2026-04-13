import Shell from '../components/Shell';
import { PrimaryButton, SecondaryButton, GhostButton } from '../components/Buttons';
import Tag from '../components/Tag';
import { elementThemes } from '../data/theme';

export default function ResultPage({
  result,
  onRestart,
  onOpenGallery,
  onOpenDetail,
  onShare,
  onAdvanced
}) {
  const { archetype, element, polarity, energy } = result;
  const theme = elementThemes[element];

  return (
    <Shell className="result-shell">
      <section className="result-card reveal" style={{ '--accent': theme.color, '--glow': theme.glow }}>
        <div className="result-topline">
          <p className="eyebrow">你的 CBTI 原型</p>
          <span className="ritual-line" />
        </div>

        <div className="result-hero">
          <div>
            <p className="result-name-en">{archetype.id.replaceAll('-', ' · ')}</p>
            <h1>{archetype.name}</h1>
            <p className="result-tagline">{archetype.tagline}</p>
          </div>
          <div className="result-seal">
            <span>{element}</span>
            <span>{polarity}</span>
            <span>{energy}</span>
          </div>
        </div>

        <div className="tag-row">
          <Tag tone="gold">五行 · {element}</Tag>
          <Tag tone="ink">阴阳 · {polarity}</Tag>
          <Tag tone="jade">强弱 · 身{energy}</Tag>
          <Tag tone="mist">{theme.label}</Tag>
        </div>

        <section className="result-section">
          <h2>一句话定义</h2>
          <p className="definition">{archetype.definition}</p>
        </section>

        <section className="result-section">
          <h2>核心关键词</h2>
          <div className="tag-row">
            {archetype.keywords.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        </section>

        <section className="result-section">
          <h2>人格分析</h2>
          <p>{archetype.analysis}</p>
        </section>

        <div className="result-actions">
          <PrimaryButton onClick={() => onOpenDetail(archetype.id)}>查看原型详情</PrimaryButton>
          <SecondaryButton onClick={onShare}>生成分享图</SecondaryButton>
          <GhostButton onClick={onAdvanced}>输入生日进行进阶校正</GhostButton>
          <GhostButton onClick={onOpenGallery}>查看全部人格原型</GhostButton>
          <GhostButton onClick={onRestart}>重新测试</GhostButton>
        </div>
      </section>
    </Shell>
  );
}
