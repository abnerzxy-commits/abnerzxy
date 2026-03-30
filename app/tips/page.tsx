import Link from 'next/link'

const exchangeMethods = [
  {
    rank: '🥇',
    title: '釜山南浦洞換錢所',
    rate: '匯率最好',
    desc: '南浦洞地下街附近有多家民間換錢所（友利換錢、大賢換錢等），匯率通常比銀行好 2～3%，且不收手續費。換越多越划算。',
    tip: '建議至少比較 2-3 家再換',
  },
  {
    rank: '🥈',
    title: '台灣先換美金→到韓國換韓元',
    rate: '匯率次佳',
    desc: '先在台灣的銀行換好美金（匯率穩定），到釜山南浦洞用美金換韓元，通常比直接台幣換韓元匯率更好。',
    tip: '適合大額換匯（1萬台幣以上）',
  },
  {
    rank: '🥉',
    title: '台灣銀行直接換韓元',
    rate: '匯率普通',
    desc: '台灣的銀行（台銀、兆豐）可直接換韓元，方便但匯率較差。適合先換少量應急用，到韓國再換大額。',
    tip: '建議先換 ₩100,000（約 NT$2,500）備用',
  },
  {
    rank: '💳',
    title: '直接刷卡 / 跨國提款',
    rate: '最方便',
    desc: '韓國刷卡非常普及，連路邊攤都能刷。Visa/Mastercard 海外刷卡手續費約 1.5%，但省去找換錢所的時間。部分信用卡有海外回饋可抵手續費。',
    tip: '記得出發前開通海外刷卡功能',
  },
]

const rateTable = [
  { amount: '₩1,000', approx: '≈ NT$25' },
  { amount: '₩5,000', approx: '≈ NT$125' },
  { amount: '₩10,000', approx: '≈ NT$250' },
  { amount: '₩30,000', approx: '≈ NT$750' },
  { amount: '₩50,000', approx: '≈ NT$1,250' },
  { amount: '₩100,000', approx: '≈ NT$2,500' },
]

const souvenirs = [
  {
    emoji: '🍫',
    name: '釜山魚糕（어묵）',
    where: '三進魚糕（BIFF 廣場店）、影島橋旁魚糕體驗館',
    price: '₩10,000～25,000',
    note: '釜山代表名產！真空包裝可帶回，種類超多。三進魚糕有禮盒裝，送禮體面。',
    kid: true,
  },
  {
    emoji: '🥜',
    name: '海雲台花生麵包（땅콩빵）',
    where: '海雲台花生麵包專賣店',
    price: '40 個 ₩5,000',
    note: '花生形狀超可愛！酥脆外層＋香軟內餡，一袋 40 個很適合分送。海雲台必買。',
    kid: true,
  },
  {
    emoji: '🍪',
    name: 'B&C 奶油餅乾',
    where: '南浦洞 BIFF 廣場附近',
    price: '₩12,000～18,000',
    note: '釜山超人氣手工奶油餅乾，包裝精美適合送禮。口味有原味、巧克力、抹茶等。常常排隊。',
    kid: true,
  },
  {
    emoji: '🫖',
    name: '韓國柚子茶 / 紅棗茶',
    where: '超市（E-mart、Homeplus）、南浦洞',
    price: '₩5,000～12,000',
    note: '罐裝果醬式，回台灣沖熱水就能喝。柚子茶最經典，蜂蜜口味小孩也愛。帶一罐自用超划算。',
    kid: true,
  },
  {
    emoji: '🧴',
    name: '韓國美妝保養品',
    where: 'Olive Young（全釜山都有）、新世界百貨',
    price: '₩3,000～30,000',
    note: '面膜、護手霜、防曬是最熱門伴手禮。Olive Young 常有買 2 送 1 活動。Dr.G / Torriden / Anua 是 2025 熱門品牌。',
    kid: false,
  },
  {
    emoji: '🍭',
    name: '韓國零食大禮包',
    where: '超市（E-mart、Homeplus）、便利商店',
    price: '₩10,000～20,000',
    note: '蜂蜜奶油洋芋片、Market O 巧克力布朗尼、Pepero、養樂多軟糖都是經典。超市價格比觀光區便宜一半。',
    kid: true,
  },
  {
    emoji: '🧸',
    name: 'Kakao Friends / BT21 周邊',
    where: 'Kakao Friends Store（南浦洞、西面）、新世界百貨',
    price: '₩5,000～30,000',
    note: 'Ryan、Apeach 等角色超可愛，玩偶、文具、杯子都有。小孩看到會瘋掉，大人也淪陷。',
    kid: true,
  },
  {
    emoji: '🌶',
    name: '韓國海苔 / 拌飯醬',
    where: '超市（E-mart、Homeplus）',
    price: '₩3,000～8,000',
    note: '韓國海苔比台灣便宜很多，大包裝送人自用都合適。拌飯醬（CJ bibigo）一罐搞定韓式料理。',
    kid: true,
  },
]

