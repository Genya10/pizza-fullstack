export const mapPizzaSize = {
    20:'Little',
    30:'Middle',
    40: 'Large'
} as const

export const mapPizzaType = {
    1:'traditional',
    2:'thin'
} as const

export const pizzaSizes = Object.entries(mapPizzaSize).map(([name, value]) => ({
    name,
    value
}))