"use client"

import { useState } from "react"
import { Package, ChevronRight, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface Order {
  id: string
  items: {
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }[]
  status: "pending" | "processing" | "shipped" | "delivered"
  date: string
  total: number
}

const orders: Order[] = [
  {
    id: "#556578",
    items: [
      {
        id: "1",
        name: "MacBook Pro",
        price: 1.2,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "2",
        name: "Wireless Earbuds",
        price: 1.2,
        quantity: 1,
        image: "/img/dummy1.jpg",
      },
    ],
    status: "pending",
    date: "2024-01-15",
    total: 2.1,
  },
  {
    id: "#556579",
    items: [
      {
        id: "3",
        name: "Red Hoodie",
        price: 1.2,
        quantity: 2,
        image: "/img/dummy.jpg",
      },
    ],
    status: "delivered",
    date: "2024-01-14",
    total: 10,
  },
]

export default function Orders() {
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active")

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "active") {
      return ["pending", "processing", "shipped"].includes(order.status)
    }
    return order.status === "delivered"
  })

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <div className="flex gap-2">
          <Button
            variant={activeTab === "active" ? "default" : "outline"}
            onClick={() => setActiveTab("active")}
            className={activeTab === "active" ? "bg-[#007BFF] text-white" : "border-[#007BFF]/20"}
          >
            Active
          </Button>
          <Button
            variant={activeTab === "completed" ? "default" : "outline"}
            onClick={() => setActiveTab("completed")}
            className={activeTab === "completed" ? "bg-[#007BFF] text-white" : "border-[#007BFF]/20"}
          >
            Completed
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardHeader className="border-b bg-gray-50/50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Package className="h-5 w-5 text-[#007BFF]" />
                  <div>
                    <p className="font-semibold">Order {order.id}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <Badge className={`${getStatusColor(order.status)} capitalize`}>
                  {order.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      {item.price.toLocaleString()} eth
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t bg-gray-50/50 p-4">
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-lg font-bold text-[#007BFF]">
                  {order.total.toLocaleString()} eth
                </p>
              </div>
              <Button
                variant="outline"
                className="border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF] hover:text-white"
              >
                View Details
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}

        {filteredOrders.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <Package className="h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-semibold">No orders found</h3>
            <p className="mt-2 text-sm text-gray-500">
              {activeTab === "active"
                ? "You don't have any active orders at the moment."
                : "You don't have any completed orders yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

