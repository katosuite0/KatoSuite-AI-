import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  BookOpen,
  Camera,
  Calendar,
  Clock,
  Download,
  Heart,
  Image,
  MessageSquare,
  Send,
  Star,
} from "lucide-react";

interface ParentPortalProps {
  userPlan: string;
}

type Family = {
  id: string;
  name: string;
  children: string[];
  lastContact: string;
  unreadMessages: number;
  parentEmail: string;
};

type DailyUpdate = {
  id: number;
  childName: string;
  date: string;
  activities: Array<{ time: string; activity: string; photo: boolean }>;
  mood: "happy" | "excited" | "content" | "tired";
  meals: {
    breakfast: string;
    lunch: string;
    snack: string;
  };
  nap: string;
  notes: string;
};

type Observation = {
  id: number;
  childName: string;
  date: string;
  type: string;
  description: string;
  photos: string[];
  educator: string;
};

type Event = {
  date: string;
  title: string;
  description: string;
  type: "meeting" | "event" | "closure";
};

type Message = {
  id: number;
  sender: string;
  recipient: string;
  message: string;
  timestamp: string;
  type: "incoming" | "outgoing";
};

const families: Family[] = [
  {
    id: "1",
    name: "Thompson Family",
    children: ["Emma Thompson"],
    lastContact: "2 hours ago",
    unreadMessages: 0,
    parentEmail: "sarah.thompson@email.com",
  },
  {
    id: "2",
    name: "Chen Family",
    children: ["Marcus Chen"],
    lastContact: "1 day ago",
    unreadMessages: 2,
    parentEmail: "linda.chen@email.com",
  },
  {
    id: "3",
    name: "Rodriguez Family",
    children: ["Sofia Rodriguez", "Diego Rodriguez"],
    lastContact: "3 days ago",
    unreadMessages: 0,
    parentEmail: "maria.rodriguez@email.com",
  },
];

const dailyUpdates: DailyUpdate[] = [
  {
    id: 1,
    childName: "Emma Thompson",
    date: "2024-01-10",
    activities: [
      { time: "9:00 AM", activity: "Circle Time - Shared weekend stories", photo: true },
      { time: "10:30 AM", activity: "Art Project - Painted winter landscapes", photo: true },
      { time: "12:00 PM", activity: "Lunch - Ate well, tried new vegetables", photo: false },
      { time: "2:00 PM", activity: "Outdoor Play - Built snow fort with friends", photo: true },
      { time: "3:30 PM", activity: "Quiet Time - Read favorite book independently", photo: false },
    ],
    mood: "happy",
    meals: {
      breakfast: "Most",
      lunch: "All",
      snack: "Some",
    },
    nap: "1.5 hours",
    notes: "Emma had a wonderful day! She showed great leadership during outdoor play and was very kind to her friends.",
  },
];

const observations: Observation[] = [
  {
    id: 1,
    childName: "Emma Thompson",
    date: "2024-01-10",
    type: "Social Development",
    description:
      "Emma demonstrated excellent sharing skills during free play, voluntarily giving toys to friends who seemed interested.",
    photos: ["photo1.jpg", "photo2.jpg"],
    educator: "Ms. Sarah",
  },
  {
    id: 2,
    childName: "Marcus Chen",
    date: "2024-01-09",
    type: "Fine Motor Skills",
    description:
      "Marcus showed significant improvement in pencil grip during writing activities. He completed his name independently.",
    photos: ["photo3.jpg"],
    educator: "Ms. Jennifer",
  },
];

const upcomingEvents: Event[] = [
  {
    date: "2024-01-15",
    title: "Parent-Teacher Conferences",
    description: "15-minute individual meetings to discuss your child's progress",
    type: "meeting",
  },
  {
    date: "2024-01-20",
    title: "Winter Science Fair",
    description: "Children will showcase their science experiments",
    type: "event",
  },
  {
    date: "2024-01-25",
    title: "Professional Development Day",
    description: "Center closed for staff training",
    type: "closure",
  },
];

const messages: Message[] = [
  {
    id: 1,
    sender: "Ms. Sarah (Teacher)",
    recipient: "Thompson Family",
    message:
      "Emma had a fantastic day today! She showed great improvement in her sharing skills and was very helpful during cleanup time.",
    timestamp: "2024-01-10 4:30 PM",
    type: "outgoing",
  },
  {
    id: 2,
    sender: "Sarah Thompson",
    recipient: "Ms. Sarah",
    message:
      "Thank you for the update! Emma was so excited to tell me about the art project. Could you send the photo when you have a chance?",
    timestamp: "2024-01-10 6:15 PM",
    type: "incoming",
  },
];

const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const getMoodIcon = (mood: DailyUpdate["mood"]): string => {
  switch (mood) {
    case "happy":
      return "😊";
    case "excited":
      return "😃";
    case "content":
      return "😌";
    case "tired":
      return "😴";
    default:
      return "😊";
  }
};

