import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/Button'
import { describe, it, expect } from 'vitest'

describe('Button', () => {
    it('renders correctly', () => {
        render(<Button>Click me</Button>)
        const button = screen.getByRole('button', { name: /click me/i })
        expect(button).toBeInTheDocument()
    })

    it('applies variant classes', () => {
        render(<Button variant="gold">Gold Button</Button>)
        const button = screen.getByRole('button')
        expect(button).toHaveClass('bg-gold-light')
    })
})
