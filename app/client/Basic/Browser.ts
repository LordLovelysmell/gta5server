import { BrowserState, ScreenState } from './types/BrowserState'

export class Browser implements BrowserState {
  browser: BrowserMp
  isCursorVisible: boolean

  constructor({ url = '' }: { url: string }) {
    this.setScreenState({ showChat: false, showCursor: true, showRadar: false, isBlurred: true })

    this.browser = mp.browsers.new(url)
    this.isCursorVisible = false
  }

  destroy() {
    if (!this.browser) {
      return
    }
    this.browser.destroy()
    this.setScreenState({ showChat: true, showCursor: true, showRadar: true, isBlurred: false })
  }

  setScreenState({ showChat, showCursor, showRadar, isBlurred }: ScreenState): void {
    mp.gui.chat.show(showChat)
    setTimeout(() => { // fix of invisible cursor
      mp.gui.cursor.show(showCursor, showCursor)
    }, 1)
    mp.game.ui.displayRadar(showRadar)

    if (isBlurred) {
      mp.game.graphics.transitionToBlurred(1)
    } else {
      mp.game.graphics.transitionFromBlurred(1)
    }
  }

  execute(code: string) {
    this.browser.execute(code)
  }
}