const ParentPortal: React.FC<ParentPortalProps> = ({ userPlan }) => {
  const [newMessage, setNewMessage] = useState("");
  const [selectedFamily, setSelectedFamily] = useState("all");
  const isFreePlan = userPlan === "free";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <MessageSquare className="w-7 h-7 mr-3 text-blue-600" />
            Parent Communication Portal
          </h1>
          <p className="text-gray-600 mt-1">Real-time updates, photos, and direct communication with families</p>
        </div>

        <div className="flex items-center space-x-4">
          {isFreePlan && (
            <Badge variant="destructive" className="hidden sm:inline-flex">
              Free plan: basic messaging only
            </Badge>
          )}
          <Badge variant="outline">{families.length} Active Families</Badge>
          <Button className="flex items-center">
            <Send className="w-4 h-4 mr-2" />
            Send Update
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="updates" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="updates" className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Daily Updates
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Messages
              </TabsTrigger>
              <TabsTrigger value="observations" className="flex items-center">
                <Star className="w-4 h-4 mr-2" />
                Observations
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Events
              </TabsTrigger>
            </TabsList>

            <TabsContent value="updates" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Today's Daily Updates</h3>
                <Button size="sm" variant="outline">
                  <Camera className="w-4 h-4 mr-2" />
                  Add Photos
                </Button>
              </div>

              <div className="space-y-4">
                {dailyUpdates.map((update) => (
                  <Card key={update.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={undefined} />
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {getInitials(update.childName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{update.childName}</h4>
                            <p className="text-sm text-gray-500">{update.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{getMoodIcon(update.mood)}</span>
                          <Badge variant="outline">Great Day!</Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div>
                        <h5 className="font-medium mb-3">Daily Activities</h5>
                        <div className="space-y-2">
                          {update.activities.map((activity) => (
                            <div key={activity.activity} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex items-center space-x-3">
                                <Badge variant="outline" className="text-xs">
                                  {activity.time}
                                </Badge>
                                <span className="text-sm">{activity.activity}</span>
                              </div>
                              {activity.photo && (
                                <Button size="sm" variant="ghost">
                                  <Image className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-green-50 rounded-lg space-y-2 text-sm">
                          <h6 className="font-medium text-green-800">Meals</h6>
                          <div className="flex justify-between">
                            <span>Breakfast:</span>
                            <span className="font-medium">{update.meals.breakfast}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Lunch:</span>
                            <span className="font-medium">{update.meals.lunch}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Snack:</span>
                            <span className="font-medium">{update.meals.snack}</span>
                          </div>
                        </div>

                        <div className="p-3 bg-blue-50 rounded-lg flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <div>
                            <h6 className="font-medium text-blue-800">Rest Time</h6>
                            <p className="text-sm font-medium">{update.nap}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                        <h6 className="font-medium text-yellow-800 mb-1">Teacher's Note</h6>
                        <p className="text-sm text-yellow-700">{update.notes}</p>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="w-4 h-4 mr-1" />
                          Download Report
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Heart className="w-4 h-4 mr-1" />
                          Send Thank You
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="messages" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Family Communications</h3>
                <select
                  className="px-3 py-1 border border-gray-300 rounded text-sm"
                  value={selectedFamily}
                  onChange={(event) => setSelectedFamily(event.target.value)}
                >
                  <option value="all">All Families</option>
                  {families.map((family) => (
                    <option key={family.id} value={family.id}>
                      {family.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {families.map((family) => (
                  <Card key={family.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{family.name}</h4>
                        {family.unreadMessages > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {family.unreadMessages} new
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>Children: {family.children.join(", ")}</p>
                        <p>Last contact: {family.lastContact}</p>
                        <p className="truncate">Email: {family.parentEmail}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recent Messages</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="max-h-64 overflow-y-auto space-y-3">
                    {messages
                      .filter((message) => selectedFamily === "all" || message.recipient.includes(selectedFamily))
                      .map((message) => (
                        <div
                          key={message.id}
                          className={`p-3 rounded-lg ${
                            message.type === "outgoing"
                              ? "bg-blue-50 border-l-4 border-blue-400"
                              : "bg-gray-50 border-l-4 border-gray-400"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{message.sender}</span>
                            <span className="text-xs text-gray-500">{message.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-700">{message.message}</p>
                        </div>
                      ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex space-x-2">
                      <Textarea
                        placeholder="Type your message to parents..."
                        value={newMessage}
                        onChange={(event) => setNewMessage(event.target.value)}
                        className="flex-1 resize-none"
                        rows={2}
                      />
                      <div className="flex flex-col space-y-2">
                        <Button size="sm" disabled={!newMessage.trim()}>
                          <Send className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Camera className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="observations" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Learning Observations</h3>
                <Button size="sm">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Add Observation
                </Button>
              </div>

              <div className="space-y-4">
                {observations.map((observation) => (
                  <Card key={observation.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={undefined} />
                            <AvatarFallback className="bg-purple-100 text-purple-600">
                              {getInitials(observation.childName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{observation.childName}</h4>
                            <p className="text-sm text-gray-500">
                              {observation.date} • by {observation.educator}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">{observation.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-700">{observation.description}</p>
                      {observation.photos.length > 0 && (
                        <div className="flex space-x-2">
                          <span className="text-xs text-gray-500">Photos:</span>
                          {observation.photos.map((photo, index) => (
                            <Button key={photo} size="sm" variant="outline" className="h-6 text-xs">
                              <Image className="w-3 h-3 mr-1" />
                              View {index + 1}
                            </Button>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Upcoming Events</h3>
                <Button size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Add to Calendar
                </Button>
              </div>

              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <Card key={event.title}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold">{event.title}</h4>
                            <Badge
                              variant={
                                event.type === "closure"
                                  ? "destructive"
                                  : event.type === "meeting"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {event.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{event.description}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            {event.date}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentPortal;
export { ParentPortal };
