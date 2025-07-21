# 🗺️ HeapMap SDK

一個輕量級的 TypeScript SDK，用於追蹤和記錄使用者在網頁上的點擊行為，收集 DOM 資料和座標資訊。完整的型別支援，提供優秀的開發體驗。

## ✨ 功能特色

- 🎯 **精確追蹤** - 捕獲使用者點擊的精確位置和目標元素
- 📊 **豐富資料** - 收集 DOM 資訊、座標、視窗尺寸等詳細數據
- 💾 **本地暫存** - 將資料暫存在記憶體中的 JSON 物件
- 🔧 **靈活配置** - 支援自定義排除/包含規則
- 📱 **跨瀏覽器** - 支援現代瀏覽器和 IE11+
- 🚀 **輕量級** - 壓縮後小於 10KB
- 📝 **TypeScript 支援** - 完整的型別定義，提供優秀的開發體驗

## 🚀 快速開始

### 安裝

```bash
npm install heapmap-sdk
```

### 基本使用

```typescript
import HeapMap from 'heapmap-sdk';
// 或
import { HeapMapSDK } from 'heapmap-sdk';

// 初始化
HeapMap.init({
  maxDataPoints: 1000,
  excludeSelectors: ['.exclude-tracking']
});

// 開始追蹤
HeapMap.start();

// 獲取資料 (完整型別支援)
const data: ClickData[] = HeapMap.getData();
console.log(data);

// 停止追蹤
HeapMap.stop();
```

### JavaScript 使用

```javascript
// ES6 模組
import HeapMap from 'heapmap-sdk';

// CommonJS
const HeapMap = require('heapmap-sdk');

// 基本用法與 TypeScript 相同
HeapMap.init().start();
```

### HTML 直接引入

```html
<script src="dist/heapmap.js"></script>
<script>
  HeapMap.init().start();
</script>
```

## 📖 API 文檔

### 初始化和控制

#### `HeapMap.init(options)`
初始化 SDK

**參數:**
- `options.maxDataPoints` (number): 最大資料點數量，預設 1000
- `options.excludeSelectors` (array): 要排除的 CSS 選擇器
- `options.includeOnlySelectors` (array): 只包含的 CSS 選擇器

#### `HeapMap.start()`
開始追蹤點擊事件

#### `HeapMap.stop()`
停止追蹤點擊事件

### 資料操作

#### `HeapMap.getData()`
獲取所有收集的點擊資料

**回傳:** Array - 點擊資料陣列

#### `HeapMap.getStats()`
獲取統計資訊

**回傳:** Object - 包含總點擊數、會話ID等資訊

#### `HeapMap.clearData()`
清除所有暫存資料

#### `HeapMap.exportData(format)`
匯出資料

**參數:**
- `format` (string): 匯出格式，目前支援 'json'

**回傳:** String - 格式化的資料字串

### 事件監聽

#### `HeapMap.on(eventType, callback)`
監聽自定義事件

**參數:**
- `eventType` (string): 事件類型 (如 'click')
- `callback` (function): 回調函數

#### `HeapMap.off(eventType, callback)`
移除事件監聽器

## 📊 資料結構

每個點擊事件包含以下資料：

```javascript
{
  id: "click_1629876543210_abc123",
  sessionId: "session_1629876543000_xyz789",
  timestamp: "2023-07-21T10:30:45.123Z",
  coordinates: {
    pageX: 350,
    pageY: 200,
    clientX: 350,
    clientY: 150,
    screenX: 1200,
    screenY: 400,
    relative: { x: 50, y: 25 }
  },
  element: {
    tagName: "button",
    id: "submit-btn",
    className: "btn btn-primary",
    textContent: "提交",
    selector: "#submit-btn",
    boundingRect: { x: 300, y: 175, width: 100, height: 50 },
    attributes: { type: "submit", "data-action": "submit" }
  },
  viewport: {
    width: 1920,
    height: 1080,
    scrollX: 0,
    scrollY: 100,
    url: "https://example.com/page"
  },
  eventDetails: {
    type: "click",
    button: 0,
    ctrlKey: false,
    altKey: false
  }
}
```

## 🔧 配置選項

```javascript
HeapMap.init({
  // 最大資料點數量
  maxDataPoints: 1000,
  
  // 排除特定元素（不追蹤）
  excludeSelectors: [
    '.no-track',
    '#ignore-this',
    '[data-exclude-tracking]'
  ],
  
  // 只追蹤特定元素
  includeOnlySelectors: [
    '.track-only',
    'button',
    'a'
  ]
});
```

## 🧪 測試

開啟 `examples/test.html` 來測試 SDK 功能：

```bash
# 如果有本地服務器
python -m http.server 8000
# 然後訪問 http://localhost:8000/examples/test.html

# 或使用 Node.js
npx http-server
```

## 📝 TypeScript 支援

SDK 提供完整的 TypeScript 型別定義：

```typescript
import type { ClickData, Config, Stats } from 'heapmap-sdk';

// 配置型別
const config: Config = {
  maxDataPoints: 500,
  excludeSelectors: ['.no-track'],
  includeOnlySelectors: ['button', 'a']
};

// 事件監聽器型別
HeapMap.on('click', (event: CustomEvent<ClickData>) => {
  const clickData: ClickData = event.detail;
  // 完整的型別支援和自動完成
});

// 統計資訊型別
const stats: Stats = HeapMap.getStats();
```

### 主要型別

- `ClickData` - 點擊資料結構
- `Config` - 配置選項
- `Stats` - 統計資訊
- `ElementInfo` - 元素資訊
- `Coordinates` - 座標資訊
- `ViewportInfo` - 視窗資訊

## 🛠️ 開發

```bash
# 安裝依賴
npm install

# 型別檢查
npm run type-check

# 開發模式（監聽檔案變化）
npm run dev

# 打包生產版本
npm run build

# 只打包 webpack
npm run build:webpack

# 只生成型別定義
npm run build:types
```

## 📝 使用場景

- 🔍 **使用者體驗研究** - 了解使用者如何與網頁互動
- 📈 **轉換率優化** - 分析點擊模式以改善使用者流程  
- 🐛 **問題診斷** - 追蹤使用者操作以重現問題
- 📊 **A/B 測試** - 比較不同版本的使用者行為

## 📄 授權

MIT License

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

---

**TypeScript 重構完成！** 🎉

SDK 現已完成 TypeScript 重構：
- ✅ 完整的 TypeScript 支援
- ✅ 嚴格的型別檢查
- ✅ 豐富的型別定義
- ✅ 優秀的開發體驗
- ✅ 向後相容 JavaScript
- ✅ 現代化的開發工具鏈