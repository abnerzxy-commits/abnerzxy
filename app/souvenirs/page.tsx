import Link from 'next/link'
import Image from 'next/image'

const categories = [
  { id: 'food', label: '🍫 美食伴手禮', anchor: 'food' },
  { id: 'beauty', label: '🧴 美妝保養', anchor: 'beauty' },
  { id: 'character', label: '🧸 文創周邊', anchor: 'character' },
  { id: 'pharmacy', label: '💊 藥妝生活', anchor: 'pharmacy' },
  { id: 'tips', label: '🛒 採買攻略', anchor: 'tips' },
]

const foodSouvenirs = [
  {
    emoji: '🍫',
    name: '釜山魚糕（어묵）',
    nameKo: '어묵',
    image: '/images/souvenirs/fish-cake.webp',
    where: '三進魚糕（BIFF 廣場店）、影島橋旁魚糕體驗館',
    price: '₩10,000～25,000',
    priceTwd: 'NT$250～625',
    note: '釜山代表名產！真空包裝可帶回，種類超多。三進魚糕有禮盒裝，送禮體面。',
    kid: true,
    hot: true,
    tags: ['必買', '送禮首選'],
  },
  {
    emoji: '🥜',
    name: '海雲台花生麵包（땅콩빵）',
    nameKo: '땅콩빵',
    image: '/images/souvenirs/pastry.webp',
    where: '海雲台花生麵包專賣店',
    price: '40 個 ₩5,000',
    priceTwd: 'NT$125',
    note: '花生形狀超可愛！酥脆外層＋香軟內餡，一袋 40 個很適合分送。海雲台必買。',
    kid: true,
    hot: true,
    tags: ['超高 CP 值', '分送最讚'],
  },
  {
    emoji: '🍪',
    name: 'B&C 奶油餅乾',
    nameKo: '버터쿠키',
    image: '/images/souvenirs/butter-cookies.webp',
    where: '南浦洞 BIFF 廣場附近',
    price: '₩12,000～18,000',
    priceTwd: 'NT$300～450',
    note: '釜山超人氣手工奶油餅乾，包裝精美適合送禮。口味有原味、巧克力、抹茶等。常常排隊。',
    kid: true,
    hot: false,
    tags: ['排隊名店', '包裝精美'],
  },
  {
    emoji: '🫖',
    name: '韓國柚子茶 / 紅棗茶',
    nameKo: '유자차 / 대추차',
    image: '/images/souvenirs/yuzu-tea.webp',
    where: '超市（E-mart、Homeplus）、南浦洞',
    price: '₩5,000～12,000',
    priceTwd: 'NT$125～300',
    note: '罐裝果醬式，回台灣沖熱水就能喝。柚子茶最經典，蜂蜜口味小孩也愛。帶一罐自用超划算。',
    kid: true,
    hot: false,
    tags: ['自用必買', '超市便宜'],
  },
  {
    emoji: '🍭',
    name: '韓國零食大禮包',
    nameKo: '과자',
    image: '/images/souvenirs/korean-snacks.webp',
    where: '超市（E-mart、Homeplus）、便利商店',
    price: '₩10,000～20,000',
    priceTwd: 'NT$250～500',
    note: '蜂蜜奶油洋芋片、Market O 巧克力布朗尼、Pepero、養樂多軟糖都是經典。超市價格比觀光區便宜一半。',
    kid: true,
    hot: false,
    tags: ['經典款', '分送方便'],
  },
  {
    emoji: '🌶',
    name: '韓國海苔 / 拌飯醬',
    nameKo: '김 / 비빔장',
    image: '/images/souvenirs/korean-food.webp',
    where: '超市（E-mart、Homeplus）',
    price: '₩3,000～8,000',
    priceTwd: 'NT$75～200',
    note: '韓國海苔比台灣便宜很多，大包裝送人自用都合適。拌飯醬（CJ bibigo）一罐搞定韓式料理。',
    kid: true,
    hot: false,
    tags: ['超市便宜', '實用型'],
  },
  {
    emoji: '🍯',
    name: '蜂蜜奶油杏仁',
    nameKo: '허니버터 아몬드',
    image: '/images/souvenirs/honey-almonds.webp',
    where: '超市、便利商店、機場',
    price: '₩5,000～10,000',
    priceTwd: 'NT$125～250',
    note: '超人氣伴手禮！蜂蜜奶油口味一吃上癮，另有芥末、辣味等變化款。輕巧好帶，包裝也漂亮。',
    kid: true,
    hot: true,
    tags: ['人氣王', '好攜帶'],
  },
  {
    emoji: '🧁',
    name: '韓國即溶咖啡 / Maxim',
    nameKo: '커피믹스',
    image: '/images/souvenirs/instant-coffee.webp',
    where: '超市（E-mart、Homeplus）',
    price: '₩8,000～15,000',
    priceTwd: 'NT$200～375',
    note: 'Maxim 摩卡金是韓國國民咖啡，100 入大包裝超划算。送長輩或辦公室同事的好選擇。',
    kid: false,
    hot: false,
    tags: ['送長輩', '辦公室團購'],
  },
]

