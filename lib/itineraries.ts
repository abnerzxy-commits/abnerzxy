import { SuggestedItinerary } from './types'

export const suggestedItineraries: SuggestedItinerary[] = [
  {
    id: 'busan-6days-personal',
    title: '釜山6天5夜家族旅行',
    days: 6,
    description: '4/1-4/6 釜山全覽：甘川洞韓服、松島纜車、大渚賞櫻、Luge遛遛車、膠囊列車、廣安里無人機、水族館，Day2&3包車',
    image_url: '/images/act1.webp',
    spotIds: ['act1', 'act8', 'r7', 'act2', 'act4', 'c1', 'r8', 'p1', 'c2', 'act5', 'a4', 'k2', 'a3', 'act6', 'r9', 'a1', 'act7', 'act10', 's1', 'act11'],
    schedule: [
      {
        day: 1, title: 'Day 1（4/1）抵達釜山・海雲台逛逛｜Uber',
        items: [
          { start: '14:00', duration: 60, note: '抵達金海機場，搭 Uber 前往海雲台飯店（車程約 50 分鐘，費用約 ₩30,000）。建議先在機場 GS25 買 T-money 交通卡' },
          { start: '15:30', duration: 30, note: '飯店 check-in，放行李整理一下。小孩可以先休息補眠' },
          { start: '16:30', duration: 90, note: '海雲台海灘散步，小孩可以玩沙踩水。沿海邊走到尾浦鐵道附近拍照' },
          { start: '18:30', duration: 90, note: '海雲台市場覓食，推薦路邊小吃和便利商店晚餐，第一天不排太緊。早點讓小孩休息調時差' },
        ],
      },
      {
        day: 2, title: 'Day 2（4/2）包車：大渚賞櫻→溫泉川→Luge→樂天',
        items: [
          { spotId: 'p1', start: '09:30', duration: 120, note: '大渚生態公園賞櫻騎車，4月初櫻花滿開', travelFromPrev: { mode: 'chartered', minutes: 40, note: '海雲台出發' } },
          { spotId: 'c2', start: '11:30', duration: 60, note: '溫泉川咖啡廳街，河邊散步選間咖啡廳休息', travelFromPrev: { mode: 'chartered', minutes: 25 } },
          { spotId: 'act5', start: '14:00', duration: 90, note: 'Skyline Luge 遛遛車，小孩超愛！建議買多次票。午餐可在附近解決', travelFromPrev: { mode: 'chartered', minutes: 30 } },
          { spotId: 'k2', start: '16:00', duration: 180, note: '樂天 Premium Outlet 逛街（或改去樂天世界樂園 a4）。晚餐待定', travelFromPrev: { mode: 'chartered', minutes: 10 } },
        ],
      },
      {
        day: 3, title: 'Day 3（4/3）包車：甘川洞→松島→影島→海雲台',
        items: [
          { spotId: 'act1', start: '09:30', duration: 90, note: '甘川洞韓服體驗（衣裳貸與），穿韓服逛彩色村落拍照', travelFromPrev: { mode: 'chartered', minutes: 30, note: '海雲台出發' } },
          { spotId: 'act8', start: '11:00', duration: 30, note: 'Flipbook Studio，穿韓服拍翻頁動畫書紀念', travelFromPrev: { mode: 'walk', minutes: 3 } },
          { spotId: 'r7', start: '12:00', duration: 75, note: '明星一隻雞，整隻雞湯鍋午餐', travelFromPrev: { mode: 'walk', minutes: 5 } },
          { spotId: 'act2', start: '13:30', duration: 60, note: '松島海上纜車，俯瞰松島海灣', travelFromPrev: { mode: 'chartered', minutes: 15 } },
          { spotId: 'act4', start: '15:00', duration: 90, note: 'ARTE MUSEUM 沉浸式數位藝術，光影超夢幻', travelFromPrev: { mode: 'chartered', minutes: 20 } },
          { spotId: 'c1', start: '16:30', duration: 45, note: 'P.ark 咖啡廳，還有時間的話去喝杯咖啡休息', travelFromPrev: { mode: 'walk', minutes: 2 } },
          { spotId: 'r8', start: '18:30', duration: 75, note: '海雲台31cm海鮮刀削麵，包車回海雲台後晚餐', travelFromPrev: { mode: 'chartered', minutes: 40, note: '影島→海雲台' } },
        ],
      },
      {
        day: 4, title: 'Day 4（4/4）膠囊列車→尾浦家→水族館→廣安里無人機',
        items: [
          { spotId: 'a3', start: '09:30', duration: 90, note: '預約09:30膠囊列車，沿海岸欣賞海景', travelFromPrev: { mode: 'uber', minutes: 10, note: '海雲台出發至尾浦站' } },
          { spotId: 'act6', start: '11:00', duration: 40, note: '青沙浦天空步道，免費透明玻璃步道', travelFromPrev: { mode: 'capsule', minutes: 30, note: '搭膠囊列車沿海岸到青沙浦' } },
          { spotId: 'r9', start: '12:00', duration: 75, note: '尾浦家午餐，1976年老店醬油蟹拌飯', travelFromPrev: { mode: 'uber', minutes: 10, note: '青沙浦→尾浦家' } },
          { spotId: 'a1', start: '14:00', duration: 120, note: 'SEA LIFE 水族館，鯊魚隧道、企鵝表演，3歲以下免費', travelFromPrev: { mode: 'uber', minutes: 10, note: '尾浦家→海雲台海灘' } },
          { spotId: 'act7', start: '20:00', duration: 30, note: '廣安里無人機表演（週六固定演出）。下午水族館出來後可在海雲台海灘玩沙，晚餐海雲台周邊自由選擇', travelFromPrev: { mode: 'uber', minutes: 20, note: '海雲台→廣安里' } },
        ],
      },
      {
        day: 5, title: 'Day 5（4/5）水營江邊步道→新世界百貨逛街→頂樓恐龍公園｜Uber',
        items: [
          { spotId: 'act10', start: '09:30', duration: 60, note: '水營江邊步道散步，4月初櫻花滿開超美', travelFromPrev: { mode: 'uber', minutes: 15, note: '海雲台出發' } },
          { spotId: 's1', start: '11:30', duration: 180, note: '新世界百貨 Centum City 逛街，B1外國旅客服務台領折扣券', travelFromPrev: { mode: 'uber', minutes: 10, note: '水營江邊→Centum City' } },
          { spotId: 'act11', start: '15:00', duration: 60, note: '新世界頂樓恐龍公園（Zooraji），免費入場，恐龍模型會動，小孩超愛', travelFromPrev: { mode: 'walk', minutes: 3, note: '搭電梯到頂樓' } },
        ],
      },
      {
        day: 6, title: 'Day 6（4/6）回家｜Uber',
        items: [
          { start: '09:00', duration: 60, note: '飯店退房。把握最後時間到海雲台海灘走走拍照留念' },
          { start: '10:30', duration: 60, note: '海雲台周邊最後採買：便利商店零食、藥妝店面膜。推薦 GS25 的香蕉牛奶和 Homerun Ball 巧克力球' },
          { start: '12:00', duration: 50, note: '搭 Uber 前往金海機場（車程約 50 分鐘，費用約 ₩30,000）。建議提早出發避開塞車' },
          { start: '13:00', duration: 120, note: '機場報到、退稅、逛免稅店。金海機場不大，1.5 小時前到就夠。帶小孩記得預留多一點時間' },
        ],
      },
    ],
  },
  {
    id: 'busan-kids-day',
    title: '釜山親子一日精華',
    days: 1,
    description: '適合2-6歲小孩的一天行程：水族館→海灘小火車→親子晚餐，全程無辣',
    image_url: '/images/a1.webp',
    spotIds: ['a1', 'a3', 'r6'],
    schedule: [
      {
        day: 1, title: '親子完整一天',
        items: [
          { spotId: 'a1', start: '10:00', duration: 120, note: 'SEA LIFE水族館，3歲以下免費，提前網購省30%' },
          { spotId: 'a3', start: '13:30', duration: 90, note: '藍線公園海灘小火車，沿海岸欣賞東海海景' },
          { spotId: 'r6', start: '18:00', duration: 90, note: '맛찬들鹽烤豬肉海雲台店，完全無辣，小孩最愛' },
        ],
      },
    ],
  },
  {
    id: 'busan-kids-park-tour',
    title: '釜山親子景點巡禮',
    days: 2,
    description: '兩天玩遍釜山最棒的親子景點，2-6歲必訪',
    image_url: '/images/p1.webp',
    spotIds: ['a3', 'g1', 'a2', 'r6'],
    schedule: [
      {
        day: 1, title: '藍線公園＋豬肉湯飯',
        items: [
          { spotId: 'a3', start: '09:30', duration: 90, note: '藍線公園海灘小火車，帶幼兒首選' },
          { spotId: 'g1', start: '12:00', duration: 60, note: '密陽純大豬肉湯飯，24H營業，幼兒清湯無辣' },
        ],
      },
      {
        day: 2, title: '海洋博物館＋親子晚餐',
        items: [
          { spotId: 'a2', start: '10:00', duration: 150, note: '國立海洋博物館，完全免費！幼兒互動區' },
          { spotId: 'r6', start: '18:30', duration: 90, note: '맛찬들鹽烤豬肉海雲台店收尾' },
        ],
      },
    ],
  },
]
