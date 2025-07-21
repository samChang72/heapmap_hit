/**
 * HeapMap SDK TypeScript 型別定義
 */
/**
 * 座標資訊介面
 */
export interface Coordinates {
    /** 頁面 X 座標 */
    pageX: number;
    /** 頁面 Y 座標 */
    pageY: number;
    /** 視窗 X 座標 */
    clientX: number;
    /** 視窗 Y 座標 */
    clientY: number;
    /** 螢幕 X 座標 */
    screenX: number;
    /** 螢幕 Y 座標 */
    screenY: number;
    /** 相對於元素的座標 */
    relative: {
        x: number;
        y: number;
    };
}
/**
 * 元素邊界框資訊
 */
export interface BoundingRect {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
}
/**
 * 元素樣式資訊
 */
export interface ElementStyles {
    position: string;
    display: string;
    visibility: string;
    zIndex: string;
}
/**
 * 元素資訊介面
 */
export interface ElementInfo {
    /** 標籤名稱 */
    tagName: string;
    /** 元素 ID */
    id: string | null;
    /** CSS 類別名稱 */
    className: string | null;
    /** 文字內容 */
    textContent: string | null;
    /** HTML 內容 */
    innerHTML: string | null;
    /** 元素屬性 */
    attributes: Record<string, string>;
    /** CSS 選擇器 */
    selector: string;
    /** 邊界框資訊 */
    boundingRect: BoundingRect;
    /** 樣式資訊 */
    styles: ElementStyles;
}
/**
 * 視窗資訊介面
 */
export interface ViewportInfo {
    /** 視窗寬度 */
    width: number;
    /** 視窗高度 */
    height: number;
    /** 水平滾動位置 */
    scrollX: number;
    /** 垂直滾動位置 */
    scrollY: number;
    /** 使用者代理字串 */
    userAgent: string;
    /** 當前 URL */
    url: string;
    /** 時間戳 */
    timestamp: string;
}
/**
 * 事件詳細資訊介面
 */
export interface EventDetails {
    /** 事件類型 */
    type: string;
    /** 滑鼠按鈕 */
    button: number;
    /** 滑鼠按鈕狀態 */
    buttons: number;
    /** Alt 鍵是否按下 */
    altKey: boolean;
    /** Ctrl 鍵是否按下 */
    ctrlKey: boolean;
    /** Meta 鍵是否按下 */
    metaKey: boolean;
    /** Shift 鍵是否按下 */
    shiftKey: boolean;
}
/**
 * 點擊資料介面
 */
export interface ClickData {
    /** 點擊 ID */
    id: string;
    /** 會話 ID */
    sessionId: string;
    /** 時間戳 */
    timestamp: string;
    /** 座標資訊 */
    coordinates: Coordinates;
    /** 元素資訊 */
    element: ElementInfo;
    /** 視窗資訊 */
    viewport: ViewportInfo;
    /** 事件詳細資訊 */
    eventDetails: EventDetails;
}
/**
 * 統計資訊介面
 */
export interface Stats {
    /** 總點擊數 */
    totalClicks: number;
    /** 會話 ID */
    sessionId: string;
    /** 是否正在追蹤 */
    isTracking: boolean;
    /** 第一次點擊時間 */
    firstClick: string | null;
    /** 最後一次點擊時間 */
    lastClick: string | null;
}
/**
 * 配置選項介面
 */
export interface Config {
    /** 最大資料點數量 */
    maxDataPoints?: number;
    /** 要排除的選擇器 */
    excludeSelectors?: string[];
    /** 只包含的選擇器 */
    includeOnlySelectors?: string[];
}
/**
 * 匯出資料格式
 */
export interface ExportData {
    /** 會話 ID */
    sessionId: string;
    /** 總點擊數 */
    totalClicks: number;
    /** 匯出時間 */
    exportTime: string;
    /** 點擊資料 */
    data: ClickData[];
}
/**
 * HeapMap 自定義事件詳細資訊
 */
export interface HeapMapEventDetail {
    detail: ClickData;
}
/**
 * 事件監聽器函數型別
 */
export type HeapMapEventListener = (event: CustomEvent<ClickData>) => void;
/**
 * 匯出格式型別
 */
export type ExportFormat = 'json';
/**
 * 事件類型
 */
export type EventType = 'click';
//# sourceMappingURL=types.d.ts.map