const beautySouvenirs = [
  {
    emoji: '🧴',
    name: '韓國面膜',
    nameKo: '마스크팩',
    image: '/images/souvenirs/face-mask.webp',
    where: 'Olive Young（全釜山都有）',
    price: '₩1,000～3,000 / 片',
    priceTwd: 'NT$25～75 / 片',
    note: 'Mediheal、Dr.Jart+ 是經典款。Olive Young 常有買 10 送 2 活動，比台灣便宜一半以上。',
    kid: false,
    hot: true,
    tags: ['超值', '買越多越划算'],
  },
  {
    emoji: '💄',
    name: '韓國美妝保養品',
    nameKo: '화장품',
    image: '/images/souvenirs/skincare.webp',
    where: 'Olive Young、新世界百貨',
    price: '₩3,000～30,000',
    priceTwd: 'NT$75～750',
    note: '護手霜、防曬是最熱門伴手禮。Dr.G / Torriden / Anua 是 2025 熱門品牌。結帳時出示護照可退稅。',
    kid: false,
    hot: true,
    tags: ['退稅好買', '2025 熱門'],
  },
  {
    emoji: '🫧',
    name: '洗髮精 / 沐浴乳',
    nameKo: '샴푸',
    image: '/images/souvenirs/shampoo.webp',
    where: 'Olive Young、超市',
    price: '₩8,000～15,000',
    priceTwd: 'NT$200～375',
    note: 'Mise en scène、Ryo（呂）都是韓國熱賣品牌。大容量比台灣便宜，但注意行李重量。放託運。',
    kid: false,
    hot: false,
    tags: ['自用好物', '放託運'],
  },
]

const characterSouvenirs = [
  {
    emoji: '🧸',
    name: 'Kakao Friends 周邊',
    nameKo: '카카오프렌즈',
    image: '/images/souvenirs/plush-toys.webp',
    where: 'Kakao Friends Store（南浦洞、西面）',
    price: '₩5,000～30,000',
    priceTwd: 'NT$125～750',
    note: 'Ryan、Apeach、Chunsik 角色超可愛，玩偶、文具、杯子都有。小孩看到會瘋掉，大人也淪陷。',
    kid: true,
    hot: true,
    tags: ['小孩最愛', '超可愛'],
  },
  {
    emoji: '🐰',
    name: 'BT21 / LINE Friends',
    nameKo: 'BT21',
    image: '/images/souvenirs/bunny-plush.webp',
    where: '新世界百貨、南浦洞商圈',
    price: '₩5,000～25,000',
    priceTwd: 'NT$125～625',
    note: 'BTS 聯名角色周邊，TATA、CHIMMY、COOKY 粉絲必買。文具、零食聯名也有，送禮兼追星。',
    kid: true,
    hot: false,
    tags: ['粉絲必收', '限定款多'],
  },
  {
    emoji: '🖊',
    name: '韓國文具 / 貼紙',
    nameKo: '문구',
    image: '/images/souvenirs/stationery.webp',
    where: 'ARTBOX、大創（Daiso）、地下街',
    price: '₩1,000～10,000',
    priceTwd: 'NT$25～250',
    note: '韓國文具設計超美！貼紙、手帳本、可愛筆都是好選擇。大創更是 ₩1,000 起跳，掃貨天堂。',
    kid: true,
    hot: false,
    tags: ['銅板價', '小孩自選'],
  },
]

