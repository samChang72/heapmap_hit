import type { ClickData, Config, Stats } from './types';
/**
 * 點擊追蹤器類別
 */
export declare class ClickTracker {
    private isTracking;
    private clickData;
    private readonly sessionId;
    private readonly clickHandler;
    private config;
    constructor();
    /**
     * 生成會話 ID
     * @returns 會話 ID 字串
     */
    private generateSessionId;
    /**
     * 初始化追蹤器
     * @param options - 配置選項
     * @returns ClickTracker 實例
     */
    init(options?: Config): this;
    /**
     * 開始追蹤點擊事件
     * @returns ClickTracker 實例
     */
    start(): this;
    /**
     * 停止追蹤點擊事件
     * @returns ClickTracker 實例
     */
    stop(): this;
    /**
     * 處理點擊事件
     * @param event - 滑鼠事件
     */
    private handleClick;
    /**
     * 收集點擊資料
     * @param event - 滑鼠事件
     * @param target - 目標元素
     * @returns 點擊資料物件
     */
    private collectClickData;
    /**
     * 生成點擊 ID
     * @returns 點擊 ID 字串
     */
    private generateClickId;
    /**
     * 添加點擊資料到陣列
     * @param clickData - 點擊資料
     */
    private addClickData;
    /**
     * 檢查是否應該排除該元素
     * @param element - HTML 元素
     * @returns 是否應該排除
     */
    private shouldExcludeElement;
    /**
     * 觸發自定義事件
     * @param eventName - 事件名稱
     * @param detail - 事件詳細資料
     */
    private dispatchCustomEvent;
    /**
     * 獲取收集的資料
     * @returns 點擊資料陣列的副本
     */
    getData(): ClickData[];
    /**
     * 獲取資料統計
     * @returns 統計資訊物件
     */
    getStats(): Stats;
    /**
     * 清除資料
     * @returns ClickTracker 實例
     */
    clearData(): this;
    /**
     * 匯出資料為 JSON
     * @returns JSON 字串
     */
    exportData(): string;
    /**
     * 設定配置
     * @param newConfig - 新的配置物件
     * @returns ClickTracker 實例
     */
    setConfig(newConfig: Partial<Config>): this;
    /**
     * 獲取配置
     * @returns 配置物件的副本
     */
    getConfig(): Required<Config>;
}
//# sourceMappingURL=clickTracker.d.ts.map