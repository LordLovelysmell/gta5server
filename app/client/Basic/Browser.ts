import { IBrowser } from './types/IBrowser'

export class Browser implements IBrowser {
  browser: BrowserMp
  isCursorVisible: boolean

  constructor({ url = '' }: { url: string }) {
    this.setScreenState({ isBrowserView: true })

    this.browser = mp.browsers.new(url)
    this.isCursorVisible = false
  }

  destroy() {
    if (!this.browser) {
      return
    }
    this.browser.destroy()
    this.setScreenState({ isBrowserView: false })
  }

  setScreenState({ isBrowserView }: { isBrowserView: boolean }): void {
    mp.gui.chat.show(!isBrowserView)
    setTimeout(() => { // fix of invisible cursor
      mp.gui.cursor.show(isBrowserView, isBrowserView)
    }, 1)
    mp.game.ui.displayRadar(!isBrowserView)

    if (isBrowserView) {
      mp.game.graphics.transitionToBlurred(1)
    } else {
      mp.game.graphics.transitionFromBlurred(1)
    }
  }

  execute(code: string) {
    this.browser.execute(code)
  }
}
