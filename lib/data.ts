import { Spot } from './types'

export const spots: Spot[] = [
  // ── Day 2 (4/2) 烤牛 ──────────────────────────────────────────────────
  {
    id: '1',
    slug: 'ribs-of-legend-haeundae',
    name_ko: '리브스 오브 레전드 해운대',
    name_zh: '傳說肋排 海雲台店',
    name_en: 'Ribs of Legend Haeundae',
    type: 'restaurant',
    cuisine_type: ['韓式烤肉', '烤牛', '肋排'],
    description: '釜山海雲台海灘旁的高級韓式烤牛名店，以頂級牛肋排聞名，肉質鮮嫩、油花豐富，是釜山必吃烤肉首選之一。位於3樓，可眺望海雲台海灘。',
    address_ko: '부산 해운대구 해운대해변로 277 3층',
    address_zh: '釜山海雲台區海雲台海邊路277號 3樓',
    district: '海雲台',
    city: '釜山',
    lat: 35.1631,
    lng: 129.1604,
    image_url: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80',
    price_range: 'expensive',
    avg_price_krw: 60000,
    has_english_menu: false,
    accepts_card: true,
    reservation_required: true,
    recommended_dishes: [
      {
        name_ko: '꽃등심',
        name_zh: '花紋肋眼',
        price_krw: 65000,
        description: '油花均勻的頂級肋眼，炭火烤出來外焦內嫩，是招牌必點',
        must_order: true,
      },
      {
        name_ko: '갈비살',
        name_zh: '牛肋排肉',
        price_krw: 55000,
        description: '帶骨牛肋肉，口感豐富、香氣十足',
        must_order: true,
      },
      {
        name_ko: '된장찌개',
        name_zh: '大醬湯',
        price_krw: 5000,
        description: '收尾必點，用烤肉的油脂煮出來的大醬湯特別鮮甜',
        must_order: false,
      },
    ],
    ordering_tips: [
      '強烈建議提前電話或網路訂位，尤其週末晚餐時段',
      '烤肉由店員操作，不需自己烤',
      '海雲台海灘景觀座位要早點指定，說「바다 보이는 자리（海景座位）」',
      '點餐時配上燒酒（소주）或生啤（생맥주）是標配',
      '결제 카드 가능（可刷卡）',
    ],
    tips: [
      'Day 2（4/2）晚餐，包車回來後直接前往',
      '位於3樓，進門後搭電梯上去',
      '附近就是海雲台海灘，飯後可以散步消化',
    ],
    opening_hours: {
      mon: '17:00-23:00',
      tue: '17:00-23:00',
      wed: '17:00-23:00',
      thu: '17:00-23:00',
      fri: '17:00-00:00',
      sat: '12:00-00:00',
      sun: '12:00-23:00',
    },
    tags: ['烤牛', '烤肉', '海雲台', '高級', '海景', 'Day2'],
    rating: 4.6,
    review_count: 890,
  },

  // ── Day 3 (4/3) 海鮮餐廳 ──────────────────────────────────────────────
  {
    id: '2',
    slug: 'haejok-ssallong-haeundae',
    name_ko: '해적쌀롱 해운대본점',
    name_zh: '海賊飯廊 海雲台本店',
    name_en: 'Haejok Ssallong Haeundae',
    type: 'restaurant',
    cuisine_type: ['海鮮', '韓式海鮮', '活海鮮'],
    description: '海雲台最受歡迎的海鮮餐廳之一，提供釜山在地新鮮漁獲，以炭火燒烤或生食方式呈現。店名「해적（海賊）」充滿個性，裝潢也很有氛圍。',
    address_ko: '부산 해운대구 구남로12번길 8 1층, 2층',
    address_zh: '釜山海雲台區九南路12巷8號 1-2樓',
    district: '海雲台',
    city: '釜山',
    lat: 35.1585,
    lng: 129.1602,
    image_url: 'https://images.unsplash.com/photo-1519984388953-d2406bc725e1?w=800&q=80',
    price_range: 'expensive',
    avg_price_krw: 50000,
    has_english_menu: false,
    accepts_card: true,
    reservation_required: true,
    recommended_dishes: [
      {
        name_ko: '킹크랩',
        name_zh: '帝王蟹',
        price_krw: 150000,
        description: '活體帝王蟹現點現做，可選蒸或燉，份量驚人',
        must_order: true,
      },
      {
        name_ko: '전복구이',
        name_zh: '烤鮑魚',
        price_krw: 30000,
        description: '新鮮鮑魚炭火烤制，加奶油後香氣四溢',
        must_order: true,
      },
      {
        name_ko: '해물탕',
        name_zh: '海鮮鍋',
        price_krw: 60000,
        description: '多種海鮮熬煮的辣湯鍋，湯頭濃郁鮮甜，最後加飯收尾',
        must_order: false,
      },
      {
        name_ko: '광어회',
        name_zh: '比目魚生魚片',
        price_krw: 40000,
        description: '釜山在地新鮮比目魚，配包飯醬和芥末',
        must_order: false,
      },
    ],
    ordering_tips: [
      '帝王蟹等活體海鮮依當日市價，點餐前先確認價格',
      '可說「오늘 추천 메뉴가 뭐예요?」問今日推薦',
      '人數多的話建議點海鮮拼盤（해산물 모둠）更划算',
      '加點炒飯（볶음밥）在最後收尾',
    ],
    tips: [
      'Day 3（4/3）晚餐，包車回來後前往',
      '建議提前訂位，週末一位難求',
      '從海雲台站步行約10分鐘',
    ],
    opening_hours: {
      mon: '12:00-22:00',
      tue: '12:00-22:00',
      wed: '12:00-22:00',
      thu: '12:00-22:00',
      fri: '12:00-23:00',
      sat: '11:00-23:00',
      sun: '11:00-22:00',
    },
    tags: ['海鮮', '帝王蟹', '海雲台', '活海鮮', 'Day3'],
    rating: 4.5,
    review_count: 1240,
  },

  // ── Day 5 最後一天 米其林 鰻魚 海木 ─────────────────────────────────────
  {
    id: '3',
    slug: 'haemok-michelin-eel',
    name_ko: '해목',
    name_zh: '海木（米其林鰻魚）',
    name_en: 'Haemok',
    type: 'restaurant',
    cuisine_type: ['鰻魚', '米其林', '韓式'],
    description: '釜山米其林推薦鰻魚專門店。以精心處理的鮮活鰻魚聞名，炭火慢烤、外皮酥脆、肉質鮮嫩，是釜山美食的最高水準之一。旅程最後一天的最強收尾。',
    address_ko: '부산 해운대구',
    address_zh: '釜山海雲台區',
    district: '海雲台',
    city: '釜山',
    lat: 35.1780,
    lng: 129.1290,
    image_url: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=800&q=80',
    price_range: 'expensive',
    avg_price_krw: 55000,
    has_english_menu: false,
    accepts_card: true,
    reservation_required: true,
    recommended_dishes: [
      {
        name_ko: '장어구이',
        name_zh: '烤鰻魚',
        price_krw: 55000,
        description: '招牌！鮮活鰻魚炭火慢烤，皮脆肉嫩，配上特製醬料，是最正宗的韓式烤鰻魚',
        must_order: true,
      },
      {
        name_ko: '장어탕',
        name_zh: '鰻魚湯',
        price_krw: 18000,
        description: '鰻魚熬煮的清湯，補氣養身，配白飯是完美結尾',
        must_order: true,
      },
      {
        name_ko: '장어덮밥',
        name_zh: '鰻魚飯',
        price_krw: 22000,
        description: '蒲燒鰻魚蓋飯，香甜醬汁滲入米飯，滿足感十足',
        must_order: false,
      },
    ],
    ordering_tips: [
      '米其林推薦名店，務必提前預約，旺季可能需要提前1-2週',
      '鰻魚通常以「條」計價，點餐時確認份量',
      '烤鰻魚由師傅在桌邊操作，慢慢享受過程',
      '最後可加點鰻魚湯（장어탕）暖胃收尾',
      '不辣版本說「맵지 않게 해주세요」',
    ],
    tips: [
      'Day 5 最後一天的壓軸晚餐，用米其林鰻魚為旅程畫下完美句點',
      '米其林餐廳水準穩定，但仍建議查看最新評價',
    ],
    opening_hours: {
      mon: '11:30-21:30',
      tue: '11:30-21:30',
      wed: '11:30-21:30',
      thu: '11:30-21:30',
      fri: '11:30-21:30',
      sat: '11:30-21:30',
      sun: '11:30-21:30',
      note: '售完即止，建議提前訂位',
    },
    tags: ['米其林', '鰻魚', '海雲台', '必吃', 'Day5', '壓軸'],
    youtube_sources: [],
    rating: 4.8,
    review_count: 560,
  },
]

