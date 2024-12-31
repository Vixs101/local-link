"use client"

import { useState } from "react"
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
}

const products: Product[] = [
  {
    id: "1",
    name: "MacBook Pro",
    price: 2.3,
    image: "/img/dummy.jpg",
    category: "Electronics",
  },
  {
    id: "2",
    name: "Red Hoodie",
    price: 1.3,
    image: "/img/dummy1.jpg",
    category: "Fashion",
  },
  {
    id: "3",
    name: "Wireless Earbuds",
    price: 2.3,
    image: "/img/dummy.jpg",
    category: "Electronics",
  },
  {
    id: "4",
    name: "Denim Jeans",
    price: 1.5,
    image: "/img/dummy1.jpg",
    category: "Fashion",
  }
]

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Electronics", "Fashion", "Food"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-[#007BFF]" />
          <Input
            placeholder="Search products..."
            className="pl-9 border-[#007BFF]/20 focus-visible:ring-[#007BFF]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap ${
                selectedCategory === category 
                  ? "bg-[#007BFF] hover:bg-[#007BFF]/90 text-white" 
                  : "border-[#007BFF]/20 hover:bg-[#007BFF]/10"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden border-[#007BFF]/10 hover:border-[#007BFF]/30 transition-colors">
            <CardHeader className="p-0">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="h-40 w-full object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-semibold text-[#007BFF]">{product.name}</h3>
              <Badge 
                variant="secondary" 
                className="mt-2 bg-[#007BFF]/10"
              >
                {product.category}
              </Badge>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="flex w-full items-center justify-between">
                <span className="font-bold ">{product.price.toLocaleString()} eth</span>
                <Button 
                  size="sm" 
                  className="bg-[#007BFF] hover:bg-[#007BFF]/90 text-white"
                >
                  Add
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

