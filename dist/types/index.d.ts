import { ClickTracker } from './clickTracker';
import { DOMUtils } from './domUtils';
import type { Config, ClickData, Stats, HeapMapEventListener, EventType, ExportFormat } from './types';
/**
 * HeapMap SDK 主要類別
 */
declare class HeapMapSDK {
    private readonly clickTracker;
    private readonly version;
    constructor();
    /**
     * 初始化 SDK
     * @param options - 配置選項
     * @returns HeapMapSDK 實例
     */
    init(options?: Config): this;
    /**
     * 開始追蹤
     * @returns HeapMapSDK 實例
     */
    start(): this;
    /**
     * 停止追蹤
     * @returns HeapMapSDK 實例
     */
    stop(): this;
    /**
     * 獲取收集的資料
     * @returns 點擊資料陣列
     */
    getData(): ClickData[];
    /**
     * 獲取統計資訊
     * @returns 統計資訊物件
     */
    getStats(): Stats;
    /**
     * 清除資料
     * @returns HeapMapSDK 實例
     */
    clearData(): this;
    /**
     * 匯出資料
     * @param format - 匯出格式
     * @returns 格式化的資料字串
     * @throws 如果格式不支援會拋出錯誤
     */
    exportData(format?: ExportFormat): string;
    /**
     * 設定配置
     * @param config - 配置物件
     * @returns HeapMapSDK 實例
     */
    setConfig(config: Partial<Config>): this;
    /**
     * 獲取配置
     * @returns 配置物件
     */
    getConfig(): Required<Config>;
    /**
     * 監聽自定義事件
     * @param eventType - 事件類型
     * @param callback - 回調函數
     * @returns HeapMapSDK 實例
     */
    on(eventType: EventType, callback: HeapMapEventListener): this;
    /**
     * 移除事件監聽器
     * @param eventType - 事件類型
     * @param callback - 回調函數
     * @returns HeapMapSDK 實例
     */
    off(eventType: EventType, callback: HeapMapEventListener): this;
    /**
     * 獲取 SDK 版本
     * @returns 版本號字串
     */
    getVersion(): string;
    /**
     * 獲取 DOM 工具
     * @returns DOMUtils 物件
     */
    getDOMUtils(): typeof DOMUtils;
}
declare const HeapMap: HeapMapSDK;
declare global {
    interface Window {
        HeapMap: HeapMapSDK;
    }
}
export default HeapMap;
export { HeapMapSDK, ClickTracker, DOMUtils };
export type * from './types';
//# sourceMappingURL=index.d.ts.map