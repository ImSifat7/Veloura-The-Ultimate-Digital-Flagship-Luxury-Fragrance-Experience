/**
 * Veloura | Global Configuration
 * Contains only non-sensitive application configuration.
 */
export const globalConfig = {
  brand: {
    name: 'Veloura',
    owner: 'Sifat',
    slogan: 'Elite Scents for the Modern Connoisseur',
    logo: '/assets/logo.svg',
    supportContact: '01707787767',
    socials: {
      facebook: 'https://www.facebook.com/IamSifatAbrar/',
      instagram: 'https://www.instagram.com/sifat_abrar10/',
      github: 'https://github.com/ImSifat7',
    }
  },
  ui: {
    freeShippingThreshold: 150,
    showTrackingPage: true,
    currencySymbol: '$',
    announcement: 'Luxury Fragrances Delivered to Your Doorstep. Free Shipping on orders over $150.',
  },
  routes: {
    shop: '/shop',
    cart: '/cart',
    trackOrder: '/track-order',
    admin: '/admin',
  }
};
