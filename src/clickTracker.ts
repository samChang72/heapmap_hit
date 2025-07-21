import { DOMUtils } from './domUtils';
import type { ClickData, Config, Stats, ExportData } from './types';

/**
 * 點擊追蹤器類別
 */
export class ClickTracker {
  private isTracking: boolean = false;
  private clickData: ClickData[] = [];
  private readonly sessionId: string;
  private readonly clickHandler: (event: MouseEvent) => void;
  private config: Required<Config>;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.clickHandler = this.handleClick.bind(this);
    this.config = {
      maxDataPoints: 1000,
      excludeSelectors: [],
      includeOnlySelectors: []
    };
  }

  /**
   * 生成會話 ID
   * @returns 會話 ID 字串
   */
  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
  }

  /**
   * 初始化追蹤器
   * @param options - 配置選項
   * @returns ClickTracker 實例
   */
  init(options: Config = {}): this {
    this.config = { ...this.config, ...options };
    return this;
  }

  /**
   * 開始追蹤點擊事件
   * @returns ClickTracker 實例
   */
  start(): this {
    if (this.isTracking) {
      console.warn('ClickTracker: 追蹤已經啟動');
      return this;
    }

    this.isTracking = true;
    document.addEventListener('click', this.clickHandler, true);
    console.log('ClickTracker: 開始追蹤點擊事件');
    return this;
  }

  /**
   * 停止追蹤點擊事件
   * @returns ClickTracker 實例
   */
  stop(): this {
    if (!this.isTracking) {
      console.warn('ClickTracker: 追蹤尚未啟動');
      return this;
    }

    this.isTracking = false;
    document.removeEventListener('click', this.clickHandler, true);
    console.log('ClickTracker: 停止追蹤點擊事件');
    return this;
  }

  /**
   * 處理點擊事件
   * @param event - 滑鼠事件
   */
  private handleClick(event: MouseEvent): void {
    try {
      const target = event.target as HTMLElement;
      
      if (!target) return;
      
      // 檢查是否應該排除此元素
      if (this.shouldExcludeElement(target)) {
        return;
      }

      // 收集點擊資料
      const clickInfo = this.collectClickData(event, target);
      
      // 添加到資料陣列
      this.addClickData(clickInfo);
      
      // 觸發自定義事件
      this.dispatchCustomEvent('heapmap:click', clickInfo);
      
    } catch (error) {
      console.error('ClickTracker: 處理點擊事件時發生錯誤', error);
    }
  }

  /**
   * 收集點擊資料
   * @param event - 滑鼠事件
   * @param target - 目標元素
   * @returns 點擊資料物件
   */
  private collectClickData(event: MouseEvent, target: HTMLElement): ClickData {
    const viewport = DOMUtils.getViewportInfo();
    const elementInfo = DOMUtils.getElementInfo(target);
    const relativeCoords = DOMUtils.getRelativeCoordinates(event.pageX, event.pageY, target);

    return {
      id: this.generateClickId(),
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      coordinates: {
        pageX: event.pageX,
        pageY: event.pageY,
        clientX: event.clientX,
        clientY: event.clientY,
        screenX: event.screenX,
        screenY: event.screenY,
        relative: relativeCoords
      },
      element: elementInfo,
      viewport: viewport,
      eventDetails: {
        type: event.type,
        button: event.button,
        buttons: event.buttons,
        altKey: event.altKey,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        shiftKey: event.shiftKey
      }
    };
  }

  /**
   * 生成點擊 ID
   * @returns 點擊 ID 字串
   */
  private generateClickId(): string {
    return 'click_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
  }

  /**
   * 添加點擊資料到陣列
   * @param clickData - 點擊資料
   */
  private addClickData(clickData: ClickData): void {
    this.clickData.push(clickData);
    
    // 如果超過最大數量，移除最舊的資料
    if (this.clickData.length > this.config.maxDataPoints) {
      this.clickData.shift();
    }
  }

  /**
   * 檢查是否應該排除該元素
   * @param element - HTML 元素
   * @returns 是否應該排除
   */
  private shouldExcludeElement(element: HTMLElement): boolean {
    // 檢查排除清單
    if (this.config.excludeSelectors.length > 0) {
      for (const excludeSelector of this.config.excludeSelectors) {
        try {
          if (element.matches && element.matches(excludeSelector)) {
            return true;
          }
        } catch (error) {
          console.warn('ClickTracker: 無效的排除選擇器:', excludeSelector);
        }
      }
    }
    
    // 檢查包含清單
    if (this.config.includeOnlySelectors.length > 0) {
      let shouldInclude = false;
      for (const includeSelector of this.config.includeOnlySelectors) {
        try {
          if (element.matches && element.matches(includeSelector)) {
            shouldInclude = true;
            break;
          }
        } catch (error) {
          console.warn('ClickTracker: 無效的包含選擇器:', includeSelector);
        }
      }
      return !shouldInclude;
    }
    
    return false;
  }

  /**
   * 觸發自定義事件
   * @param eventName - 事件名稱
   * @param detail - 事件詳細資料
   */
  private dispatchCustomEvent(eventName: string, detail: ClickData): void {
    const customEvent = new CustomEvent(eventName, {
      detail: detail,
      bubbles: false,
      cancelable: false
    });
    document.dispatchEvent(customEvent);
  }

  /**
   * 獲取收集的資料
   * @returns 點擊資料陣列的副本
   */
  getData(): ClickData[] {
    return [...this.clickData];
  }

  /**
   * 獲取資料統計
   * @returns 統計資訊物件
   */
  getStats(): Stats {
    return {
      totalClicks: this.clickData.length,
      sessionId: this.sessionId,
      isTracking: this.isTracking,
      firstClick: this.clickData.length > 0 ? this.clickData[0]!.timestamp : null,
      lastClick: this.clickData.length > 0 ? this.clickData[this.clickData.length - 1]!.timestamp : null
    };
  }

  /**
   * 清除資料
   * @returns ClickTracker 實例
   */
  clearData(): this {
    this.clickData = [];
    console.log('ClickTracker: 資料已清除');
    return this;
  }

  /**
   * 匯出資料為 JSON
   * @returns JSON 字串
   */
  exportData(): string {
    const exportData: ExportData = {
      sessionId: this.sessionId,
      totalClicks: this.clickData.length,
      exportTime: new Date().toISOString(),
      data: this.clickData
    };
    
    return JSON.stringify(exportData, null, 2);
  }

  /**
   * 設定配置
   * @param newConfig - 新的配置物件
   * @returns ClickTracker 實例
   */
  setConfig(newConfig: Partial<Config>): this {
    this.config = { ...this.config, ...newConfig };
    return this;
  }

  /**
   * 獲取配置
   * @returns 配置物件的副本
   */
  getConfig(): Required<Config> {
    return { ...this.config };
  }
}