import Shell from '../components/Shell';
import { PrimaryButton, SecondaryButton, GhostButton } from '../components/Buttons';
import Tag from '../components/Tag';
import { elementThemes } from '../data/theme';

export default function ResultPageMain({ result, onRestart, onOpenGallery, onOpenDetail, onShare, onAdvanced }) {
  const theme = elementThemes[result.labels.primaryWuxing];

  return (
    <Shell className="result-shell">
      <section className="result-card reveal" style={{ '--accent': theme.color, '--glow': theme.glow }}>
        <div className="result-topline">
          <p className="eyebrow">你的 CBTI 原型</p>
          <span className="ritual-line" />
        </div>

        <div className="result-hero">
          <div>
            <p className="result-name-en">{`${result.primaryWuxing} · ${result.yinyangType} · ${result.strengthType}`}</p>
            <h1>{result.finalType}</h1>
            <p className="result-tagline">{result.finalOneLiner}</p>
          </div>
          <div className="result-seal">
            <span>{result.labels.primaryWuxing}</span>
            <span>{result.labels.yinyang}</span>
            <span>{result.labels.strength}</span>
          </div>
        </div>

        <div className="tag-row">
          <Tag tone="gold">主五行 · {result.labels.primaryWuxing}</Tag>
          <Tag tone="mist">副五行 · {result.labels.secondaryWuxing}</Tag>
          <Tag tone="ink">{result.labels.yinyangDetail}</Tag>
          <Tag tone="jade">{result.labels.strengthDetail}</Tag>
        </div>

        <section className="result-section">
          <h2>结果判定</h2>
          <p className="definition">{result.labels.wuxingInterpretation}</p>
          <p>{result.labels.confidence}</p>
        </section>

        <section className="result-section">
          <h2>主副五行结构</h2>
          <p>{result.labels.primaryWuxing} 为主相，{result.labels.secondaryWuxing} 为副相，五行差值为 {result.wuxingGap}。</p>
          {result.secondaryNarrative ? <p>{result.secondaryNarrative}</p> : null}
        </section>

        <section className="result-section">
          <h2>人格说明</h2>
          <p>{result.archetype.definition || result.finalOneLiner}</p>
          {result.archetype.analysis ? <p>{result.archetype.analysis}</p> : null}
        </section>

        <div className="result-actions">
          <PrimaryButton onClick={() => onOpenDetail(result.archetype.id)}>查看原型详情</PrimaryButton>
          <SecondaryButton onClick={onShare}>生成分享图</SecondaryButton>
          <GhostButton onClick={onAdvanced}>输入生日进行进阶校正</GhostButton>
          <GhostButton onClick={onOpenGallery}>查看全部人格原型</GhostButton>
          <GhostButton onClick={onRestart}>重新测试</GhostButton>
        </div>
      </section>
    </Shell>
  );
}
