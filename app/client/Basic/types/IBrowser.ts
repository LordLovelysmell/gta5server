type ISetScreenState = ({ isBrowserView }: { isBrowserView: boolean }) => void;

export interface IBrowser {
  browser: BrowserMp
  isCursorVisible: boolean

  destroy(): void
  setScreenState: ISetScreenState
  execute(code: string): void
}