export const districts = [
  { id: 'all', name: '全部地區' },
  { id: '海雲台', name: '海雲台', city: '釜山' },
]

export const typeLabels: Record<string, string> = {
  restaurant: '餐廳',
  cafe: '咖啡廳',
  attraction: '景點',
  accommodation: '住宿',
  shopping: '購物',
  activity: '活動',
}

export const priceLabels: Record<string, string> = {
  budget: '便宜 (₩10,000以下)',
  moderate: '中等 (₩10,000–30,000)',
  expensive: '高價 (₩30,000–80,000)',
  luxury: '奢華 (₩80,000+)',
}

export const cities = ['全部', '釜山']

export const suggestedItineraries = [
  {
    id: 'busan-5days',
    title: '釜山5天行程',
    days: 5,
    description: '釜山深度旅遊，含烤牛、海鮮、米其林鰻魚，每晚包車接送',
    image_url: 'https://images.unsplash.com/photo-1519984388953-d2406bc725e1?w=600&q=80',
    spotIds: ['1', '2', '3'],
    schedule: [
      {
        day: 1,
        title: 'Day 1 抵達釜山',
        items: [] as { spotId: string; start: string; duration: number; note?: string }[],
      },
      {
        day: 2,
        title: 'Day 2（4/2）包車回來 · 烤牛',
        items: [
          {
            spotId: '1',
            start: '19:00',
            duration: 120,
            note: '包車回來後直接前往，建議提前訂位',
          },
        ],
      },
      {
        day: 3,
        title: 'Day 3（4/3）包車回來 · 海鮮',
        items: [
          {
            spotId: '2',
            start: '19:00',
            duration: 120,
            note: '海賊飯廊，釜山新鮮活海鮮，建議訂位',
          },
        ],
      },
      {
        day: 4,
        title: 'Day 4 自由活動',
        items: [] as { spotId: string; start: string; duration: number; note?: string }[],
      },
      {
        day: 5,
        title: 'Day 5 最後一天 · 米其林鰻魚 海木',
        items: [
          {
            spotId: '3',
            start: '18:30',
            duration: 120,
            note: '壓軸晚餐！米其林推薦鰻魚，旅程最完美的句點',
          },
        ],
      },
    ],
  },
]
