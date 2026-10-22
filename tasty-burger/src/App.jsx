

import { useState } from 'react'

const burgers = [
  {
    id: 1,
    name: 'Crispy Chicken',
    description:
      'Enjoy a crispy chicken fillet with fresh lettuce, juicy tomatoes, creamy coleslaw, and our special chili sauce, all served in a soft toasted bun.',
    ingredients: [
      'Crispy chicken breast',
      'Fresh lettuce and tomatoes',
      'Creamy coleslaw',
      'Chili sauce',
      'Toasted burger bun',
    ],
    price: 99.15,
    image:
      'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 2,
    name: 'Ultimate Bacon',
    description:
      'A juicy beef patty topped with crispy bacon, melted cheddar cheese, onion, and mustard. A delicious choice for burger lovers.',
    ingredients: [
      'Beef patty',
      'Crispy bacon',
      'Cheddar cheese',
      'Fresh onion',
      'Mustard sauce',
      'Toasted burger bun',
    ],
    price: 99.32,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 3,
    name: 'Black Sheep',
    description:
      'A special burger with a juicy beef patty, American cheese, avocado, tomato relish, crisp lettuce, and red onion.',
    ingredients: [
      'Beef patty',
      'American cheese',
      'Avocado',
      'Tomato relish',
      'Fresh lettuce',
      'Red onion',
    ],
    price: 69.15,
    image:
      'https://www.bing.com/images/search?view=detailV2&ccid=9yP72pE7&id=460FD05F8A6DE612C6395BCDC842D1FC37F652A0&thid=OIP.9yP72pE7J9vaugutFxbUQQHaEL&mediaurl=https%3a%2f%2fmir-s3-cdn-cf.behance.net%2fproject_modules%2f1400%2ff2115f144501469.628d86d655707.jpg&exph=789&expw=1400&q=burger+image+black+sheep&FORM=IRPRST&ck=1058250F775065AA1A89E62C32658A32&selectedIndex=11&itb=0',
  },
  {
    id: 4,
    name: 'Vegan Burger',
    description:
      'A flavorful plant-based patty with fresh vegetables and special sauce inside a toasted bun. A meat-free option for your meal.',
    ingredients: [
      'Plant-based patty',
      'Fresh lettuce',
      'Tomatoes',
      'Red onion',
      'Plant-based sauce',
      'Toasted burger bun',
    ],
    price: 99.25,
    image:
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=85',
  },
]

