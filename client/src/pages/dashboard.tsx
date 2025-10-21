import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart, Shield, Search, FileText, Upload, Settings, LogOut, Activity, Crown, Star } from "lucide-react";

interface Plan {
  id: number;
  name: string;
  price: string;
  features: string[];
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const [searchPlatform, setSearchPlatform] = useState("");
  const [searchHandle, setSearchHandle] = useState("");
  const [searchResults, setSearchResults] = useState<any>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
    // Simulate getting user's current plan (in real app, this would come from user data)
    setCurrentPlan({
      id: 1,
      name: "Bronze",
      price: "$29/month",
      features: ["Basic brand monitoring", "1 brand protected", "Weekly reports", "Email alerts", "Basic support"]
    });
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/plans`);
      const data = await response.json();
      setPlans(data.plans || []);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = () => {
    setSearchResults({
      platform: searchPlatform,
      handle: searchHandle,
      followers: Math.floor(Math.random() * 100000),
      views: Math.floor(Math.random() * 1000000),
      avgSession: `${Math.floor(Math.random() * 10)}m ${Math.floor(Math.random() * 60)}s`,
      bounceRate: `${Math.floor(Math.random() * 100)}%`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">BrandSafe Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground" data-testid="text-username">
              {user?.name}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Current Plan Card */}
        {currentPlan && (
          <Card className="mb-8 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                Your Current Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
                  <p className="text-lg text-primary font-semibold">{currentPlan.price}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentPlan.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {currentPlan.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{currentPlan.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => navigate("/pricing")}>
                    View Plans
                  </Button>
                  <Button variant="default" onClick={() => navigate("/pricing")}>
                    Upgrade Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card data-testid="card-analytics-visits">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-visits">24,512</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card data-testid="card-analytics-followers">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Followers</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-followers">82,450</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card data-testid="card-analytics-bounce">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-bounce-rate">32%</div>
              <p className="text-xs text-muted-foreground">-5% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="search" className="space-y-4">
          <TabsList>
            <TabsTrigger value="search" data-testid="tab-search">
              <Search className="h-4 w-4 mr-2" />
              Search Accounts
            </TabsTrigger>
            <TabsTrigger value="reports" data-testid="tab-reports">
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="documents" data-testid="tab-documents">
              <Upload className="h-4 w-4 mr-2" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="settings" data-testid="tab-settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Search Social Media Accounts</CardTitle>
                <CardDescription>
                  Look up analytics for any social media handle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="platform">Platform</Label>
                    <Select value={searchPlatform} onValueChange={setSearchPlatform}>
                      <SelectTrigger id="platform" data-testid="select-platform">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="twitter">Twitter/X</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="handle">Username/Handle</Label>
                    <Input
                      id="handle"
                      placeholder="@username"
                      value={searchHandle}
                      onChange={(e) => setSearchHandle(e.target.value)}
                      data-testid="input-handle"
                    />
                  </div>
                </div>
                <Button onClick={handleSearch} data-testid="button-search">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>

                {searchResults && (
                  <Card className="mt-4" data-testid="card-search-results">
                    <CardHeader>
                      <CardTitle>{searchResults.platform} / {searchResults.handle}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Followers:</span>
                        <span className="font-medium" data-testid="text-result-followers">{searchResults.followers.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Views:</span>
                        <span className="font-medium" data-testid="text-result-views">{searchResults.views.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg Session:</span>
                        <span className="font-medium" data-testid="text-result-session">{searchResults.avgSession}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bounce Rate:</span>
                        <span className="font-medium" data-testid="text-result-bounce">{searchResults.bounceRate}</span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Brand Protection Reports</CardTitle>
                <CardDescription>
                  View and manage your brand protection reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-4 border rounded-lg" data-testid="report-item-1">
                    <div>
                      <h4 className="font-medium">Counterfeit Product Report #1</h4>
                      <p className="text-sm text-muted-foreground">Created 2 days ago</p>
                    </div>
                    <Button variant="outline" size="sm" data-testid="button-view-report-1">View</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg" data-testid="report-item-2">
                    <div>
                      <h4 className="font-medium">Copyright Infringement #2</h4>
                      <p className="text-sm text-muted-foreground">Created 5 days ago</p>
                    </div>
                    <Button variant="outline" size="sm" data-testid="button-view-report-2">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Document Management</CardTitle>
                <CardDescription>
                  Upload and manage your brand protection documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Input type="file" data-testid="input-file" />
                  <Button data-testid="button-upload">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-4 border rounded-lg" data-testid="document-item-1">
                    <div>
                      <h4 className="font-medium">Trademark Certificate.pdf</h4>
                      <p className="text-sm text-muted-foreground">Uploaded 3 days ago</p>
                    </div>
                    <Button variant="outline" size="sm" data-testid="button-download-doc-1">Download</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your profile and notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={user?.name} data-testid="input-settings-name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.email} data-testid="input-settings-email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue={user?.role} disabled data-testid="input-settings-role" />
                </div>
                <Button data-testid="button-save-settings">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
