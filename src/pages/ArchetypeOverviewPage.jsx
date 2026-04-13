import Shell from '../components/Shell';
import { GhostButton } from '../components/Buttons';
import Tag from '../components/Tag';

export default function ArchetypeOverviewPage({ archetypes, onBack, onOpenDetail }) {
  return (
    <Shell className="gallery-shell">
      <section className="gallery-card reveal">
        <header className="section-header">
          <div>
            <p className="eyebrow">20 型原型</p>
            <h1 className="gallery-title">
              <span>东方人格</span>
              <span>原型总览</span>
            </h1>
          </div>
          <GhostButton onClick={onBack}>返回</GhostButton>
        </header>

        <div className="archetype-grid">
          {archetypes.map((item) => (
            <button
              key={item.id}
              className="archetype-tile"
              onClick={() => onOpenDetail(item.id)}
            >
              <div>
                <p className="tile-meta">
                  {item.element} / {item.polarity} / {item.energy}
                </p>
                <h2>{item.name}</h2>
                <p>{item.definition}</p>
              </div>
              <div className="tag-row">
                <Tag tone="gold">{item.element}</Tag>
                <Tag tone="ink">{item.polarity}</Tag>
                <Tag tone="jade">{item.energy}</Tag>
              </div>
            </button>
          ))}
        </div>
      </section>
    </Shell>
  );
}
