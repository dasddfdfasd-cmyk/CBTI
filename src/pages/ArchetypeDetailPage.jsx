import Shell from '../components/Shell';
import { GhostButton, PrimaryButton } from '../components/Buttons';
import Tag from '../components/Tag';
import { elementThemes } from '../data/theme';

export default function ArchetypeDetailPage({ archetype, onBack, onStart }) {
  const theme = elementThemes[archetype.element];

  return (
    <Shell className="detail-shell">
      <section className="detail-card reveal" style={{ '--accent': theme.color, '--glow': theme.glow }}>
        <header className="section-header">
          <div>
            <p className="eyebrow">原型详情</p>
            <h1>{archetype.name}</h1>
          </div>
          <GhostButton onClick={onBack}>返回</GhostButton>
        </header>

        <p className="detail-definition">{archetype.definition}</p>

        <div className="tag-row">
          <Tag tone="gold">五行 · {archetype.element}</Tag>
          <Tag tone="ink">阴阳 · {archetype.polarity}</Tag>
          <Tag tone="jade">强弱 · 身{archetype.energy}</Tag>
        </div>

        <div className="detail-grid">
          <section className="detail-block">
            <h2>维度结构</h2>
            <p>
              {archetype.element} / {archetype.polarity} / 身{archetype.energy}
            </p>
          </section>
          <section className="detail-block">
            <h2>核心特征</h2>
            <p>{archetype.traits.join('、')}</p>
          </section>
          <section className="detail-block">
            <h2>关系风格</h2>
            <p>{archetype.relationshipStyle}</p>
          </section>
          <section className="detail-block">
            <h2>失衡状态</h2>
            <p>{archetype.imbalance}</p>
          </section>
          <section className="detail-block detail-block-full">
            <h2>适合方向</h2>
            <p>{archetype.suitableDirections}</p>
          </section>
        </div>

        <PrimaryButton onClick={onStart}>开始测试</PrimaryButton>
      </section>
    </Shell>
  );
}
