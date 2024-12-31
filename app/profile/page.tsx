"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UserProfile {
  name: string
  avatar: string
  ordersCount: number
}

export default function ProfilePage() {
  const profile: UserProfile = {
    name: "John Doe",
    avatar: "/placeholder.svg?height=128&width=128",
    ordersCount: 15
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-col items-center space-y-4">
        <Avatar className="h-32 w-32">
          <AvatarImage src={profile.avatar} alt={profile.name} />
          <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl font-bold text-center">{profile.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-lg font-semibold text-[#007BFF]">
          Total Orders: <span className="text-2xl">{profile.ordersCount}</span>
        </p>
      </CardContent>
    </Card>
  )
}

