import { ClickTracker } from './clickTracker';
import { DOMUtils } from './domUtils';
import type { 
  Config, 
  ClickData, 
  Stats, 
  HeapMapEventListener, 
  EventType, 
  ExportFormat 
} from './types';

/**
 * HeapMap SDK 主要類別
 */
class HeapMapSDK {
  private readonly clickTracker: ClickTracker;
  private readonly version: string = '1.0.0';

  constructor() {
    this.clickTracker = new ClickTracker();
  }

  /**
   * 初始化 SDK
   * @param options - 配置選項
   * @returns HeapMapSDK 實例
   */
  init(options: Config = {}): this {
    this.clickTracker.init(options);
    console.log(`HeapMap SDK v${this.version} 已初始化`);
    return this;
  }

  /**
   * 開始追蹤
   * @returns HeapMapSDK 實例
   */
  start(): this {
    this.clickTracker.start();
    return this;
  }

  /**
   * 停止追蹤
   * @returns HeapMapSDK 實例
   */
  stop(): this {
    this.clickTracker.stop();
    return this;
  }

  /**
   * 獲取收集的資料
   * @returns 點擊資料陣列
   */
  getData(): ClickData[] {
    return this.clickTracker.getData();
  }

  /**
   * 獲取統計資訊
   * @returns 統計資訊物件
   */
  getStats(): Stats {
    return this.clickTracker.getStats();
  }

  /**
   * 清除資料
   * @returns HeapMapSDK 實例
   */
  clearData(): this {
    this.clickTracker.clearData();
    return this;
  }

  /**
   * 匯出資料
   * @param format - 匯出格式
   * @returns 格式化的資料字串
   * @throws 如果格式不支援會拋出錯誤
   */
  exportData(format: ExportFormat = 'json'): string {
    switch (format.toLowerCase() as ExportFormat) {
      case 'json':
        return this.clickTracker.exportData();
      default:
        throw new Error(`不支援的匯出格式: ${format}`);
    }
  }

  /**
   * 設定配置
   * @param config - 配置物件
   * @returns HeapMapSDK 實例
   */
  setConfig(config: Partial<Config>): this {
    this.clickTracker.setConfig(config);
    return this;
  }

  /**
   * 獲取配置
   * @returns 配置物件
   */
  getConfig(): Required<Config> {
    return this.clickTracker.getConfig();
  }

  /**
   * 監聽自定義事件
   * @param eventType - 事件類型
   * @param callback - 回調函數
   * @returns HeapMapSDK 實例
   */
  on(eventType: EventType, callback: HeapMapEventListener): this {
    const eventName = `heapmap:${eventType}`;
    document.addEventListener(eventName, callback as EventListenerOrEventListenerObject);
    return this;
  }

  /**
   * 移除事件監聽器
   * @param eventType - 事件類型
   * @param callback - 回調函數
   * @returns HeapMapSDK 實例
   */
  off(eventType: EventType, callback: HeapMapEventListener): this {
    const eventName = `heapmap:${eventType}`;
    document.removeEventListener(eventName, callback as EventListenerOrEventListenerObject);
    return this;
  }

  /**
   * 獲取 SDK 版本
   * @returns 版本號字串
   */
  getVersion(): string {
    return this.version;
  }

  /**
   * 獲取 DOM 工具
   * @returns DOMUtils 物件
   */
  getDOMUtils(): typeof DOMUtils {
    return DOMUtils;
  }
}

// 建立全域實例
const HeapMap = new HeapMapSDK();

// 如果是瀏覽器環境，將 HeapMap 附加到 window 物件
declare global {
  interface Window {
    HeapMap: HeapMapSDK;
  }
}

if (typeof window !== 'undefined') {
  window.HeapMap = HeapMap;
}

// 支援 CommonJS 和 ES Modules
export default HeapMap;
export { HeapMapSDK, ClickTracker, DOMUtils };
export type * from './types';