const travelTips = [
  { icon: '🛂', title: '入境準備', items: [
    '台灣護照免簽入境韓國 90 天',
    'K-ETA 已取消（2024.12 起免申請）',
    '建議帶英文版戶籍謄本（備用）',
    '小孩護照效期需超過 6 個月',
  ]},
  { icon: '🌡', title: '4月天氣穿搭', items: [
    '氣溫約 10～18°C，早晚涼',
    '建議洋蔥式穿法：薄長袖+外套',
    '海邊風大，帶件防風外套',
    '下雨機率中等，帶輕便雨具',
  ]},
  { icon: '📱', title: '上網 & 通訊', items: [
    '推薦買韓國 eSIM（出發前線上買）',
    'KT / SK / LG 三家都收訊好',
    '釜山地鐵和百貨有免費 WiFi',
    'KakaoMap 是韓國最好用的地圖 APP',
  ]},
  { icon: '🚇', title: '交通須知', items: [
    '釜山地鐵 6 歲以下免費',
    'T-money 卡便利商店就能買（₩2,500）',
    '計程車起跳 ₩4,800，短程很划算',
    'Uber 在釜山可用，機場接送方便',
  ]},
  { icon: '👶', title: '親子實用', items: [
    '多數餐廳有兒童椅，可先確認',
    '便利商店有嬰兒食品和尿布',
    '大型商場都有哺乳室和親子廁所',
    '韓國人對小孩很友善，別緊張',
  ]},
  { icon: '🏥', title: '安全 & 醫療', items: [
    '建議買旅平險＋醫療險',
    '緊急電話：警察 112 / 救護 119',
    '外國人旅遊諮詢：1330（有中文）',
    '藥妝店（올리브영）可買常備藥品',
  ]},
]

