'use client'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import Header from '@/components/wired/header'

export default function Home() {
  return (
    <div className="h-full w-full">
      <Header />

      <div className="w-full h-full mt-5 flex flex-col gap-5 items-center justify-center p-4">
        <Heading>Welcome to ManoFood</Heading>
        <p>Your one-stop solution for food delivery</p>

        <Button color="primary" variant="bordered">
          Add to cart
        </Button>
      </div>
    </div>
  )
}