export default function App() {
  const [favorites, setFavorites] = useState([])
  const [cart, setCart] = useState([])
  const [selectedBurger, setSelectedBurger] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [showCart, setShowCart] = useState(false)

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  function toggleFavorite(id) {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    )
  }

  function openDetails(burger) {
    setSelectedBurger(burger)
    setQuantity(1)
  }

  function addToCart(burger, amount = 1) {
    setCart((previous) => {
      const existing = previous.find((item) => item.id === burger.id)

      if (existing) {
        return previous.map((item) =>
          item.id === burger.id
            ? { ...item, quantity: item.quantity + amount }
            : item,
        )
      }

      return [...previous, { ...burger, quantity: amount }]
    })

    setSelectedBurger(null)
    setShowCart(false)
    setQuantity(1)
  }

  function changeCartQuantity(id, amount) {
    setCart((previous) =>
      previous
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  return (
    <div className="min-h-screen bg-white text-[#303030]">
      {/* HEADER */}
      <header className="h-[79px] border-b border-gray-100">
        <div className="mx-auto flex h-full max-w-[670px] items-center justify-between px-3 sm:px-0">
          <a href="#home" className="flex items-center gap-1 no-underline">
            <span className="text-[32px]">🍔</span>
            <span className="flex flex-col font-['Oswald'] text-[15px] font-bold leading-[14px]">
              <span className="text-[#b62c25]">TASTY</span>
              <span className="text-[#e4a12d]">BURGER</span>
            </span>
          </a>

          <nav className="flex items-center gap-2 sm:gap-[17px]">
            <a href="#about" className="text-[9px] font-bold text-gray-800 no-underline">
              ABOUT
            </a>
            <a href="#menu" className="text-[9px] font-bold text-gray-800 no-underline">
              OUR MENU
            </a>
            <a href="#menu" className="text-[9px] font-bold text-gray-800 no-underline">
              SHOP
            </a>
            <a href="#contact" className="text-[9px] font-bold text-gray-800 no-underline">
              CONTACT
            </a>

            <button
              onClick={() => setShowCart(true)}
              className="relative cursor-pointer border-0 bg-transparent text-[14px]"
              aria-label="Open shopping cart"
            >
              🛍️
              <span className="absolute -right-1.5 -top-1.5 flex h-[13px] w-[13px] items-center justify-center rounded-full bg-red-600 text-[8px] text-white">
                {cartCount}
              </span>
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN PAGE */}
      <main id="home" className="mx-auto max-w-[670px] px-3 pt-[17px] sm:px-0">
        <section id="about" className="mx-auto mb-[37px] max-w-[365px] text-center">
          <h1 className="mb-2 font-['Oswald'] text-[27px] font-semibold text-[#c9272e] sm:text-[29px]">
            OUR CRAZY BURGERS
          </h1>

          <p className="text-[10px] font-light leading-[15px] text-[#999999]">
            Get ready for a wild ride of flavors! Our crazy burgers are loaded
            with juicy patties, bold toppings, and irresistible sauces, all
            stacked on a perfectly toasted bun. Whether you like it cheesy,
            or extra meaty, we've got a burger that will blow your mind!
          </p>
        </section>

        {/* BURGER CARDS */}
        <section id="menu" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {burgers.map((burger) => (
            <article
              key={burger.id}
              className="min-w-0 overflow-hidden rounded border border-[#dedede] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* Click the image to open details */}
              <button
                onClick={() => openDetails(burger)}
                className="block h-[125px] w-full cursor-pointer overflow-hidden border-0 bg-gray-100 p-0 sm:h-[137px]"
                aria-label={`View ${burger.name} details`}
              >
                <img
                  src={burger.image}
                  alt={burger.name}
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />
              </button>

              <div className="p-[7px] sm:p-2">
                <div className="mb-1 flex items-center justify-between gap-1">
                  <button
                    onClick={() => openDetails(burger)}
                    className="cursor-pointer border-0 bg-transparent p-0 text-left font-['Oswald'] text-[11px] font-semibold sm:text-xs"
                  >
                    {burger.name}
                  </button>

                  <button
                    onClick={() => toggleFavorite(burger.id)}
                    aria-label={`Favorite ${burger.name}`}
                    className={`cursor-pointer border-0 bg-transparent font-sans text-[20px] ${
                      favorites.includes(burger.id)
                        ? 'text-red-500'
                        : 'text-gray-400'
                    }`}
                  >
                    {favorites.includes(burger.id) ? '♥' : '♡'}
                  </button>
                </div>

                <p className="mb-[7px] min-h-[34px] text-[9px] font-light leading-[13px] text-[#999999]">
                  {burger.name === 'Crispy Chicken'
                    ? 'Chicken breast, chilli sauce, tomatoes, pickles, coleslaw'
                    : burger.name === 'Ultimate Bacon'
                      ? 'House patty, cheddar cheese, bacon, onion, mustard'
                      : burger.name === 'Black Sheep'
                        ? 'American cheese, tomato relish, avocado, lettuce, red onion'
                        : 'Plant-based patty, fresh vegetables, and special sauce'}
                </p>

                <button
                  onClick={() => addToCart(burger)}
                  className="cursor-pointer rounded-sm border-0 bg-[#642b19] px-[7px] py-[5px] text-[8px] font-bold text-[#f5ce57] hover:bg-[#a72b25]"
                >
                  ₱{burger.price.toFixed(2)}
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>

      {/* PRODUCT DETAILS POPUP */}
      {selectedBurger && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4"
          onClick={() => setSelectedBurger(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-name"
            className="relative my-auto w-full max-w-[650px] overflow-hidden rounded-xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBurger(null)}
              aria-label="Close product details"
              className="absolute right-3 top-3 z-10 h-9 w-9 rounded-full bg-white text-2xl shadow"
            >
              ×
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="h-[220px] bg-gray-100 sm:h-full sm:min-h-[430px]">
                <img
                  src={selectedBurger.image}
                  alt={selectedBurger.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-5 sm:p-7">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#a72b25]">
                  Tasty Burger Menu
                </p>

                <h2 id="product-name" className="mb-3 font-['Oswald'] text-2xl font-semibold">
                  {selectedBurger.name}
                </h2>

                <p className="mb-5 text-sm leading-6 text-gray-600">
                  {selectedBurger.description}
                </p>

                <h3 className="mb-2 text-sm font-bold">Ingredients</h3>

                <ul className="mb-5 list-disc space-y-1 pl-5 text-sm text-gray-600">
                  {selectedBurger.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>

                <div className="mb-5 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm text-gray-500">Price</span>
                  <span className="text-2xl font-bold text-[#a72b25]">
                    ₱{selectedBurger.price.toFixed(2)}
                  </span>
                </div>

                {/* QUANTITY */}
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm font-medium">Quantity</span>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="h-8 w-8 rounded border disabled:opacity-40"
                    >
                      −
                    </button>

                    <span className="font-semibold">{quantity}</span>

                    <button
                      onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                      disabled={quantity >= 99}
                      className="h-8 w-8 rounded border disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mb-4 flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold">
                    ₱{(selectedBurger.price * quantity).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(selectedBurger, quantity)}
                  className="w-full rounded-md bg-[#642b19] px-4 py-3 text-sm font-bold text-white hover:bg-[#a72b25]"
                >
                  Add to Cart — ₱
                  {(selectedBurger.price * quantity).toFixed(2)}
                </button>

                <button
                  onClick={() => setSelectedBurger(null)}
                  className="mt-3 w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm hover:bg-gray-50"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SHOPPING CART POPUP */}
      {showCart && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowCart(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="w-full max-w-[480px] rounded-xl bg-white p-5 shadow-2xl sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 id="cart-title" className="font-['Oswald'] text-2xl">
                Your Shopping Cart
              </h2>

              <button
                onClick={() => setShowCart(false)}
                aria-label="Close cart"
                className="text-2xl"
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-500">
                Your cart is empty. Add a delicious burger!
              </p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 border-b border-gray-100 pb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-md object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold">{item.name}</h3>
                      <p className="text-xs text-gray-500">
                        ₱{item.price.toFixed(2)} each
                      </p>

                      <div className="mt-2 flex items-center gap-3">
                        <button
                          onClick={() => changeCartQuantity(item.id, -1)}
                          className="h-7 w-7 rounded border"
                        >
                          −
                        </button>

                        <span className="text-sm">{item.quantity}</span>

                        <button
                          onClick={() => changeCartQuantity(item.id, 1)}
                          className="h-7 w-7 rounded border"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <span className="text-sm font-bold">
                      ₱{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}

                <div className="flex justify-between pt-2 text-lg font-bold">
                  <span>Total</span>
                  <span>₱{cartTotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={() =>
                    alert(
                      `Order summary\nItems: ${cartCount}\nTotal: ₱${cartTotal.toFixed(2)}\n\nThis is a demo. No payment has been processed.`,
                    )
                  }
                  className="w-full rounded-md bg-[#642b19] py-3 text-sm font-bold text-white hover:bg-[#a72b25]"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}

            <button
              onClick={() => setShowCart(false)}
              className="mt-3 w-full rounded-md border border-gray-300 py-2.5 text-sm hover:bg-gray-50"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      <footer id="contact" className="py-8 text-center text-[10px] text-gray-400">
        © 2026 Tasty Burger. Made with love.
      </footer>
    </div>
  )
}