export default function TipsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">實用資訊</h1>
        <p className="text-gray-500">換錢、伴手���、旅遊須知，出發前看這頁就夠</p>
      </div>

      {/* Quick nav */}
      <div className="flex flex-wrap gap-3 mb-12">
        <a href="#exchange" className="bg-amber-50 text-amber-700 border border-amber-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-100 transition-colors">💱 換韓元</a>
        <a href="#souvenirs" className="bg-pink-50 text-pink-700 border border-pink-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-100 transition-colors">🎁 伴手禮</a>
        <a href="#tips" className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors">📋 旅遊須知</a>
      </div>

      {/* ═══ Currency exchange ═══ */}
      <section id="exchange" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">💱 哪裡換韓元最划算？</h2>
        <p className="text-gray-500 mb-8">出發前搞懂匯率，至少省下一頓飯錢</p>

        {/* Rate reference */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-amber-800 text-lg mb-3">📌 匯率建議參考</h3>
          <p className="text-amber-700 text-sm leading-relaxed mb-4">
            台幣兌韓元合理匯率約 <span className="font-bold text-xl">1 TWD = 38～42 KRW</span>（視時期波動）。<br />
            換算口訣：<span className="font-bold">韓元價格除以 40</span>，就大約是台幣價格。
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {rateTable.map(r => (
              <div key={r.amount} className="bg-white rounded-xl p-3 text-center shadow-sm">
                <div className="font-bold text-gray-900 text-sm">{r.amount}</div>
                <div className="text-amber-600 text-xs mt-1">{r.approx}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget suggestion */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-blue-800 text-lg mb-3">💰 建議攜帶現金</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="font-bold text-gray-900 mb-1">6 天親子行</div>
              <div className="text-2xl font-bold text-blue-600">₩400,000</div>
              <div className="text-gray-500 mt-1">≈ NT$10,000</div>
              <p className="text-xs text-gray-400 mt-2">含餐費、交通、小額消費</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="font-bold text-gray-900 mb-1">刷卡為主</div>
              <div className="text-2xl font-bold text-blue-600">₩150,000</div>
              <div className="text-gray-500 mt-1">≈ NT$3,750</div>
              <p className="text-xs text-gray-400 mt-2">備用現金，傳統市場和小攤用</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="font-bold text-gray-900 mb-1">加購物預算</div>
              <div className="text-2xl font-bold text-blue-600">₩600,000+</div>
              <div className="text-gray-500 mt-1">≈ NT$15,000+</div>
              <p className="text-xs text-gray-400 mt-2">含新世界百貨、伴手禮採購</p>
            </div>
          </div>
        </div>

        {/* Exchange methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {exchangeMethods.map(item => (
            <div key={item.title} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3 mb-2">
                <span className="text-2xl">{item.rank}</span>
                <div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <span className="text-xs text-blue-600 font-medium">{item.rate}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">{item.desc}</p>
              <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-1.5 inline-block">💡 {item.tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Souvenirs ═══ */}
      <section id="souvenirs" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">🎁 釜山伴手禮推薦</h2>
        <p className="text-gray-500 mb-8">自用送人都合適，附價格和購買地點</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {souvenirs.map(item => (
            <div key={item.name} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{item.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    {item.kid && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">小孩也愛</span>}
                  </div>
                  <div className="text-sm text-blue-600 font-medium mt-0.5">{item.price}</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">{item.note}</p>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <span>📍</span>
                <span>{item.where}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Shopping tips */}
        <div className="mt-8 bg-pink-50 border border-pink-200 rounded-2xl p-6">
          <h3 className="font-bold text-pink-800 text-lg mb-3">🛒 採買小撇步</h3>
          <ul className="space-y-2 text-sm text-pink-700">
            <li className="flex gap-2"><span>•</span><span>超市（E-mart、Homeplus）價格最便宜，觀光區貴 30～50%</span></li>
            <li className="flex gap-2"><span>•</span><span>新世界百貨 B1 外國旅客服務台可領折扣券（護照必備）</span></li>
            <li className="flex gap-2"><span>•</span><span>Olive Young 結帳時出示護照可退稅（滿 ₩30,000）</span></li>
            <li className="flex gap-2"><span>•</span><span>最後一天再大量採買，避免整趟行程都在扛東西</span></li>
            <li className="flex gap-2"><span>•</span><span>液體類（柚子茶、醬料）放託運行李，勿手提</span></li>
          </ul>
        </div>
      </section>

      {/* ═══ Travel tips ═══ */}
      <section id="tips" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">📋 釜山親子旅遊小須知</h2>
        <p className="text-gray-500 mb-8">帶小孩出發前必看，少踩坑多享受</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {travelTips.map(section => (
            <div key={section.title} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="text-3xl mb-2">{section.icon}</div>
              <h3 className="font-bold text-gray-900 mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i} className="text-sm text-gray-600 flex gap-2">
                    <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Back to home CTA */}
      <div className="text-center py-8 border-t border-gray-100">
        <p className="text-gray-400 text-sm mb-4">準備好了嗎？</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/itinerary" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors">
            📅 查看行程安排
          </Link>
          <Link href="/spots" className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl transition-colors">
            🗺 探索景點餐廳
          </Link>
        </div>
      </div>
    </div>
  )
}
