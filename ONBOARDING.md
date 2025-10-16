# BrandSafe Guardian Onboarding Page

## Overview
The onboarding page is a comprehensive multi-step wizard that guides new users through setting up their brand protection.

## Location
`/client/src/pages/onboarding.tsx`

## Route
`/onboarding` (Protected route - requires authentication)

## Features

### 6-Step Onboarding Process

#### Step 1: Welcome
- Introduction to BrandSafe Guardian
- Overview of key features:
  - Daily Scans (AI-powered monitoring)
  - Auto Takedowns (DMCA & Google delisting)
  - Social Protection (imposter removal)

#### Step 2: Brand Profile
- **Brand Name** (required)
  - Primary name for monitoring infringements
- **Brand Keywords** (optional)
  - Additional keywords for AI detection
  - Comma-separated list
- **Social Media Handles** (optional)
  - Platform handles to monitor for imposters
  - Supports Instagram, YouTube, Twitter, etc.

#### Step 3: Protection Settings
Users can enable/disable protection features:
- ✓ **DMCA Takedowns** - Automatic DMCA notices to infringing sites
- ✓ **Google Delisting** - Remove content from Google search via Trusted Copyright Removal Program
- ✓ **Social Media Monitoring** - Detect fake accounts and imposters
- ✓ **Automated Takedowns** - Fully automated detection and takedowns

#### Step 4: Verification Documents (Optional)
- Upload supporting documents:
  - Trademark registration certificate
  - Copyright registration documents
  - Business registration/LLC documents
  - Government-issued ID
- Accepted formats: PDF, JPG, PNG
- Can be skipped and uploaded later from settings

#### Step 5: Notification Preferences
Configure notification settings:
- ✓ **Email Notifications** - Updates about takedowns and activity
- ✓ **Weekly Summary Reports** - Comprehensive weekly reports
- ⬜ **Instant Alerts** - Immediate notifications for new infringements

#### Step 6: Completion
- Success confirmation
- Explanation of next steps:
  1. Daily scans begin
  2. Automated protection activates
  3. Track progress in dashboard
- Redirects to dashboard

## Technical Implementation

### State Management
- Uses React `useState` hooks for form state
- Tracks current step with `currentStep` state
- Individual state variables for each form field

### Progress Tracking
- Visual progress bar showing completion percentage
- Step counter (Step X of 6)
- Back/Next navigation buttons

### Validation
- Brand name is required to proceed from Step 2
- Back button disabled on first step
- Next button changes to "Go to Dashboard" on final step

### Navigation
- Uses `wouter` for routing
- Redirects to `/dashboard` upon completion
- Protected route - requires authentication

### UI Components
Built with shadcn/ui components:
- `Card` - Step containers
- `Button` - Navigation
- `Input` - Text fields
- `Textarea` - Multi-line text fields
- `Progress` - Progress bar
- `Checkbox` - Feature toggles
- `Label` - Form labels
- Icons from `lucide-react`

### Styling
- Responsive design with mobile-first approach
- Centered layout with max-width constraint
- Consistent spacing and typography
- Uses Tailwind CSS utility classes
- Theme-aware with CSS custom properties

## User Experience

### Flow
1. User signs up or is invited
2. Redirected to `/onboarding`
3. Completes 6-step wizard
4. Redirected to `/dashboard`

### Accessibility
- Keyboard navigation support
- Proper label associations
- ARIA-compliant components via Radix UI
- Focus management

### Validation Rules
- Only brand name is required
- All other fields are optional
- Users can skip steps and return later
- Settings can be updated from dashboard

## Integration Points

### Authentication
- Protected by `ProtectedRoute` component
- Requires valid user session

### Navigation Flow
```
/signup → /onboarding → /dashboard
```

### State Persistence
- Currently in-memory only
- Future enhancement: Save progress to backend
- Can be revisited from dashboard settings

## Testing

### Manual Testing Checklist
- [ ] Navigate through all 6 steps
- [ ] Test back button functionality
- [ ] Verify brand name validation
- [ ] Toggle checkboxes in steps 3 & 5
- [ ] Test file upload interface (step 4)
- [ ] Verify redirect to dashboard on completion
- [ ] Test responsive design on mobile
- [ ] Verify accessibility with keyboard navigation

### Test Data IDs
All interactive elements include `data-testid` attributes for automated testing:
- `input-brand-name` - Brand name input
- `input-keywords` - Keywords textarea
- `input-social-handles` - Social handles textarea
- `checkbox-dmca` - DMCA checkbox
- `checkbox-google` - Google delisting checkbox
- `checkbox-social` - Social monitoring checkbox
- `checkbox-auto` - Auto takedowns checkbox
- `checkbox-email` - Email notifications checkbox
- `checkbox-weekly` - Weekly reports checkbox
- `checkbox-instant` - Instant alerts checkbox
- `input-documents` - File upload input
- `progress-bar` - Progress bar
- `button-back` - Back button
- `button-next` - Next button

## Future Enhancements

### Potential Improvements
1. **Backend Integration**
   - Save onboarding progress to database
   - Persist user preferences
   - Upload documents to storage service

2. **Validation**
   - Add Zod schema validation
   - Real-time field validation
   - Email/URL format validation

3. **Progress Persistence**
   - Save incomplete onboarding progress
   - Resume from last completed step
   - Skip onboarding option for advanced users

4. **Analytics**
   - Track completion rate per step
   - Identify drop-off points
   - A/B test different flows

5. **Guided Tour**
   - Interactive tooltips
   - Video tutorials
   - Help center integration

6. **Social Proof**
   - Display testimonials
   - Show real-time protection statistics
   - Success stories

## Related Files
- `/client/src/App.tsx` - Routing configuration
- `/client/src/components/protected-route.tsx` - Authentication guard
- `/client/src/pages/dashboard.tsx` - Post-onboarding destination
- `/client/src/components/ui/*` - UI component library
