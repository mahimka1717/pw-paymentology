import { useReducer, useCallback } from 'react';
import { tracks, Score, Track } from '../data/tracks';
import { calculateOutcome } from '../utils/calculateOutcome';
import type { Outcome, Style } from '../data/scoring';

export type Screen = 'select' | 'intro' | 'game' | 'result';

interface GameState {
  screen: Screen;
  trackId: string | null;
  scenarioIndex: number;
  totalScore: Score;
  aggressiveCount: number;
  choices: number[];
  lastDelta: Score | null;
  showFeedback: boolean;
  selectedOption: number | null;
}

type Action =
  | { type: 'SELECT_TRACK'; trackId: string }
  | { type: 'START_GAME' }
  | { type: 'CHOOSE_OPTION'; optionIndex: number; delta: Score; aggressive: boolean }
  | { type: 'RESET_OPTION' }
  | { type: 'NEXT_SCENARIO' }
  | { type: 'DISMISS_FEEDBACK' }
  | { type: 'GO_BACK' }
  | { type: 'RESTART' };

const initialState: GameState = {
  screen: 'select',
  trackId: null,
  scenarioIndex: 0,
  totalScore: { growth: 0, trust: 0, control: 0, momentum: 0 },
  aggressiveCount: 0,
  choices: [],
  lastDelta: null,
  showFeedback: false,
  selectedOption: null,
};

// Totals are rebuilt from the answers kept, so going back drops exactly the undone answers' score.
function scoreFromChoices(track: Track, choices: number[]) {
  const totalScore: Score = { growth: 0, trust: 0, control: 0, momentum: 0 };
  let aggressiveCount = 0;
  choices.forEach((optionIndex, scenarioIndex) => {
    const option = track.scenarios[scenarioIndex].options[optionIndex];
    totalScore.growth += option.score.growth;
    totalScore.trust += option.score.trust;
    totalScore.control += option.score.control;
    totalScore.momentum += option.score.momentum;
    if (option.aggressive) aggressiveCount += 1;
  });
  return { totalScore, aggressiveCount };
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'SELECT_TRACK':
      return { ...state, screen: 'intro', trackId: action.trackId };
    case 'START_GAME':
      return { ...state, screen: 'game' };
    case 'CHOOSE_OPTION':
      return {
        ...state,
        totalScore: {
          growth: state.totalScore.growth + action.delta.growth,
          trust: state.totalScore.trust + action.delta.trust,
          control: state.totalScore.control + action.delta.control,
          momentum: state.totalScore.momentum + action.delta.momentum,
        },
        aggressiveCount: state.aggressiveCount + (action.aggressive ? 1 : 0),
        choices: [...state.choices, action.optionIndex],
        lastDelta: action.delta,
        showFeedback: true,
        selectedOption: action.optionIndex,
      };
    case 'RESET_OPTION': {
      if (state.selectedOption === null || state.lastDelta === null) return state;

      const track = tracks.find(t => t.id === state.trackId);
      const selectedOption = track?.scenarios[state.scenarioIndex]?.options[state.selectedOption];
      return {
        ...state,
        totalScore: {
          growth: state.totalScore.growth - state.lastDelta.growth,
          trust: state.totalScore.trust - state.lastDelta.trust,
          control: state.totalScore.control - state.lastDelta.control,
          momentum: state.totalScore.momentum - state.lastDelta.momentum,
        },
        aggressiveCount: state.aggressiveCount - (selectedOption?.aggressive ? 1 : 0),
        choices: state.choices.slice(0, -1),
        lastDelta: null,
        showFeedback: false,
        selectedOption: null,
      };
    }
    case 'NEXT_SCENARIO': {
      const track = tracks.find(t => t.id === state.trackId)!;
      const nextIndex = state.scenarioIndex + 1;
      if (nextIndex >= track.scenarios.length) {
        return { ...state, screen: 'result', showFeedback: false, lastDelta: null, selectedOption: null };
      }
      return { ...state, scenarioIndex: nextIndex, showFeedback: false, lastDelta: null, selectedOption: null };
    }
    case 'DISMISS_FEEDBACK':
      return { ...state, showFeedback: false };
    case 'GO_BACK': {
      if (state.screen === 'select') return state;
      if (state.screen === 'intro') return { ...initialState };

      const track = tracks.find(t => t.id === state.trackId)!;
      // From a question: the previous one, shown unanswered. From the result: the last question.
      const targetIndex = state.screen === 'result' ? track.scenarios.length - 1 : state.scenarioIndex - 1;
      const cleared = { lastDelta: null, showFeedback: false, selectedOption: null };
      if (targetIndex < 0) {
        return { ...state, ...cleared, ...scoreFromChoices(track, []), screen: 'intro', scenarioIndex: 0, choices: [] };
      }
      const choices = state.choices.slice(0, targetIndex);
      return { ...state, ...cleared, ...scoreFromChoices(track, choices), screen: 'game', scenarioIndex: targetIndex, choices };
    }
    case 'RESTART':
      return { ...initialState };
    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const currentTrack: Track | null = state.trackId
    ? tracks.find(t => t.id === state.trackId) ?? null
    : null;

  const currentScenario = currentTrack?.scenarios[state.scenarioIndex] ?? null;

  const result = state.screen === 'result' && currentTrack
    ? calculateOutcome(currentTrack.id, state.totalScore, state.aggressiveCount)
    : null;

  const selectTrack = useCallback((trackId: string) => dispatch({ type: 'SELECT_TRACK', trackId }), []);
  const startGame = useCallback(() => dispatch({ type: 'START_GAME' }), []);
  const chooseOption = useCallback((optionIndex: number, delta: Score, aggressive: boolean) =>
    dispatch({ type: 'CHOOSE_OPTION', optionIndex, delta, aggressive }), []);
  const resetOption = useCallback(() => dispatch({ type: 'RESET_OPTION' }), []);
  const nextScenario = useCallback(() => dispatch({ type: 'NEXT_SCENARIO' }), []);
  const goBack = useCallback(() => dispatch({ type: 'GO_BACK' }), []);
  const restart = useCallback(() => dispatch({ type: 'RESTART' }), []);

  return {
    screen: state.screen,
    trackId: state.trackId,
    scenarioIndex: state.scenarioIndex,
    totalScore: state.totalScore,
    lastDelta: state.lastDelta,
    showFeedback: state.showFeedback,
    selectedOption: state.selectedOption,
    currentTrack,
    currentScenario,
    result: result as { outcome: Outcome; style: Style; normalized: Score } | null,
    totalScenarios: currentTrack?.scenarios.length ?? 0,
    selectTrack,
    startGame,
    chooseOption,
    resetOption,
    nextScenario,
    goBack,
    restart,
  };
}
