'use client'

import ProductCard from '@/components/ui/ProductCard'
import SectionReveal from '@/components/ui/SectionReveal'

const products = [
  {
    name: 'Khobz Royal',
    description: 'Stone-baked Moroccan bread with sesame and nigella seeds. Crispy crust, cloud-soft interior.',
    price: '28 MAD',
    emoji: '🍞',
    image: '/images/bread.jpg',
  },
  {
    name: 'Croissant Pur Beurre',
    description: '81 layers of French butter pastry dough. Crafted over 72 hours. Perfection in every bite.',
    price: '18 MAD',
    emoji: '🥐',
    image: '/images/croissant.jpg',
  },
  {
    name: 'Macaron Atlas',
    description: 'Rose water and orange blossom ganache. A Moroccan soul in a Parisian shell.',
    price: '22 MAD',
    emoji: '🍪',
    image: '/images/macaron.jpg',
  },
  {
    name: 'Truffe Noir',
    description: 'Single-origin dark chocolate from Ivory Coast. Hand-rolled in Moroccan argan dust.',
    price: '35 MAD',
    emoji: '🍫',
    image: '/images/truffle.jpg',
  },
  {
    name: 'Msemen Feuilleté',
    description: 'Traditional flaky Moroccan flatbread reimagined with premium cultured butter and honey.',
    price: '15 MAD',
    emoji: '🫓',
    image: '/images/msemen.jpg',
  },
  {
    name: 'Tarte Safran',
    description: 'Gold-dusted custard tart infused with Moroccan saffron. Limited to 12 per day.',
    price: '55 MAD',
    emoji: '✨',
    image: '/images/tart.jpg',
  },
]

export default function ProductsSection() {
  return (
    <section
      id="products"
      style={{
        padding: '120px 48px',
        maxWidth: '1400px',
        margin: '0 auto',
      }}
    >
      <div style={{ marginBottom: '80px' }}>
        <SectionReveal
          eyebrow="The Collection"
          title={"Our\nCreations"}
          subtitle="Each piece is crafted by hand, inspired by Morocco, elevated to the universe."
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2px',
      }}>
        {products.map((product, i) => (
          <ProductCard
            key={product.name}
            name={product.name}
            description={product.description}
            price={product.price}
            emoji={product.emoji}
            image={product.image}
            index={i}
          />
        ))}
      </div>
    </section>
  )
}