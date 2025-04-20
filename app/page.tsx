"use client"

import React from "react"
import { useState } from "react"
import { format, subDays } from "date-fns"
import { Cloud, CloudRain, Droplets, Sun, Thermometer } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock weather data for the last 7 days
const weatherData = [
  {
    date: new Date(),
    temperature: 72,
    condition: "Sunny",
    humidity: 45,
    precipitation: 0,
    icon: Sun,
  },
  {
    date: subDays(new Date(), 1),
    temperature: 68,
    condition: "Partly Cloudy",
    humidity: 50,
    precipitation: 0,
    icon: Cloud,
  },
  {
    date: subDays(new Date(), 2),
    temperature: 65,
    condition: "Cloudy",
    humidity: 60,
    precipitation: 0,
    icon: Cloud,
  },
  {
    date: subDays(new Date(), 3),
    temperature: 61,
    condition: "Rainy",
    humidity: 75,
    precipitation: 0.5,
    icon: CloudRain,
  },
  {
    date: subDays(new Date(), 4),
    temperature: 63,
    condition: "Rainy",
    humidity: 80,
    precipitation: 0.75,
    icon: CloudRain,
  },
  {
    date: subDays(new Date(), 5),
    temperature: 67,
    condition: "Partly Cloudy",
    humidity: 55,
    precipitation: 0,
    icon: Cloud,
  },
  {
    date: subDays(new Date(), 6),
    temperature: 70,
    condition: "Sunny",
    humidity: 40,
    precipitation: 0,
    icon: Sun,
  },
]

export default function WeatherApp() {
  const [selectedDay, setSelectedDay] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Weather Forecast</h1>
        <p className="text-gray-600">View weather conditions for the past week</p>
      </header>

      <div className="grid gap-8">
        {/* Today's Weather Card */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-sky-500 to-blue-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Today's Weather</CardTitle>
                <CardDescription className="text-sky-100">
                  {format(weatherData[selectedDay].date, "EEEE, MMMM d, yyyy")}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {React.createElement(weatherData[selectedDay].icon, { className: "h-10 w-10" })}
                <span className="text-3xl font-bold">{weatherData[selectedDay].temperature}°F</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-sky-100 p-3">
                  <Thermometer className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Condition</p>
                  <p className="font-medium">{weatherData[selectedDay].condition}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-sky-100 p-3">
                  <Droplets className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Humidity</p>
                  <p className="font-medium">{weatherData[selectedDay].humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-sky-100 p-3">
                  <CloudRain className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Precipitation</p>
                  <p className="font-medium">{weatherData[selectedDay].precipitation} in</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather History Carousel */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-800">7-Day Weather History</h2>
          <Carousel className="w-full" onSelect={(index) => setSelectedDay(index)}>
            <CarouselContent>
              {weatherData.map((day, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
                  <div className="p-1">
                    <Card
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedDay === index ? "border-2 border-sky-500" : ""
                      }`}
                      onClick={() => setSelectedDay(index)}
                    >
                      <CardContent className="flex flex-col items-center justify-center p-4">
                        <p className="text-sm font-medium text-gray-500">
                          {index === 0 ? "Today" : format(day.date, "EEE, MMM d")}
                        </p>
                        {React.createElement(day.icon, { className: "my-2 h-8 w-8 text-sky-600" })}
                        <p className="text-xl font-bold">{day.temperature}°F</p>
                        <p className="text-xs text-gray-500">{day.condition}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 pt-4">
              <CarouselPrevious className="relative" />
              <CarouselNext className="relative" />
            </div>
          </Carousel>
        </div>

        {/* Detailed View Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Weather Information</CardTitle>
            <CardDescription>{format(weatherData[selectedDay].date, "EEEE, MMMM d, yyyy")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="temperature">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="temperature">Temperature</TabsTrigger>
                <TabsTrigger value="precipitation">Precipitation</TabsTrigger>
                <TabsTrigger value="humidity">Humidity</TabsTrigger>
              </TabsList>
              <TabsContent value="temperature" className="mt-4 space-y-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 font-medium">Temperature Trend</h3>
                  <div className="h-40 rounded-md bg-white p-4">
                    <div className="flex h-full items-end justify-between">
                      {weatherData.map((day, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div
                            className="w-8 bg-sky-500"
                            style={{
                              height: `${(day.temperature / 100) * 100}%`,
                              opacity: selectedDay === index ? 1 : 0.6,
                            }}
                          ></div>
                          <span className="mt-2 text-xs">{format(day.date, "EEE")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="precipitation" className="mt-4 space-y-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 font-medium">Precipitation Data</h3>
                  <p>Chance of rain: {weatherData[selectedDay].precipitation > 0 ? "Yes" : "No"}</p>
                  <p>Amount: {weatherData[selectedDay].precipitation} inches</p>
                </div>
              </TabsContent>
              <TabsContent value="humidity" className="mt-4 space-y-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 font-medium">Humidity Levels</h3>
                  <p>Current humidity: {weatherData[selectedDay].humidity}%</p>
                  <div className="mt-2 h-4 w-full rounded-full bg-gray-200">
                    <div
                      className="h-4 rounded-full bg-sky-500"
                      style={{ width: `${weatherData[selectedDay].humidity}%` }}
                    ></div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
