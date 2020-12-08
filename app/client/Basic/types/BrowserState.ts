export interface BrowserState {
  browser: BrowserMp
  isCursorVisible: boolean

  destroy(): void
  setScreenState: SetScreenStateType
  execute(code: string): void
}

export interface ScreenState {
  showChat: boolean,
  showCursor: boolean,
  showRadar: boolean,
  isBlurred: boolean
}

export type SetScreenStateType = (
  { showChat, showCursor, showRadar, isBlurred }:
    ScreenState) => void;
