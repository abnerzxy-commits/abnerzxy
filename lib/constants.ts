export const typeLabels: Record<string, string> = {
  restaurant: '餐廳',
  cafe: '咖啡廳',
  dessert: '甜點/小吃',
  attraction: '景點',
  park: '公園',
  shopping: '購物/票券',
  activity: '活動',
}

export const spiceLevelLabels: Record<string, string> = {
  none: '完全無辣 ✅',
  mild: '微辣（可調整）⚠️',
  moderate: '中辣 🌶',
  spicy: '辣 🌶🌶',
}

export const filterTypes = [
  { id: 'all', label: '全部' },
  { id: 'restaurant', label: '🍽 餐廳' },
  { id: 'dessert', label: '🍰 甜點/小吃' },
  { id: 'attraction', label: '🎡 景點' },
  { id: 'shopping', label: '🛍 購物/票券' },
  { id: 'ig', label: '📸 IG推薦' },
]
