"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  User,
  Package,
  Bell,
  MessageSquare,
  Gift,
  Globe,
  CheckCircle,
  Clock,
  Truck,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ProfilePage() {
  const [language, setLanguage] = useState<"english" | "tamil">("english");
  const [feedback, setFeedback] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    setFeedback("");
    setTimeout(() => setFeedbackSubmitted(false), 3000);
  };

  // Mock data
  const orders = [
    {
      id: "ORD001",
      date: "2024-01-15",
      items: ["Chicken Biryani", "Chai"],
      total: 165,
      status: "delivered",
    },
    {
      id: "ORD002",
      date: "2024-01-14",
      items: ["Masala Dosa", "Coffee"],
      total: 80,
      status: "delivered",
    },
    {
      id: "ORD003",
      date: "2024-01-13",
      items: ["Paneer Butter Masala", "Veg Fried Rice"],
      total: 200,
      status: "delivered",
    },
  ];

  const notifications = [
    {
      id: 1,
      title: "Order Delivered",
      message: "Your order #ORD001 has been delivered",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "New Offer Available",
      message: "Get 20% off on orders above ₹200",
      time: "1 day ago",
      read: false,
    },
    {
      id: 3,
      title: "Order Confirmed",
      message: "Your order #ORD002 has been confirmed",
      time: "2 days ago",
      read: true,
    },
  ];

  const offers = [
    {
      id: 1,
      code: "FIRST20",
      title: "First Order Discount",
      description: "Get 20% off on your first order",
      discount: "20% OFF",
      expiry: "Valid till Jan 31",
    },
    {
      id: 2,
      code: "BIRYANI50",
      title: "Biryani Special",
      description: "₹50 off on all Biryani orders",
      discount: "₹50 OFF",
      expiry: "Valid till Jan 25",
    },
    {
      id: 3,
      code: "STUDENT10",
      title: "Student Offer",
      description: "10% off for MEC students",
      discount: "10% OFF",
      expiry: "Valid always",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "preparing":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "on-the-way":
        return <Truck className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-1">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-primary text-primary-foreground h-20 w-20 rounded-full flex items-center justify-center">
            <User className="h-10 w-10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Welcome, Student!</h1>
            <p className="text-muted-foreground">student@mec.edu</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="orders" className="gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Feedback</span>
            </TabsTrigger>
            <TabsTrigger value="offers" className="gap-2">
              <Gift className="h-4 w-4" />
              <span className="hidden sm:inline">Offers</span>
            </TabsTrigger>
          </TabsList>

          {/* Order History */}
          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{order.id}</h3>
                            {getStatusIcon(order.status)}
                            <Badge variant="secondary" className="capitalize">
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {order.date}
                          </p>
                        </div>
                        <span className="text-lg font-bold text-primary">
                          ₹{order.total}
                        </span>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm">
                          <span className="font-medium">Items:</span>{" "}
                          {order.items.join(", ")}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`${!notification.read ? "border-l-4 border-l-primary" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold">{notification.title}</h4>
                        {!notification.read && (
                          <Badge variant="destructive" className="text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {notification.time}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback */}
          <TabsContent value="feedback" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Share Your Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                {feedbackSubmitted && (
                  <Alert className="mb-4">
                    <AlertDescription>
                      Thank you for your feedback! We appreciate your input.
                    </AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="feedback">
                      Tell us about your experience
                    </Label>
                    <Textarea
                      id="feedback"
                      placeholder="Share your thoughts, suggestions, or report any issues..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit">Submit Feedback</Button>
                </form>
              </CardContent>
            </Card>

            {/* Language Toggle */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Language Preference
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {language === "english" ? "English" : "தமிழ் (Tamil)"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Change app language
                    </p>
                  </div>
                  <Switch
                    checked={language === "tamil"}
                    onCheckedChange={(checked) =>
                      setLanguage(checked ? "tamil" : "english")
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Offers & Coupons */}
          <TabsContent value="offers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Offers & Coupons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {offers.map((offer) => (
                  <Card
                    key={offer.id}
                    className="border-2 border-dashed border-primary"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Gift className="h-5 w-5 text-primary" />
                            <h4 className="font-bold text-lg">{offer.title}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {offer.description}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge className="font-mono">{offer.code}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {offer.expiry}
                            </span>
                          </div>
                        </div>
                        <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-center">
                          {offer.discount}
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-4" size="sm">
                        Copy Code
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
