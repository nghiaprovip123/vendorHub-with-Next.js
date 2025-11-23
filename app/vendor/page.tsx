"use client"
import { useState } from "react"
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
import { Label } from "@/components/ui/label"

const X = () => {
  const [title, setTitle] = useState("")
  const [cid, setCid] = useState ("")
  const [image, setImage] = useState ("")

  const handleSubmit = async (e: any) =>
  {
    e.preventDefault()

    const res = await fetch("api/categories", {
      method: "POST",
      headers : {"Content-Type": "application/json"},
      body: JSON.stringify({title, cid, image})
    })
    const data = await res.json()
    console.log(data)
  }

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create a Category</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Category Title</Label>
              <Input
                // id="email"
                // type="email"
                placeholder="category title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
            <Label>Category ID</Label>
              <Input
                // id="email"
                // type="email"
                placeholder="category id"
                required
                value={cid}
                onChange={(e) => setCid(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
            <Label>Category Image</Label>
              <Input
                // id="email"
                // type="email"
                placeholder="url"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </div>
          <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full cursor-pointer">
          Create
        </Button>
      </CardFooter>
        </form>
      </CardContent>

    </Card>
  )
}

export default X;