const pharmacySouvenirs = [
  {
    emoji: '🩹',
    name: 'D-PANTHENOL 軟膏（萬用修復）',
    nameKo: 'D-판테놀 연고',
    image: '/images/souvenirs/cream-tube.webp',
    where: '藥局（약국）、Olive Young',
    price: '₩8,000～12,000',
    priceTwd: 'NT$200～300',
    note: '右泛醇（Dexpanthenol）50mg/g，從新生兒到成人都能用的萬能修復軟膏。適用尿布疹、皮膚炎、乾燥龜裂、曬傷、輕度燙傷。帶小孩必備！',
    kid: true,
    hot: true,
    tags: ['親子必備', '萬用藥膏'],
  },
  {
    emoji: '🧴',
    name: 'D PANSEPTIC 乳霜（傷口護理）',
    nameKo: 'D-디판셉틱 크림',
    image: '/images/souvenirs/collagen-mask.webp',
    where: '藥局（약국）',
    price: '₩6,000～9,000',
    priceTwd: 'NT$150～225',
    note: '右泛醇＋鹽酸氯己定（Chlorhexidine）殺菌配方。專門處理挫傷、擦傷、龜裂傷、割傷等外傷，可預防疤痕形成。小孩跌倒擦傷必備。',
    kid: true,
    hot: false,
    tags: ['外傷護理', '防疤'],
  },
  {
    emoji: '🦟',
    name: 'D PANBUG 凝膠（蚊蟲止癢）',
    nameKo: 'D-판버그 겔',
    image: '/images/souvenirs/cream-tube.webp',
    where: '藥局（약국）、Olive Young',
    price: '₩6,000～8,000',
    priceTwd: 'NT$150～200',
    note: '蚊蟲叮咬專用凝膠，含右泛醇、尿囊素、甘草酸二鉀等抗炎成分。無防腐劑、無抗生素、無類固醇，嬰兒也可在監護人指導下使用。',
    kid: true,
    hot: true,
    tags: ['嬰兒可用', '無類固醇'],
  },
  {
    emoji: '🌈',
    name: 'EYECANDY 彩虹梳子',
    nameKo: '아이캔디 레인보우 브러시',
    image: '/images/souvenirs/hair-brush.webp',
    where: 'Olive Young、大創（Daiso）、南浦洞地下街',
    price: '₩3,000～8,000',
    priceTwd: 'NT$75～200',
    note: '超可愛彩虹波浪梳齒，背面是鏡子！不拉扯頭髮，小孩也能自己梳。顏色繽紛當伴手禮送女生朋友超受歡迎。',
    kid: true,
    hot: true,
    tags: ['女生最愛', '實用可愛'],
  },
]

const shoppingTips = [
  {
    icon: '🏪',
    title: '超市最便宜',
    desc: 'E-mart、Homeplus 價格最便宜，觀光區同商品貴 30～50%。大量採買一定要去超市。',
  },
  {
    icon: '🧾',
    title: '退稅攻略',
    desc: 'Olive Young 單筆滿 ₩30,000 可退稅，結帳出示護照。新世界百貨 B1 外國旅客服務台可領折扣券。',
  },
  {
    icon: '📦',
    title: '行李打包',
    desc: '液體類（柚子茶、醬料、洗髮精）一律放託運行李。建議帶一個空的折疊袋，裝不下的寄回台灣用 EMS。',
  },
  {
    icon: '📅',
    title: '最後一天再採買',
    desc: '避免整趟行程都在扛東西。最後一天安排在南浦洞或機場免稅店集中掃貨最有效率。',
  },
  {
    icon: '💳',
    title: '刷卡 vs 現金',
    desc: '超市和 Olive Young 可刷卡。傳統市場和路邊小店建議準備現金。Kakao Friends Store 可刷卡。',
  },
  {
    icon: '✈️',
    title: '機場免稅店',
    desc: '金海機場免稅店有韓國零食、美妝、人蔘。適合最後補貨，但種類不如市區多。',
  },
]

const budgetGuide = [
  { label: '輕度採購', budget: '₩50,000', budgetTwd: 'NT$1,250', desc: '海苔、零食、面膜各帶一些' },
  { label: '正常掃貨', budget: '₩150,000', budgetTwd: 'NT$3,750', desc: '食品＋美妝＋少量周邊' },
  { label: '重度購物', budget: '₩300,000+', budgetTwd: 'NT$7,500+', desc: '全品項掃貨＋品牌保養品' },
]

