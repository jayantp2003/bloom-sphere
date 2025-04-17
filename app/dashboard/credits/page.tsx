"use client"

import { useState } from "react"
import { Check, CreditCard, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CreditsPage() {
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePurchase = () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Credits</h1>
        <p className="text-muted-foreground">Purchase and manage your credits.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Available Credits</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-2xl font-bold">100</div>
            <p className="text-xs text-muted-foreground">Free credits upon signup</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Used Credits</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No credits used yet</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Subscription</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-2xl font-bold">Free</div>
            <p className="text-xs text-muted-foreground">Upgrade to Plus for more credits</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="buy-credits" className="space-y-6">
        <TabsList>
          <TabsTrigger value="buy-credits">Buy Credits</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="history">Purchase History</TabsTrigger>
        </TabsList>
        <TabsContent value="buy-credits">
          <Card>
            <CardHeader>
              <CardTitle>Buy Credits</CardTitle>
              <CardDescription>Purchase additional credits for your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Select Credit Package</Label>
                <RadioGroup defaultValue="500" className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <RadioGroupItem value="500" id="500-credits" className="peer sr-only" />
                    <Label
                      htmlFor="500-credits"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="text-center">
                        <div className="text-xl font-bold">500 Credits</div>
                        <div className="text-2xl font-bold mt-2">$4.99</div>
                        <div className="text-xs text-muted-foreground mt-1">$0.01 per credit</div>
                      </div>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="1000" id="1000-credits" className="peer sr-only" />
                    <Label
                      htmlFor="1000-credits"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary relative"
                    >
                      <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                        Best Value
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">1000 Credits</div>
                        <div className="text-2xl font-bold mt-2">$8.99</div>
                        <div className="text-xs text-muted-foreground mt-1">$0.009 per credit</div>
                      </div>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="2000" id="2000-credits" className="peer sr-only" />
                    <Label
                      htmlFor="2000-credits"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="text-center">
                        <div className="text-xl font-bold">2000 Credits</div>
                        <div className="text-2xl font-bold mt-2">$14.99</div>
                        <div className="text-xs text-muted-foreground mt-1">$0.0075 per credit</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on card</Label>
                  <Input id="cardName" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="expiryMonth">Expiry month</Label>
                    <Input id="expiryMonth" placeholder="MM" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryYear">Expiry year</Label>
                    <Input id="expiryYear" placeholder="YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handlePurchase} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Purchase Credits"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plans</CardTitle>
              <CardDescription>Choose a subscription plan for regular credit allowance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Free Plan</CardTitle>
                    <CardDescription>Basic features with limited credits</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <span className="text-3xl font-bold">$0</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>100 free credits on signup</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Basic question generation</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Basic paper evaluation</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Simple rubrics</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" disabled>
                      Current Plan
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Plus Plan</CardTitle>
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                        Recommended
                      </span>
                    </div>
                    <CardDescription>Advanced features with monthly credits</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <span className="text-3xl font-bold">$9.99</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>1000 credits per month</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Advanced question generation</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Detailed paper evaluation</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Comprehensive rubrics</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Priority support</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Upgrade to Plus</Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Purchase History</CardTitle>
              <CardDescription>View your credit purchase history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CreditCard className="h-12 w-12 text-muted-foreground/70 mb-4" />
                <h3 className="text-lg font-medium mb-2">No purchase history</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Your credit purchase history will appear here once you make a purchase.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
