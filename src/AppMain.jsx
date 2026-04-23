import { useEffect, useMemo, useState } from 'react';
import { archetypesDetailed as archetypes } from './data/archetypesDetailed';
import { cbtiConfig } from './data/cbtiConfig';
import { getProgressPercent, getResultFromAnswers } from './data/cbtiScoring';
import HomePage from './pages/HomePage';
import TestPageMain from './pages/TestPageMain';
import ResultPageMain from './pages/ResultPageMain';
import ArchetypeOverviewPage from './pages/ArchetypeOverviewPage';
import ArchetypeDetailPage from './pages/ArchetypeDetailPage';

const ROUTES = { HOME: 'home', TEST: 'test', RESULT: 'result', GALLERY: 'gallery', DETAIL: 'detail' };

function getInitialState() {
  return { route: ROUTES.HOME, currentIndex: 0, answers: {}, detailId: null, result: null, previousRoute: ROUTES.HOME, toast: '' };
}

export default function AppMain() {
  const [state, setState] = useState(getInitialState);
  const questions = cbtiConfig.questions;
  const currentQuestion = questions[state.currentIndex];
  const answerCount = Object.keys(state.answers).length;
  const progress = getProgressPercent(answerCount, questions.length);
  const detailArchetype = useMemo(() => archetypes.find((item) => item.id === state.detailId) ?? archetypes[0], [state.detailId]);

  useEffect(() => {
    if (!state.toast) return undefined;
    const timer = window.setTimeout(() => setState((current) => ({ ...current, toast: '' })), 2400);
    return () => window.clearTimeout(timer);
  }, [state.toast]);

  function goHome() {
    setState(getInitialState());
  }

  function startTest() {
    setState((current) => ({ ...current, route: ROUTES.TEST, previousRoute: current.route === ROUTES.DETAIL ? ROUTES.DETAIL : ROUTES.HOME, currentIndex: 0, answers: {}, result: null }));
  }

  function openGallery() {
    setState((current) => ({ ...current, route: ROUTES.GALLERY, previousRoute: current.route }));
  }

  function openDetail(detailId) {
    setState((current) => ({ ...current, route: ROUTES.DETAIL, previousRoute: current.route, detailId }));
  }

  function handleAnswer(questionId, optionKey) {
    setState((current) => {
      const nextAnswers = { ...current.answers, [questionId]: optionKey };
      if (current.currentIndex === questions.length - 1) {
        return { ...current, answers: nextAnswers, result: getResultFromAnswers(questions, nextAnswers), route: ROUTES.RESULT };
      }
      return { ...current, answers: nextAnswers, currentIndex: current.currentIndex + 1 };
    });
  }

  function handlePrevious() {
    setState((current) => ({ ...current, currentIndex: Math.max(current.currentIndex - 1, 0) }));
  }

  function handleBackFromGallery() {
    setState((current) => ({ ...current, route: current.previousRoute === ROUTES.RESULT || current.result ? ROUTES.RESULT : ROUTES.HOME }));
  }

  function handleBackFromDetail() {
    setState((current) => ({ ...current, route: current.previousRoute === ROUTES.DETAIL ? ROUTES.GALLERY : current.previousRoute }));
  }

  function showToast(message) {
    setState((current) => ({ ...current, toast: message }));
  }

  return (
    <>
      {state.route === ROUTES.HOME && <HomePage onStart={startTest} onOpenGallery={openGallery} />}
      {state.route === ROUTES.TEST && currentQuestion && (
        <TestPageMain question={currentQuestion} currentIndex={state.currentIndex} total={questions.length} percent={progress} answer={state.answers[currentQuestion.id]} onAnswer={handleAnswer} onPrevious={handlePrevious} />
      )}
      {state.route === ROUTES.RESULT && state.result && (
        <ResultPageMain
          result={state.result}
          onRestart={goHome}
          onOpenGallery={openGallery}
          onOpenDetail={openDetail}
          onShare={() => showToast('分享图接口已预留，后续可接入 canvas 或服务端生成。')}
          onAdvanced={() => showToast('生日进阶校正入口已预留，后续可接入表单与计算逻辑。')}
        />
      )}
      {state.route === ROUTES.GALLERY && <ArchetypeOverviewPage archetypes={archetypes} onBack={handleBackFromGallery} onOpenDetail={openDetail} />}
      {state.route === ROUTES.DETAIL && detailArchetype && <ArchetypeDetailPage archetype={detailArchetype} onBack={handleBackFromDetail} onStart={startTest} />}
      {state.toast ? <div className="toast">{state.toast}</div> : null}
    </>
  );
}
