const CAR_BRANDS = ['Toyota', 'BMW', 'Ford', 'Tesla', 'Honda', 'Audi', 'Mercedes', 'Nissan', 'Hyundai', 'Kia']
const CAR_MODELS = ['Supra', 'M3', 'Mustang', 'Model S', 'Civic', 'A4', 'C-Class', 'GT-R', 'Sonata', 'Stinger']
const MAX_COLOR_VALUE = 0xFFFFFF
const HEX_BASE = 16
const HEX_PAD_LENGTH = 6
const randomColor = () => `#${  Math.floor(Math.random() * MAX_COLOR_VALUE).toString(HEX_BASE).padStart(HEX_PAD_LENGTH, '0')}`
export default function randomCar() {
    return {
        name: `${CAR_BRANDS[Math.floor(Math.random() * CAR_BRANDS.length)]} ${CAR_MODELS[Math.floor(Math.random() * CAR_MODELS.length)]}`,
        color: randomColor()
    }
}