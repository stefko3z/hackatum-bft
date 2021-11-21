const products = {
    "PRODUCT1": {
        name: "Banana",
        emoji: "🍌"
    },
    "PRODUCT2": {
        name: "Apple",
        emoji: "🍎"
    },
    "PRODUCT3": {
        name: "Steak",
        emoji: "🥩"
    },
    "PRODUCT4": {
        name: "Burger",
        emoji: "🍔"
    },
    "PRODUCT5": {
        name: "Beer",
        emoji: "🍺"
    },
    "PRODUCT6": {
        name: "Champagne",
        emoji: "🍾"
    }
}

export const getProductName = (productId) => {
    return products[productId].name;
}

export const getProductEmoji = (productId) => {
    return products[productId].emoji;
}