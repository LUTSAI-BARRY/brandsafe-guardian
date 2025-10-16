import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Shield, 
  User, 
  Settings, 
  FileCheck, 
  Bell, 
  CheckCircle,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function Onboarding() {
  const [, navigate] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form state
  const [brandName, setBrandName] = useState("");
  const [brandKeywords, setBrandKeywords] = useState("");
  const [socialHandles, setSocialHandles] = useState("");
  const [enableDmca, setEnableDmca] = useState(true);
  const [enableGoogleDelisting, setEnableGoogleDelisting] = useState(true);
  const [enableSocialMonitoring, setEnableSocialMonitoring] = useState(true);
  const [enableAutoTakedowns, setEnableAutoTakedowns] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [instantAlerts, setInstantAlerts] = useState(false);

  const steps: OnboardingStep[] = [
    {
      id: 0,
      title: "Welcome to BrandSafe",
      description: "Let's set up your brand protection in just a few steps",
      icon: <Shield className="h-8 w-8" />
    },
    {
      id: 1,
      title: "Brand Profile",
      description: "Tell us about your brand so we can protect it",
      icon: <User className="h-8 w-8" />
    },
    {
      id: 2,
      title: "Protection Settings",
      description: "Choose how you want to protect your content",
      icon: <Settings className="h-8 w-8" />
    },
    {
      id: 3,
      title: "Verification Documents",
      description: "Upload documents to verify ownership (optional)",
      icon: <FileCheck className="h-8 w-8" />
    },
    {
      id: 4,
      title: "Notification Preferences",
      description: "Configure how you want to be notified",
      icon: <Bell className="h-8 w-8" />
    },
    {
      id: 5,
      title: "All Set!",
      description: "Your brand protection is ready to go",
      icon: <CheckCircle className="h-8 w-8" />
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="h-10 w-10 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome to BrandSafe Guardian</h2>
              <p className="text-muted-foreground">
                Protect your brand from piracy and copyright infringement with our comprehensive protection platform.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 pt-4">
              <div className="p-4 border rounded-lg">
                <div className="text-primary font-semibold mb-1">Daily Scans</div>
                <p className="text-sm text-muted-foreground">AI-powered monitoring across the web</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-primary font-semibold mb-1">Auto Takedowns</div>
                <p className="text-sm text-muted-foreground">DMCA & Google delisting automation</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-primary font-semibold mb-1">Social Protection</div>
                <p className="text-sm text-muted-foreground">Remove imposters and fake accounts</p>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Set Up Your Brand Profile</h2>
              <p className="text-muted-foreground">
                Help us understand your brand so we can provide the best protection.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="brandName">Brand Name *</Label>
                <Input
                  id="brandName"
                  placeholder="Enter your brand or creator name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  data-testid="input-brand-name"
                />
                <p className="text-xs text-muted-foreground">
                  This is the primary name we'll use to monitor for infringements
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Brand Keywords</Label>
                <Textarea
                  id="keywords"
                  placeholder="e.g., brand name variations, product names, unique identifiers"
                  value={brandKeywords}
                  onChange={(e) => setBrandKeywords(e.target.value)}
                  rows={3}
                  data-testid="input-keywords"
                />
                <p className="text-xs text-muted-foreground">
                  Add keywords separated by commas. Our AI will use these to detect infringements.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="socialHandles">Social Media Handles</Label>
                <Textarea
                  id="socialHandles"
                  placeholder="e.g., @yourbrand on Instagram, YouTube channel URL, Twitter handle"
                  value={socialHandles}
                  onChange={(e) => setSocialHandles(e.target.value)}
                  rows={3}
                  data-testid="input-social-handles"
                />
                <p className="text-xs text-muted-foreground">
                  We'll monitor these platforms for imposters and fake accounts
                </p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Protection Settings</h2>
              <p className="text-muted-foreground">
                Choose which protection features you want to enable for your brand.
              </p>
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="dmca"
                      checked={enableDmca}
                      onCheckedChange={(checked) => setEnableDmca(checked as boolean)}
                      data-testid="checkbox-dmca"
                    />
                    <div className="flex-1">
                      <Label htmlFor="dmca" className="text-base font-semibold cursor-pointer">
                        DMCA Takedowns
                      </Label>
                      <CardDescription className="mt-1">
                        Automatically send DMCA takedown notices to remove infringing content from websites
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="google"
                      checked={enableGoogleDelisting}
                      onCheckedChange={(checked) => setEnableGoogleDelisting(checked as boolean)}
                      data-testid="checkbox-google"
                    />
                    <div className="flex-1">
                      <Label htmlFor="google" className="text-base font-semibold cursor-pointer">
                        Google Delisting
                      </Label>
                      <CardDescription className="mt-1">
                        Remove infringing content from Google search results through our Trusted Copyright Removal Program membership
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="social"
                      checked={enableSocialMonitoring}
                      onCheckedChange={(checked) => setEnableSocialMonitoring(checked as boolean)}
                      data-testid="checkbox-social"
                    />
                    <div className="flex-1">
                      <Label htmlFor="social" className="text-base font-semibold cursor-pointer">
                        Social Media Monitoring
                      </Label>
                      <CardDescription className="mt-1">
                        Detect and remove fake accounts, imposters, and catfish profiles on major social platforms
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="auto"
                      checked={enableAutoTakedowns}
                      onCheckedChange={(checked) => setEnableAutoTakedowns(checked as boolean)}
                      data-testid="checkbox-auto"
                    />
                    <div className="flex-1">
                      <Label htmlFor="auto" className="text-base font-semibold cursor-pointer">
                        Automated Takedowns
                      </Label>
                      <CardDescription className="mt-1">
                        Enable fully automated detection and takedown requests without manual approval
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Verification Documents</h2>
              <p className="text-muted-foreground">
                Upload documents to verify brand ownership. This helps expedite takedown requests.
              </p>
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Documents</CardTitle>
                  <CardDescription>
                    These documents strengthen your copyright claims
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Trademark registration certificate</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Copyright registration documents</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Business registration or LLC documents</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Government-issued ID</span>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Label htmlFor="documents">Upload Documents (Optional)</Label>
                <Input
                  id="documents"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  data-testid="input-documents"
                />
                <p className="text-xs text-muted-foreground">
                  Accepted formats: PDF, JPG, PNG. You can upload multiple files.
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> You can skip this step and upload documents later from your dashboard settings.
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Notification Preferences</h2>
              <p className="text-muted-foreground">
                Choose how and when you want to receive updates about your brand protection.
              </p>
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="email"
                      checked={emailNotifications}
                      onCheckedChange={(checked) => setEmailNotifications(checked as boolean)}
                      data-testid="checkbox-email"
                    />
                    <div className="flex-1">
                      <Label htmlFor="email" className="text-base font-semibold cursor-pointer">
                        Email Notifications
                      </Label>
                      <CardDescription className="mt-1">
                        Receive email updates about takedowns and protection activity
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="weekly"
                      checked={weeklyReports}
                      onCheckedChange={(checked) => setWeeklyReports(checked as boolean)}
                      data-testid="checkbox-weekly"
                    />
                    <div className="flex-1">
                      <Label htmlFor="weekly" className="text-base font-semibold cursor-pointer">
                        Weekly Summary Reports
                      </Label>
                      <CardDescription className="mt-1">
                        Get a comprehensive weekly summary of all protection activities
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="instant"
                      checked={instantAlerts}
                      onCheckedChange={(checked) => setInstantAlerts(checked as boolean)}
                      data-testid="checkbox-instant"
                    />
                    <div className="flex-1">
                      <Label htmlFor="instant" className="text-base font-semibold cursor-pointer">
                        Instant Alerts
                      </Label>
                      <CardDescription className="mt-1">
                        Receive immediate notifications when new infringements are detected
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  You can update these preferences anytime from your dashboard settings.
                </p>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">You're All Set!</h2>
              <p className="text-muted-foreground">
                Your brand protection is now active. Our AI is already scanning for infringements.
              </p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>What happens next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <div className="h-6 w-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">1</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Daily Scans Begin</div>
                    <p className="text-sm text-muted-foreground">
                      Our AI starts monitoring the web for unauthorized use of your brand
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <div className="h-6 w-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">2</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Automated Protection</div>
                    <p className="text-sm text-muted-foreground">
                      Takedown notices are automatically sent to infringing sites
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <div className="h-6 w-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">3</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Track Progress</div>
                    <p className="text-sm text-muted-foreground">
                      View detailed reports and analytics in your dashboard
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">BrandSafe Onboarding</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <Progress value={progress} className="h-2" data-testid="progress-bar" />
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-primary">
                  {steps[currentStep].icon}
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    {steps[currentStep].description}
                  </div>
                </div>
              </div>
            </div>

            <div className="min-h-[400px]">
              {renderStepContent()}
            </div>

            <div className="flex items-center justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                data-testid="button-back"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentStep === 1 && !brandName.trim()}
                data-testid="button-next"
              >
                {currentStep === steps.length - 1 ? (
                  "Go to Dashboard"
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