export default function SouvenirsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">🎁 伴手禮專區</h1>
        <p className="text-gray-500">釜山必買伴手禮完整攻略，價格、地點、推薦一次看</p>
      </div>

      {/* Quick nav */}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map(cat => (
          <a
            key={cat.id}
            href={`#${cat.anchor}`}
            className="bg-pink-50 text-pink-700 border border-pink-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-100 transition-colors"
          >
            {cat.label}
          </a>
        ))}
      </div>

      {/* Budget overview */}
      <div className="bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-200 rounded-2xl p-6 mb-12">
        <h3 className="font-bold text-pink-800 text-lg mb-4">💰 伴手禮預算參考</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {budgetGuide.map(item => (
            <div key={item.label} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="font-bold text-gray-900 mb-1">{item.label}</div>
              <div className="text-2xl font-bold text-pink-600">{item.budget}</div>
              <div className="text-gray-500 text-sm mt-0.5">{item.budgetTwd}</div>
              <p className="text-xs text-gray-400 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ Food souvenirs ═══ */}
      <section id="food" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">🍫 美食伴手禮</h2>
        <p className="text-gray-500 mb-8">釜山名產 + 超市必掃，自用送人都合適</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {foodSouvenirs.map(item => (
            <SouvenirCard key={item.name} item={item} />
          ))}
        </div>
      </section>

      {/* ═══ Beauty souvenirs ═══ */}
      <section id="beauty" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">🧴 美妝保養</h2>
        <p className="text-gray-500 mb-8">Olive Young 掃貨清單，退稅再省一波</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {beautySouvenirs.map(item => (
            <SouvenirCard key={item.name} item={item} />
          ))}
        </div>
      </section>

      {/* ═══ Character goods ═══ */}
      <section id="character" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">🧸 文創周邊</h2>
        <p className="text-gray-500 mb-8">Kakao Friends、BT21、韓國文具，大人小孩都淪陷</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {characterSouvenirs.map(item => (
            <SouvenirCard key={item.name} item={item} />
          ))}
        </div>
      </section>

      {/* ═══ Pharmacy & daily ═══ */}
      <section id="pharmacy" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">💊 藥妝生活</h2>
        <p className="text-gray-500 mb-8">韓國藥局好物，帶小孩必備的修復膏＋實用小物</p>

        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-6">
          <p className="text-green-700 text-sm leading-relaxed">
            💡 <span className="font-bold">D-Panthenol 系列</span>是韓國東亞製藥出品的人氣親子藥妝，在韓國藥局（약국）都能買到。右泛醇（維生素 B5 衍生物）是核心成分，修復力強且溫和，很多韓國媽媽的育兒包必備品。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pharmacySouvenirs.map(item => (
            <SouvenirCard key={item.name} item={item} />
          ))}
        </div>
      </section>

      {/* ═══ Shopping tips ═══ */}
      <section id="tips" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">🛒 採買攻略</h2>
        <p className="text-gray-500 mb-8">掌握這幾招，買得更聰明</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {shoppingTips.map(tip => (
            <div key={tip.title} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="text-3xl mb-2">{tip.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Where to buy map overview */}
      <section className="mb-16">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h3 className="font-bold text-amber-800 text-lg mb-4">📍 主要購物地點一覽</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="font-bold text-gray-900 mb-1">南浦洞商圈</div>
              <p className="text-gray-600">BIFF 廣場、Kakao Friends Store、光復路、國際市場。伴手禮＋逛街一次搞定。</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="font-bold text-gray-900 mb-1">西面站</div>
              <p className="text-gray-600">Olive Young 大型店、地下街、NC 百貨。美妝掃貨首選。</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="font-bold text-gray-900 mb-1">新世界百貨（Centum City）</div>
              <p className="text-gray-600">全球最大百貨公司，B1 超市好買。外國旅客服務台領折扣券、退稅便利。</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="font-bold text-gray-900 mb-1">E-mart / Homeplus</div>
              <p className="text-gray-600">在地大型超市，零食、海苔、泡麵、柚子茶都是最低價。建議最後一天去。</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center py-8 border-t border-gray-100">
        <p className="text-gray-400 text-sm mb-4">查好要買什麼了嗎？</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/itinerary" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors">
            📅 查看行程安排
          </Link>
          <Link href="/tips" className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl transition-colors">
            💱 換匯＆實用資訊
          </Link>
        </div>
      </div>
    </div>
  )
}

function SouvenirCard({ item }: { item: {
  emoji: string
  name: string
  nameKo: string
  image?: string
  where: string
  price: string
  priceTwd: string
  note: string
  kid: boolean
  hot: boolean
  tags: string[]
} }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {item.image && (
        <div className="relative h-40">
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-3 left-3 flex gap-1.5">
            {item.hot && <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">熱門</span>}
            {item.kid && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">小孩也愛</span>}
          </div>
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="font-bold text-white text-lg drop-shadow">{item.emoji} {item.name}</h3>
            <span className="text-xs text-white/80">{item.nameKo}</span>
          </div>
        </div>
      )}
      <div className="p-5">
        {!item.image && (
          <div className="flex items-start gap-3 mb-3">
            <span className="text-3xl">{item.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-gray-900">{item.name}</h3>
                {item.hot && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full shrink-0">熱門</span>}
                {item.kid && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full shrink-0">小孩也愛</span>}
              </div>
              <span className="text-xs text-gray-400">{item.nameKo}</span>
            </div>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm font-semibold text-blue-600">{item.price}</span>
          <span className="text-xs text-gray-400">{item.priceTwd}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-3">{item.note}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {item.tags.map(tag => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">#{tag}</span>
          ))}
        </div>

        {/* Where to buy */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <span>📍</span>
          <span>{item.where}</span>
        </div>
      </div>
    </div>
  )
}
