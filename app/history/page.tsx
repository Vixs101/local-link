"use client"

import { useState } from "react"
import { ArrowDownIcon, ArrowUpIcon, Calendar, Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Transaction {
  id: string
  type: "payment" | "reversal"
  amount: number
  date: string
  description: string
}

const transactions: Transaction[] = [
  {
    id: "1",
    type: "payment",
    amount: 400000,
    date: "2024-01-15",
    description: "MacBook Pro purchase",
  },
  {
    id: "2",
    type: "reversal",
    amount: 25000,
    date: "2024-01-14",
    description: "Refund for cancelled order",
  },
  {
    id: "3",
    type: "payment",
    amount: 35000,
    date: "2024-01-13",
    description: "Wireless Earbuds purchase",
  },
  {
    id: "4",
    type: "payment",
    amount: 50000,
    date: "2024-01-12",
    description: "Red Hoodie (x2) purchase",
  },
  {
    id: "5",
    type: "reversal",
    amount: 15000,
    date: "2024-01-11",
    description: "Partial refund for damaged item",
  },
]

export default function TransactionHistory() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "payments" && transaction.type === "payment") ||
      (filter === "reversals" && transaction.type === "reversal")
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Transaction History</h1>
        <Button
          variant="outline"
          className="w-full sm:w-auto border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF] hover:text-white"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>


      <div className="space-y-4">
        {filteredTransactions.map((transaction) => (
          <Card key={transaction.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`rounded-full p-2 ${
                    transaction.type === "payment" 
                      ? "bg-[#007BFF]/10 text-[#007BFF]" 
                      : "bg-red-100 text-red-600"
                  }`}>
                    {transaction.type === "payment" ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">
                      {transaction.type === "payment" ? "Payment" : "Reversal"}
                    </p>
                    <p className="text-sm text-gray-500">{transaction.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${
                    transaction.type === "payment" 
                      ? "text-[#007BFF]" 
                      : "text-red-600"
                  }`}>
                    {transaction.type === "payment" ? "-" : "+"}₦
                    {transaction.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredTransactions.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <Calendar className="h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-semibold">No transactions found</h3>
            <p className="mt-2 text-sm text-gray-500">
              Try adjusting your filters or search query.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

