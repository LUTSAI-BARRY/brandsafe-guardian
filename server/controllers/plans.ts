import type { Request, Response } from "express";
import { db } from "../../db";
import { plans } from "@shared/schema";

// -------------------- GET PLANS --------------------
export async function getPlans(req: Request, res: Response) {
  try {
    const allPlans = await db.select().from(plans);
    
    // Parse features JSON for each plan
    const plansWithParsedFeatures = allPlans.map((plan: any) => ({
      ...plan,
      features: JSON.parse(plan.features)
    }));

    res.status(200).json({
      plans: plansWithParsedFeatures
    });
  } catch (error) {
    console.error("Get Plans Error:", error);
    // Return fallback plans if database is not available
    const fallbackPlans = [
      {
        id: 1,
        name: "Bronze",
        price: "$29/month",
        features: [
          "Basic brand monitoring",
          "1 brand protected",
          "Weekly reports",
          "Email alerts",
          "Basic support"
        ]
      },
      {
        id: 2,
        name: "Silver",
        price: "$59/month",
        features: [
          "Advanced brand monitoring",
          "Up to 3 brands",
          "Daily monitoring",
          "Priority alerts",
          "Real-time notifications",
          "Priority support",
          "Basic analytics"
        ]
      },
      {
        id: 3,
        name: "Gold",
        price: "$99/month",
        features: [
          "Comprehensive brand protection",
          "Unlimited brands",
          "Real-time monitoring",
          "Advanced analytics",
          "Custom alerts",
          "24/7 premium support",
          "API access",
          "White-label options"
        ]
      }
    ];
    
    res.status(200).json({
      plans: fallbackPlans
    });
  }
}

// -------------------- SEED PLANS --------------------
export async function seedPlans() {
  try {
    // Check if plans already exist
    const existingPlans = await db.select().from(plans);
    
    if (existingPlans.length > 0) {
      console.log("Plans already exist, skipping seed");
      return;
    }

    const defaultPlans = [
      {
        name: "Bronze",
        price: "$29/month",
        features: JSON.stringify([
          "Basic brand monitoring",
          "1 brand protected",
          "Weekly reports",
          "Email alerts",
          "Basic support"
        ])
      },
      {
        name: "Silver", 
        price: "$59/month",
        features: JSON.stringify([
          "Advanced brand monitoring",
          "Up to 3 brands",
          "Daily monitoring",
          "Priority alerts",
          "Real-time notifications",
          "Priority support",
          "Basic analytics"
        ])
      },
      {
        name: "Gold",
        price: "$99/month", 
        features: JSON.stringify([
          "Comprehensive brand protection",
          "Unlimited brands",
          "Real-time monitoring",
          "Advanced analytics",
          "Custom alerts",
          "24/7 premium support",
          "API access",
          "White-label options"
        ])
      }
    ];

    await db.insert(plans).values(defaultPlans);
    console.log("Successfully seeded plans");
  } catch (error) {
    console.error("Seed Plans Error:", error);
    throw error;
  }
}
