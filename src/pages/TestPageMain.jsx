import Shell from '../components/Shell';
import { GhostButton } from '../components/Buttons';
import ProgressBar from '../components/ProgressBar';

export default function TestPageMain({ question, currentIndex, total, percent, answer, onAnswer, onPrevious }) {
  const displayIndex = String(currentIndex + 1).padStart(2, '0');
  const displayTotal = String(total).padStart(2, '0');

  return (
    <Shell className="test-shell">
      <section className="quiz-card reveal">
        <header className="quiz-header">
          <div>
            <p className="eyebrow">正在测试</p>
            <h2>东方人格原型校准中</h2>
          </div>
          <GhostButton onClick={onPrevious} disabled={currentIndex === 0}>上一题</GhostButton>
        </header>

        <ProgressBar percent={percent} />

        <div className="quiz-counter">
          <span>{displayIndex}</span>
          <span>/</span>
          <span>{displayTotal}</span>
        </div>

        <article key={question.id} className="question-card question-enter">
          <p className="question-index">第 {question.id} 题</p>
          <h3>{question.question}</h3>
          <div className="option-list">
            {question.options.map((option) => (
              <button key={option.label} className={`option-card ${answer === option.label ? 'option-active' : ''}`} onClick={() => onAnswer(question.id, option.label)}>
                <span className="option-key">{option.label}</span>
                <span className="option-text">{option.text}</span>
              </button>
            ))}
          </div>
        </article>
      </section>
    </Shell>
  );
}
