import { useEffect, useRef, useState, useCallback } from "react";

const MAX_WARNINGS = 3;

interface AntiCheatState {
  warnings: number;
  isFullscreen: boolean;
  tabSwitches: number;
  lastWarning: string | null;
}

interface AntiCheatActions {
  enterFullscreen: () => Promise<void>;
  exitFullscreen: () => void;
  reset: () => void;
}

export function useAntiCheat(
  enabled: boolean,
  onMaxWarnings?: () => void,
): [AntiCheatState, AntiCheatActions] {
  const [state, setState] = useState<AntiCheatState>({
    warnings: 0,
    isFullscreen: false,
    tabSwitches: 0,
    lastWarning: null,
  });
  const maxReached = useRef(false);

  const addWarning = useCallback(
    (reason: string) => {
      setState((prev) => {
        const warnings = prev.warnings + 1;
        if (warnings >= MAX_WARNINGS && !maxReached.current) {
          maxReached.current = true;
          onMaxWarnings?.();
        }
        return { ...prev, warnings, lastWarning: reason };
      });
    },
    [onMaxWarnings],
  );

  useEffect(() => {
    if (!enabled) return;

    const onVisibilityChange = () => {
      if (document.hidden) {
        setState((prev) => ({ ...prev, tabSwitches: prev.tabSwitches + 1 }));
        addWarning("Tab switch detected. Please stay on the test window.");
      }
    };

    const onFullscreenChange = () => {
      const fs = Boolean(document.fullscreenElement);
      setState((prev) => ({ ...prev, isFullscreen: fs }));
      if (!fs && !maxReached.current) {
        addWarning("You exited fullscreen mode. Please return to fullscreen.");
      }
    };

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      addWarning("Right-click is disabled during the test.");
    };

    const onCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      addWarning("Copy-paste is disabled during the test.");
    };

    const onBlur = () => {
      if (!document.hidden) {
        addWarning("Focus lost. Please stay on the test window.");
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("copy", onCopy);
    window.addEventListener("blur", onBlur);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("copy", onCopy);
      window.removeEventListener("blur", onBlur);
    };
  }, [enabled, addWarning]);

  const enterFullscreen = useCallback(async () => {
    try {
      await document.documentElement.requestFullscreen();
    } catch {
      // Some browsers may block fullscreen
    }
  }, []);

  const exitFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }, []);

  const reset = useCallback(() => {
    maxReached.current = false;
    setState({ warnings: 0, isFullscreen: false, tabSwitches: 0, lastWarning: null });
  }, []);

  return [
    state,
    { enterFullscreen, exitFullscreen, reset },
  ];
}
